import * as THREE from 'three';
import { createVoxelMaterials } from './VoxelMaterials';
import { SystemId } from '../../types';

/**
 * AAA-Quality Futuristic System Monoliths
 * Sophisticated architectural structures physically integrated into the voxel world,
 * featuring kinetic animations, PBR materials, and controlled emissive lighting.
 */
export class SystemMonoliths {
  public group: THREE.Group;
  public nodes: Map<SystemId, THREE.Group> = new Map();
  public interactiveMeshes: THREE.Mesh[] = [];

  private materials: ReturnType<typeof createVoxelMaterials>;
  private time: number = 0;
  private activeSystem: SystemId | null = null;
  private hoveredSystem: SystemId | null = null;

  // AI Structure handles
  private aiCoreMesh!: THREE.Mesh;
  private aiRingGroup!: THREE.Group;
  private aiSignalWaves: THREE.Mesh[] = [];
  private aiLight!: THREE.PointLight;

  // Automation Structure handles
  private automationGears: THREE.Mesh[] = [];
  private automationDataBlocks: THREE.Mesh[] = [];
  private automationLight!: THREE.PointLight;

  // Web Structure handles
  private webFrameGroup!: THREE.Group;
  private webFloatingLayers: THREE.Mesh[] = [];
  private webLight!: THREE.PointLight;

  // Growth Structure handles
  private growthBars: THREE.Mesh[] = [];
  private growthBeaconMesh!: THREE.Mesh;
  private growthLight!: THREE.PointLight;

  constructor(materials: ReturnType<typeof createVoxelMaterials>) {
    this.materials = materials;
    this.group = new THREE.Group();
    this.group.name = 'AAA_SystemMonoliths';

    this.createAINode();
    this.createAutomationNode();
    this.createWebNode();
    this.createGrowthNode();
  }

