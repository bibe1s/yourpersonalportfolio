"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Profile, 
  ContentBlock, 
  TechStackItem, 
  SocialLink, 
  ProfileSection,
  BackgroundConfig,
  PersonalInfo,
  ProfileDisplaySettings,
  ProfileMode
} from '@/lib/types';
import { defaultProfile, generateId } from '@/lib/defaultProfile';

// ============================================
// CONTEXT TYPE - All the data and functions
// ============================================

interface ProfileContextType {
  // Current state
  profile: Profile;
  savedProfile: Profile;
  currentMode: ProfileMode;
  hasUnsavedChanges: boolean;
  
  // Mode switching
  setCurrentMode: (mode: ProfileMode) => void;
  
  // Personal Info
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void;
  
  // Social Links
  addSocialLink: (link: Omit<SocialLink, 'id' | 'order'>) => void;
  updateSocialLink: (linkId: string, updates: Partial<SocialLink>) => void;
  deleteSocialLink: (linkId: string) => void;
  
  // Display Settings
  updateDisplaySettings: (settings: Partial<ProfileDisplaySettings>) => void;
  
  // Sections
  addSection: (mode: ProfileMode, section: Omit<ProfileSection, 'id' | 'order'>) => void;
  updateSection: (mode: ProfileMode, sectionId: string, updates: Partial<ProfileSection>) => void;
  deleteSection: (mode: ProfileMode, sectionId: string) => void;
  
  // Content Blocks
  addContentBlock: (mode: ProfileMode, sectionId: string, block: Omit<ContentBlock, 'id' | 'order'>) => void;
  updateContentBlock: (mode: ProfileMode, sectionId: string, blockId: string, updates: Partial<ContentBlock>) => void;
  deleteContentBlock: (mode: ProfileMode, sectionId: string, blockId: string) => void;
  
  // Tech Stack
  addTechStack: (mode: ProfileMode, sectionId: string, tech: Omit<TechStackItem, 'id' | 'order'>) => void;
  updateTechStack: (mode: ProfileMode, sectionId: string, techId: string, updates: Partial<TechStackItem>) => void;
  deleteTechStack: (mode: ProfileMode, sectionId: string, techId: string) => void;
  
  // Background
  updateBackground: (config: Partial<BackgroundConfig>) => void;
  
  // Save/Cancel system
  saveChanges: () => void;
  discardChanges: () => void;
  
  // Export/Import
  exportProfile: () => string;
  importProfile: (jsonString: string) => void;
}

// ============================================
// CREATE CONTEXT
// ============================================

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// ============================================
// PROVIDER COMPONENT
// ============================================

