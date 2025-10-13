// ============================================
// BASIC TYPES
// ============================================

export type ContentBlockType = 'title' | 'context';
export type ProfileMode = 'web2' | 'web3';
export type BackgroundType = 'none' | 'particles' | 'grid' | 'gradient' | 'meteors';
export type SocialPlatform = 
  | 'linkedin' 
  | 'github' 
  | 'email' 
  | 'website' 
  | 'twitter' 
  | 'facebook' 
  | 'instagram' 
  | 'youtube' 
  | 'tiktok' 
  | 'behance' 
  | 'dribbble' 
  | 'medium';

// ============================================
// CONTENT BLOCKS
// ============================================

export interface ContentBlock {
  id: string;                    // Unique ID: "block-123"
  type: ContentBlockType;        // "title" or "context"
  content: string;               // The actual text
  duration?: string;             // Optional: "2023 - 2024"
  order: number;                 // For sorting: 0, 1, 2, etc.
}

// ============================================
// TECH STACK
// ============================================

export interface TechStackItem {
  id: string;                    // Unique ID: "tech-123"
  name: string;                  // "React", "TypeScript", etc.
  icon: string;                  // URL to icon image
  order: number;                 // For sorting
}

// ============================================
// SOCIAL LINKS
// ============================================

export interface SocialLink {
  id: string;                    // Unique ID: "social-123"
  platform: SocialPlatform;      // "linkedin", "github", etc.
  url: string;                   // Full URL
  order: number;                 // For sorting
}

// ============================================
// PERSONAL INFO
// ============================================

export interface PersonalInfo {
  name: string;                  // "John Doe"
  title: string;                 // "Frontend Developer"
  email: string;                 // "john@example.com"
  phone: string;                 // "+63 123-456-7890"
  image: string;                 // URL to profile image
  imageIs3D: boolean;            // Enable/disable 3D effect

  enable3D?: boolean;        // Toggle for 3D tilt effect
  enableGradient?: boolean;  // Toggle for animated gradient border
}

// ============================================
// BACKGROUND CONFIG
// ============================================

export interface BackgroundConfig {
  type: BackgroundType;          // "particles", "grid", etc.
  color: string;                 // Hex color: "#3b82f6"
  speed: number;                 // 0-100
  density: number;               // 0-100
  interactive: boolean;          // Animate on hover?
  customOptions?: Record<string, any>; // Extra settings
}

// ============================================
// SECTIONS (Main content areas)
// ============================================

export interface ProfileSection {
  id: string;                    // Unique ID: "section-123"
  name: string;                  // "Tech Stack", "Past Projects"
  type: 'content' | 'techStack'; // What kind of section?
  contentBlocks?: ContentBlock[]; // If type is 'content'
  techStack?: TechStackItem[];   // If type is 'techStack'
  order: number;                 // For sorting
}

// ============================================
// DISPLAY SETTINGS
// ============================================

export interface ProfileDisplaySettings {
  showWeb2: boolean;             // Show Web2 profile?
  showWeb3: boolean;             // Show Web3 profile?
  defaultView: ProfileMode;      // Which one to show first?
}

// ============================================
// MAIN PROFILE (Everything together!)
// ============================================

export interface Profile {
  id: string;                    // Unique profile ID   // Array of social links
  displaySettings: ProfileDisplaySettings;
  
  // Separate content AND personal info for Web2 and Web3
  web2: {
    personal: PersonalInfo;      // ✅ Web2 has its own personal info
    socialLinks: SocialLink[];  // Web2 social links
    sections: ProfileSection[];  // Web2 content sections
    background: BackgroundConfig;
  };
  web3: {
    personal: PersonalInfo;      // ✅ Web3 has its own personal info
    socialLinks: SocialLink[];  // Web3 social links
    sections: ProfileSection[];  // Web3 content sections
    background: BackgroundConfig;
  };
  
  // Visual theme
  theme: {
    accentColor: string;         // Main color for buttons, etc.
    textColor: string;           // Text color
  };
}

// ============================================
// EDITOR STATE (For save/cancel system)
// ============================================

export interface SectionState {
  id: string;                    // Section identifier
  name: string;                  // Section name
  hasUnsavedChanges: boolean;    // Has changes?
  lastSavedAt: Date | null;      // When was it saved?
}

export interface EditorState {
  currentMode: ProfileMode;      // Currently editing web2 or web3?
  isEditing: boolean;            // In edit mode?
  hasUnsavedChanges: boolean;    // Any unsaved changes?
  
  sections: {
    personalInfo: SectionState;
    socialLinks: SectionState;
    displaySettings: SectionState;
    web2Content: SectionState;
    web3Content: SectionState;
    background: SectionState;
  };
}