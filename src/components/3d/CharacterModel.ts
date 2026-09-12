import * as THREE from 'three';
import { createVoxelMaterials } from './VoxelMaterials';

/**
 * AAA-Quality Cinematic Character Model (Manmohan)
 * Professional voxel styling with tailored suit details, expressive features,
 * holographic wrist HUD, and an 8-stage cinematic building animation with
 * anticipation, kinetic impact, settling, and energy discharge.
 */
export class CharacterModel {
  public group: THREE.Group;
  public headGroup: THREE.Group;
  public bodyGroup: THREE.Group;
  public leftArmGroup: THREE.Group;
  public rightArmGroup: THREE.Group;
  public leftLegGroup: THREE.Group;
  public rightLegGroup: THREE.Group;
  
  // Cinematic Construction Props
  public placedBlock: THREE.Mesh;
  public blockWireframeCage: THREE.Mesh;
  public blockShockwaveRing: THREE.Mesh;
  public buildParticles: THREE.Points;
  public wristHoloLattice: THREE.Group;

  private materials: ReturnType<typeof createVoxelMaterials>;
  private time: number = 0;
  private particlePositions: Float32Array;
  private particleCount = 48;

  // Cinematic build cycle states
  public onBlockPlacedImpact?: () => void;
  private lastImpactTime: number = 0;

  constructor(materials: ReturnType<typeof createVoxelMaterials>) {
    this.materials = materials;
    this.group = new THREE.Group();
    this.group.name = 'ManmohanCharacter_AAA';

    this.headGroup = new THREE.Group();
    this.bodyGroup = new THREE.Group();
    this.leftArmGroup = new THREE.Group();
    this.rightArmGroup = new THREE.Group();
    this.leftLegGroup = new THREE.Group();
    this.rightLegGroup = new THREE.Group();

    this.buildLegs();
    this.buildTorso();
    this.buildHead();
    this.buildArms();
    this.buildConstructionProps();
  }

