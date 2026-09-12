import * as THREE from 'three';
import { VoxelMaterials } from './VoxelMaterials';

export class WorldLandmarks {
  public group: THREE.Group;
  private materials: VoxelMaterials;
  private animatedMeshes: {
    mesh: THREE.Object3D;
    type: 'rotate' | 'bob' | 'pulse' | 'wave';
    speed: number;
    initialY?: number;
    axis?: 'x' | 'y' | 'z';
  }[] = [];
  private time = 0;

  constructor(materials: VoxelMaterials) {
    this.group = new THREE.Group();
    this.materials = materials;
    this.buildAllLandmarks();
  }

  private buildAllLandmarks() {
    this.buildAutomationFacility();
    this.buildAfterDarkClockHub();
    this.buildAILabCore();
    this.buildCreativeStudioPavilion();
    this.buildContentStudioTowers();
    this.buildGrowthFunnelMachine();
    this.buildDataAndStrategyTowers();
    this.buildProjectExhibitionPlatforms();
    this.buildFounderPavilion();
    this.buildCompletedMonument();
  }

  // 1. World 2: Automation Facility (x: 18, z: -18)
  private buildAutomationFacility() {
    const hub = new THREE.Group();
    hub.position.set(18, 0, -18);

    // Platform foundation
    const baseGeo = new THREE.BoxGeometry(10, 1, 10);
    const baseMesh = new THREE.Mesh(baseGeo, this.materials.stone);
    baseMesh.position.y = -0.5;
    baseMesh.receiveShadow = true;
    hub.add(baseMesh);

    // Tiered conduits
    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0xEA580C,
      roughness: 0.25,
      metalness: 0.8,
      emissive: 0xEA580C,
      emissiveIntensity: 0.35,
    });

    const pipelineGeo = new THREE.BoxGeometry(0.5, 0.5, 8);
    const pipe1 = new THREE.Mesh(pipelineGeo, conduitMat);
    pipe1.position.set(-2, 0.4, 0);
    hub.add(pipe1);

    const pipe2 = new THREE.Mesh(pipelineGeo, conduitMat);
    pipe2.position.set(2, 0.4, 0);
    hub.add(pipe2);

    // 4 Corner Automation Nodes
    const nodeGeo = new THREE.BoxGeometry(1.6, 2.5, 1.6);
    const nodeMat = this.materials.darkSlate;
    const cornerPositions = [
      [-3.5, -3.5],
      [3.5, -3.5],
      [-3.5, 3.5],
      [3.5, 3.5],
    ];

    cornerPositions.forEach(([cx, cz]) => {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(cx, 1.25, cz);
      node.castShadow = true;
      node.receiveShadow = true;
      hub.add(node);

      // Crimson core beacon on top
      const beaconGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const beaconMat = this.materials.redGlow;
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(cx, 2.8, cz);
      hub.add(beacon);

      this.animatedMeshes.push({
        mesh: beacon,
        type: 'pulse',
        speed: 2.5,
      });
    });


    // Central Data Routing Ring
    const ringGeo = new THREE.TorusGeometry(2.4, 0.2, 8, 24);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xE11D48,
      emissive: 0xE11D48,
      emissiveIntensity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1.8;
    hub.add(ring);

    this.animatedMeshes.push({
      mesh: ring,
      type: 'rotate',
      speed: 0.8,
      axis: 'y',
    });

    this.group.add(hub);
  }

  // 2. World 3: Business After Dark Clock Hub (x: 30, z: -32)
  private buildAfterDarkClockHub() {
    const group = new THREE.Group();
    group.position.set(30, 0, -32);

    // Ivory platform
    const base = new THREE.Mesh(new THREE.BoxGeometry(8, 0.8, 8), this.materials.stone);
    base.position.y = -0.4;
    base.receiveShadow = true;
    group.add(base);

    // Stepped clock pillar
    const towerGeo = new THREE.BoxGeometry(2.2, 7, 2.2);
    const tower = new THREE.Mesh(towerGeo, this.materials.darkSlate);
    tower.position.y = 3.5;
    tower.castShadow = true;
    group.add(tower);

    // Glowing Midnight Clock Face
    const clockGeo = new THREE.TorusGeometry(1.6, 0.22, 8, 24);
    const clockMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      emissive: 0xF59E0B,
      emissiveIntensity: 0.8,
    });
    const clock = new THREE.Mesh(clockGeo, clockMat);
    clock.position.set(0, 5.5, 1.25);
    group.add(clock);

    // Clock Hand
    const handGeo = new THREE.BoxGeometry(0.18, 1.1, 0.18);
    const handMat = new THREE.MeshStandardMaterial({ color: 0xE11D48, emissive: 0xE11D48, emissiveIntensity: 0.9 });
    const hand = new THREE.Mesh(handGeo, handMat);
    hand.position.set(0, 5.5, 1.35);
    group.add(hand);

    this.animatedMeshes.push({
      mesh: hand,
      type: 'rotate',
      speed: 0.5,
      axis: 'z',
    });

    this.group.add(group);
  }

  // 3. World 4: AI Lab & JARVIS Core (x: 15, z: -48)
  private buildAILabCore() {
    const lab = new THREE.Group();
    lab.position.set(15, 0, -48);

    // Platform
    const base = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 10), this.materials.stone);
    base.position.y = -0.4;
    lab.add(base);

    // JARVIS Central Neural Core
    const coreGeo = new THREE.OctahedronGeometry(1.5, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xE11D48,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0xE11D48,
      emissiveIntensity: 0.75,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 3.6;
    lab.add(core);

    this.animatedMeshes.push({
      mesh: core,
      type: 'rotate',
      speed: 1.2,
      axis: 'y',
    });

    this.animatedMeshes.push({
      mesh: core,
      type: 'bob',
      speed: 2.0,
      initialY: 3.6,
    });

    // Orbiting data satellites
    for (let i = 0; i < 3; i++) {
      const satGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const satMat = this.materials.redGlow;
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i * Math.PI * 2) / 3;
      sat.position.set(Math.cos(angle) * 3, 3.6, Math.sin(angle) * 3);
      lab.add(sat);

      this.animatedMeshes.push({
        mesh: sat,
        type: 'rotate',
        speed: 0.9 + i * 0.3,
        axis: 'y',
      });
    }

    // Audio Waveform Pillars
    for (let j = -3; j <= 3; j++) {
      const barGeo = new THREE.BoxGeometry(0.4, 2, 0.4);
      const barMat = new THREE.MeshStandardMaterial({
        color: 0xFDA4AF,
        emissive: 0xE11D48,
        emissiveIntensity: 0.3,
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set(j * 0.8, 1, 3.8);
      lab.add(bar);

      this.animatedMeshes.push({
        mesh: bar,
        type: 'wave',
        speed: 3.5 + Math.abs(j),
        initialY: 1,
      });
    }

    this.group.add(lab);
  }

  // 4. World 5: Creative Studio Pavilion (x: -20, z: -20)
  private buildCreativeStudioPavilion() {
    const studio = new THREE.Group();
    studio.position.set(-20, 0, -20);

    // White marble gallery floor
    const floor = new THREE.Mesh(new THREE.BoxGeometry(11, 0.6, 11), this.materials.stone);
    floor.position.y = -0.3;
    studio.add(floor);

    // 4 Crimson Columns
    const colGeo = new THREE.BoxGeometry(0.8, 5, 0.8);
    const colMat = new THREE.MeshStandardMaterial({ color: 0xE11D48, roughness: 0.3, metalness: 0.2 });
    [
      [-4.5, -4.5],
      [4.5, -4.5],
      [-4.5, 4.5],
      [4.5, 4.5],
    ].forEach(([cx, cz]) => {
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(cx, 2.5, cz);
      col.castShadow = true;
      studio.add(col);
    });

    // Gallery Display Panels (framed canvases)
    const canvasGeo = new THREE.BoxGeometry(2.5, 3.5, 0.2);
    const canvasMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.1 });
    const canvas1 = new THREE.Mesh(canvasGeo, canvasMat);
    canvas1.position.set(0, 2.5, -4.6);
    studio.add(canvas1);

    // Floating Design Monolith
    const artGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const artMat = new THREE.MeshStandardMaterial({
      color: 0xF43F5E,
      emissive: 0xBE123C,
      emissiveIntensity: 0.4,
      metalness: 0.7,
      roughness: 0.2,
    });
    const art = new THREE.Mesh(artGeo, artMat);
    art.position.set(0, 2.2, 0);
    art.rotation.set(0.4, 0.6, 0.2);
    studio.add(art);

    this.animatedMeshes.push({
      mesh: art,
      type: 'rotate',
      speed: 0.6,
      axis: 'y',
    });

    this.group.add(studio);
  }

  // 5. World 6: Content Studio Towers (x: -32, z: -34)
  private buildContentStudioTowers() {
    const group = new THREE.Group();
    group.position.set(-32, 0, -34);

    // Step pipeline stairs (7 editorial stages)
    for (let i = 0; i < 7; i++) {
      const stepGeo = new THREE.BoxGeometry(2.2, 0.5 * (i + 1), 1.6);
      const stepMat = i % 2 === 0 ? this.materials.stone : this.materials.darkSlate;
      const step = new THREE.Mesh(stepGeo, stepMat);
      step.position.set((i - 3) * 1.5, (0.5 * (i + 1)) / 2, 0);
      step.castShadow = true;
      group.add(step);

      // Glowing manuscript tablet on each tier
      const tabGeo = new THREE.BoxGeometry(0.8, 0.1, 0.6);
      const tabMat = new THREE.MeshStandardMaterial({
        color: 0xE11D48,
        emissive: 0xE11D48,
        emissiveIntensity: 0.5,
      });
      const tab = new THREE.Mesh(tabGeo, tabMat);
      tab.position.set((i - 3) * 1.5, 0.5 * (i + 1) + 0.1, 0);
      group.add(tab);
    }

    this.group.add(group);
  }

  // 6. World 7: Growth Funnel City Machine (x: -20, z: -52)
  private buildGrowthFunnelMachine() {
    const funnel = new THREE.Group();
    funnel.position.set(-20, 0, -52);

    // 5 Descending Funnel Tiers (Inverted Pyramid)
    const tiers = [5.5, 4.2, 3.2, 2.2, 1.2];
    tiers.forEach((size, idx) => {
      const tierGeo = new THREE.BoxGeometry(size, 0.8, size);
      const tierMat = idx === 4 ? this.materials.redGlow : this.materials.darkSlate;
      const tierMesh = new THREE.Mesh(tierGeo, tierMat);
      tierMesh.position.y = (4 - idx) * 1.2 + 0.4;
      tierMesh.castShadow = true;
      funnel.add(tierMesh);

      this.animatedMeshes.push({
        mesh: tierMesh,
        type: 'rotate',
        speed: (idx % 2 === 0 ? 0.3 : -0.3) * (idx + 1),
        axis: 'y',
      });
    });

    // Cascading Energy Core in Center
    const dropGeo = new THREE.SphereGeometry(0.4, 12, 12);
    const dropMat = new THREE.MeshStandardMaterial({
      color: 0xE11D48,
      emissive: 0xE11D48,
      emissiveIntensity: 1.0,
    });
    const drop = new THREE.Mesh(dropGeo, dropMat);
    drop.position.y = 3.0;
    funnel.add(drop);

    this.animatedMeshes.push({
      mesh: drop,
      type: 'bob',
      speed: 3.2,
      initialY: 3.0,
    });

    this.group.add(funnel);
  }

  // 7. World 8: Data & Strategy Towers (x: 0, z: -66)
  private buildDataAndStrategyTowers() {
    const dataHub = new THREE.Group();
    dataHub.position.set(0, 0, -66);

    // 5 Dynamic KPI Bar Chart Towers
    const barHeights = [2.4, 4.8, 3.6, 6.2, 5.0];
    barHeights.forEach((h, idx) => {
      const barGeo = new THREE.BoxGeometry(1.2, h, 1.2);
      const barMat = new THREE.MeshStandardMaterial({
        color: idx === 3 ? 0xE11D48 : 0x27272A,
        roughness: 0.2,
        metalness: 0.8,
        emissive: idx === 3 ? 0xE11D48 : 0x000000,
        emissiveIntensity: idx === 3 ? 0.4 : 0,
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set((idx - 2) * 2.2, h / 2, 0);
      bar.castShadow = true;
      dataHub.add(bar);

      // Floating KPI sphere indicator
      const kpiGeo = new THREE.SphereGeometry(0.3, 8, 8);
      const kpiMat = new THREE.MeshStandardMaterial({ color: 0xF43F5E, emissive: 0xF43F5E, emissiveIntensity: 0.8 });
      const kpi = new THREE.Mesh(kpiGeo, kpiMat);
      kpi.position.set((idx - 2) * 2.2, h + 0.6, 0);
      dataHub.add(kpi);

      this.animatedMeshes.push({
        mesh: kpi,
        type: 'pulse',
        speed: 2.0 + idx * 0.4,
      });
    });

    // Radar scanner ring
    const radarGeo = new THREE.RingGeometry(2.5, 2.7, 32);
    const radarMat = new THREE.MeshBasicMaterial({ color: 0xEA580C, side: THREE.DoubleSide });
    const radar = new THREE.Mesh(radarGeo, radarMat);
    radar.rotation.x = -Math.PI / 2;
    radar.position.set(0, 0.1, 4);
    dataHub.add(radar);

    this.group.add(dataHub);
  }

  // 8. World 9: Projects (JobFlow AI & Kruzoe) (x: -10, z: -78)
  private buildProjectExhibitionPlatforms() {
    const projHub = new THREE.Group();
    projHub.position.set(-10, 0, -78);

    // JobFlow AI Platform (Left)
    const jfBase = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 5), this.materials.darkSlate);
    jfBase.position.set(-4, 0.5, 0);
    projHub.add(jfBase);

    // Floating neural search beacon
    const jfBeacon = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 0), this.materials.redGlow);
    jfBeacon.position.set(-4, 3.2, 0);
    projHub.add(jfBeacon);

    this.animatedMeshes.push({
      mesh: jfBeacon,
      type: 'rotate',
      speed: 1.0,
      axis: 'y',
    });

    // Kruzoe Platform (Right)
    const kzBase = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 5), this.materials.stone);
    kzBase.position.set(4, 0.5, 0);
    projHub.add(kzBase);

    // Minimalist Fashion Monolith
    const kzMonolith = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 3.4, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x18181B, roughness: 0.1, metalness: 0.9 })
    );
    kzMonolith.position.set(4, 2.7, 0);
    projHub.add(kzMonolith);

    this.animatedMeshes.push({
      mesh: kzMonolith,
      type: 'rotate',
      speed: 0.5,
      axis: 'y',
    });

    this.group.add(projHub);
  }

  // 9. World 10: Founder Pavilion (x: 12, z: -78)
  private buildFounderPavilion() {
    const founder = new THREE.Group();
    founder.position.set(12, 0, -78);

    // Ivory platform with steps
    const plat = new THREE.Mesh(new THREE.BoxGeometry(8, 0.8, 8), this.materials.stone);
    plat.position.y = -0.4;
    founder.add(plat);

    // Floating Acrylic / Glass Portrait Monument Placeholder
    const frameGeo = new THREE.BoxGeometry(2.4, 3.2, 0.2);
    const frameMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.8,
      opacity: 0.95,
      transparent: true,
      roughness: 0.1,
      ior: 1.45,
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(0, 2.5, 0);
    founder.add(frame);

    // Crimson volumetric rim surrounding the portrait
    const rimGeo = new THREE.BoxGeometry(2.6, 3.4, 0.08);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xE11D48,
      emissive: 0xE11D48,
      emissiveIntensity: 0.5,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.set(0, 2.5, -0.05);
    founder.add(rim);

    this.animatedMeshes.push({
      mesh: frame,
      type: 'bob',
      speed: 1.5,
      initialY: 2.5,
    });

    this.group.add(founder);
  }

  // 10. World 11: Narrative Closure - Completed Monument (x: 0, z: -95)
  private buildCompletedMonument() {
    const closure = new THREE.Group();
    closure.position.set(0, 0, -95);

    // Grand amphitheater base
    const base = new THREE.Mesh(new THREE.BoxGeometry(16, 1.2, 16), this.materials.darkSlate);
    base.position.y = -0.6;
    closure.add(base);

    // 4 High-Tech Towers
    const towerGeo = new THREE.BoxGeometry(2.0, 9.0, 2.0);
    const towerMat = this.materials.stone;
    [
      [-5, -5],
      [5, -5],
      [-5, 5],
      [5, 5],
    ].forEach(([tx, tz]) => {
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.position.set(tx, 4.5, tz);
      tower.castShadow = true;
      closure.add(tower);

      // Tower Top Ruby Beacon
      const ruby = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), this.materials.redGlow);
      ruby.position.set(tx, 9.6, tz);
      closure.add(ruby);
    });

    // Central Floating Master Command Monolith
    const masterGeo = new THREE.BoxGeometry(3.0, 5.5, 3.0);
    const masterMat = new THREE.MeshStandardMaterial({
      color: 0x18181B,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0xE11D48,
      emissiveIntensity: 0.25,
    });
    const master = new THREE.Mesh(masterGeo, masterMat);
    master.position.set(0, 4.8, 0);
    closure.add(master);

    this.animatedMeshes.push({
      mesh: master,
      type: 'rotate',
      speed: 0.4,
      axis: 'y',
    });

    // Radiating energy ring
    const ringGeo = new THREE.TorusGeometry(4.5, 0.25, 8, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xE11D48,
      emissive: 0xE11D48,
      emissiveIntensity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 5.0;
    closure.add(ring);

    this.animatedMeshes.push({
      mesh: ring,
      type: 'rotate',
      speed: 0.7,
      axis: 'y',
    });

    this.group.add(closure);
  }

  public update(delta: number) {
    this.time += delta;

    this.animatedMeshes.forEach((item) => {
      if (item.type === 'rotate' && item.axis) {
        item.mesh.rotation[item.axis] += delta * item.speed;
      } else if (item.type === 'bob' && item.initialY !== undefined) {
        item.mesh.position.y = item.initialY + Math.sin(this.time * item.speed) * 0.22;
      } else if (item.type === 'pulse') {
        const scale = 1 + Math.sin(this.time * item.speed) * 0.08;
        item.mesh.scale.set(scale, scale, scale);
      } else if (item.type === 'wave' && item.initialY !== undefined) {
        const waveScale = 1 + Math.sin(this.time * item.speed) * 0.45;
        item.mesh.scale.y = Math.max(0.2, waveScale);
      }
    });
  }
}