  /**
   * 1. AI System: Intelligent Neural Core & Holographic Obelisk
   */
  private createAINode() {
    const group = new THREE.Group();
    group.position.set(-4.5, 1.6, -1.0);
    group.name = 'ai_node';

    // Tiered Architectural Quartz Base
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.45, 1.8), this.materials.quartz);
    base.position.y = 0.225;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    const midPlinth = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.35, 1.3), this.materials.darkSlate);
    midPlinth.position.y = 0.60;
    midPlinth.castShadow = true;
    group.add(midPlinth);

    // 4 Corner Architectural Pylons
    const pylonGeo = new THREE.BoxGeometry(0.22, 1.8, 0.22);
    const pylonOffsets = [
      [-0.55, -0.55],
      [0.55, -0.55],
      [-0.55, 0.55],
      [0.55, 0.55],
    ];
    pylonOffsets.forEach(([px, pz]) => {
      const pylon = new THREE.Mesh(pylonGeo, this.materials.quartz);
      pylon.position.set(px, 1.5, pz);
      pylon.castShadow = true;
      group.add(pylon);

      // Inset crimson fiber accent on each pylon
      const accent = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.4, 0.06), this.materials.redConduit);
      accent.position.set(px * 0.9, 1.5, pz * 0.9);
      group.add(accent);
    });

    // Levitating Central Quantum Neural Core
    const coreGeo = new THREE.BoxGeometry(0.72, 0.72, 0.72);
    this.aiCoreMesh = new THREE.Mesh(coreGeo, this.materials.redConduit);
    this.aiCoreMesh.position.y = 1.65;
    this.aiCoreMesh.castShadow = true;
    this.aiCoreMesh.userData = { systemId: 'ai', isSystemNode: true };
    this.interactiveMeshes.push(this.aiCoreMesh);
    group.add(this.aiCoreMesh);

    // Outer Faceted Holographic Cage
    const cageGeo = new THREE.BoxGeometry(0.95, 0.95, 0.95);
    const cageMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
    const cage = new THREE.Mesh(cageGeo, cageMat);
    this.aiCoreMesh.add(cage);

    // Rotating Precision Holographic Energy Rings
    this.aiRingGroup = new THREE.Group();
    this.aiRingGroup.position.y = 1.65;
    for (let r = 0; r < 3; r++) {
      const ringRadius = 0.85 + r * 0.28;
      const ringGeo = new THREE.TorusGeometry(ringRadius, 0.022, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r === 0 ? 0xE11D48 : 0xF43F5E,
        transparent: true,
        opacity: 0.75,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + (r * 0.45);
      ring.rotation.y = r * 0.65;
      this.aiRingGroup.add(ring);
    }
    group.add(this.aiRingGroup);

    // Signal Emission Wave Discs
    for (let i = 0; i < 3; i++) {
      const waveGeo = new THREE.RingGeometry(0.2, 0.28, 32);
      const waveMat = new THREE.MeshBasicMaterial({
        color: 0xE11D48,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const wave = new THREE.Mesh(waveGeo, waveMat);
      wave.rotation.x = -Math.PI / 2;
      wave.position.y = 1.65;
      wave.userData = { offset: i * 0.33 };
      this.aiSignalWaves.push(wave);
      group.add(wave);
    }

    // Controlled Crimson Light Source
    this.aiLight = new THREE.PointLight(0xE11D48, 1.6, 6);
    this.aiLight.position.set(0, 1.65, 0);
    group.add(this.aiLight);

    this.createFloatingLabel(group, 'AI SYSTEMS', 2.85, 0xE11D48);

    this.group.add(group);
    this.nodes.set('ai', group);
  }

  /**
   * 2. AUTOMATION System: Connected Mechanical Pipeline & Kinetic Engine
   */
  private createAutomationNode() {
    const group = new THREE.Group();
    group.position.set(4.2, 1.5, -1.5);
    group.name = 'automation_node';

    // Industrial Stepped Plinth
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.45, 2.0), this.materials.darkSlate);
    base.position.y = 0.225;
    base.castShadow = true;
    group.add(base);

    // 4 Polished Quartz Machinery Pillars
    const pillarGeo = new THREE.BoxGeometry(0.32, 1.6, 0.32);
    const pillarCoords = [
      [-0.65, -0.65],
      [0.65, -0.65],
      [-0.65, 0.65],
      [0.65, 0.65],
    ];
    pillarCoords.forEach(([cx, cz]) => {
      const p = new THREE.Mesh(pillarGeo, this.materials.quartz);
      p.position.set(cx, 1.1, cz);
      p.castShadow = true;
      group.add(p);
    });

    // Horizontal Conveyor Pipelines with Orange Emissive Sheen
    const pipeGeo = new THREE.BoxGeometry(1.6, 0.26, 0.26);
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0xEA580C,
      emissive: 0xEA580C,
      emissiveIntensity: 0.7,
      roughness: 0.2,
    });
    const pipe1 = new THREE.Mesh(pipeGeo, pipeMat);
    pipe1.position.set(0, 1.5, -0.65);
    const pipe2 = new THREE.Mesh(pipeGeo, pipeMat);
    pipe2.position.set(0, 1.5, 0.65);
    group.add(pipe1, pipe2);

    // Kinetic Gears (Precision Voxel Discs)
    for (let g = 0; g < 2; g++) {
      const gear = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.52, 0.14), this.materials.quartz);
      gear.position.set(g === 0 ? -0.35 : 0.35, 1.5, 0);
      gear.userData = { speed: g === 0 ? 2.8 : -2.8 };
      this.automationGears.push(gear);
      group.add(gear);
    }

    // Central Interactive Automation Hub Block
    const hub = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.82, 0.82), this.materials.orangeHighlight);
    hub.position.set(0, 2.1, 0);
    hub.castShadow = true;
    hub.userData = { systemId: 'automation', isSystemNode: true };
    this.interactiveMeshes.push(hub);
    group.add(hub);

    // Moving Kinetic Data Packets
    const packetGeo = new THREE.BoxGeometry(0.20, 0.20, 0.20);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xFFEDD5 });
    for (let k = 0; k < 5; k++) {
      const packet = new THREE.Mesh(packetGeo, packetMat);
      packet.userData = { index: k, speed: 1.6 };
      this.automationDataBlocks.push(packet);
      group.add(packet);
    }

    // Controlled Amber Light Source
    this.automationLight = new THREE.PointLight(0xEA580C, 1.5, 6);
    this.automationLight.position.set(0, 2.1, 0);
    group.add(this.automationLight);

    this.createFloatingLabel(group, 'AUTOMATION', 2.95, 0xEA580C);

    this.group.add(group);
    this.nodes.set('automation', group);
  }

  /**
   * 3. WEB System: Miniature Floating Digital Architecture & Glass Pavilion
   */
  private createWebNode() {
    const group = new THREE.Group();
    group.position.set(-2.8, 2.2, 3.2);
    group.name = 'web_node';

    // Architectural Pedestal
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.5, 1.7), this.materials.quartz);
    plinth.position.y = 0.25;
    plinth.castShadow = true;
    group.add(plinth);

    // Floating 3D Browser Stage
    this.webFrameGroup = new THREE.Group();
    this.webFrameGroup.position.set(0, 1.7, 0);

    // Beveled Outer Glass / Dark Slate Frame
    const browserFrame = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.2, 0.12), this.materials.darkSlate);
    browserFrame.userData = { systemId: 'web', isSystemNode: true };
    browserFrame.castShadow = true;
    this.interactiveMeshes.push(browserFrame);
    this.webFrameGroup.add(browserFrame);

    // Physical Glass Screen Display
    const screen = new THREE.Mesh(new THREE.BoxGeometry(1.54, 0.94, 0.09), this.materials.glass);
    screen.position.z = 0.04;
    this.webFrameGroup.add(screen);

    // Top Header Control Dots (Crimson, Amber, Emerald)
    const dotColors = [0xE11D48, 0xF59E0B, 0x10B981];
    dotColors.forEach((color, i) => {
      const dot = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.07, 0.03),
        new THREE.MeshBasicMaterial({ color })
      );
      dot.position.set(-0.65 + i * 0.12, 0.46, 0.07);
      this.webFrameGroup.add(dot);
    });

    // Layered Floating UI Cards with 3D Depth
    const heroCard = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.40, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xE11D48, roughness: 0.25, metalness: 0.3 })
    );
    heroCard.position.set(-0.3, 0.12, 0.09);
    this.webFloatingLayers.push(heroCard);
    this.webFrameGroup.add(heroCard);

    const statsCard = new THREE.Mesh(
      new THREE.BoxGeometry(0.50, 0.30, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2, metalness: 0.1 })
    );
    statsCard.position.set(0.42, 0.18, 0.13);
    this.webFloatingLayers.push(statsCard);
    this.webFrameGroup.add(statsCard);

    const ctaBtn = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.12, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x18181B, roughness: 0.3 })
    );
    ctaBtn.position.set(0.42, -0.16, 0.11);
    this.webFloatingLayers.push(ctaBtn);
    this.webFrameGroup.add(ctaBtn);

    group.add(this.webFrameGroup);

    // Controlled Light Source
    this.webLight = new THREE.PointLight(0xE11D48, 1.4, 6);
    this.webLight.position.set(0, 1.7, 0.2);
    group.add(this.webLight);

    this.createFloatingLabel(group, 'EXPERIENCES', 2.7, 0xE11D48);

    this.group.add(group);
    this.nodes.set('web', group);
  }

  /**
   * 4. GROWTH System: Stepped Funnel Monolith & Kinetic Metric Pillars
   */
  private createGrowthNode() {
    const group = new THREE.Group();
    group.position.set(3.4, 2.0, 2.8);
    group.name = 'growth_node';

    // Stepped Platform
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.45, 1.8), this.materials.quartz);
    base.position.y = 0.225;
    base.castShadow = true;
    group.add(base);

    // 4 Ascending Kinetic Metric Graph Columns
    const barHeights = [0.7, 1.1, 1.5, 2.0];
    const barMat = new THREE.MeshStandardMaterial({
      color: 0xBE123C,
      emissive: 0xBE123C,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.4,
    });

    for (let b = 0; b < 4; b++) {
      const h = barHeights[b];
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.30, h, 0.30), barMat);
      bar.position.set(-0.50 + b * 0.33, h / 2 + 0.45, 0);
      bar.castShadow = true;
      bar.userData = { initialHeight: h, barIndex: b, systemId: 'growth', isSystemNode: true };
      this.growthBars.push(bar);
      this.interactiveMeshes.push(bar);
      group.add(bar);
    }

    // Top Growth Beacon
    const beaconGeo = new THREE.BoxGeometry(0.40, 0.40, 0.40);
    this.growthBeaconMesh = new THREE.Mesh(beaconGeo, this.materials.redConduit);
    this.growthBeaconMesh.position.set(0.50, 2.65, 0);
    this.growthBeaconMesh.userData = { systemId: 'growth', isSystemNode: true };
    this.interactiveMeshes.push(this.growthBeaconMesh);
    group.add(this.growthBeaconMesh);

    // Upward pointing laser cone
    const arrowGeo = new THREE.ConeGeometry(0.22, 0.40, 4);
    const arrowMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const arrow = new THREE.Mesh(arrowGeo, arrowMat);
    arrow.position.set(0.50, 3.1, 0);
    group.add(arrow);

    // Controlled Crimson Light Source
    this.growthLight = new THREE.PointLight(0xBE123C, 1.5, 6);
    this.growthLight.position.set(0.50, 2.65, 0);
    group.add(this.growthLight);

    this.createFloatingLabel(group, 'GROWTH', 3.45, 0xBE123C);

    this.group.add(group);
    this.nodes.set('growth', group);
  }

  /**
   * Helper: creates a subtle 3D floating badge
   */
  private createFloatingLabel(parent: THREE.Group, text: string, yPos: number, colorHex: number) {
    const labelGroup = new THREE.Group();
    labelGroup.position.y = yPos;
    labelGroup.name = 'label_badge';

    const pill = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.30, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x18181B, roughness: 0.35 })
    );
    labelGroup.add(pill);

    const led = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.12, 0.09),
      new THREE.MeshBasicMaterial({ color: colorHex })
    );
    led.position.set(-0.50, 0, 0.01);
    labelGroup.add(led);

    parent.add(labelGroup);
  }

  public setActiveSystem(id: SystemId | null) {
    this.activeSystem = id;
  }

  public setHoveredSystem(id: SystemId | null) {
    this.hoveredSystem = id;
  }

  public update(delta: number, camera: THREE.Camera) {
    this.time += delta;

    // --- AI SYSTEM KINETICS ---
    if (this.aiCoreMesh) {
      const isAIActive = this.activeSystem === 'ai' || this.hoveredSystem === 'ai';
      this.aiCoreMesh.rotation.y += delta * (isAIActive ? 3.2 : 1.2);
      this.aiCoreMesh.rotation.x = Math.sin(this.time * 2.2) * 0.22;
      this.aiRingGroup.rotation.y -= delta * 1.6;
      this.aiLight.intensity = THREE.MathUtils.lerp(this.aiLight.intensity, isAIActive ? 2.8 : 1.4, 0.1);

      this.aiSignalWaves.forEach((wave) => {
        const offset = wave.userData.offset || 0;
        const progress = ((this.time * (isAIActive ? 1.6 : 0.7)) + offset) % 1;
        wave.scale.set(1 + progress * 3.8, 1 + progress * 3.8, 1);
        (wave.material as THREE.MeshBasicMaterial).opacity = (1 - progress) * (isAIActive ? 0.85 : 0.3);
      });
    }

    // --- AUTOMATION SYSTEM KINETICS ---
    const isAutoActive = this.activeSystem === 'automation' || this.hoveredSystem === 'automation';
    const autoSpeedMult = isAutoActive ? 2.6 : 1.0;
    this.automationLight.intensity = THREE.MathUtils.lerp(this.automationLight.intensity, isAutoActive ? 2.6 : 1.3, 0.1);

    this.automationGears.forEach((gear) => {
      gear.rotation.z += delta * gear.userData.speed * autoSpeedMult;
    });

    this.automationDataBlocks.forEach((packet) => {
      const idx = packet.userData.index;
      const progress = ((this.time * 0.85 * autoSpeedMult) + idx * 0.20) % 1;
      packet.position.set(
        -0.7 + progress * 1.4,
        1.5 + Math.sin(progress * Math.PI) * 0.18,
        -0.65 + Math.sin(this.time * 2 + idx) * 0.08
      );
    });

    // --- WEB SYSTEM KINETICS ---
    if (this.webFrameGroup) {
      const isWebActive = this.activeSystem === 'web' || this.hoveredSystem === 'web';
      this.webLight.intensity = THREE.MathUtils.lerp(this.webLight.intensity, isWebActive ? 2.5 : 1.2, 0.1);
      this.webFrameGroup.position.y = 1.7 + Math.sin(this.time * 2.0) * (isWebActive ? 0.20 : 0.08);
      this.webFrameGroup.rotation.y = Math.sin(this.time * 1.3) * 0.16 + (isWebActive ? 0.25 : 0);

      this.webFloatingLayers.forEach((layer, i) => {
        layer.position.z = 0.09 + Math.sin(this.time * 3.2 + i) * (isWebActive ? 0.09 : 0.03);
      });
    }

    // --- GROWTH SYSTEM KINETICS ---
    const isGrowthActive = this.activeSystem === 'growth' || this.hoveredSystem === 'growth';
    this.growthLight.intensity = THREE.MathUtils.lerp(this.growthLight.intensity, isGrowthActive ? 2.6 : 1.3, 0.1);

    this.growthBars.forEach((bar) => {
      const initH = bar.userData.initialHeight;
      const barIdx = bar.userData.barIndex;
      const wave = Math.sin(this.time * 3.2 + barIdx * 0.85);
      const scaleMultiplier = isGrowthActive ? 1.0 + wave * 0.28 : 1.0 + wave * 0.07;
      bar.scale.y = scaleMultiplier;
      bar.position.y = (initH * scaleMultiplier) / 2 + 0.45;
    });

    if (this.growthBeaconMesh) {
      this.growthBeaconMesh.rotation.y += delta * (isGrowthActive ? 4.5 : 1.6);
      this.growthBeaconMesh.position.y = 2.65 + Math.sin(this.time * 4) * 0.07;
    }

    // Make floating label badges face camera
    this.group.traverse((obj) => {
      if (obj.name === 'label_badge') {
        obj.lookAt(camera.position.x, obj.position.y, camera.position.z);
      }
    });
  }
}
