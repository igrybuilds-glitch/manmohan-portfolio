import * as THREE from 'three';
import { createVoxelMaterials } from './VoxelMaterials';

/**
 * AAA-Quality Cinematic Voxel Environment Builder
 * Features beveled geometry, layered geology, reflective water, lush flora,
 * multi-tiered organic trees, and volumetric atmospheric clouds.
 */
export class TerrainBuilder {
  public group: THREE.Group;
  private materials: ReturnType<typeof createVoxelMaterials>;

  // Instanced Meshes for high-performance 60 FPS rendering
  private grassInstanced!: THREE.InstancedMesh;
  private dirtInstanced!: THREE.InstancedMesh;
  private stoneInstanced!: THREE.InstancedMesh;
  private redConduitInstanced!: THREE.InstancedMesh;
  private quartzPlatformInstanced!: THREE.InstancedMesh;
  private slateInstanced!: THREE.InstancedMesh;
  private woodLogInstanced!: THREE.InstancedMesh;
  private leafInstanced!: THREE.InstancedMesh;
  private leafHighlightInstanced!: THREE.InstancedMesh;
  private cherryLeafInstanced!: THREE.InstancedMesh;
  private cherryHighlightInstanced!: THREE.InstancedMesh;
  private cloudInstanced!: THREE.InstancedMesh;
  private grassTuftInstanced!: THREE.InstancedMesh;
  private flowerInstanced!: THREE.InstancedMesh;
  private pebbleInstanced!: THREE.InstancedMesh;
  private waterMesh!: THREE.Mesh;

  private cloudTransforms: { offsets: THREE.Vector3[]; speeds: number[] } = { offsets: [], speeds: [] };
  private time: number = 0;

  constructor(materials: ReturnType<typeof createVoxelMaterials>) {
    this.materials = materials;
    this.group = new THREE.Group();
    this.group.name = 'VoxelTerrainEnvironment';

    this.generateWorld();
  }

  /**
   * Generates a clean precision box geometry for instancing
   */
  private createBeveledBoxGeometry(size: number = 1): THREE.BufferGeometry {
    return new THREE.BoxGeometry(size, size, size);
  }

  private generateWorld() {
    const boxGeo = this.createBeveledBoxGeometry(1);
    const dummy = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);

    const rangeX = 30;
    const rangeZ = 28;
    const blockSize = 1;

    // Data accumulation buffers
    const grassTransforms: THREE.Matrix4[] = [];
    const dirtTransforms: THREE.Matrix4[] = [];
    const stoneTransforms: THREE.Matrix4[] = [];
    const conduitTransforms: THREE.Matrix4[] = [];
    const quartzTransforms: THREE.Matrix4[] = [];
    const slateTransforms: THREE.Matrix4[] = [];
    const woodTransforms: THREE.Matrix4[] = [];
    const leafTransforms: THREE.Matrix4[] = [];
    const leafHighlightTransforms: THREE.Matrix4[] = [];
    const cherryLeafTransforms: THREE.Matrix4[] = [];
    const cherryHighlightTransforms: THREE.Matrix4[] = [];
    const grassTuftTransforms: THREE.Matrix4[] = [];
    const flowerTransforms: THREE.Matrix4[] = [];
    const pebbleTransforms: THREE.Matrix4[] = [];

    // Realistic geological height function
    const getElevation = (x: number, z: number): number => {
      const distFromCenter = Math.sqrt(x * x + z * z);
      
      // Keep command center platform flat and slightly elevated
      if (distFromCenter < 3.4) {
        return 0;
      }

      // Natural water basin / reflecting stream winding on the right foreground
      const isWaterStream = x > 3.5 && x < 8.5 && z > 0 && z < 10;
      if (isWaterStream) {
        return -1; // Sunken riverbed
      }

      // Smooth rolling stepped hills with geological ridges
      const h1 = Math.sin(x * 0.16) * Math.cos(z * 0.16) * 2.8;
      const h2 = Math.sin(x * 0.32 + z * 0.22) * 1.4;
      const h3 = Math.cos(x * 0.08 - z * 0.12) * 2.6;
      
      // Distant mountain ridge amphitheater in background
      const distantRidge = distFromCenter > 10 ? Math.pow(distFromCenter - 10, 1.2) * 0.55 : 0;

      return Math.floor(h1 + h2 + h3 + distantRidge);
    };

