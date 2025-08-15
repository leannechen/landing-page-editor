import React from 'react';
import { HeroData, VideoData, EnrollButton } from '../../types/course';

interface HeroSectionProps {
  heroData: HeroData;
  videoData: VideoData;
  title: string;
  instructorName: string;
  enrollButton: EnrollButton;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (
    heroData: HeroData,
    videoData: VideoData,
    title: string,
    instructorName: string,
    enrollButton: EnrollButton
  ) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  heroData,
  videoData,
  title,
  instructorName,
  enrollButton,
  isSelected,
  onSelect,
  onUpdate
}) => {
  return (
    <div
      className={`relative mb-8 rounded-lg overflow-hidden ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
      style={{
        background: heroData.backgroundCSS,
        minHeight: '400px'
      }}
    >
      {/* Background Image */}
      {heroData.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        />
      )}

      {/* Hero Content */}
      <div className="relative z-10 px-8 py-16 flex items-center justify-between min-h-[500px]">
        <div className="flex-1 max-w-2xl pr-12">
          <h1
            className="text-5xl font-bold mb-8 leading-tight"
            style={{ color: heroData.titleColor }}
          >
            {title || 'Course Title'}
          </h1>
          <p
            className="text-base mb-10 leading-relaxed"
            style={{ color: heroData.titleColor, opacity: 0.95 }}
          >
            Instructor: {instructorName || 'Instructor Name'}
          </p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-lg font-bold text-xl transition-colors shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              if (enrollButton.enrollUrl && enrollButton.enrollUrl !== '#') {
                window.open(enrollButton.enrollUrl, '_blank');
              }
            }}
          >
            {enrollButton.label || 'Enroll Now'}
          </button>
        </div>

        {/* Illustration/Video Area */}
        <div className="flex-1 relative h-full flex items-center justify-center">
          {/* Video player - positioned to the left */}
          {videoData.youtubeVideoId && videoData.thumbnail && (
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl z-10 mr-8" style={{ width: '480px', height: '270px' }}>
              <img
                src={videoData.thumbnail}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors cursor-pointer">
                  <span className="text-white text-3xl ml-1">▶</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Fallback when no content */}
          {!heroData.illustrationImage && !videoData.youtubeVideoId && (
            <div className="w-full max-w-lg h-80 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <p className="text-white text-center">
                Add illustration image or video
              </p>
            </div>
          )}
        </div>
        {/* Main illustration image - positioned to the right of video, more visible */}
        {heroData.illustrationImage && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-5">
            <img
              src={heroData.illustrationImage}
              alt="Course illustration"
              className="w-80 h-auto object-contain opacity-90"
            />
          </div>
        )}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
          Hero Section (Fixed Position)
        </div>
      )}
    </div>
  );
};

export default HeroSection;