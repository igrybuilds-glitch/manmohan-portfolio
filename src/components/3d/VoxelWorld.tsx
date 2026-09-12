import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { createVoxelMaterials } from './VoxelMaterials';
import { CharacterModel } from './CharacterModel';
import { SystemMonoliths } from './SystemMonoliths';
import { TerrainBuilder } from './TerrainBuilder';
import { VolumetricAtmosphere } from './VolumetricAtmosphere';
import { WorldLandmarks } from './WorldLandmarks';
import { SystemId, WorldId, CameraViewMode, WorldSettings } from '../../types';
import { WORLDS } from '../../data/portfolioWorlds';
import { sound } from '../../utils/audio';

interface VoxelWorldProps {
  activeWorld?: WorldId;
  activeSystem: SystemId | null;
  hoveredSystem: SystemId | null;
  cameraMode: CameraViewMode;
  settings: WorldSettings;
  onSelectSystem: (id: SystemId | null) => void;
  onHoverSystem: (id: SystemId | null) => void;
}

export const VoxelWorld: React.FC<VoxelWorldProps> = ({
  activeWorld = 'origin',
  activeSystem,
  hoveredSystem,
  cameraMode,
  settings,
  onSelectSystem,
  onHoverSystem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const bloomPassRef = useRef<UnrealBloomPass | null>(null);

  // Entities
  const characterRef = useRef<CharacterModel | null>(null);
  const monolithsRef = useRef<SystemMonoliths | null>(null);
  const terrainRef = useRef<TerrainBuilder | null>(null);
  const atmosphereRef = useRef<VolumetricAtmosphere | null>(null);
  const landmarksRef = useRef<WorldLandmarks | null>(null);

  // Interaction & Camera Interpolation Targets
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const currentCamPos = useRef(new THREE.Vector3(0, 8, 14));
  const targetCamPos = useRef(new THREE.Vector3(0, 5.2, 9.8));
  const currentCamLookAt = useRef(new THREE.Vector3(0, 1.8, 0));
  const targetCamLookAt = useRef(new THREE.Vector3(0, 1.8, 0));
  const cameraShakeImpulse = useRef(0);
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2(-1000, -1000));

  // Cinematic opening sequence timer
  const introTimer = useRef(0);
  const isIntroComplete = useRef(false);

  // Lighting references for dynamic impacts
  const centralPulseLightRef = useRef<THREE.PointLight | null>(null);

  // Camera presets
  const updateCameraTarget = useCallback((mode: CameraViewMode, system: SystemId | null, worldId?: WorldId) => {
    if (worldId && worldId !== 'origin') {
      const worldDef = WORLDS.find((w) => w.id === worldId);
      if (worldDef) {
        targetCamPos.current.set(...worldDef.cameraPos);
        targetCamLookAt.current.set(...worldDef.cameraLookAt);
        return;
      }
    }

    if (system === 'ai') {
      targetCamPos.current.set(-3.6, 3.8, 3.2);
      targetCamLookAt.current.set(-4.5, 2.2, -1.0);
    } else if (system === 'automation') {
      targetCamPos.current.set(3.4, 3.8, 3.0);
      targetCamLookAt.current.set(4.2, 2.2, -1.5);
    } else if (system === 'web') {
      targetCamPos.current.set(-2.0, 4.2, 7.5);
      targetCamLookAt.current.set(-2.8, 2.8, 3.2);
    } else if (system === 'growth') {
      targetCamPos.current.set(2.6, 4.2, 7.2);
      targetCamLookAt.current.set(3.4, 2.8, 2.8);
    } else {
      switch (mode) {
        case 'character':
          targetCamPos.current.set(0.4, 3.2, 4.5);
          targetCamLookAt.current.set(0, 2.0, 0);
          break;
        case 'systems':
          targetCamPos.current.set(0, 9.5, 11.5);
          targetCamLookAt.current.set(0, 2.0, 0);
          break;
        case 'overview':
          targetCamPos.current.set(9.0, 11.0, 14.0);
          targetCamLookAt.current.set(0, 1.5, 0);
          break;
        case 'cinematic':
        default:
          targetCamPos.current.set(0, 5.2, 9.8);
          targetCamLookAt.current.set(0, 1.8, 0);
          break;
      }
    }
  }, []);

  // Update camera target when props change
  useEffect(() => {
    updateCameraTarget(cameraMode, activeSystem, activeWorld);
  }, [cameraMode, activeSystem, activeWorld, updateCameraTarget]);


  // Sync active and hovered systems to 3D entities
  useEffect(() => {
    if (monolithsRef.current) {
      monolithsRef.current.setActiveSystem(activeSystem);
      monolithsRef.current.setHoveredSystem(hoveredSystem);
    }
  }, [activeSystem, hoveredSystem]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene with Cinematic Atmospheric Perspective
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const skyHorizon = 0xF5EDE2;
    scene.background = new THREE.Color(skyHorizon);
    // Light atmospheric fog enhancing depth and scale perception without obscuring foreground
    scene.fog = new THREE.FogExp2(skyHorizon, 0.0145);

    // Atmospheric Sky Dome with vertical horizon warmth and solar glow
    const createSkyDomeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Vertical atmospheric gradient
      const grad = ctx.createLinearGradient(0, 512, 0, 0);
      grad.addColorStop(0, '#F5EDE2');     // Golden champagne horizon
      grad.addColorStop(0.35, '#F8F3EB');  // Ethereal warm ivory
      grad.addColorStop(0.70, '#EAECEF');  // Soft daylight atmosphere
      grad.addColorStop(1.0, '#DFE4EA');   // Airy zenith
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Atmospheric solar halo in direction of key sun light
      const sunX = 360;
      const sunY = 160;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 190);
      sunGlow.addColorStop(0, 'rgba(255, 246, 228, 0.50)');
      sunGlow.addColorStop(0.45, 'rgba(255, 238, 210, 0.18)');
      sunGlow.addColorStop(1, 'rgba(255, 238, 210, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 190, 0, Math.PI * 2);
      ctx.fill();

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    };

    const skyDome = new THREE.Mesh(
      new THREE.SphereGeometry(95, 32, 16),
      new THREE.MeshBasicMaterial({
        map: createSkyDomeTexture(),
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    scene.add(skyDome);

    // 2. Camera Setup (Cinematic 38mm equivalent field of view)
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 120);
    camera.position.set(0, 11, 20);
    camera.lookAt(0, 1.8, 0);
    cameraRef.current = camera;
    currentCamPos.current.copy(camera.position);

    // 3. WebGL Renderer with High-Precision Shadows & ACES Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.quality === 'high' ? 2 : 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Post-Processing Pipeline: Cinematic Physically Accurate Soft Bloom
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Physically accurate soft bloom tuned specifically for emissive system blocks & conduits
    // Resolution: matches viewport dimensions
    // Strength: 0.62 (natural photographic glow, subtle on terrain highlights, rich on conduits)
    // Radius: 0.72 (soft multi-pass Gaussian dispersion)
    // Threshold: 0.82 (prevents daytime grass/stone from blooming, only emissive conduits & bright flares bloom)
    const bloomResolution = new THREE.Vector2(container.clientWidth, container.clientHeight);
    const bloomPass = new UnrealBloomPass(
      bloomResolution,
      settings.quality === 'high' ? 0.62 : 0.45,
      0.72,
      0.82
    );
    composer.addPass(bloomPass);
    bloomPassRef.current = bloomPass;

    // OutputPass applies tone mapping & sRGB color conversion to the composited buffer
    const outputPass = new OutputPass();
    composer.addPass(outputPass);
    composerRef.current = composer;

    // 5. AAA Cinematic Lighting Rig

    // A. Fill / Skylight (Simulating realistic warm daylight hemisphere)
    const hemiLight = new THREE.HemisphereLight(0xFFFAEE, 0x94A3B8, 0.85);
    hemiLight.position.set(0, 24, 0);
    scene.add(hemiLight);

    // B. Key Sun Light (Warm golden direct sun with soft contact shadows)
    const sunLight = new THREE.DirectionalLight(0xFFF3DE, 1.85);
    sunLight.position.set(16, 26, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1.0;
    sunLight.shadow.camera.far = 65;
    sunLight.shadow.camera.left = -18;
    sunLight.shadow.camera.right = 18;
    sunLight.shadow.camera.top = 18;
    sunLight.shadow.camera.bottom = -18;
    sunLight.shadow.bias = -0.0002;
    sunLight.shadow.normalBias = 0.02;
    scene.add(sunLight);

    // C. Golden Rim / Backlight (Crisp silhouette edge for character & tree crowns)
    const rimLight = new THREE.DirectionalLight(0xFFE8CA, 0.95);
    rimLight.position.set(-14, 15, -16);
    scene.add(rimLight);

    // D. Soft Ambient Light for warm shadow recovery
    const ambientLight = new THREE.AmbientLight(0xFFF6ED, 0.38);
    scene.add(ambientLight);

    // E. Central Command Center Crimson Light with impact response
    const centerPulseLight = new THREE.PointLight(0xE11D48, 1.4, 9);
    centerPulseLight.position.set(0.72, 1.6, 0.72);
    scene.add(centerPulseLight);
    centralPulseLightRef.current = centerPulseLight;

    // 5. Build Sub-Systems & Procedural Assets
    const materials = createVoxelMaterials();

    // Voxel Terrain & Environment
    const terrain = new TerrainBuilder(materials);
    scene.add(terrain.group);
    terrainRef.current = terrain;

    // Interactive System Monoliths
    const monoliths = new SystemMonoliths(materials);
    scene.add(monoliths.group);
    monolithsRef.current = monoliths;

    // Connected World Landmarks across 11 Worlds
    const landmarks = new WorldLandmarks(materials);
    scene.add(landmarks.group);
    landmarksRef.current = landmarks;


    // Manmohan Character Model
    const character = new CharacterModel(materials);
    character.group.position.set(0, 0.05, 0);
    
    // Connect cinematic impact callback: triggers shockwave sound, light flare & camera shake
    character.onBlockPlacedImpact = () => {
      cameraShakeImpulse.current = 0.024;
      if (centralPulseLightRef.current) {
        centralPulseLightRef.current.intensity = 3.2;
      }
      if (bloomPassRef.current) {
        bloomPassRef.current.strength = 1.35;
      }
      if (settings.soundEnabled) {
        sound.playBlockPlace();
      }
    };

    scene.add(character.group);
    characterRef.current = character;

    // 6. Distant Atmospheric Mountain Silhouettes (Stepped Voxel Ridge Amphitheater)
    const distantRidgeGroup = new THREE.Group();
    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0xC6CCD5,
      roughness: 0.90,
      metalness: 0.05,
      fog: true,
    });
    const mountainPeaks = [
      { x: -42, z: -38, tiers: 8, baseW: 28, stepH: 2.8 },
      { x: -18, z: -48, tiers: 9, baseW: 32, stepH: 3.2 },
      { x: 16, z: -50, tiers: 9, baseW: 30, stepH: 3.0 },
      { x: 40, z: -36, tiers: 7, baseW: 26, stepH: 2.6 },
    ];
    mountainPeaks.forEach((p) => {
      for (let t = 0; t < p.tiers; t++) {
        const frac = t / p.tiers;
        const width = p.baseW * (1 - frac * 0.82);
        const depth = width * 0.85;
        const tierGeo = new THREE.BoxGeometry(width, p.stepH, depth);
        const tierMesh = new THREE.Mesh(tierGeo, mountainMat);
        tierMesh.position.set(
          p.x + Math.sin(t * 1.3) * 1.6,
          t * p.stepH - 2,
          p.z + Math.cos(t * 1.1) * 1.6
        );
        tierMesh.rotation.y = 0.35 + (t % 2 === 0 ? 0.08 : -0.08);
        tierMesh.castShadow = true;
        tierMesh.receiveShadow = true;
        distantRidgeGroup.add(tierMesh);
      }
    });
    scene.add(distantRidgeGroup);

    // 7. Volumetric Atmosphere System (Light fog, stratified ground mist, god-rays & floating motes)
    const atmosphere = new VolumetricAtmosphere();
    scene.add(atmosphere.group);
    atmosphereRef.current = atmosphere;

    // 8. Event Listeners for Interaction & Pointer Movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      pointerRef.current.set(x, y);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handlePointerDown = () => {
      if (!cameraRef.current || !monolithsRef.current) return;
      raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(monolithsRef.current.interactiveMeshes, true);

      if (intersects.length > 0) {
        let currentObj: THREE.Object3D | null = intersects[0].object;
        while (currentObj && !currentObj.userData?.systemId) {
          currentObj = currentObj.parent;
        }

        if (currentObj && currentObj.userData?.systemId) {
          const clickedId = currentObj.userData.systemId as SystemId;
          onSelectSystem(clickedId === activeSystem ? null : clickedId);
          if (settings.soundEnabled) sound.playClick();
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('pointerdown', handlePointerDown);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
      if (composerRef.current) {
        composerRef.current.setSize(width, height);
      }
      if (bloomPassRef.current) {
        bloomPassRef.current.resolution.set(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // 9. Main Animation Loop (60 FPS Performance Engineered)
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Mouse smoothing
      mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouseRef.current.targetX, 0.06);
      mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouseRef.current.targetY, 0.06);

      // Intro Dolly Zoom
      if (!isIntroComplete.current) {
        introTimer.current += delta;
        const introT = Math.min(introTimer.current / 2.8, 1);
        const easedIntro = 1 - Math.pow(1 - introT, 3);
        currentCamPos.current.set(
          THREE.MathUtils.lerp(0, targetCamPos.current.x, easedIntro),
          THREE.MathUtils.lerp(11, targetCamPos.current.y, easedIntro),
          THREE.MathUtils.lerp(20, targetCamPos.current.z, easedIntro)
        );

        if (introT >= 1) isIntroComplete.current = true;
      } else {
        // Smooth cinematic parallax & dolly interpolation
        const parallaxX = mouseRef.current.x * (settings.reducedMotion ? 0.2 : 0.9);
        const parallaxY = mouseRef.current.y * (settings.reducedMotion ? 0.15 : 0.6);

        // Micro-impulse dampening
        cameraShakeImpulse.current = THREE.MathUtils.lerp(cameraShakeImpulse.current, 0, 0.12);
        const shakeX = (Math.random() - 0.5) * cameraShakeImpulse.current;
        const shakeY = (Math.random() - 0.5) * cameraShakeImpulse.current;

        const desiredCamX = targetCamPos.current.x + parallaxX + shakeX;
        const desiredCamY = targetCamPos.current.y - parallaxY * 0.4 + shakeY;
        const desiredCamZ = targetCamPos.current.z;

        currentCamPos.current.x = THREE.MathUtils.lerp(currentCamPos.current.x, desiredCamX, 0.05);
        currentCamPos.current.y = THREE.MathUtils.lerp(currentCamPos.current.y, desiredCamY, 0.05);
        currentCamPos.current.z = THREE.MathUtils.lerp(currentCamPos.current.z, desiredCamZ, 0.05);

        currentCamLookAt.current.lerp(targetCamLookAt.current, 0.06);
      }

      if (cameraRef.current) {
        cameraRef.current.position.copy(currentCamPos.current);
        cameraRef.current.lookAt(currentCamLookAt.current);
      }

      // Smoothly settle center pulse light
      if (centralPulseLightRef.current) {
        centralPulseLightRef.current.intensity = THREE.MathUtils.lerp(
          centralPulseLightRef.current.intensity,
          1.4,
          0.08
        );
      }

      // Smoothly settle bloom flare back to baseline
      if (bloomPassRef.current) {
        const baseStrength = settings.quality === 'high' ? 0.62 : 0.45;
        bloomPassRef.current.strength = THREE.MathUtils.lerp(
          bloomPassRef.current.strength,
          baseStrength,
          0.08
        );
      }

      // Update 3D entities
      if (terrainRef.current) {
        terrainRef.current.update(delta);
      }

      if (characterRef.current) {
        characterRef.current.update(
          delta,
          mouseRef.current.x,
          mouseRef.current.y,
          !settings.reducedMotion
        );
      }

      if (monolithsRef.current && cameraRef.current) {
        monolithsRef.current.update(delta, cameraRef.current);
      }

      if (landmarksRef.current) {
        landmarksRef.current.update(delta);
      }


      // Hover Raycasting Detection for Interactive Monoliths
      if (cameraRef.current && monolithsRef.current) {
        raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(monolithsRef.current.interactiveMeshes, true);

        if (intersects.length > 0) {
          let currentObj: THREE.Object3D | null = intersects[0].object;
          while (currentObj && !currentObj.userData?.systemId) {
            currentObj = currentObj.parent;
          }

          if (currentObj && currentObj.userData?.systemId) {
            const foundId = currentObj.userData.systemId as SystemId;
            if (foundId !== hoveredSystem) {
              onHoverSystem(foundId);
              if (settings.soundEnabled) sound.playHover();
            }
          }
        } else if (hoveredSystem !== null) {
          onHoverSystem(null);
        }
      }

      // Update Volumetric Atmosphere (drifting motes, ground mist, light shafts)
      if (atmosphereRef.current) {
        atmosphereRef.current.update(settings.reducedMotion ? delta * 0.2 : delta);
      }

      // Render Scene via EffectComposer (soft bloom pass pipeline)
      if (composerRef.current) {
        composerRef.current.render();
      } else if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      if (composerRef.current) {
        composerRef.current.dispose();
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [settings.quality, settings.soundEnabled, settings.reducedMotion, onSelectSystem, onHoverSystem, activeSystem, hoveredSystem]);

  return (
    <div
      ref={containerRef}
      id="hero-3d-viewport"
      className="absolute inset-0 w-full h-full cursor-default select-none overflow-hidden"
    >
      {/* Cinematic Vignette & Radial Focus Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(250, 247, 242, 0) 45%, rgba(250, 247, 242, 0.45) 80%, rgba(250, 247, 242, 0.85) 100%)',
        }}
      />
    </div>
  );
};