  /**
   * Tailored charcoal trousers & clean slate sneakers
   */
  private buildLegs() {
    const legGeo = new THREE.BoxGeometry(0.30, 0.95, 0.30);

    // Left Leg
    const leftLeg = new THREE.Mesh(legGeo, this.materials.denimJeans);
    leftLeg.position.y = -0.475;
    leftLeg.castShadow = true;
    this.leftLegGroup.position.set(-0.19, 0.95, 0);
    this.leftLegGroup.add(leftLeg);

    // Left Shoe - Sleek architect sneakers
    const shoeSole = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.40), this.materials.darkSlate);
    shoeSole.position.set(0, -0.96, 0.04);
    shoeSole.castShadow = true;
    this.leftLegGroup.add(shoeSole);

    const shoeHeel = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.16), this.materials.stone);
    shoeHeel.position.set(0, -1.02, -0.06);
    this.leftLegGroup.add(shoeHeel);

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeo, this.materials.denimJeans);
    rightLeg.position.y = -0.475;
    rightLeg.castShadow = true;
    this.rightLegGroup.position.set(0.19, 0.95, 0);
    this.rightLegGroup.add(rightLeg);

    // Right Shoe
    const rightShoeSole = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.40), this.materials.darkSlate);
    rightShoeSole.position.set(0, -0.96, 0.04);
    rightShoeSole.castShadow = true;
    this.rightLegGroup.add(rightShoeSole);

    const rightShoeHeel = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.16), this.materials.stone);
    rightShoeHeel.position.set(0, -1.02, -0.06);
    this.rightLegGroup.add(rightShoeHeel);

    this.group.add(this.leftLegGroup);
    this.group.add(this.rightLegGroup);
  }

  /**
   * Signature Cerulean/Teal Crewneck Builder Shirt (Matching Manmohan's Real Photo)
   */
  private buildTorso() {
    this.bodyGroup.position.set(0, 0.95, 0);

    // Main torso in signature teal-blue fabric
    const torsoGeo = new THREE.BoxGeometry(0.74, 1.08, 0.44);
    const torso = new THREE.Mesh(torsoGeo, this.materials.tealShirt);
    torso.position.y = 0.54;
    torso.castShadow = true;
    this.bodyGroup.add(torso);

    // Crewneck Collar Trim
    const collarGeo = new THREE.BoxGeometry(0.34, 0.06, 0.26);
    const collar = new THREE.Mesh(collarGeo, this.materials.denimJeans);
    collar.position.set(0, 1.06, 0.10);
    this.bodyGroup.add(collar);

    // Subtle architect insignia on chest
    const chestPatch = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.08, 0.02), this.materials.redAccent);
    chestPatch.position.set(-0.20, 0.76, 0.225);
    this.bodyGroup.add(chestPatch);

    this.group.add(this.bodyGroup);
  }

  /**
   * Expressive face, wavy/curly textured dark hair, neat mustache, and chin goatee
   * faithful to Manmohan's real photo
   */
  private buildHead() {
    this.headGroup.position.set(0, 2.03, 0);

    // Head base (warm olive/golden skin)
    const headGeo = new THREE.BoxGeometry(0.64, 0.64, 0.64);
    const head = new THREE.Mesh(headGeo, this.materials.skin);
    head.position.y = 0.32;
    head.castShadow = true;
    this.headGroup.add(head);

    // --- Textured Voluminous Curly Hair ---
    // 1. Crown & Top Volume
    const hairCrown = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.22, 0.72), this.materials.hair);
    hairCrown.position.set(0, 0.58, -0.01);
    this.headGroup.add(hairCrown);

    // 2. Curly Canopy Waves (staggered voxels for natural curl volume)
    const curlWave1 = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.14, 0.36), this.materials.hair);
    curlWave1.position.set(-0.06, 0.68, 0.08);
    const curlWave2 = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.16, 0.34), this.materials.hair);
    curlWave2.position.set(0.08, 0.67, -0.06);
    this.headGroup.add(curlWave1, curlWave2);

    // 3. Characteristic Curly Fringe falling over forehead
    const fringeCenter = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.16, 0.14), this.materials.hair);
    fringeCenter.position.set(-0.02, 0.54, 0.34);

    const fringeLeftCurl = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.14, 0.12), this.materials.hair);
    fringeLeftCurl.position.set(-0.18, 0.46, 0.35);

    const fringeRightCurl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.12), this.materials.hair);
    fringeRightCurl.position.set(0.16, 0.48, 0.35);

    this.headGroup.add(fringeCenter, fringeLeftCurl, fringeRightCurl);

    // 4. Back & Side Hair Tapers
    const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.52, 0.18), this.materials.hair);
    hairBack.position.set(0, 0.34, -0.28);

    const hairLeft = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.44, 0.56), this.materials.hair);
    hairLeft.position.set(-0.33, 0.38, -0.04);

    const hairRight = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.44, 0.56), this.materials.hair);
    hairRight.position.set(0.33, 0.38, -0.04);

    this.headGroup.add(hairBack, hairLeft, hairRight);

    // --- Eyes & Eyebrows ---
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const eyeIrisMat = new THREE.MeshBasicMaterial({ color: 0x2A1D15 }); // Warm dark brown
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const eyeGlintMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    // Eyebrows (Strong, defined natural arches)
    const browLeft = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.045, 0.02), this.materials.facialHair);
    browLeft.position.set(-0.16, 0.385, 0.325);
    browLeft.rotation.z = -0.05;

    const browRight = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.045, 0.02), this.materials.facialHair);
    browRight.position.set(0.16, 0.385, 0.325);
    browRight.rotation.z = 0.05;

    this.headGroup.add(browLeft, browRight);

    // Left Eye
    const lWhite = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.02), eyeWhiteMat);
    lWhite.position.set(-0.16, 0.31, 0.325);
    const lIris = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.025), eyeIrisMat);
    lIris.position.set(-0.15, 0.31, 0.328);
    const lPupil = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, 0.03), eyePupilMat);
    lPupil.position.set(-0.15, 0.31, 0.33);
    const lGlint = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.035), eyeGlintMat);
    lGlint.position.set(-0.135, 0.325, 0.335);
    this.headGroup.add(lWhite, lIris, lPupil, lGlint);

    // Right Eye
    const rWhite = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.02), eyeWhiteMat);
    rWhite.position.set(0.16, 0.31, 0.325);
    const rIris = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.025), eyeIrisMat);
    rIris.position.set(0.15, 0.31, 0.328);
    const rPupil = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, 0.03), eyePupilMat);
    rPupil.position.set(0.15, 0.31, 0.33);
    const rGlint = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.035), eyeGlintMat);
    rGlint.position.set(0.165, 0.325, 0.335);
    this.headGroup.add(rWhite, rIris, rPupil, rGlint);

    // --- Facial Hair (Mustache & Goatee from the photo) ---
    // Neat Trimmed Mustache above lip
    const mustacheCenter = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.055, 0.025), this.materials.facialHair);
    mustacheCenter.position.set(0, 0.17, 0.33);

    const mustacheLeftTaper = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.02), this.materials.facialHair);
    mustacheLeftTaper.position.set(-0.13, 0.15, 0.33);

    const mustacheRightTaper = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.02), this.materials.facialHair);
    mustacheRightTaper.position.set(0.13, 0.15, 0.33);

    // Chin Goatee / Stubble Patch
    const goatee = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.07, 0.025), this.materials.facialHair);
    goatee.position.set(0, 0.06, 0.33);

    // Subtle jawline stubble
    const jawStubbleL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.02), this.materials.facialHair);
    jawStubbleL.position.set(-0.20, 0.05, 0.28);
    const jawStubbleR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.02), this.materials.facialHair);
    jawStubbleR.position.set(0.20, 0.05, 0.28);

    this.headGroup.add(mustacheCenter, mustacheLeftTaper, mustacheRightTaper, goatee, jawStubbleL, jawStubbleR);

    this.group.add(this.headGroup);
  }

  /**
   * Articulated arms with sapphire blue smartphone / holographic terminal tool
   */
  private buildArms() {
    const sleeveGeo = new THREE.BoxGeometry(0.26, 0.48, 0.26);
    const forearmGeo = new THREE.BoxGeometry(0.24, 0.50, 0.24);
    const handGeo = new THREE.BoxGeometry(0.22, 0.20, 0.22);

    // Left Arm (Holding Sapphire Smartphone)
    this.leftArmGroup.position.set(-0.53, 1.95, 0);

    // Teal Short Sleeve
    const leftSleeve = new THREE.Mesh(sleeveGeo, this.materials.tealShirt);
    leftSleeve.position.y = -0.24;
    leftSleeve.castShadow = true;
    this.leftArmGroup.add(leftSleeve);

    // Exposed Forearm (Warm skin)
    const leftForearm = new THREE.Mesh(forearmGeo, this.materials.skin);
    leftForearm.position.y = -0.70;
    leftForearm.castShadow = true;
    this.leftArmGroup.add(leftForearm);

    // Hand
    const leftHand = new THREE.Mesh(handGeo, this.materials.skin);
    leftHand.position.y = -1.02;
    this.leftArmGroup.add(leftHand);

    // --- Sapphire Blue Smartphone (Matching mirror selfie) ---
    const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.32, 0.04), this.materials.phoneMetallic);
    phoneBody.position.set(0.04, -0.96, 0.16);
    phoneBody.rotation.x = 0.2;

    // Triple Camera Island on Back
    const camIsland = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.015), this.materials.phoneGlass);
    camIsland.position.set(-0.04, 0.06, -0.022);
    phoneBody.add(camIsland);

    // 3 Camera Lenses
    for (let c = 0; c < 3; c++) {
      const lens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 0.01, 8),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      );
      lens.rotation.x = Math.PI / 2;
      lens.position.set(0, 0.05 - c * 0.045, -0.01);
      camIsland.add(lens);
    }

    this.leftArmGroup.add(phoneBody);

    // Holographic Terminal Lattice emitted from device
    this.wristHoloLattice = new THREE.Group();
    this.wristHoloLattice.position.set(0.04, -0.80, 0.26);
    const holoRing = new THREE.Mesh(
      new THREE.RingGeometry(0.12, 0.18, 16),
      new THREE.MeshBasicMaterial({ color: 0x06B6D4, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
    );
    this.wristHoloLattice.add(holoRing);
    this.leftArmGroup.add(this.wristHoloLattice);

    // Right Arm (Active Builder / Redstone Conduit Arm)
    this.rightArmGroup.position.set(0.53, 1.95, 0);

    const rightSleeve = new THREE.Mesh(sleeveGeo, this.materials.tealShirt);
    rightSleeve.position.y = -0.24;
    rightSleeve.castShadow = true;
    this.rightArmGroup.add(rightSleeve);

    const rightForearm = new THREE.Mesh(forearmGeo, this.materials.skin);
    rightForearm.position.y = -0.70;
    rightForearm.castShadow = true;
    this.rightArmGroup.add(rightForearm);

    const rightHand = new THREE.Mesh(handGeo, this.materials.skin);
    rightHand.position.y = -1.02;
    this.rightArmGroup.add(rightHand);

    // Kinetic Builder Wristband
    const wristDevice = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.10, 0.27), this.materials.redConduit);
    wristDevice.position.y = -0.88;
    this.rightArmGroup.add(wristDevice);

    this.group.add(this.leftArmGroup);
    this.group.add(this.rightArmGroup);
  }

  /**
   * Props for the 8-stage cinematic building animation:
   * Solid voxel block, wireframe anticipation cage, shockwave impact ring, vortex particles
   */
  private buildConstructionProps() {
    // 1. Placed Voxel Block (Transforms into glowing solid matter)
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0xE11D48,
      emissive: 0xE11D48,
      emissiveIntensity: 1.85,
      roughness: 0.16,
      metalness: 0.5,
      toneMapped: false,
    });
    this.placedBlock = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.44), blockMat);
    this.placedBlock.position.set(0.72, 1.35, 0.72);
    this.placedBlock.castShadow = true;
    this.group.add(this.placedBlock);

    // 2. Holographic Anticipation Wireframe Cage
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    this.blockWireframeCage = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.50, 0.50), cageMat);
    this.placedBlock.add(this.blockWireframeCage);

    // 3. Ground Shockwave Impact Ring (Expands when block impacts)
    const shockRingGeo = new THREE.RingGeometry(0.1, 0.22, 32);
    const shockRingMat = new THREE.MeshBasicMaterial({
      color: 0xFF2A55,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      toneMapped: false,
    });
    this.blockShockwaveRing = new THREE.Mesh(shockRingGeo, shockRingMat);
    this.blockShockwaveRing.rotation.x = -Math.PI / 2;
    this.blockShockwaveRing.position.set(0.72, 0.04, 0.72);
    this.group.add(this.blockShockwaveRing);

    // 4. Construction Particle Stream / Digital Assembly Vortex
    const particleGeo = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(this.particleCount * 3);
    for (let i = 0; i < this.particleCount; i++) {
      this.particlePositions[i * 3] = (Math.random() - 0.5) * 0.9 + 0.72;
      this.particlePositions[i * 3 + 1] = Math.random() * 1.0 + 0.8;
      this.particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.9 + 0.72;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xE11D48,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    this.buildParticles = new THREE.Points(particleGeo, pMat);
    this.group.add(this.buildParticles);

    // Set initial professional stance
    this.leftArmGroup.rotation.x = 0.40;
    this.leftArmGroup.rotation.z = 0.22;
    this.rightArmGroup.rotation.x = -0.55;
    this.rightArmGroup.rotation.y = -0.22;
  }

  /**
   * Main update with 8-stage cinematic building animation cycle:
   * 1. Anticipation -> 2. Reach -> 3. Spawn -> 4. Kinetic Impact -> 5. Settling -> 6. Discharge
   */
  public update(delta: number, mouseX: number, mouseY: number, isBuilding: boolean = true) {
    this.time += delta;

    // Organic breathing cycle
    const breath = Math.sin(this.time * 2.0) * 0.018;
    this.bodyGroup.position.y = 0.95 + breath;
    this.headGroup.position.y = 2.03 + breath * 1.25;

    // Smooth head & chest tracking towards cursor with natural damping
    const targetHeadYaw = -mouseX * 0.42;
    const targetHeadPitch = -mouseY * 0.32;
    this.headGroup.rotation.y = THREE.MathUtils.lerp(this.headGroup.rotation.y, targetHeadYaw, 0.07);
    this.headGroup.rotation.x = THREE.MathUtils.lerp(this.headGroup.rotation.x, targetHeadPitch, 0.07);

    // Wrist holographic lattice rotation
    if (this.wristHoloLattice) {
      this.wristHoloLattice.rotation.z += delta * 2.5;
    }

    if (isBuilding) {
      // 8-stage cycle running on a 3.2-second periodic loop
      const cycleTime = (this.time % 3.2);

      if (cycleTime < 0.8) {
        // --- STAGE 1: ANTICIPATION ---
        // Character pulls arm slightly back, gathers energy
        const p = cycleTime / 0.8;
        this.rightArmGroup.rotation.x = THREE.MathUtils.lerp(-0.45, -0.75, p);
        this.rightArmGroup.rotation.z = -0.15;
        this.placedBlock.scale.setScalar(0.7 + p * 0.2);
        (this.blockWireframeCage.material as THREE.MeshBasicMaterial).opacity = 0.85;
      } else if (cycleTime < 1.4) {
        // --- STAGE 2: KINETIC STRIKE / PLACEMENT ---
        // Arm swings forward with weight and drops the block
        const p = (cycleTime - 0.8) / 0.6;
        const eased = Math.sin(p * Math.PI * 0.5);
        this.rightArmGroup.rotation.x = THREE.MathUtils.lerp(-0.75, -0.35, eased);

        // Block drops from air toward placement height
        this.placedBlock.position.y = THREE.MathUtils.lerp(1.7, 1.25, eased);
        this.placedBlock.scale.setScalar(1.0 + Math.sin(p * Math.PI) * 0.15);
      } else if (cycleTime < 1.6) {
        // --- STAGE 3: IMPACT & BOUNCE SETTLING ---
        const p = (cycleTime - 1.4) / 0.2;
        // Trigger impact callback once per cycle
        if (this.time - this.lastImpactTime > 2.5) {
          this.lastImpactTime = this.time;
          if (this.onBlockPlacedImpact) {
            this.onBlockPlacedImpact();
          }
        }
        // Micro-bounce settling
        const bounce = Math.sin(p * Math.PI) * 0.08;
        this.placedBlock.position.y = 1.25 + bounce;

        // Ground shockwave ring expands
        this.blockShockwaveRing.scale.setScalar(1 + p * 4.0);
        (this.blockShockwaveRing.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.9;
      } else {
        // --- STAGE 4: ENERGY DISCHARGE & IDLE SETTLE ---
        const p = (cycleTime - 1.6) / 1.6;
        this.rightArmGroup.rotation.x = THREE.MathUtils.lerp(-0.35, -0.45, p);
        this.placedBlock.position.y = 1.25 + Math.sin(this.time * 3.0) * 0.03;
        this.placedBlock.rotation.y += delta * 1.5;
        (this.blockWireframeCage.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(0.3, 0.7, Math.sin(this.time * 4) * 0.5 + 0.5);
      }

      // Update particle assembly stream
      const positions = this.buildParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < this.particleCount; i++) {
        positions[i * 3 + 1] += delta * 0.45;
        if (positions[i * 3 + 1] > 1.9) {
          positions[i * 3] = (Math.random() - 0.5) * 0.65 + 0.72;
          positions[i * 3 + 1] = 1.1;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.65 + 0.72;
        }
      }
      this.buildParticles.geometry.attributes.position.needsUpdate = true;
    }
  }
}