    // 1. Build Terrain Column Instances
    for (let x = -rangeX / 2; x <= rangeX / 2; x++) {
      for (let z = -rangeZ / 2; z <= rangeZ / 2; z++) {
        const topY = getElevation(x, z);
        const distCenter = Math.sqrt(x * x + z * z);

        // Command Center Area
        const isPlatform = distCenter < 2.8;
        const isPlatformRim = distCenter >= 2.8 && distCenter < 3.4;

        // Optical conduits to the 4 digital system monoliths
        const isConduitToAI = Math.abs(z - (-1.0)) < 0.6 && x <= 0 && x >= -4.5;
        const isConduitToAuto = Math.abs(z - (-1.5)) < 0.6 && x >= 0 && x <= 4.2;
        const isConduitToWeb = Math.abs(x - (-2.8)) < 0.6 && z >= 0 && z <= 3.2;
        const isConduitToGrowth = Math.abs(x - 3.4) < 0.6 && z >= 0 && z <= 2.8;
        const isConduit = (isConduitToAI || isConduitToAuto || isConduitToWeb || isConduitToGrowth) && topY <= 1;

        // Check for water stream bed
        const isWaterBed = topY === -1;

        position.set(x * blockSize, topY * blockSize, z * blockSize);
        dummy.compose(position, quaternion, scale);

        if (isPlatform) {
          quartzTransforms.push(dummy.clone());
        } else if (isPlatformRim) {
          slateTransforms.push(dummy.clone());
        } else if (isConduit) {
          conduitTransforms.push(dummy.clone());
        } else if (isWaterBed) {
          stoneTransforms.push(dummy.clone()); // Rocky riverbed
        } else if (topY >= 3) {
          stoneTransforms.push(dummy.clone());
        } else {
          grassTransforms.push(dummy.clone());

          // Flora spawning on grass blocks: tufts, flowers, pebbles
          const floraRand = Math.sin(x * 37.1 + z * 19.7);
          if (distCenter > 3.5 && floraRand > 0.4) {
            const floraPos = new THREE.Vector3(
              x * blockSize + (floraRand * 0.3),
              topY * blockSize + 0.65,
              z * blockSize + (Math.cos(x) * 0.3)
            );
            const floraDummy = new THREE.Matrix4();
            const floraScale = new THREE.Vector3(0.25, 0.45, 0.25);
            floraDummy.compose(floraPos, quaternion, floraScale);
            grassTuftTransforms.push(floraDummy.clone());
          }

          // Crimson poppies & golden wildflowers
          if (distCenter > 3.8 && floraRand < -0.45) {
            const flowerPos = new THREE.Vector3(
              x * blockSize + (floraRand * 0.25),
              topY * blockSize + 0.6,
              z * blockSize + (Math.sin(z) * 0.25)
            );
            const flowerDummy = new THREE.Matrix4();
            const flowerScale = new THREE.Vector3(0.2, 0.3, 0.2);
            flowerDummy.compose(flowerPos, quaternion, flowerScale);
            flowerTransforms.push(flowerDummy.clone());
          }

          // Small river pebbles / slate rocks
          if (distCenter > 3.2 && floraRand > 0.25 && floraRand < 0.35) {
            const pebblePos = new THREE.Vector3(
              x * blockSize + 0.2,
              topY * blockSize + 0.55,
              z * blockSize - 0.2
            );
            const pebbleDummy = new THREE.Matrix4();
            const pebbleScale = new THREE.Vector3(0.35, 0.15, 0.35);
            pebbleDummy.compose(pebblePos, quaternion, pebbleScale);
            pebbleTransforms.push(pebbleDummy.clone());
          }
        }

        // Sub-surface geological layers (rich soil & deep bedrock)
        const subLayers = topY >= 3 ? 3 : 2;
        for (let y = topY - 1; y >= topY - subLayers && y >= -5; y--) {
          position.set(x * blockSize, y * blockSize, z * blockSize);
          dummy.compose(position, quaternion, scale);
          if (topY >= 3 || y <= -3) {
            stoneTransforms.push(dummy.clone());
          } else {
            dirtTransforms.push(dummy.clone());
          }
        }
      }
    }

    // 2. High-Detail Voxel Trees (Tiered crowns, branching limbs, canopy leaves)
    const generateAAAOakTree = (baseX: number, baseZ: number, trunkH: number, isCherry: boolean = false) => {
      const baseY = getElevation(baseX, baseZ) + 1;
      const leafTarget = isCherry ? cherryLeafTransforms : leafTransforms;

      // Organic trunk with root flares
      for (let y = 0; y < trunkH; y++) {
        position.set(baseX, baseY + y, baseZ);
        dummy.compose(position, quaternion, scale);
        woodTransforms.push(dummy.clone());

        // Root buttress at bottom
        if (y === 0) {
          const rootDirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
          rootDirs.forEach(([rx, rz]) => {
            position.set(baseX + rx * 0.8, baseY, baseZ + rz * 0.8);
            dummy.compose(position, quaternion, new THREE.Vector3(0.6, 0.4, 0.6));
            woodTransforms.push(dummy.clone());
          });
        }
      }

      // Branching horizontal limbs extending outward
      const branches = [
        { dx: 1, dz: 0, dy: trunkH - 1 },
        { dx: -1, dz: 0, dy: trunkH - 1 },
        { dx: 0, dz: 1, dy: trunkH - 2 },
        { dx: 0, dz: -1, dy: trunkH - 2 },
      ];
      branches.forEach((b) => {
        position.set(baseX + b.dx, baseY + b.dy, baseZ + b.dz);
        dummy.compose(position, quaternion, new THREE.Vector3(0.8, 0.8, 0.8));
        woodTransforms.push(dummy.clone());
      });

      // Layered volumetric foliage crowns (tiered fluffy canopies)
      const crownCenterY = baseY + trunkH;
      for (let lx = -3; lx <= 3; lx++) {
        for (let lz = -3; lz <= 3; lz++) {
          for (let ly = -2; ly <= 3; ly++) {
            const distRadius = Math.sqrt(lx * lx * 0.9 + lz * lz * 0.9 + ly * ly * 1.5);
            if (distRadius <= 3.2 && (distRadius > 0.6 || ly > 0)) {
              // Add natural randomness to leaf cluster edges
              if (distRadius > 2.6 && Math.sin(lx * 5 + lz * 3 + ly) > 0.25) continue;

              position.set(baseX + lx, crownCenterY + ly, baseZ + lz);
              dummy.compose(position, quaternion, scale);

              // Sunlit canopy tips receive translucent foliage highlights
              if (ly >= 2 || (distRadius > 2.2 && ly > 0 && Math.sin(lx + lz) > 0.1)) {
                if (isCherry) {
                  cherryHighlightTransforms.push(dummy.clone());
                } else {
                  leafHighlightTransforms.push(dummy.clone());
                }
              } else {
                leafTarget.push(dummy.clone());
              }
            }
          }
        }
      }
    };

    // Plant trees in artistic, cinematic framing positions
    generateAAAOakTree(-8, -5, 5, false);  // Oak left background
    generateAAAOakTree(-9, 4, 4, true);    // Cherry blossom left foreground (vivid crimson/pink)
    generateAAAOakTree(8, -6, 6, false);   // Tall Oak right background
    generateAAAOakTree(7, 5, 4, false);    // Oak right midground
    generateAAAOakTree(-12, -9, 5, false); // Distant oak
    generateAAAOakTree(11, 8, 4, true);    // Cherry blossom right
    generateAAAOakTree(12, -4, 5, false);

