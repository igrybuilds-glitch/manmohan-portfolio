export type SystemId = 'ai' | 'automation' | 'web' | 'growth';

export type WorldId =
  | 'origin'
  | 'automation'
  | 'after-sleep'
  | 'ai-lab'
  | 'creative'
  | 'content'
  | 'growth'
  | 'analytics'
  | 'projects'
  | 'founder'
  | 'contact';

export interface WorldDefinition {
  id: WorldId;
  order: number;
  label: string;
  navKey: string;
  tagline: string;
  subtitle: string;
  cameraPos: [number, number, number];
  cameraLookAt: [number, number, number];
  accentColor: string;
  badge: string;
}

export interface SystemNodeInfo {
  id: SystemId;
  name: string;
  tagline: string;
  category: string;
  color: string;
  accentColor: string;
  description: string;
  metrics: { label: string; value: string }[];
  features: string[];
  blockPosition: [number, number, number];
  iconName: string;
}

export type CameraViewMode = 'cinematic' | 'character' | 'systems' | 'overview';

export interface WorldSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
  timeOfDay: 'day' | 'golden' | 'dusk';
  quality: 'high' | 'medium' | 'low';
}

// Automation Node definition
export interface AutomationNode {
  id: string;
  label: string;
  role: string;
  icon: string;
  status: 'active' | 'processing' | 'idle';
  summary: string;
  detail: string;
}

// Business After Dark Timeline Step
export interface TimelineEvent {
  time: string;
  title: string;
  actor: 'visitor' | 'ai' | 'system' | 'owner';
  description: string;
  meta: string;
  tag: string;
}

// JARVIS Command definition
export interface JarvisCommand {
  id: string;
  prompt: string;
  response: string;
  telemetry: { label: string; val: string }[];
  actionTriggered: string;
}

// Project Showcase definition
export interface ProjectShowcase {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  statusTag: 'PROTOTYPE' | 'PRODUCTION' | 'CONCEPT' | 'DEMO';
  role: string;
  accentColor: string;
  problem: string;
  humanContext: string;
  thinking: string;
  solution: string;
  systemArchitecture: string[];
  businessValue: string;
  metrics: { label: string; value: string }[];
  workflowStages?: { step: string; title: string; desc: string }[];
}

