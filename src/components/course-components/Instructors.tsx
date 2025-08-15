import React from 'react';
import { InstructorsComponent } from '../../types/course';

interface InstructorsProps {
  data: InstructorsComponent;
}

const Instructors: React.FC<InstructorsProps> = ({ data }) => {
  const { instructors } = data;

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Your Instructors
          </h2>
          <p className="text-lg text-gray-600">
            Learn from industry experts and thought leaders
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Instructor Image */}
              <div className="text-center mb-4">
                {instructor.featuredImage ? (
                  <img
                    src={instructor.featuredImage}
                    alt={instructor.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl text-gray-400">👨‍🏫</span>
                  </div>
                )}
              </div>

              {/* Instructor Info */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {instructor.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {instructor.jobTitle}
                </p>
                {instructor.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {instructor.description}
                  </p>
                )}

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {(instructor.socialLinks.linkedin || instructor.socialLinks.linkedinUrl) && (
                    <a
                      href={instructor.socialLinks.linkedin || instructor.socialLinks.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      💼
                    </a>
                  )}
                  {(instructor.socialLinks.twitter || instructor.socialLinks.twitterUrl) && (
                    <a
                      href={instructor.socialLinks.twitter || instructor.socialLinks.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                    >
                      🐦
                    </a>
                  )}
                  {(instructor.socialLinks.website || instructor.socialLinks.websiteUrl) && (
                    <a
                      href={instructor.socialLinks.website || instructor.socialLinks.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                    >
                      🌐
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {instructors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl text-gray-400">👨‍🏫</span>
            </div>
            <p className="text-gray-500">No instructors added yet. Use the properties panel to add instructor profiles.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructors;