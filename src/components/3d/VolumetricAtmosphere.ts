import * as THREE from 'three';

/**
 * AAA Volumetric Atmosphere System
 * Delivers cinematic atmospheric depth, realistic light scattering,
 * stratified ground mist, and dual-layer slowly drifting light particles.
 * Engineered for zero GC allocations during frame execution (60+ FPS).
 */
export class VolumetricAtmosphere {
  public group: THREE.Group;

  // Particle systems
  private sunMotes: THREE.Points;
  private crimsonEmbers: THREE.Points;
  private sunMoteCount = 140;
  private crimsonEmberCount = 50;
  private sunMotePositions: Float32Array;
  private crimsonEmberPositions: Float32Array;
  private sunMoteVelocities: Float32Array;
  private crimsonEmberVelocities: Float32Array;

  // Low-lying atmospheric ground mist sheets
  private mistPlanes: THREE.Mesh[] = [];

  // Volumetric sunbeam light shafts
  private sunRaysGroup: THREE.Group;
  private rayMaterials: THREE.MeshBasicMaterial[] = [];

  private time: number = 0;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'VolumetricAtmosphereSystem';

    const softMoteTexture = this.generateSoftRadialParticleTexture();

    // 1. Build Ambient Sunlit Dust Motes (Golden Daylight Bokeh)
    const { points: sunPoints, positions: sPos, velocities: sVel } = this.buildParticleSystem({
      count: this.sunMoteCount,
      spreadX: 32,
      spreadY: 10,
      spreadZ: 32,
      baseY: 1.0,
      color: 0xFFF8E7,
      size: 0.18,
      opacity: 0.40,
      texture: softMoteTexture,
      speedScale: 0.35,
    });
    this.sunMotes = sunPoints;
    this.sunMotePositions = sPos;
    this.sunMoteVelocities = sVel;
    this.group.add(this.sunMotes);

    // 2. Build Subtle Crimson Digital Embers (Hovering near character & conduits)
    const { points: emberPoints, positions: ePos, velocities: eVel } = this.buildParticleSystem({
      count: this.crimsonEmberCount,
      spreadX: 14,
      spreadY: 6,
      spreadZ: 14,
      baseY: 0.8,
      color: 0xE11D48,
      size: 0.14,
      opacity: 0.50,
      texture: softMoteTexture,
      speedScale: 0.5,
    });
    this.crimsonEmbers = emberPoints;
    this.crimsonEmberPositions = ePos;
    this.crimsonEmberVelocities = eVel;
    this.group.add(this.crimsonEmbers);

    // 3. Low-Lying Ground Mist Layers (Near riverbed & lower valley steps)
    this.buildGroundMistLayers();

