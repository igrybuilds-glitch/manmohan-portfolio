/**
 * Synthesized tactile audio feedback for voxel interactions and UI
 */
import { WorldId } from '../types';

interface ActiveSoundscape {
  worldId: WorldId;
  masterGain: GainNode;
  nodes: (AudioNode | { stop?: () => void; disconnect?: () => void })[];
  intervalIds: number[];
  cleanup: () => void;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private activeSoundscape: ActiveSoundscape | null = null;
  private fadingSoundscapes: ActiveSoundscape[] = [];
  private targetWorldId: WorldId = 'origin';
  private noiseBuffer: AudioBuffer | null = null;

  constructor() {
    // Lazy initialized on first user gesture
  }

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (!val) {
      this.stopAllSoundscapes(0.4);
    } else if (this.targetWorldId) {
      this.crossfadeToSoundscape(this.targetWorldId, 1.2);
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Soft tactile click sound when hovering buttons/blocks
   */
  public playHover() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore audio context errors
    }
  }

  /**
   * Crisp tactile click when interacting with elements
   */
  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(560, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }

  /**
   * Voxel block placement sound
   */
  public playBlockPlace() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  /**
   * Harmonious chord when activating a digital system (AI, Automation, Web, Growth)
   */
  public playSystemActivate(systemType: string) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const frequencies: Record<string, number[]> = {
        ai: [523.25, 659.25, 783.99, 1046.50], // C Major 7 chord
        automation: [440.00, 554.37, 659.25, 880.00], // A Major chord
        web: [587.33, 739.99, 880.00, 1174.66], // D Major
        growth: [659.25, 830.61, 987.77, 1318.51], // E Major (rising triumph)
      };

      const notes = frequencies[systemType] || [440, 554, 659, 880];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.6);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Shimmering level-up / achievement fanfare (like unlocking an achievement)
   */
  public playAchievement() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.045, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Crisp Minecraft inventory item slot click
   */
  public playInventoryClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {
      // Ignore
    }
  }

  /**
   * Rhythmic Redstone electrical tick / energy surge
   */
  public playRedstonePulse() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.06);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Ignore
    }
  }

  /**
   * Minecraft Nether / Ender warp screen wipe fast travel sound
   */
  public playFastTravel() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;

      // 1. Rising warp frequency swoosh
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.28);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.45);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(2800, now + 0.26);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.45);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.055, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);

      // 2. Sub-bass dimensional punch
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(110, now + 0.15);
      subOsc.frequency.exponentialRampToValueAtTime(50, now + 0.38);

      subGain.gain.setValueAtTime(0.07, now + 0.15);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(now + 0.15);
      subOsc.stop(now + 0.38);
    } catch {
      // Ignore
    }
  }

  /**
   * Crisp developer terminal keystroke
   */
  public playTerminalKey() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = 600 + (Math.random() - 0.5) * 80;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // Ignore
    }
  }

  /**
   * Secret unlock arpeggio
   */
  public playSecretUnlock() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 830.61, 880, 1108.73, 1318.51];
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.05);

        gain.gain.setValueAtTime(0.04, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Ethereal Minecraft-style portal / biome shift whoosh
   */
  public playBiomeWarp() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Resonant harmonic shimmer chords
      const frequencies = [261.63, 329.63, 392.00, 523.25, 659.25]; // C Major sparkle
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        // Gentle frequency glissando upward like portal resonance
        osc.frequency.setValueAtTime(freq * 0.95, now + idx * 0.03);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + idx * 0.03 + 0.35);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.2);

        gain.gain.setValueAtTime(0, now + idx * 0.03);
        gain.gain.linearRampToValueAtTime(0.02, now + idx * 0.03 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.03 + 0.45);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.03);
        osc.stop(now + idx * 0.03 + 0.45);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Unique Minecraft-inspired ambient audio signatures for every biome transition
   */
  public playBiomeTransition(worldId: WorldId) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      switch (worldId) {
        case 'origin':
          this.playOriginPlains();
          break;
        case 'automation':
          this.playRedstoneCitadel();
          break;
        case 'after-sleep':
          this.playMidnightVault();
          break;
        case 'ai-lab':
          this.playNeuralSanctum();
          break;
        case 'creative':
          this.playCreativePrism();
          break;
        case 'content':
          this.playNetherForge();
          break;
        case 'growth':
          this.playGrowthCanopy();
          break;
        case 'analytics':
          this.playTelemetryTower();
          break;
        case 'projects':
          this.playDiamondArchives();
          break;
        case 'founder':
          this.playArchitectCitadel();
          break;
        case 'contact':
          this.playBeaconObservatory();
          break;
        default:
          this.playBiomeWarp();
          break;
      }
    } catch {
      // Ignore audio synthesis errors
    }
  }

  /**
   * 1. ORIGIN PLAINS: C418-inspired Overworld acoustic arpeggio
   * Peaceful nostalgic piano & flute tones over rolling grass
   */
  public playOriginPlains() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // C Major 9 gentle acoustic arpeggio (C4, E4, G4, B4, D5)
    const notes = [261.63, 329.63, 392.00, 493.88, 587.33];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.065);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950, now);

      gain.gain.setValueAtTime(0, now + idx * 0.065);
      gain.gain.linearRampToValueAtTime(0.032, now + idx * 0.065 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.065 + 0.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.065);
      osc.stop(now + idx * 0.065 + 0.65);
    });
  }

  /**
   * 2. REDSTONE CITADEL: Mechanical clockwork repeaters & energized redstone wire surge
   */
  public playRedstoneCitadel() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // A. Triple rapid mechanical repeater clicks
    [0, 0.05, 0.11].forEach((delay) => {
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(1400, now + delay);
      clickOsc.frequency.exponentialRampToValueAtTime(320, now + delay + 0.02);

      clickGain.gain.setValueAtTime(0.035, now + delay);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.02);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now + delay);
      clickOsc.stop(now + delay + 0.02);
    });

    // B. Low-end Redstone current hum opening filter
    const humOsc = ctx.createOscillator();
    const humGain = ctx.createGain();
    const humFilter = ctx.createBiquadFilter();

    humOsc.type = 'sawtooth';
    humOsc.frequency.setValueAtTime(110, now + 0.12);
    humOsc.frequency.exponentialRampToValueAtTime(164.81, now + 0.35);

    humFilter.type = 'bandpass';
    humFilter.frequency.setValueAtTime(350, now + 0.12);
    humFilter.frequency.exponentialRampToValueAtTime(1100, now + 0.35);
    humFilter.Q.setValueAtTime(2.5, now);

    humGain.gain.setValueAtTime(0, now + 0.12);
    humGain.gain.linearRampToValueAtTime(0.04, now + 0.16);
    humGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    humOsc.connect(humFilter);
    humFilter.connect(humGain);
    humGain.connect(ctx.destination);
    humOsc.start(now + 0.12);
    humOsc.stop(now + 0.55);
  }

  /**
   * 3. MIDNIGHT VAULT: Deep nocturnal cave resonance & distant starry wind chime
   */
  public playMidnightVault() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub-bass cave pressure wave
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(65.41, now); // C2
    subOsc.frequency.exponentialRampToValueAtTime(55, now + 0.7);

    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.045, now + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.75);

    // Distant nocturnal bell harmonic
    [587.33, 880, 1174.66].forEach((f, idx) => {
      const bell = ctx.createOscillator();
      const bGain = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(f, now + 0.1 + idx * 0.08);

      bGain.gain.setValueAtTime(0.02, now + 0.1 + idx * 0.08);
      bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1 + idx * 0.08 + 0.6);

      bell.connect(bGain);
      bGain.connect(ctx.destination);
      bell.start(now + 0.1 + idx * 0.08);
      bell.stop(now + 0.1 + idx * 0.08 + 0.6);
    });
  }

  /**
   * 4. NEURAL SANCTUM: Cyber AI conduit burst with high-tech FM chirps
   */
  public playNeuralSanctum() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Fast high-tech data calculation arpeggio
    const freqs = [523.25, 783.99, 1046.50, 1567.98, 2093.00];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.035);
      osc.frequency.linearRampToValueAtTime(f * 1.08, now + i * 0.035 + 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.035);
      gain.gain.linearRampToValueAtTime(0.03, now + i * 0.035 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.035 + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.035);
      osc.stop(now + i * 0.035 + 0.28);
    });
  }

  /**
   * 5. CREATIVE PRISM: Minecraft Amethyst Block crystalline chimes
   */
  public playCreativePrism() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Inspired by Minecraft Amethyst cluster steps
    const amethystNotes = [659.25, 830.61, 987.77, 1318.51, 1661.22];
    amethystNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.035, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.5);
    });
  }

  /**
   * 6. NETHER FORGE: Volcanic basalt delta sub-drone & crackling ember sparks
   */
  public playNetherForge() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Heavy volcanic drone
    const bass = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    bass.type = 'sawtooth';
    bass.frequency.setValueAtTime(55, now);
    bass.frequency.exponentialRampToValueAtTime(42, now + 0.5);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, now);
    filter.frequency.linearRampToValueAtTime(160, now + 0.5);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    bass.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    bass.start(now);
    bass.stop(now + 0.55);

    // Crackling ember sparks (two high textured snaps)
    [0.12, 0.22].forEach((t) => {
      const spark = ctx.createOscillator();
      const sGain = ctx.createGain();
      spark.type = 'square';
      spark.frequency.setValueAtTime(1600 + Math.random() * 400, now + t);
      sGain.gain.setValueAtTime(0.025, now + t);
      sGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.02);
      spark.connect(sGain);
      sGain.connect(ctx.destination);
      spark.start(now + t);
      spark.stop(now + t + 0.02);
    });
  }

  /**
   * 7. GROWTH CANOPY: Lush Caves spore blossom pops & wooden bamboo marimba
   */
  public playGrowthCanopy() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Organic wooden bamboo/marimba scale (F4, A4, C5, F5, G5)
    const notes = [349.23, 440.00, 523.25, 698.46, 783.99];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq * 1.05, now + idx * 0.055);
      osc.frequency.exponentialRampToValueAtTime(freq, now + idx * 0.055 + 0.03);

      gain.gain.setValueAtTime(0.04, now + idx * 0.055);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.055 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.055);
      osc.stop(now + idx * 0.055 + 0.35);
    });
  }

  /**
   * 8. TELEMETRY TOWER: Skulk sensor frequency ping & sonar sweep
   */
  public playTelemetryTower() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Dual sonar radar ping
    [1320, 1980].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.88, now + idx * 0.08 + 0.3);

      gain.gain.setValueAtTime(0.035, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.45);
    });
  }

  /**
   * 9. DIAMOND ARCHIVES: Triumphant diamond discovery chime
   */
  public playDiamondArchives() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sparkling bright diamond triad with level-up shimmer
    const notes = [783.99, 987.77, 1174.66, 1567.98];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.06 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.55);
    });
  }

  /**
   * 10. ARCHITECT'S CITADEL: Stately gold bell & master builder's brass chime
   */
  public playArchitectCitadel() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Majestic low and mid bell harmonics (A3, E4, A4, C#5)
    const chord = [220.00, 329.63, 440.00, 554.37];
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.7);
    });
  }

  /**
   * 11. BEACON OBSERVATORY: Minecraft Beacon beam soaring into the sky
   */
  public playBeaconObservatory() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Rising foundational beam
    const beam = ctx.createOscillator();
    const bGain = ctx.createGain();
    beam.type = 'sine';
    beam.frequency.setValueAtTime(110, now);
    beam.frequency.exponentialRampToValueAtTime(440, now + 0.4);

    bGain.gain.setValueAtTime(0, now);
    bGain.gain.linearRampToValueAtTime(0.03, now + 0.06);
    bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    beam.connect(bGain);
    bGain.connect(ctx.destination);
    beam.start(now);
    beam.stop(now + 0.6);

    // Skyward celestial dual shimmer
    [880.00, 1318.51].forEach((freq) => {
      const sky = ctx.createOscillator();
      const skyGain = ctx.createGain();
      sky.type = 'sine';
      sky.frequency.setValueAtTime(freq, now + 0.15);

      skyGain.gain.setValueAtTime(0.025, now + 0.15);
      skyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

      sky.connect(skyGain);
      skyGain.connect(ctx.destination);
      sky.start(now + 0.15);
      sky.stop(now + 0.75);
    });
  }

  /* =========================================================================
   * DYNAMIC BACKGROUND SOUNDSCAPES & EQUAL-POWER CROSSFADING
   * ========================================================================= */

  /**
   * Returns a looped pink-tinted warm noise buffer for air, wind, and room tone
   */
  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.noiseBuffer && this.noiseBuffer.sampleRate === ctx.sampleRate) {
      return this.noiseBuffer;
    }
    const bufferSize = ctx.sampleRate * 4; // 4s seamless noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // 1-pole filter for natural pink-tinted acoustic warmth
      data[i] = (lastOut + 0.025 * white) / 1.025;
      lastOut = data[i];
      data[i] *= 3.2;
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  /**
   * Get the current active background soundscape world ID
   */
  public getCurrentSoundscape(): WorldId | null {
    return this.activeSoundscape ? this.activeSoundscape.worldId : null;
  }

  /**
   * Smoothly crossfade from the current background soundscape to the target world's soundscape
   */
  public crossfadeToSoundscape(worldId: WorldId, fadeDuration: number = 1.4) {
    this.targetWorldId = worldId;
    if (!this.enabled) return;

    const ctx = this.getContext();
    if (!ctx) return;

    // If already playing this world's soundscape, do nothing
    if (this.activeSoundscape && this.activeSoundscape.worldId === worldId) {
      return;
    }

    const now = ctx.currentTime;

    // 1. Crossfade OUT current soundscape
    if (this.activeSoundscape) {
      const outgoing = this.activeSoundscape;
      this.fadingSoundscapes.push(outgoing);
      this.activeSoundscape = null;

      try {
        outgoing.masterGain.gain.cancelScheduledValues(now);
        outgoing.masterGain.gain.setValueAtTime(outgoing.masterGain.gain.value, now);
        outgoing.masterGain.gain.linearRampToValueAtTime(0.0001, now + fadeDuration);
      } catch {
        // Ignore audio timing error
      }

      setTimeout(() => {
        outgoing.cleanup();
        this.fadingSoundscapes = this.fadingSoundscapes.filter((s) => s !== outgoing);
      }, fadeDuration * 1000 + 100);
    }

    // 2. Crossfade IN the new world's soundscape
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    // Subtle background ambient volume (non-intrusive)
    masterGain.gain.linearRampToValueAtTime(0.028, now + fadeDuration);
    masterGain.connect(ctx.destination);

    const { nodes, intervalIds } = this.buildSoundscape(worldId, ctx, masterGain);

    const cleanup = () => {
      intervalIds.forEach((id) => {
        clearInterval(id);
        clearTimeout(id);
      });
      nodes.forEach((node) => {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          if ('disconnect' in node && typeof node.disconnect === 'function') {
            node.disconnect();
          }
        } catch {
          // Ignore
        }
      });
      try {
        masterGain.disconnect();
      } catch {
        // Ignore
      }
    };

    this.activeSoundscape = {
      worldId,
      masterGain,
      nodes,
      intervalIds,
      cleanup,
    };
  }

  /**
   * Stop all active and fading background soundscapes immediately or with gentle fade
   */
  public stopAllSoundscapes(fadeDuration: number = 0.5) {
    const ctx = this.getContext();
    const now = ctx ? ctx.currentTime : 0;

    const all = [...this.fadingSoundscapes];
    if (this.activeSoundscape) {
      all.push(this.activeSoundscape);
      this.activeSoundscape = null;
    }
    this.fadingSoundscapes = [];

    all.forEach((s) => {
      if (ctx && fadeDuration > 0) {
        try {
          s.masterGain.gain.cancelScheduledValues(now);
          s.masterGain.gain.setValueAtTime(s.masterGain.gain.value, now);
          s.masterGain.gain.linearRampToValueAtTime(0.0001, now + fadeDuration);
        } catch {
          // Ignore
        }
      }
      setTimeout(() => {
        s.cleanup();
      }, fadeDuration * 1000 + 60);
    });
  }

  /**
   * Builder dispatcher for world-specific soundscape audio graph
   */
  private buildSoundscape(
    worldId: WorldId,
    ctx: AudioContext,
    masterGain: GainNode
  ): { nodes: (AudioNode | { stop?: () => void; disconnect?: () => void })[]; intervalIds: number[] } {
    switch (worldId) {
      case 'origin':
        return this.buildOriginPlainsSoundscape(ctx, masterGain);
      case 'automation':
        return this.buildAutomationLabSoundscape(ctx, masterGain);
      case 'after-sleep':
        return this.buildMidnightVaultSoundscape(ctx, masterGain);
      case 'ai-lab':
        return this.buildNeuralSanctumSoundscape(ctx, masterGain);
      case 'creative':
        return this.buildCreativePrismSoundscape(ctx, masterGain);
      case 'content':
        return this.buildContentStudioSoundscape(ctx, masterGain);
      case 'growth':
        return this.buildGrowthCanopySoundscape(ctx, masterGain);
      case 'analytics':
        return this.buildTelemetryTowerSoundscape(ctx, masterGain);
      case 'projects':
        return this.buildDiamondArchivesSoundscape(ctx, masterGain);
      case 'founder':
        return this.buildArchitectCitadelSoundscape(ctx, masterGain);
      case 'contact':
        return this.buildBeaconObservatorySoundscape(ctx, masterGain);
      default:
        return this.buildOriginPlainsSoundscape(ctx, masterGain);
    }
  }

  /* -------------------------------------------------------------------------
   * 1. ORIGIN PLAINS: Overworld warm breeze with gentle birds & woodwinds
   * ------------------------------------------------------------------------- */
  private buildOriginPlainsSoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // Continuous warm breeze (filtered pink noise + LFO)
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.getNoiseBuffer(ctx);
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, now);

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, now); // Gentle slow breeze cycle

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(140, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const breezeGain = ctx.createGain();
    breezeGain.gain.setValueAtTime(0.016, now);

    noiseSource.connect(filter);
    filter.connect(breezeGain);
    breezeGain.connect(masterGain);

    noiseSource.start();
    lfo.start();
    nodes.push(noiseSource, filter, lfo, lfoGain, breezeGain);

    // Periodic gentle Overworld bird/whistle chirp (every 4.5s)
    const chirpTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      try {
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        const startFreq = 784 + (Math.random() - 0.5) * 80;
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 1.33, t + 0.08);
        osc.frequency.exponentialRampToValueAtTime(startFreq * 1.15, t + 0.18);

        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.008, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);

        osc.connect(g);
        g.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.22);
      } catch {
        // Ignore
      }
    }, 4800);
    intervalIds.push(chirpTimer);

    return { nodes, intervalIds };
  }

  /* -------------------------------------------------------------------------
   * 2. REDSTONE CITADEL / AUTOMATION: Clicking machinery in the lab & redstone hum
   * ------------------------------------------------------------------------- */
  private buildAutomationLabSoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // A. Constant redstone electrical dynamo hum
    const humOsc = ctx.createOscillator();
    humOsc.type = 'sawtooth';
    humOsc.frequency.setValueAtTime(120, now); // 120Hz electrical hum

    const humFilter = ctx.createBiquadFilter();
    humFilter.type = 'lowpass';
    humFilter.frequency.setValueAtTime(220, now);

    const humGain = ctx.createGain();
    humGain.gain.setValueAtTime(0.009, now);

    humOsc.connect(humFilter);
    humFilter.connect(humGain);
    humGain.connect(masterGain);
    humOsc.start();
    nodes.push(humOsc, humFilter, humGain);

    // B. Rhythmic clicking machinery (repeater/clockwork ticker at ~130 BPM)
    let tickCount = 0;
    const tickerTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      try {
        const t = ctx.currentTime;
        tickCount++;
        const isAccent = tickCount % 4 === 0;

        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'square';
        clickOsc.frequency.setValueAtTime(isAccent ? 1600 : 1200, t);
        clickOsc.frequency.exponentialRampToValueAtTime(320, t + 0.015);

        clickGain.gain.setValueAtTime(isAccent ? 0.022 : 0.012, t);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

        clickOsc.connect(clickGain);
        clickGain.connect(masterGain);
        clickOsc.start(t);
        clickOsc.stop(t + 0.018);
      } catch {
        // Ignore
      }
    }, 230);
    intervalIds.push(tickerTimer);

    // C. Occasional pneumatic pressure release (every 6.5s)
    const pneumaticTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      try {
        const t = ctx.currentTime;
        const pNoise = ctx.createBufferSource();
        pNoise.buffer = this.getNoiseBuffer(ctx);
        const pFilter = ctx.createBiquadFilter();
        pFilter.type = 'bandpass';
        pFilter.frequency.setValueAtTime(1400, t);
        pFilter.Q.setValueAtTime(2.0, t);

        const pGain = ctx.createGain();
        pGain.gain.setValueAtTime(0, t);
        pGain.gain.linearRampToValueAtTime(0.015, t + 0.04);
        pGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);

        pNoise.connect(pFilter);
        pFilter.connect(pGain);
        pGain.connect(masterGain);
        pNoise.start(t);
        pNoise.stop(t + 0.32);
      } catch {
        // Ignore
      }
    }, 6500);
    intervalIds.push(pneumaticTimer);

    return { nodes, intervalIds };
  }

  /* -------------------------------------------------------------------------
   * 3. MIDNIGHT VAULT: Deep nocturnal cave resonance, starry wind & night chimes
   * ------------------------------------------------------------------------- */
  private buildMidnightVaultSoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // Deep sub-bass nocturnal drone (sine at 58Hz A#1)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(58.27, now);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.018, now);
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start();
    nodes.push(subOsc, subGain);

    // Nocturnal high air hiss
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.getNoiseBuffer(ctx);
    noiseSource.loop = true;

    const hpFilter = ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(2600, now);

    const airGain = ctx.createGain();
    airGain.gain.setValueAtTime(0.006, now);

    noiseSource.connect(hpFilter);
    hpFilter.connect(airGain);
    airGain.connect(masterGain);
    noiseSource.start();
    nodes.push(noiseSource, hpFilter, airGain);

    // Distant nocturnal starry harmonic bell (every 4s)
    const bellTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      try {
        const t = ctx.currentTime;
        const bell = ctx.createOscillator();
        const bGain = ctx.createGain();
        bell.type = 'sine';
        const freqs = [880, 1174.66, 1318.51, 1567.98];
        const f = freqs[Math.floor(Math.random() * freqs.length)];
        bell.frequency.setValueAtTime(f, t);

        bGain.gain.setValueAtTime(0, t);
        bGain.gain.linearRampToValueAtTime(0.012, t + 0.05);
        bGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

        bell.connect(bGain);
        bGain.connect(masterGain);
        bell.start(t);
        bell.stop(t + 1.2);
      } catch {
        // Ignore
      }
    }, 4200);
    intervalIds.push(bellTimer);

    return { nodes, intervalIds };
  }

  /* -------------------------------------------------------------------------
   * 4. NEURAL SANCTUM: Server room cooling airflow & computational data stream
   * ------------------------------------------------------------------------- */
  private buildNeuralSanctumSoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // Server room cooling airflow hum
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.getNoiseBuffer(ctx);
    noiseSource.loop = true;

    const bpFilter = ctx.createBiquadFilter();
    bpFilter.type = 'bandpass';
    bpFilter.frequency.setValueAtTime(440, now);
    bpFilter.Q.setValueAtTime(1.1, now);

    const airGain = ctx.createGain();
    airGain.gain.setValueAtTime(0.016, now);

    noiseSource.connect(bpFilter);
    bpFilter.connect(airGain);
    airGain.connect(masterGain);
    noiseSource.start();
    nodes.push(noiseSource, bpFilter, airGain);

    // Rhythmic computational data stream micro-bleeps (every 350-500ms)
    const streamTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      if (Math.random() < 0.35) return; // natural computation pause
      try {
        const t = ctx.currentTime;
        const beepOsc = ctx.createOscillator();
        const beepGain = ctx.createGain();
        beepOsc.type = 'sine';
        const freqs = [1320, 1567.98, 1760, 2093, 2349.32];
        const f = freqs[Math.floor(Math.random() * freqs.length)];
        beepOsc.frequency.setValueAtTime(f, t);

        beepGain.gain.setValueAtTime(0.009, t);
        beepGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

        beepOsc.connect(beepGain);
        beepGain.connect(masterGain);
        beepOsc.start(t);
        beepOsc.stop(t + 0.035);
      } catch {
        // Ignore
      }
    }, 380);
    intervalIds.push(streamTimer);

    return { nodes, intervalIds };
  }

  /* -------------------------------------------------------------------------
   * 5. CREATIVE PRISM: Ethereal glass harmonic drone & amethyst crystal resonance
   * ------------------------------------------------------------------------- */
  private buildCreativePrismSoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // Dual detuned ethereal glass sine drone (natural acoustic beating)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(330, now);
    osc2.frequency.setValueAtTime(331.4, now); // 1.4Hz binaural beat

    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.012, now);

    osc1.connect(droneGain);
    osc2.connect(droneGain);
    droneGain.connect(masterGain);
    osc1.start();
    osc2.start();
    nodes.push(osc1, osc2, droneGain);

    // Amethyst cluster crystalline shimmer chime (every 3.6s)
    const amethystTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      try {
        const t = ctx.currentTime;
        const notes = [830.61, 987.77, 1318.51, 1661.22];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.05);

          g.gain.setValueAtTime(0, t + idx * 0.05);
          g.gain.linearRampToValueAtTime(0.01, t + idx * 0.05 + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.05 + 0.7);

          osc.connect(g);
          g.connect(masterGain);
          osc.start(t + idx * 0.05);
          osc.stop(t + idx * 0.05 + 0.7);
        });
      } catch {
        // Ignore
      }
    }, 3600);
    intervalIds.push(amethystTimer);

    return { nodes, intervalIds };
  }

  /* -------------------------------------------------------------------------
   * 6. CONTENT STUDIO / NETHER FORGE: Soft typing in the content studio & room air
   * ------------------------------------------------------------------------- */
  private buildContentStudioSoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // A. Warm studio room air tone / subtle vinyl lo-fi bed
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.getNoiseBuffer(ctx);
    noiseSource.loop = true;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(260, now);

    const roomGain = ctx.createGain();
    roomGain.gain.setValueAtTime(0.01, now);

    noiseSource.connect(lp);
    lp.connect(roomGain);
    roomGain.connect(masterGain);
    noiseSource.start();
    nodes.push(noiseSource, lp, roomGain);

    // B. Procedural realistic typing rhythm (realistic bursts and pauses)
    let keystrokeStreak = 0;
    let isThinkingPause = false;

    const typingTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;

      if (isThinkingPause) {
        if (Math.random() < 0.45) {
          isThinkingPause = false;
          keystrokeStreak = 0;
        }
        return;
      }

      keystrokeStreak++;
      if (keystrokeStreak > Math.floor(Math.random() * 8 + 6)) {
        // Writer pauses for a moment
        isThinkingPause = true;
        return;
      }

      try {
        const t = ctx.currentTime;

        // Mechanical key thud (body bottom out)
        const thudOsc = ctx.createOscillator();
        const thudGain = ctx.createGain();
        thudOsc.type = 'triangle';
        const thudFreq = 340 + (Math.random() - 0.5) * 60;
        thudOsc.frequency.setValueAtTime(thudFreq, t);
        thudOsc.frequency.exponentialRampToValueAtTime(140, t + 0.02);

        thudGain.gain.setValueAtTime(0.018, t);
        thudGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);

        thudOsc.connect(thudGain);
        thudGain.connect(masterGain);
        thudOsc.start(t);
        thudOsc.stop(t + 0.025);

        // Crisp keycap tactile click snap
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'square';
        const clickFreq = 2200 + (Math.random() - 0.5) * 400;
        clickOsc.frequency.setValueAtTime(clickFreq, t);
        clickOsc.frequency.exponentialRampToValueAtTime(800, t + 0.012);

        clickGain.gain.setValueAtTime(0.014, t);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);

        clickOsc.connect(clickGain);
        clickGain.connect(masterGain);
        clickOsc.start(t);
        clickOsc.stop(t + 0.015);
      } catch {
        // Ignore
      }
    }, 220);
    intervalIds.push(typingTimer);

    return { nodes, intervalIds };
  }

  /* -------------------------------------------------------------------------
   * 7. GROWTH CANOPY: Forest whispers, leaf rustle & lush cave dripleaf drops
   * ------------------------------------------------------------------------- */
  private buildGrowthCanopySoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // Forest canopy rustling leaves (swept filtered noise)
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.getNoiseBuffer(ctx);
    noiseSource.loop = true;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(550, now);
    bp.Q.setValueAtTime(1.5, now);

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.18, now); // Gentle rustle speed

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(220, now);
    lfo.connect(lfoGain);
    lfoGain.connect(bp.frequency);

    const canopyGain = ctx.createGain();
    canopyGain.gain.setValueAtTime(0.015, now);

    noiseSource.connect(bp);
    bp.connect(canopyGain);
    canopyGain.connect(masterGain);
    noiseSource.start();
    lfo.start();
    nodes.push(noiseSource, bp, lfo, lfoGain, canopyGain);

    // Lush Cave dripleaf water drops (every 2.8s)
    const dripTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      try {
        const t = ctx.currentTime;
        const drip = ctx.createOscillator();
        const dGain = ctx.createGain();
        drip.type = 'sine';
        const startPitch = 1400 + Math.random() * 300;
        drip.frequency.setValueAtTime(startPitch, t);
        drip.frequency.exponentialRampToValueAtTime(startPitch * 0.65, t + 0.05);

        dGain.gain.setValueAtTime(0, t);
        dGain.gain.linearRampToValueAtTime(0.016, t + 0.005);
        dGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

        drip.connect(dGain);
        dGain.connect(masterGain);
        drip.start(t);
        drip.stop(t + 0.06);
      } catch {
        // Ignore
      }
    }, 2800);
    intervalIds.push(dripTimer);

    return { nodes, intervalIds };
  }

  /* -------------------------------------------------------------------------
   * 8. TELEMETRY TOWER: High tower antenna wind & radar sonar sweeps
   * ------------------------------------------------------------------------- */
  private buildTelemetryTowerSoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // High altitude antenna air rush
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.getNoiseBuffer(ctx);
    noiseSource.loop = true;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(950, now);
    bp.Q.setValueAtTime(2.2, now);

    const towerGain = ctx.createGain();
    towerGain.gain.setValueAtTime(0.014, now);

    noiseSource.connect(bp);
    bp.connect(towerGain);
    towerGain.connect(masterGain);
    noiseSource.start();
    nodes.push(noiseSource, bp, towerGain);

    // Sonar sweep radar ping (every 3.8s)
    const sonarTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      try {
        const t = ctx.currentTime;
        const ping = ctx.createOscillator();
        const pGain = ctx.createGain();
        ping.type = 'sine';
        ping.frequency.setValueAtTime(1320, t);
        ping.frequency.exponentialRampToValueAtTime(1100, t + 0.4);

        pGain.gain.setValueAtTime(0, t);
        pGain.gain.linearRampToValueAtTime(0.014, t + 0.02);
        pGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);

        ping.connect(pGain);
        pGain.connect(masterGain);
        ping.start(t);
        ping.stop(t + 0.55);
      } catch {
        // Ignore
      }
    }, 3800);
    intervalIds.push(sonarTimer);

    return { nodes, intervalIds };
  }

  /* -------------------------------------------------------------------------
   * 9. DIAMOND ARCHIVES: Subterranean crystalline cave drone & mineral chimes
   * ------------------------------------------------------------------------- */
  private buildDiamondArchivesSoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // Subterranean crystal cave drone (sine 73Hz D2)
    const caveOsc = ctx.createOscillator();
    caveOsc.type = 'sine';
    caveOsc.frequency.setValueAtTime(73.42, now);

    const caveGain = ctx.createGain();
    caveGain.gain.setValueAtTime(0.014, now);
    caveOsc.connect(caveGain);
    caveGain.connect(masterGain);
    caveOsc.start();
    nodes.push(caveOsc, caveGain);

    // Pristine high-mineral chime (every 4.2s)
    const mineralTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      try {
        const t = ctx.currentTime;
        const freqs = [1174.66, 1567.98, 2093.00];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.08);

          g.gain.setValueAtTime(0, t + idx * 0.08);
          g.gain.linearRampToValueAtTime(0.012, t + idx * 0.08 + 0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.08 + 0.85);

          osc.connect(g);
          g.connect(masterGain);
          osc.start(t + idx * 0.08);
          osc.stop(t + idx * 0.08 + 0.85);
        });
      } catch {
        // Ignore
      }
    }, 4200);
    intervalIds.push(mineralTimer);

    return { nodes, intervalIds };
  }

  /* -------------------------------------------------------------------------
   * 10. ARCHITECT'S CITADEL: Clockwork pendulum escapement & fireplace embers
   * ------------------------------------------------------------------------- */
  private buildArchitectCitadelSoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // Master craftsman clockwork pendulum escapement (1.0 Hz tick-tock)
    let isTick = true;
    const clockTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      try {
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(isTick ? 740 : 560, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.025);

        g.gain.setValueAtTime(0.016, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

        osc.connect(g);
        g.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.03);
        isTick = !isTick;
      } catch {
        // Ignore
      }
    }, 1000);
    intervalIds.push(clockTimer);

    // Warm fireplace ember crackles (random micro-sparks every 2.4s)
    const emberTimer = window.setInterval(() => {
      if (!this.enabled || ctx.state === 'suspended') return;
      try {
        const t = ctx.currentTime;
        const spark = ctx.createOscillator();
        const sg = ctx.createGain();
        spark.type = 'square';
        spark.frequency.setValueAtTime(2400 + Math.random() * 800, t);
        sg.gain.setValueAtTime(0.012, t);
        sg.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);
        spark.connect(sg);
        sg.connect(masterGain);
        spark.start(t);
        spark.stop(t + 0.018);
      } catch {
        // Ignore
      }
    }, 2400);
    intervalIds.push(emberTimer);

    return { nodes, intervalIds };
  }

  /* -------------------------------------------------------------------------
   * 11. BEACON OBSERVATORY: Wind in the peaks & soaring celestial beacon beam
   * ------------------------------------------------------------------------- */
  private buildBeaconObservatorySoundscape(ctx: AudioContext, masterGain: GainNode) {
    const nodes: AudioNode[] = [];
    const intervalIds: number[] = [];
    const now = ctx.currentTime;

    // Mountain peak wind gusts (noise buffer through bandpass swept by twin LFOs)
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.getNoiseBuffer(ctx);
    noiseSource.loop = true;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(650, now);
    bp.Q.setValueAtTime(2.2, now);

    // LFO 1: Primary slow gust (0.09 Hz)
    const lfo1 = ctx.createOscillator();
    lfo1.type = 'sine';
    lfo1.frequency.setValueAtTime(0.09, now);

    const lfo1Gain = ctx.createGain();
    lfo1Gain.gain.setValueAtTime(450, now);
    lfo1.connect(lfo1Gain);
    lfo1Gain.connect(bp.frequency);

    // LFO 2: Asynchronous secondary swell (0.22 Hz)
    const lfo2 = ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.setValueAtTime(0.22, now);

    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.setValueAtTime(220, now);
    lfo2.connect(lfo2Gain);
    lfo2Gain.connect(bp.frequency);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.02, now);

    noiseSource.connect(bp);
    bp.connect(windGain);
    windGain.connect(masterGain);

    noiseSource.start();
    lfo1.start();
    lfo2.start();
    nodes.push(noiseSource, bp, lfo1, lfo1Gain, lfo2, lfo2Gain, windGain);

    // Skyward celestial beacon harmonic tone (440Hz + 880Hz)
    const bOsc1 = ctx.createOscillator();
    const bOsc2 = ctx.createOscillator();
    bOsc1.type = 'sine';
    bOsc2.type = 'sine';
    bOsc1.frequency.setValueAtTime(440, now);
    bOsc2.frequency.setValueAtTime(880, now);

    const bGain = ctx.createGain();
    bGain.gain.setValueAtTime(0.008, now);

    bOsc1.connect(bGain);
    bOsc2.connect(bGain);
    bGain.connect(masterGain);

    bOsc1.start();
    bOsc2.start();
    nodes.push(bOsc1, bOsc2, bGain);

    return { nodes, intervalIds };
  }
}

export const sound = new SoundEngine();
