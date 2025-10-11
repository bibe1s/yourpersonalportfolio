import { Profile } from './types';

// ============================================
// DEFAULT PROFILE - Starting template
// ============================================

export const defaultProfile: Profile = {
  id: 'default-profile',
  
  // Social Links (empty array - user will add)
  socialLinks: [],
  
  // Display Settings
  displaySettings: {
    showWeb2: true,
    showWeb3: true,
    defaultView: 'web2', // Show Web2 first by default
  },
  
  // Web2 Content (Real You - Professional)
  web2: {
    // Personal info for Web2
    personal: {
      name: 'Your Real Name',
      title: 'Frontend Developer',
      email: 'your.real@example.com',
      phone: '+63 XXX-XXX-XXXX',
      image: '', // Your real photo
      imageIs3D: true,
    },
    
    // Sections for Web2
    sections: [
      // Section 1: Tech Stack
      {
        id: 'web2-section-1',
        name: 'Tech Stack',
        type: 'techStack',
        techStack: [],
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
  
  // Web3 Content (Your Persona - Blockchain Identity)
  web3: {
    // Personal info for Web3 (Different from Web2!)
    personal: {
      name: 'YourName.eth',
      title: 'Community Ambassador',
      email: 'your.web3@example.com',
      phone: '', // Optional - maybe you don't share in web3
      image: '', // Your avatar/PFP/character art
      imageIs3D: false,
    },
    
    // Sections for Web3
    sections: [
      // Section 1: Communities
      {
        id: 'web3-section-1',
        name: 'Communities',
        type: 'techStack', // Using techStack type for community logos
        techStack: [],
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
      type: 'none',
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
    id: `profile-${Date.now()}`,
    socialLinks: [],
    web2: {
      personal: {
        name: '',
        title: '',
        email: '',
        phone: '',
        image: '',
        imageIs3D: true,
      },
      sections: [],
    },
    web3: {
      personal: {
        name: '',
        title: '',
        email: '',
        phone: '',
        image: '',
        imageIs3D: false,
      },
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