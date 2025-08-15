import React from 'react';
import { FeatureListComponent } from '../../types/course';

interface FeatureListProps {
  data: FeatureListComponent;
}

const FeatureList: React.FC<FeatureListProps> = ({ data }) => {
  const { title, description, features, itemStyle = 'card' } = data;

  return (
    <div className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {itemStyle === 'card' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                {feature.title && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                )}
                <div className="text-gray-700 whitespace-pre-line">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    {feature.title && (
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                    )}
                    <div className="text-gray-700 whitespace-pre-line">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Empty state */}
      {features.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No features added yet. Use the properties panel to add features.</p>
        </div>
      )}
    </div>
  );
};

export default FeatureList;