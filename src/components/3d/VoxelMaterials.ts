import * as THREE from 'three';
import {
  generateGrassTopTexture,
  generateGrassTopNormalTexture,
  generateGrassSideTexture,
  generateGrassSideNormalTexture,
  generateDirtTexture,
  generateStoneTexture,
  generateStoneNormalTexture,
  generateQuartzTexture,
  generateQuartzNormalTexture,
  generateSlateTexture,
  generateSlateNormalTexture,
  generateWoodBarkTexture,
  generateWoodBarkNormalTexture,
  generateLeafTexture,
  generateWaterNormalTexture,
  generateFabricTexture,
  generateBevelNormalTexture,
} from './ProceduralTextures';

/**
 * AAA-Quality Cinematic Voxel Materials
 * High-fidelity PBR textures with normal micro-detail, chamfered bevel highlights,
 * realistic specular response, and physical light interactions while preserving 60+ FPS web performance.
 */
export function createVoxelMaterials() {
  // Generate procedural GPU texture maps
  const grassTopTex = generateGrassTopTexture();
  const grassTopNormalTex = generateGrassTopNormalTexture();
  const grassSideTex = generateGrassSideTexture();
  const grassSideNormalTex = generateGrassSideNormalTexture();
  const dirtTex = generateDirtTexture();
  const stoneTex = generateStoneTexture();
  const stoneNormalTex = generateStoneNormalTexture();
  const quartzTex = generateQuartzTexture();
  const quartzNormalTex = generateQuartzNormalTexture();
  const slateTex = generateSlateTexture();
  const slateNormalTex = generateSlateNormalTexture();
  const woodBarkTex = generateWoodBarkTexture();
  const woodBarkNormalTex = generateWoodBarkNormalTexture();
  const oakLeafTex = generateLeafTexture(false);
  const cherryLeafTex = generateLeafTexture(true);
  const waterNormalTex = generateWaterNormalTexture();
  const fabricTex = generateFabricTexture();
  const bevelNormalTex = generateBevelNormalTexture();

  // 1. Meadow Grass Top - Rich PBR with blade normals and warm specular highlight
  const grassTop = new THREE.MeshStandardMaterial({
    map: grassTopTex,
    normalMap: grassTopNormalTex,
    normalScale: new THREE.Vector2(0.65, 0.65),
    roughness: 0.58,
    metalness: 0.04,
    flatShading: false,
  });

  // 2. Grass Side with Voxel Blade Fringes & Soil Transition
  const grassSide = new THREE.MeshStandardMaterial({
    map: grassSideTex,
    normalMap: grassSideNormalTex,
    normalScale: new THREE.Vector2(0.75, 0.75),
    roughness: 0.68,
    metalness: 0.02,
    flatShading: false,
  });

  // 3. Rich Soil / Loam
  const dirt = new THREE.MeshStandardMaterial({
    map: dirtTex,
    normalMap: bevelNormalTex,
    normalScale: new THREE.Vector2(0.5, 0.5),
    roughness: 0.85,
    metalness: 0.0,
    flatShading: false,
  });

  // 4. Stratified Mountain Stone with Sedimentary Strata & Bevel Normals
  const stone = new THREE.MeshStandardMaterial({
    map: stoneTex,
    normalMap: stoneNormalTex,
    normalScale: new THREE.Vector2(0.85, 0.85),
    roughness: 0.52,
    metalness: 0.15,
    flatShading: false,
  });

  const sand = new THREE.MeshStandardMaterial({
    color: 0xEAD8B5,
    normalMap: bevelNormalTex,
    normalScale: new THREE.Vector2(0.3, 0.3),
    roughness: 0.82,
    metalness: 0.0,
  });

  // 5. Weathered Oak Wood Bark
  const woodLog = new THREE.MeshStandardMaterial({
    map: woodBarkTex,
    normalMap: woodBarkNormalTex,
    normalScale: new THREE.Vector2(0.8, 0.8),
    roughness: 0.72,
    metalness: 0.06,
  });

  // 6. Volumetric Oak Leaves with Translucent Sunlit Tips
  const leaves = new THREE.MeshStandardMaterial({
    map: oakLeafTex,
    normalMap: bevelNormalTex,
    normalScale: new THREE.Vector2(0.4, 0.4),
    roughness: 0.52,
    metalness: 0.08,
    side: THREE.DoubleSide,
  });

  const leavesHighlight = new THREE.MeshStandardMaterial({
    color: 0x68C872,
    map: oakLeafTex,
    roughness: 0.48,
    metalness: 0.06,
    side: THREE.DoubleSide,
  });

  // 7. Cherry Blossom Leaves (Crimson & Blush Pink)
  const cherryLeaves = new THREE.MeshStandardMaterial({
    map: cherryLeafTex,
    normalMap: bevelNormalTex,
    normalScale: new THREE.Vector2(0.4, 0.4),
    roughness: 0.50,
    metalness: 0.08,
    side: THREE.DoubleSide,
  });

  const cherryHighlight = new THREE.MeshStandardMaterial({
    color: 0xFB7185,
    roughness: 0.45,
    metalness: 0.06,
    side: THREE.DoubleSide,
  });

  // 8. Command Center Architectural Polished Quartz
  const quartz = new THREE.MeshStandardMaterial({
    map: quartzTex,
    normalMap: quartzNormalTex,
    normalScale: new THREE.Vector2(0.85, 0.85),
    roughness: 0.18,
    metalness: 0.28,
  });

  // 9. High-Tech Dark Architectural Slate
  const darkSlate = new THREE.MeshStandardMaterial({
    map: slateTex,
    normalMap: slateNormalTex,
    normalScale: new THREE.Vector2(0.85, 0.85),
    roughness: 0.28,
    metalness: 0.48,
  });

  // 10. Physical Glass with Translucent Refraction
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.94,
    opacity: 0.96,
    transparent: true,
    roughness: 0.05,
    ior: 1.52,
    thickness: 0.5,
    specularIntensity: 1.0,
  });

  // 11. Reflective Crystalline Water Basin
  const water = new THREE.MeshPhysicalMaterial({
    color: 0x38BDF8,
    transmission: 0.82,
    transparent: true,
    opacity: 0.92,
    roughness: 0.04,
    metalness: 0.08,
    ior: 1.333,
    normalMap: waterNormalTex,
    normalScale: new THREE.Vector2(0.24, 0.24),
    specularIntensity: 1.0,
  });

  // 12. Signature Crimson Emissive Conduits (IGRYbuilds Brand) - Tuned for HDR Soft Bloom
  const redGlow = new THREE.MeshStandardMaterial({
    color: 0xE11D48,
    emissive: 0xE11D48,
    emissiveIntensity: 2.4,
    roughness: 0.18,
    metalness: 0.2,
    toneMapped: false,
  });

  const redConduit = new THREE.MeshStandardMaterial({
    color: 0xE11D48,
    emissive: 0xE11D48,
    emissiveIntensity: 1.95,
    normalMap: bevelNormalTex,
    normalScale: new THREE.Vector2(0.6, 0.6),
    roughness: 0.15,
    metalness: 0.65,
    toneMapped: false,
  });

  const coralConduit = new THREE.MeshStandardMaterial({
    color: 0xF43F5E,
    emissive: 0xF43F5E,
    emissiveIntensity: 1.7,
    normalMap: bevelNormalTex,
    normalScale: new THREE.Vector2(0.5, 0.5),
    roughness: 0.2,
    metalness: 0.5,
    toneMapped: false,
  });

  const orangeHighlight = new THREE.MeshStandardMaterial({
    color: 0xEA580C,
    emissive: 0xEA580C,
    emissiveIntensity: 1.6,
    normalMap: bevelNormalTex,
    normalScale: new THREE.Vector2(0.6, 0.6),
    roughness: 0.22,
    metalness: 0.5,
    toneMapped: false,
  });

  // 13. Volumetric Cumulus Clouds with Warm Sunlight Scattering
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xFFFDF8,
    roughness: 0.92,
    metalness: 0.0,
    opacity: 0.95,
    transparent: true,
  });

  // 14. Character Materials: Tailored Suit, Subsurface Skin, Styled Hair
  const suitDark = new THREE.MeshStandardMaterial({
    map: fabricTex,
    normalMap: bevelNormalTex,
    normalScale: new THREE.Vector2(0.4, 0.4),
    roughness: 0.48,
    metalness: 0.22,
  });

  const shirtWhite = new THREE.MeshStandardMaterial({
    color: 0xFAFAFC,
    roughness: 0.42,
    metalness: 0.05,
  });

  // Manmohan's Authentic Signature Teal-Blue Crewneck Shirt (from real photo)
  const tealShirt = new THREE.MeshStandardMaterial({
    color: 0x0284C7, // rich cerulean teal
    map: fabricTex,
    normalMap: bevelNormalTex,
    normalScale: new THREE.Vector2(0.4, 0.4),
    roughness: 0.58,
    metalness: 0.08,
  });

  // Tailored Charcoal Architect Jeans / Trousers
  const denimJeans = new THREE.MeshStandardMaterial({
    color: 0x27272A,
    map: fabricTex,
    normalMap: bevelNormalTex,
    normalScale: new THREE.Vector2(0.35, 0.35),
    roughness: 0.65,
    metalness: 0.12,
  });

  // Authentic warm skin tone matching Manmohan's portrait
  const skin = new THREE.MeshStandardMaterial({
    color: 0xC8916C,
    roughness: 0.65,
    metalness: 0.02,
  });

  // Natural dark espresso curly hair material
  const hair = new THREE.MeshStandardMaterial({
    color: 0x181412,
    roughness: 0.72,
    metalness: 0.08,
  });

  // Trimmed mustache and beard stubble material
  const facialHair = new THREE.MeshStandardMaterial({
    color: 0x161210,
    roughness: 0.85,
    metalness: 0.02,
  });

  // Sapphire Blue Smartphone (mirror selfie prop)
  const phoneMetallic = new THREE.MeshStandardMaterial({
    color: 0x1E40AF,
    roughness: 0.18,
    metalness: 0.88,
  });

  const phoneGlass = new THREE.MeshStandardMaterial({
    color: 0x090D16,
    roughness: 0.08,
    metalness: 0.95,
  });

  const redAccent = new THREE.MeshStandardMaterial({
    color: 0xE11D48,
    emissive: 0xE11D48,
    emissiveIntensity: 0.55,
    roughness: 0.32,
    metalness: 0.35,
  });

  // 15. Environmental Foliage & Flower Petal Materials
  const flowerStem = new THREE.MeshStandardMaterial({
    color: 0x3E8E48,
    roughness: 0.55,
  });

  const crimsonPoppy = new THREE.MeshStandardMaterial({
    color: 0xE11D48,
    emissive: 0xE11D48,
    emissiveIntensity: 0.25,
    roughness: 0.38,
  });

  const goldWildflower = new THREE.MeshStandardMaterial({
    color: 0xF59E0B,
    emissive: 0xF59E0B,
    emissiveIntensity: 0.18,
    roughness: 0.38,
  });

  const whiteBlossom = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.32,
  });

  return {
    grassTop,
    grassSide,
    dirt,
    stone,
    sand,
    woodLog,
    leaves,
    leavesHighlight,
    cherryLeaves,
    cherryHighlight,
    quartz,
    darkSlate,
    glass,
    water,
    waterNormalTex,
    redGlow,
    redConduit,
    coralConduit,
    orangeHighlight,
    cloudMat,
    skin,
    hair,
    facialHair,
    suitDark,
    shirtWhite,
    tealShirt,
    denimJeans,
    phoneMetallic,
    phoneGlass,
    redAccent,
    flowerStem,
    crimsonPoppy,
    goldWildflower,
    whiteBlossom,
  };
}

export type VoxelMaterials = ReturnType<typeof createVoxelMaterials>;


