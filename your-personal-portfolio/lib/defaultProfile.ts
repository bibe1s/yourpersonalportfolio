import { Profile } from './types';

// ============================================
// DEFAULT PROFILE - Starting template
// ============================================

export const defaultProfile: Profile = {
  id: 'default-profile',
  
  // Personal Information
  personal: {
    name: 'Your Name',
    title: 'Your Title / Role',
    email: 'your.email@example.com',
    phone: '+63 XXX-XXX-XXXX',
    image: '', // Empty - user will upload
    imageIs3D: true, // 3D effect enabled by default
  },
  
  // Social Links (empty array - user will add)
  socialLinks: [],
  
  // Display Settings
  displaySettings: {
    showWeb2: true,
    showWeb3: true,
    defaultView: 'web2', // Show Web2 first by default
  },
  
  // Web2 Content
  web2: {
    sections: [
      // Section 1: Tech Stack
      {
        id: 'web2-section-1',
        name: 'Tech Stack',
        type: 'techStack',
        techStack: [
          // Empty - user will add their tech stack
        ],
        order: 0,
      },
      
      // Section 2: Past Projects
      {
        id: 'web2-section-2',
        name: 'Past Projects',
        type: 'content',
        contentBlocks: [
          {
            id: 'web2-block-1',
            type: 'title',
            content: 'Project Title',
            order: 0,
          },
          {
            id: 'web2-block-2',
            type: 'context',
            content: 'Brief description of your project',
            duration: '2024',
            order: 1,
          },
        ],
        order: 1,
      },
      
      // Section 3: Educational Attainment
      {
        id: 'web2-section-3',
        name: 'Educational Attainment',
        type: 'content',
        contentBlocks: [
          {
            id: 'web2-block-3',
            type: 'title',
            content: 'School Name',
            order: 0,
          },
          {
            id: 'web2-block-4',
            type: 'context',
            content: 'Degree / Course',
            duration: '2020 - 2024',
            order: 1,
          },
        ],
        order: 2,
      },
    ],
  },
  
  // Web3 Content
  web3: {
    sections: [
      // Section 1: Communities
      {
        id: 'web3-section-1',
        name: 'Communities',
        type: 'techStack', // Using techStack type for community icons
        techStack: [
          // Empty - user will add community logos
        ],
        order: 0,
      },
      
      // Section 2: Web3 Footprints
      {
        id: 'web3-section-2',
        name: 'Web3 Footprints',
        type: 'content',
        contentBlocks: [
          {
            id: 'web3-block-1',
            type: 'title',
            content: 'Community Ambassador',
            order: 0,
          },
          {
            id: 'web3-block-2',
            type: 'context',
            content: 'Role description and contributions',
            duration: '2024',
            order: 1,
          },
        ],
        order: 1,
      },
    ],
  },
  
  // Theme Settings
  theme: {
    background: {
      type: 'none', // No background by default
      color: '#ffffff',
      speed: 50,
      density: 50,
      interactive: false,
    },
    accentColor: '#3b82f6', // Blue
    textColor: '#000000', // Black
  },
};

// ============================================
// HELPER: Create empty profile
// ============================================

export function createEmptyProfile(): Profile {
  return {
    ...defaultProfile,
    id: `profile-${Date.now()}`, // Unique ID based on timestamp
    personal: {
      ...defaultProfile.personal,
    },
    socialLinks: [],
    web2: {
      sections: [],
    },
    web3: {
      sections: [],
    },
  };
}

// ============================================
// HELPER: Generate unique IDs
// ============================================

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Example usage:
// generateId('section') → "section-1234567890-a1b2c3d4e"
// generateId('block') → "block-1234567890-x9y8z7w6v"