// components/layouts/RightSideLayout.tsx

"use client";

import { Profile, ProfileMode } from '@/lib/types';
import { HolographicProfileCard } from '@/components/profile/HolographicProfileCard';
import { SocialLinks } from '@/components/profile/SocialLinks';
import { ContentBlock } from '@/components/profile/ContentBlock';
import { TechStackSection } from '@/components/profile/TechStackSection';
import { BackgroundWrapper } from '@/components/backgrounds/BackgroundWrapper';

interface RightSideLayoutProps {
  profile: Profile;
  currentMode: ProfileMode;
}

export function RightSideLayout({ profile, currentMode }: RightSideLayoutProps) {
  const currentData = profile[currentMode];
  const currentSections = currentData.sections;
  const currentBackground = currentData.background;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Content Panel - Shows second on mobile, left on desktop (WITH BACKGROUND THEME) */}
      <div className="flex-1 relative lg:order-1">
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
                        <div className="mb-8">
                          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">
                            {section.name}
                          </h2>
                          <div className="flex flex-wrap gap-3 lg:gap-4">
                            {section.techStack
                              .sort((a, b) => a.order - b.order)
                              .map((item) => (
                                <div
                                  key={item.id}
                                  className="group relative"
                                  title={item.name}
                                >
                                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 overflow-hidden flex items-center justify-center group-hover:scale-110">
                                    {item.icon ? (
                                      <img
                                        src={item.icon}
                                        alt={item.name}
                                        className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                                      />
                                    ) : (
                                      <span className="text-xl lg:text-2xl font-bold text-gray-600">
                                        {item.name.charAt(0).toUpperCase()}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : section.type === 'content' && section.contentBlocks ? (
                        <div className="mb-8">
                          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">
                            {section.name}
                          </h2>
                          <div className="space-y-3">
                            {section.contentBlocks
                              .sort((a, b) => a.order - b.order)
                              .map((block) => (
                                <div key={block.id}>
                                  {block.type === 'title' ? (
                                    <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                                      {block.content}
                                      {block.duration && (
                                        <span className="text-sm lg:text-base text-gray-400 ml-2">
                                          ({block.duration})
                                        </span>
                                      )}
                                    </h3>
                                  ) : (
                                    <p className="text-sm lg:text-base text-gray-300">
                                      {block.content}
                                      {block.duration && (
                                        <span className="text-xs lg:text-sm text-gray-400 ml-2">
                                          • {block.duration}
                                        </span>
                                      )}
                                    </p>
                                  )}
                                </div>
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

      {/* Profile Panel - Shows first on mobile, right on desktop */}
      <div className="w-full lg:w-1/3 bg-black flex flex-col justify-center lg:order-2 lg:sticky lg:top-0 lg:h-screen z-10">
        <HolographicProfileCard personal={currentData.personal} />
        <SocialLinks links={currentData.socialLinks} />
      </div>
    </div>
  );
}