import React from 'react';
import { PromoBannerComponent } from '../../types/course';

interface PromoBannerProps {
  data: PromoBannerComponent;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ data }) => {
  const { title, button, backgroundCSS, illustrationImage } = data;

  const getButtonStyles = (variant: string) => {
    switch (variant) {
      case 'white':
        return 'bg-white text-gray-900 hover:bg-gray-100 border border-white';
      case 'secondary':
        return 'bg-transparent text-white hover:bg-white hover:text-gray-900 border border-white';
      default:
        return 'bg-red-600 text-white hover:bg-red-700 border border-red-600';
    }
  };

  return (
    <div className="py-12">
      <div
        className="relative overflow-hidden rounded-lg mx-6"
        style={{
          background: backgroundCSS || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '200px'
        }}
      >
        {/* Background Pattern or Image */}
        {illustrationImage && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={illustrationImage}
              alt="Banner illustration"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 px-8 py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {title || 'Special Offer - Limited Time!'}
            </h2>
            
            <button
              className={`px-8 py-3 rounded-lg font-semibold text-lg transition-colors ${getButtonStyles(button.variant)}`}
              onClick={() => {
                if (button.url && button.url !== '#') {
                  window.open(button.url, '_blank');
                }
              }}
            >
              {button.label || 'Take Action Now'}
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full translate-x-20 translate-y-20"></div>
      </div>
    </div>
  );
};

export default PromoBanner;