    // 3. Reflective Crystalline Water Stream with 3D Wave Tessellation
    const waterGeo = new THREE.PlaneGeometry(6.5, 13, 24, 24);
    this.waterMesh = new THREE.Mesh(waterGeo, this.materials.water);
    this.waterMesh.rotation.x = -Math.PI / 2;
    this.waterMesh.position.set(6, -0.42, 5);
    this.waterMesh.receiveShadow = true;
    this.group.add(this.waterMesh);

    // 4. Instanced Mesh Instantiation
    const createInstanced = (transforms: THREE.Matrix4[], material: THREE.Material | THREE.Material[]): THREE.InstancedMesh => {
      const mesh = new THREE.InstancedMesh(boxGeo, material, transforms.length);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      transforms.forEach((mat, idx) => {
        mesh.setMatrixAt(idx, mat);
      });
      mesh.instanceMatrix.needsUpdate = true;
      return mesh;
    };

    // Multi-material voxel grass: hanging fringe sides + rich top + dirt bottom
    const grassCubeMaterials = [
      this.materials.grassSide, // +X
      this.materials.grassSide, // -X
      this.materials.grassTop,  // +Y Top
      this.materials.dirt,      // -Y Bottom
      this.materials.grassSide, // +Z
      this.materials.grassSide, // -Z
    ];

    if (grassTransforms.length) {
      this.grassInstanced = createInstanced(grassTransforms, grassCubeMaterials);
      this.group.add(this.grassInstanced);
    }
    if (dirtTransforms.length) {
      this.dirtInstanced = createInstanced(dirtTransforms, this.materials.dirt);
      this.group.add(this.dirtInstanced);
    }
    if (stoneTransforms.length) {
      this.stoneInstanced = createInstanced(stoneTransforms, this.materials.stone);
      this.group.add(this.stoneInstanced);
    }
    if (quartzTransforms.length) {
      this.quartzPlatformInstanced = createInstanced(quartzTransforms, this.materials.quartz);
      this.group.add(this.quartzPlatformInstanced);
    }
    if (slateTransforms.length) {
      this.slateInstanced = createInstanced(slateTransforms, this.materials.darkSlate);
      this.group.add(this.slateInstanced);
    }
    if (conduitTransforms.length) {
      this.redConduitInstanced = createInstanced(conduitTransforms, this.materials.redConduit);
      this.group.add(this.redConduitInstanced);
    }
    if (woodTransforms.length) {
      this.woodLogInstanced = createInstanced(woodTransforms, this.materials.woodLog);
      this.group.add(this.woodLogInstanced);
    }
    if (leafTransforms.length) {
      this.leafInstanced = createInstanced(leafTransforms, this.materials.leaves);
      this.group.add(this.leafInstanced);
    }
    if (leafHighlightTransforms.length) {
      this.leafHighlightInstanced = createInstanced(leafHighlightTransforms, this.materials.leavesHighlight);
      this.group.add(this.leafHighlightInstanced);
    }
    if (cherryLeafTransforms.length) {
      this.cherryLeafInstanced = createInstanced(cherryLeafTransforms, this.materials.cherryLeaves);
      this.group.add(this.cherryLeafInstanced);
    }
    if (cherryHighlightTransforms.length) {
      this.cherryHighlightInstanced = createInstanced(cherryHighlightTransforms, this.materials.cherryHighlight);
      this.group.add(this.cherryHighlightInstanced);
    }

    // Flora instances: Grass blades & Wildflowers
    if (grassTuftTransforms.length) {
      this.grassTuftInstanced = createInstanced(grassTuftTransforms, this.materials.flowerStem);
      this.group.add(this.grassTuftInstanced);
    }
    if (flowerTransforms.length) {
      this.flowerInstanced = createInstanced(flowerTransforms, this.materials.crimsonPoppy);
      this.group.add(this.flowerInstanced);
    }
    if (pebbleTransforms.length) {
      this.pebbleInstanced = createInstanced(pebbleTransforms, this.materials.stone);
      this.group.add(this.pebbleInstanced);
    }