    // 4. Subtle Volumetric Sun Rays (Soft warm god-rays filtering from top right)
    this.sunRaysGroup = new THREE.Group();
    this.buildSunRays();
    this.group.add(this.sunRaysGroup);
  }

  /**
   * Generates a circular Gaussian soft-falloff particle sprite for realistic bokeh motes
   */
  private generateSoftRadialParticleTexture(): THREE.CanvasTexture {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const center = size / 2;
    const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.65)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  /**
   * High performance instanced particle buffer setup
   */
  private buildParticleSystem(config: {
    count: number;
    spreadX: number;
    spreadY: number;
    spreadZ: number;
    baseY: number;
    color: number;
    size: number;
    opacity: number;
    texture: THREE.CanvasTexture;
    speedScale: number;
  }) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(config.count * 3);
    const velocities = new Float32Array(config.count * 3);

    for (let i = 0; i < config.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * config.spreadX;
      positions[i * 3 + 1] = Math.random() * config.spreadY + config.baseY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * config.spreadZ;

      // Gentle drift velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.12 * config.speedScale;
      velocities[i * 3 + 1] = (Math.random() * 0.1 + 0.04) * config.speedScale;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.12 * config.speedScale;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: config.color,
      size: config.size,
      map: config.texture,
      transparent: true,
      opacity: config.opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    return { points, positions, velocities };
  }

  /**
   * Stratified ground mist planes hugging lower valleys and water
   */
  private buildGroundMistLayers() {
    const mistMat = new THREE.MeshBasicMaterial({
      color: 0xFAF7F2,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Tiered mist planes with soft scaling
    const mistConfigs = [
      { x: 5.5, y: -0.2, z: 4.5, w: 14, d: 16, rotZ: 0.01 },
      { x: -6.0, y: 0.2, z: -3.0, w: 18, d: 18, rotZ: -0.01 },
      { x: 0.0, y: -0.4, z: 2.0, w: 26, d: 24, rotZ: 0.0 },
    ];

    mistConfigs.forEach((cfg) => {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(cfg.w, cfg.d), mistMat.clone());
      plane.rotation.x = -Math.PI / 2;
      plane.rotation.z = cfg.rotZ;
      plane.position.set(cfg.x, cfg.y, cfg.z);
      this.mistPlanes.push(plane);
      this.group.add(plane);
    });
  }

  /**
   * Translucent diagonal sun light shafts matching sunlight direction
   */
  private buildSunRays() {
    // Angled light beams shining from (16, 26, 18) towards world origin
    const rayConfigs = [
      { x: 8, y: 12, z: 8, w: 5.5, h: 26, rotX: 0.45, rotZ: -0.32, opacity: 0.045 },
      { x: 3, y: 10, z: 4, w: 4.2, h: 22, rotX: 0.42, rotZ: -0.30, opacity: 0.038 },
      { x: 12, y: 14, z: 12, w: 6.8, h: 28, rotX: 0.48, rotZ: -0.34, opacity: 0.040 },
    ];

    rayConfigs.forEach((cfg) => {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xFFF5E4,
        transparent: true,
        opacity: cfg.opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      this.rayMaterials.push(mat);

      const rayMesh = new THREE.Mesh(new THREE.PlaneGeometry(cfg.w, cfg.h), mat);
      rayMesh.position.set(cfg.x, cfg.y, cfg.z);
      rayMesh.rotation.x = cfg.rotX;
      rayMesh.rotation.z = cfg.rotZ;
      this.sunRaysGroup.add(rayMesh);
    });
  }

  /**
   * Main per-frame update loop (Zero allocation, high-performance mathematics)
   */
  public update(delta: number) {
    this.time += delta;

    // 1. Update Sun Motes with gentle 3D fluid draft
    const sPos = this.sunMotePositions;
    const sVel = this.sunMoteVelocities;
    for (let i = 0; i < this.sunMoteCount; i++) {
      const idx = i * 3;
      // Oscillating swaying drift
      sPos[idx] += sVel[idx] + Math.sin(this.time * 0.4 + i) * 0.003;
      sPos[idx + 1] += sVel[idx + 1];
      sPos[idx + 2] += sVel[idx + 2] + Math.cos(this.time * 0.4 + i) * 0.003;

      // Wrap around bounds to maintain constant volumetric density
      if (sPos[idx + 1] > 11.5) {
        sPos[idx + 1] = 0.5;
        sPos[idx] = (Math.random() - 0.5) * 32;
        sPos[idx + 2] = (Math.random() - 0.5) * 32;
      }
      if (sPos[idx] > 16) sPos[idx] = -16;
      if (sPos[idx] < -16) sPos[idx] = 16;
      if (sPos[idx + 2] > 16) sPos[idx + 2] = -16;
      if (sPos[idx + 2] < -16) sPos[idx + 2] = 16;
    }
    this.sunMotes.geometry.attributes.position.needsUpdate = true;

    // 2. Update Crimson Digital Embers (Lifting gently near the tech zones)
    const ePos = this.crimsonEmberPositions;
    const eVel = this.crimsonEmberVelocities;
    for (let i = 0; i < this.crimsonEmberCount; i++) {
      const idx = i * 3;
      ePos[idx] += eVel[idx] + Math.sin(this.time * 0.8 + i) * 0.004;
      ePos[idx + 1] += eVel[idx + 1];
      ePos[idx + 2] += eVel[idx + 2] + Math.cos(this.time * 0.8 + i) * 0.004;

      if (ePos[idx + 1] > 7.0) {
        ePos[idx + 1] = 0.6;
        ePos[idx] = (Math.random() - 0.5) * 14;
        ePos[idx + 2] = (Math.random() - 0.5) * 14;
      }
    }
    this.crimsonEmbers.geometry.attributes.position.needsUpdate = true;

    // 3. Subtle pulsating shimmer of sun shafts
    const pulse = Math.sin(this.time * 0.6) * 0.008;
    this.rayMaterials.forEach((mat, idx) => {
      mat.opacity = 0.04 + pulse * (idx % 2 === 0 ? 1 : -1);
    });

    // 4. Gentle ground mist breathing
    this.mistPlanes.forEach((plane, i) => {
      plane.rotation.z += delta * 0.008 * (i % 2 === 0 ? 1 : -1);
      (plane.material as THREE.MeshBasicMaterial).opacity = 0.16 + Math.sin(this.time * 0.5 + i) * 0.03;
    });
  }
}
