import * as THREE from 'three';

/**
 * AAA-Quality Procedural PBR Texture Generator
 * Generates high-fidelity diffuse, roughness, and tangent-space normal maps at runtime
 * with micro-bevel edge highlights, strata relief, and weave textures.
 * Zero external asset dependencies, fast GPU caching, crisp rendering.
 */

// Helper to create an offscreen canvas
function createCanvas(size: number = 256): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  return { canvas, ctx };
}

// Deterministic pseudo-random noise
function pseudoNoise(x: number, y: number, seed: number = 0): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * Applies a 45-degree micro-chamfer bevel to any tangent-space normal canvas.
 * This makes every single voxel cube catch realistic directional specular rim highlights!
 */
function applyBevelNormals(ctx: CanvasRenderingContext2D, size: number, bevelWidth: number = 18) {
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      // Distance to each edge
      const distL = x;
      const distR = size - 1 - x;
      const distT = y;
      const distB = size - 1 - y;

      const minDist = Math.min(distL, distR, distT, distB);

      if (minDist < bevelWidth) {
        const factor = 1 - (minDist / bevelWidth);
        let nx = 0;
        let ny = 0;

        if (distL < bevelWidth && distL <= distR) nx -= factor * 0.75;
        if (distR < bevelWidth && distR < distL) nx += factor * 0.75;
        if (distT < bevelWidth && distT <= distB) ny -= factor * 0.75;
        if (distB < bevelWidth && distB < distT) ny += factor * 0.75;

        // Base normal from canvas (normalized from 0..255 to -1..1)
        let curNx = (data[idx] - 128) / 127;
        let curNy = (data[idx + 1] - 128) / 127;
        let curNz = (data[idx + 2] - 128) / 127;

        // Blend with bevel tilt
        curNx = THREE.MathUtils.clamp(curNx + nx, -1, 1);
        curNy = THREE.MathUtils.clamp(curNy + ny, -1, 1);
        curNz = Math.sqrt(Math.max(0, 1 - curNx * curNx - curNy * curNy));

        data[idx] = Math.floor((curNx + 1) * 127.5);
        data[idx + 1] = Math.floor((curNy + 1) * 127.5);
        data[idx + 2] = Math.floor((curNz + 1) * 127.5);
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
}

/**
 * 1. Rich Meadow Grass Top Diffuse
 */
export function generateGrassTopTexture(): THREE.CanvasTexture {
  const size = 512;
  const { canvas, ctx } = createCanvas(size);

  // Rich base green gradient
  const grad = ctx.createRadialGradient(size / 2, size / 2, 50, size / 2, size / 2, size);
  grad.addColorStop(0, '#5BB862');
  grad.addColorStop(0.5, '#4E9E54');
  grad.addColorStop(1, '#3A8240');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Micro-blade tufts and moss variations
  for (let x = 0; x < size; x += 4) {
    for (let y = 0; y < size; y += 4) {
      const n = pseudoNoise(x, y, 42);
      if (n > 0.35) {
        const shade = Math.floor(65 + n * 45);
        const green = Math.floor(155 + n * 65);
        const blue = Math.floor(55 + n * 35);
        ctx.fillStyle = `rgba(${shade}, ${green}, ${blue}, ${0.4 + n * 0.4})`;
        ctx.fillRect(x, y, 3 + (n > 0.7 ? 2 : 0), 3 + (n > 0.7 ? 2 : 0));
      }
    }
  }

  // Soft organic sunlit patches
  for (let i = 0; i < 35; i++) {
    const rx = pseudoNoise(i, 1) * size;
    const ry = pseudoNoise(i, 2) * size;
    const rad = 25 + pseudoNoise(i, 3) * 45;
    const pGrad = ctx.createRadialGradient(rx, ry, 0, rx, ry, rad);
    pGrad.addColorStop(0, 'rgba(135, 215, 115, 0.28)');
    pGrad.addColorStop(1, 'rgba(135, 215, 115, 0)');
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.arc(rx, ry, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // Block border ambient occlusion
  ctx.lineWidth = 14;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.14)';
  ctx.strokeRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Grass Top Normal Map (Blade Relief + Micro-Chamfer Bevel)
 */
export function generateGrassTopNormalTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  // Micro blade bump normals
  for (let x = 0; x < size; x += 4) {
    for (let y = 0; y < size; y += 4) {
      const n = pseudoNoise(x, y, 101);
      const nx = Math.floor(128 + (n - 0.5) * 40);
      const ny = Math.floor(128 + (pseudoNoise(y, x, 102) - 0.5) * 40);
      ctx.fillStyle = `rgb(${nx}, ${ny}, 245)`;
      ctx.fillRect(x, y, 3, 3);
    }
  }

  applyBevelNormals(ctx, size, 16);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * 2. Grass Side with Voxel Overhang Fringes & Soil Transition
 */
export function generateGrassSideTexture(): THREE.CanvasTexture {
  const size = 512;
  const { canvas, ctx } = createCanvas(size);

  // Rich soil base with depth gradient
  const soilGrad = ctx.createLinearGradient(0, 100, 0, size);
  soilGrad.addColorStop(0, '#5C3E28');
  soilGrad.addColorStop(1, '#4A301E');
  ctx.fillStyle = soilGrad;
  ctx.fillRect(0, 0, size, size);

  // Soil pebble & humus variations
  for (let x = 0; x < size; x += 4) {
    for (let y = 110; y < size; y += 4) {
      const n = pseudoNoise(x, y, 99);
      if (n > 0.35) {
        ctx.fillStyle = n > 0.75 ? '#3B2414' : n > 0.55 ? '#6E4D33' : '#7D573B';
        ctx.fillRect(x, y, 3, 3);
      }
    }
  }

  // Top Grass Canopy Overhang with hanging voxel blades
  ctx.fillStyle = '#4E9E54';
  ctx.fillRect(0, 0, size, 85);

  // Stepped voxel grass fringes dropping down
  for (let x = 0; x < size; x += 16) {
    const drop = 24 + Math.floor(pseudoNoise(x, 7) * 5) * 16;
    ctx.fillStyle = '#4E9E54';
    ctx.fillRect(x, 85, 16, drop);

    // Tip highlight on hanging blade
    ctx.fillStyle = '#65B86B';
    ctx.fillRect(x, 85 + drop - 6, 16, 6);

    // Darker underside fringe shadow onto dirt
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.fillRect(x, 85 + drop, 16, 8);
  }

  // Top rim highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.fillRect(0, 0, size, 10);

  // Bottom edge shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.20)';
  ctx.fillRect(0, size - 12, size, 12);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Grass Side Normal Map
 */
export function generateGrassSideNormalTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  // Fringes ledge: normal tilts down towards bottom
  ctx.fillStyle = 'rgb(128, 175, 230)';
  ctx.fillRect(0, 48, size, 12);

  applyBevelNormals(ctx, size, 14);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 3. Deep Earthy Soil / Loam Texture
 */
export function generateDirtTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = '#5A3C25';
  ctx.fillRect(0, 0, size, size);

  for (let x = 0; x < size; x += 4) {
    for (let y = 0; y < size; y += 4) {
      const n = pseudoNoise(x, y, 123);
      if (n > 0.3) {
        ctx.fillStyle = n > 0.7 ? '#412918' : n > 0.5 ? '#6E492F' : '#7F5739';
        ctx.fillRect(x, y, 3, 3);
      }
    }
  }

  // Bevel edge shadow
  ctx.lineWidth = 12;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
  ctx.strokeRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 4. Stratified Mountain Stone / Slate Cliff Texture
 */
export function generateStoneTexture(): THREE.CanvasTexture {
  const size = 512;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = '#888B92';
  ctx.fillRect(0, 0, size, size);

  // Horizontal geological sedimentary strata lines
  for (let y = 0; y < size; y += 8) {
    const n = pseudoNoise(0, y, 77);
    ctx.fillStyle = n > 0.5 ? 'rgba(65, 68, 72, 0.40)' : 'rgba(185, 188, 195, 0.28)';
    ctx.fillRect(0, y, size, 4 + n * 6);
  }

  // Chipped rock micro-facets
  for (let x = 0; x < size; x += 8) {
    for (let y = 0; y < size; y += 8) {
      const n = pseudoNoise(x, y, 202);
      if (n > 0.45) {
        ctx.fillStyle = n > 0.75 ? '#62656B' : '#A7AAB3';
        ctx.fillRect(x, y, 6, 6);
      }
    }
  }

  // Ambient occlusion crevice border
  ctx.lineWidth = 14;
  ctx.strokeStyle = 'rgba(35, 38, 42, 0.28)';
  ctx.strokeRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Stone Normal Map (Horizontal Strata Ridges & Bevel Edges)
 */
export function generateStoneNormalTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  // Strata ridge normal relief
  for (let y = 0; y < size; y += 8) {
    const n = pseudoNoise(0, y, 77);
    const ny = Math.floor(128 + (n - 0.5) * 55);
    ctx.fillStyle = `rgb(128, ${ny}, 240)`;
    ctx.fillRect(0, y, size, 4);
  }

  applyBevelNormals(ctx, size, 16);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 5. Architectural Polished Quartz / Command Center Tiles
 */
export function generateQuartzTexture(): THREE.CanvasTexture {
  const size = 512;
  const { canvas, ctx } = createCanvas(size);

  // Luminous polished porcelain base
  ctx.fillStyle = '#F8F8FA';
  ctx.fillRect(0, 0, size, size);

  // Composite ceramic micro-grain
  for (let x = 0; x < size; x += 4) {
    for (let y = 0; y < size; y += 4) {
      const n = pseudoNoise(x, y, 555);
      if (n > 0.5) {
        ctx.fillStyle = `rgba(215, 218, 226, ${0.12 + n * 0.12})`;
        ctx.fillRect(x, y, 3, 3);
      }
    }
  }

  // Precision architectural tile grid with metallic chamfered border
  ctx.lineWidth = 18;
  ctx.strokeStyle = '#E0E2E8';
  ctx.strokeRect(0, 0, size, size);

  // Inner inset crimson guideline channel
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(225, 29, 72, 0.32)';
  ctx.strokeRect(26, 26, size - 52, size - 52);

  // Corner metallic fasteners / studs
  const corners = [[36, 36], [size - 36, 36], [36, size - 36], [size - 36, size - 36]];
  corners.forEach(([cx, cy]) => {
    ctx.fillStyle = '#E11D48';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Quartz Normal Map (Precision Chamfered Edge Highlight)
 */
export function generateQuartzNormalTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  applyBevelNormals(ctx, size, 20);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 6. High-Tech Slate with Crimson Fiber Channels
 */
export function generateSlateTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = '#1B2026';
  ctx.fillRect(0, 0, size, size);

  // Micro brushed metallic lines
  for (let y = 0; y < size; y += 2) {
    const n = pseudoNoise(0, y, 11);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.03 + n * 0.05})`;
    ctx.fillRect(0, y, size, 1);
  }

  // Inset beveled border
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#0B0D11';
  ctx.strokeRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Slate Normal Map
 */
export function generateSlateNormalTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  applyBevelNormals(ctx, size, 14);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 7. Weathered Oak Wood Bark Grain Texture
 */
export function generateWoodBarkTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = '#563B23';
  ctx.fillRect(0, 0, size, size);

  // Vertical bark ridges
  for (let x = 0; x < size; x += 4) {
    const n = pseudoNoise(x, 0, 88);
    ctx.fillStyle = n > 0.5 ? '#3F2816' : '#6F4B2E';
    ctx.fillRect(x, 0, 3 + n * 2, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Wood Bark Normal Map
 */
export function generateWoodBarkNormalTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  for (let x = 0; x < size; x += 4) {
    const n = pseudoNoise(x, 0, 88);
    const nx = Math.floor(128 + (n - 0.5) * 55);
    ctx.fillStyle = `rgb(${nx}, 128, 240)`;
    ctx.fillRect(x, 0, 3, size);
  }

  applyBevelNormals(ctx, size, 12);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 8. Tree Foliage Leaf Clusters (Emerald Oak & Cherry Blossom)
 */
export function generateLeafTexture(isCherry: boolean = false): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  if (isCherry) {
    ctx.fillStyle = '#E11D48';
    ctx.fillRect(0, 0, size, size);

    for (let x = 0; x < size; x += 4) {
      for (let y = 0; y < size; y += 4) {
        const n = pseudoNoise(x, y, 66);
        if (n > 0.3) {
          ctx.fillStyle = n > 0.75 ? '#FDA4AF' : n > 0.5 ? '#F43F5E' : '#BE123C';
          ctx.fillRect(x, y, 3, 3);
        }
      }
    }
  } else {
    ctx.fillStyle = '#3B7A42';
    ctx.fillRect(0, 0, size, size);

    for (let x = 0; x < size; x += 4) {
      for (let y = 0; y < size; y += 4) {
        const n = pseudoNoise(x, y, 33);
        if (n > 0.3) {
          ctx.fillStyle = n > 0.7 ? '#5CB065' : n > 0.5 ? '#2E6334' : '#224C27';
          ctx.fillRect(x, y, 3, 3);
        }
      }
    }
  }

  // Bevel shading
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
  ctx.strokeRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 9. Crystalline Water Ripples Normal Texture
 */
export function generateWaterNormalTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = createCanvas(size);

  // Neutral tangent-space normal (128, 128, 255)
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  // Soft wave disturbances
  for (let i = 0; i < 48; i++) {
    const cx = pseudoNoise(i, 1) * size;
    const cy = pseudoNoise(i, 2) * size;
    const rad = 22 + pseudoNoise(i, 3) * 38;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    grad.addColorStop(0, 'rgba(155, 155, 255, 0.85)');
    grad.addColorStop(0.5, 'rgba(110, 110, 245, 0.5)');
    grad.addColorStop(1, 'rgba(128, 128, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

/**
 * 10. Suit Tailoring Fabric Twill Weave Texture
 */
export function generateFabricTexture(): THREE.CanvasTexture {
  const size = 128;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = '#181E24';
  ctx.fillRect(0, 0, size, size);

  // Diagonal twill weave pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1;
  for (let i = -size; i < size * 2; i += 3) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + size, size);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

/**
 * General Micro-Bevel Normal Texture for any standard block
 */
export function generateBevelNormalTexture(): THREE.CanvasTexture {
  const size = 128;
  const { canvas, ctx } = createCanvas(size);

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  applyBevelNormals(ctx, size, 14);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