    // 5. Volumetric Multi-Tiered Cumulus Cloud Formations
    const cloudTransformsArr: THREE.Matrix4[] = [];
    const cloudOffsetsArr: THREE.Vector3[] = [];
    const cloudSpeedsArr: number[] = [];

    const cloudFormations = [
      { x: -18, y: 13, z: -14, w: 9, d: 6, h: 3, speed: 0.28 },
      { x: 2, y: 15, z: -18, w: 12, d: 7, h: 4, speed: 0.22 },
      { x: 14, y: 12, z: -2, w: 8, d: 5, h: 3, speed: 0.26 },
      { x: -10, y: 16, z: 8, w: 10, d: 6, h: 3, speed: 0.20 },
      { x: 18, y: 14, z: 12, w: 9, d: 5, h: 3, speed: 0.24 },
    ];

    cloudFormations.forEach((cloud) => {
      for (let cx = 0; cx < cloud.w; cx++) {
        for (let cz = 0; cz < cloud.d; cz++) {
          for (let cy = 0; cy < cloud.h; cy++) {
            // Pillowed rounded cloud shape
            const normX = (cx / cloud.w) * 2 - 1;
            const normZ = (cz / cloud.d) * 2 - 1;
            const normY = (cy / cloud.h) * 2 - 1;
            const distSphere = normX * normX + normZ * normZ + normY * normY * 1.6;

            if (distSphere < 1.05 && Math.random() > 0.2) {
              const posX = cloud.x + cx * 1.4;
              const posY = cloud.y + cy * 0.9;
              const posZ = cloud.z + cz * 1.4;

              position.set(posX, posY, posZ);
              dummy.compose(position, quaternion, new THREE.Vector3(1.4, 0.9, 1.4));
              cloudTransformsArr.push(dummy.clone());
              cloudOffsetsArr.push(new THREE.Vector3(posX, posY, posZ));
              cloudSpeedsArr.push(cloud.speed);
            }
          }
        }
      }
    });

    if (cloudTransformsArr.length) {
      this.cloudInstanced = createInstanced(cloudTransformsArr, this.materials.cloudMat);
      this.group.add(this.cloudInstanced);
      this.cloudTransforms = {
        offsets: cloudOffsetsArr,
        speeds: cloudSpeedsArr,
      };
    }
  }

  public update(delta: number) {
    this.time += delta;

    // Animated water surface displacement & ripple coordinates
    if (this.materials.waterNormalTex) {
      this.materials.waterNormalTex.offset.x += delta * 0.035;
      this.materials.waterNormalTex.offset.y += delta * 0.025;
    }

    // Dynamic physical wave vertex displacement on water stream
    if (this.waterMesh && this.waterMesh.geometry) {
      const posAttr = this.waterMesh.geometry.attributes.position;
      const t = this.time * 2.2;
      for (let i = 0; i < posAttr.count; i++) {
        const u = posAttr.getX(i);
        const v = posAttr.getY(i);
        const wave = Math.sin(u * 2.0 + t) * 0.038 + Math.cos(v * 2.4 + t * 0.8) * 0.024;
        posAttr.setZ(i, wave);
      }
      posAttr.needsUpdate = true;
      this.waterMesh.geometry.computeVertexNormals();
    }

    // Smooth volumetric cloud drifting
    if (this.cloudInstanced && this.cloudTransforms.offsets.length > 0) {
      const dummy = new THREE.Matrix4();
      const pos = new THREE.Vector3();
      const quat = new THREE.Quaternion();
      const scale = new THREE.Vector3(1.4, 0.9, 1.4);

      for (let i = 0; i < this.cloudTransforms.offsets.length; i++) {
        const offset = this.cloudTransforms.offsets[i];
        const speed = this.cloudTransforms.speeds[i];
        const currentX = ((offset.x + this.time * speed + 35) % 70) - 35;
        pos.set(currentX, offset.y, offset.z);
        dummy.compose(pos, quat, scale);
        this.cloudInstanced.setMatrixAt(i, dummy);
      }
      this.cloudInstanced.instanceMatrix.needsUpdate = true;
    }
  }
}