export function ProfileProvider({ children }: { children: ReactNode }) {
  // Current profile being edited (draft)
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  
  // Last saved profile (for cancel/revert)
  const [savedProfile, setSavedProfile] = useState<Profile>(defaultProfile);
  
  // Current editing mode (web2 or web3)
  const [currentMode, setCurrentMode] = useState<ProfileMode>('web2');
  
  // Check if there are unsaved changes
  const hasUnsavedChanges = JSON.stringify(profile) !== JSON.stringify(savedProfile);
  
  // ============================================
  // LOAD FROM LOCALSTORAGE ON MOUNT
  // ============================================
  
  useEffect(() => {
    const savedData = localStorage.getItem('portfolio-profile');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProfile(parsed);
        setSavedProfile(parsed);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    }
  }, []);
  
  // ============================================
  // PERSONAL INFO
  // ============================================
  
  const updatePersonalInfo = (updates: Partial<PersonalInfo>) => {
    setProfile(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...updates,
      },
    }));
  };
  
  // ============================================
  // SOCIAL LINKS
  // ============================================
  
  const addSocialLink = (link: Omit<SocialLink, 'id' | 'order'>) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        {
          ...link,
          id: generateId('social'),
          order: prev.socialLinks.length,
        },
      ],
    }));
  };
  
  const updateSocialLink = (linkId: string, updates: Partial<SocialLink>) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link =>
        link.id === linkId ? { ...link, ...updates } : link
      ),
    }));
  };
  
  const deleteSocialLink = (linkId: string) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.id !== linkId),
    }));
  };
  
  // ============================================
  // DISPLAY SETTINGS
  // ============================================
  
  const updateDisplaySettings = (settings: Partial<ProfileDisplaySettings>) => {
    setProfile(prev => ({
      ...prev,
      displaySettings: {
        ...prev.displaySettings,
        ...settings,
      },
    }));
  };
  
  // ============================================
  // SECTIONS
  // ============================================
  
  const addSection = (mode: ProfileMode, section: Omit<ProfileSection, 'id' | 'order'>) => {
    setProfile(prev => {
      const sections = prev[mode].sections;
      return {
        ...prev,
        [mode]: {
          sections: [
            ...sections,
            {
              ...section,
              id: generateId('section'),
              order: sections.length,
            },
          ],
        },
      };
    });
  };
  
  const updateSection = (mode: ProfileMode, sectionId: string, updates: Partial<ProfileSection>) => {
    setProfile(prev => ({
      ...prev,
      [mode]: {
        sections: prev[mode].sections.map(section =>
          section.id === sectionId ? { ...section, ...updates } : section
        ),
      },
    }));
  };
  
  const deleteSection = (mode: ProfileMode, sectionId: string) => {
    setProfile(prev => ({
      ...prev,
      [mode]: {
        sections: prev[mode].sections.filter(section => section.id !== sectionId),
      },
    }));
  };
  
  // ============================================
  // CONTENT BLOCKS
  // ============================================
  
  const addContentBlock = (
    mode: ProfileMode, 
    sectionId: string, 
    block: Omit<ContentBlock, 'id' | 'order'>
  ) => {
    setProfile(prev => ({
      ...prev,
      [mode]: {
        sections: prev[mode].sections.map(section => {
          if (section.id === sectionId && section.contentBlocks) {
            return {
              ...section,
              contentBlocks: [
                ...section.contentBlocks,
                {
                  ...block,
                  id: generateId('block'),
                  order: section.contentBlocks.length,
                },
              ],
            };
          }
          return section;
        }),
      },
    }));
  };
  
  const updateContentBlock = (
    mode: ProfileMode,
    sectionId: string,
    blockId: string,
    updates: Partial<ContentBlock>
  ) => {
    setProfile(prev => ({
      ...prev,
      [mode]: {
        sections: prev[mode].sections.map(section => {
          if (section.id === sectionId && section.contentBlocks) {
            return {
              ...section,
              contentBlocks: section.contentBlocks.map(block =>
                block.id === blockId ? { ...block, ...updates } : block
              ),
            };
          }
          return section;
        }),
      },
    }));
  };
  
  const deleteContentBlock = (mode: ProfileMode, sectionId: string, blockId: string) => {
    setProfile(prev => ({
      ...prev,
      [mode]: {
        sections: prev[mode].sections.map(section => {
          if (section.id === sectionId && section.contentBlocks) {
            return {
              ...section,
              contentBlocks: section.contentBlocks.filter(block => block.id !== blockId),
            };
          }
          return section;
        }),
      },
    }));
  };
  
  // ============================================
  // TECH STACK
  // ============================================
  
  const addTechStack = (
    mode: ProfileMode,
    sectionId: string,
    tech: Omit<TechStackItem, 'id' | 'order'>
  ) => {
    setProfile(prev => ({
      ...prev,
      [mode]: {
        sections: prev[mode].sections.map(section => {
          if (section.id === sectionId && section.techStack) {
            return {
              ...section,
              techStack: [
                ...section.techStack,
                {
                  ...tech,
                  id: generateId('tech'),
                  order: section.techStack.length,
                },
              ],
            };
          }
          return section;
        }),
      },
    }));
  };
  
  const updateTechStack = (
    mode: ProfileMode,
    sectionId: string,
    techId: string,
    updates: Partial<TechStackItem>
  ) => {
    setProfile(prev => ({
      ...prev,
      [mode]: {
        sections: prev[mode].sections.map(section => {
          if (section.id === sectionId && section.techStack) {
            return {
              ...section,
              techStack: section.techStack.map(tech =>
                tech.id === techId ? { ...tech, ...updates } : tech
              ),
            };
          }
          return section;
        }),
      },
    }));
  };
  
  const deleteTechStack = (mode: ProfileMode, sectionId: string, techId: string) => {
    setProfile(prev => ({
      ...prev,
      [mode]: {
        sections: prev[mode].sections.map(section => {
          if (section.id === sectionId && section.techStack) {
            return {
              ...section,
              techStack: section.techStack.filter(tech => tech.id !== techId),
            };
          }
          return section;
        }),
      },
    }));
  };
  
  // ============================================
  // BACKGROUND
  // ============================================
  
  const updateBackground = (config: Partial<BackgroundConfig>) => {
    setProfile(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        background: {
          ...prev.theme.background,
          ...config,
        },
      },
    }));
  };
  
  // ============================================
  // SAVE / CANCEL
  // ============================================
  
  const saveChanges = () => {
    // Save to localStorage
    localStorage.setItem('portfolio-profile', JSON.stringify(profile));
    
    // Update saved state
    setSavedProfile(profile);
    
    console.log('✅ Changes saved!');
  };
  
  const discardChanges = () => {
    // Revert to last saved state
    setProfile(savedProfile);
    
    console.log('↩️ Changes discarded!');
  };
  
  // ============================================
  // EXPORT / IMPORT
  // ============================================
  
  const exportProfile = (): string => {
    return JSON.stringify(profile, null, 2);
  };
  
  const importProfile = (jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString);
      setProfile(imported);
      setSavedProfile(imported);
      localStorage.setItem('portfolio-profile', jsonString);
      console.log('✅ Profile imported!');
    } catch (error) {
      console.error('❌ Failed to import profile:', error);
    }
  };
  
  // ============================================
  // PROVIDE CONTEXT VALUE
  // ============================================
  
  const value: ProfileContextType = {
    profile,
    savedProfile,
    currentMode,
    hasUnsavedChanges,
    setCurrentMode,
    updatePersonalInfo,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    updateDisplaySettings,
    addSection,
    updateSection,
    deleteSection,
    addContentBlock,
    updateContentBlock,
    deleteContentBlock,
    addTechStack,
    updateTechStack,
    deleteTechStack,
    updateBackground,
    saveChanges,
    discardChanges,
    exportProfile,
    importProfile,
  };
  
  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

// ============================================
// HOOK TO USE CONTEXT
// ============================================

export function useProfile() {
  const context = useContext(ProfileContext);
  
  if (context === undefined) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  
  return context;
}