// components/layouts/LeftSideLayout.tsx

"use client";

import { Profile, ProfileMode } from '@/lib/types';
import { HolographicProfileCard } from '@/components/profile/HolographicProfileCard';
import { SocialLinks } from '@/components/profile/SocialLinks';
import { ContentBlock } from '@/components/profile/ContentBlock';
import { TechStackSection } from '@/components/profile/TechStackSection';
import { BackgroundWrapper } from '@/components/backgrounds/BackgroundWrapper';

interface LeftSideLayoutProps {
  profile: Profile;
  currentMode: ProfileMode;
}

export function LeftSideLayout({ profile, currentMode }: LeftSideLayoutProps) {
  const currentData = profile[currentMode];
  const currentSections = currentData.sections;
  const currentBackground = currentData.background;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Panel - Profile (Black Background - NO THEME) */}
      <div className="w-full lg:w-1/3 bg-black flex flex-col justify-center lg:sticky lg:top-0 lg:h-screen z-10">
        <HolographicProfileCard personal={currentData.personal} />
        <SocialLinks links={currentData.socialLinks} />
      </div>

      {/* Right Panel - Content (WITH BACKGROUND THEME) */}
      <div className="flex-1 relative">
        <BackgroundWrapper config={currentBackground}>
          <div className="min-h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto py-8 lg:py-12 px-4 lg:px-8">
              {/* Sections */}
              <div className="space-y-8">
                {currentSections
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <div key={section.id}>
                      {section.type === 'techStack' && section.techStack ? (
                        <TechStackSection
                          title={section.name}
                          items={section.techStack}
                        />
                      ) : section.type === 'content' && section.contentBlocks ? (
                        <div className="mb-8">
                          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">
                            {section.name}
                          </h2>
                          <div className="space-y-3">
                            {section.contentBlocks
                              .sort((a, b) => a.order - b.order)
                              .map((block) => (
                                <ContentBlock key={block.id} block={block} />
                              ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </BackgroundWrapper>
      </div>
    </div>
  );
}