import React from 'react';
import { CourseData } from '../../types/course';
import HeroSection from '../course-components/HeroSection';
import FeatureList from '../course-components/FeatureList';
import TextBlock from '../course-components/TextBlock';
import Instructors from '../course-components/Instructors';
import PromoBanner from '../course-components/PromoBanner';
import Skills from '../course-components/Skills';
import FAQs from '../course-components/FAQs';

interface CoursePreviewProps {
  courseData: CourseData;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ courseData }) => {
  // Get instructor name from the instructors component
  const instructorComponent = courseData.pageLayout.find(comp => comp.component === 'instructors');
  const instructorName = instructorComponent && 'instructors' in instructorComponent 
    ? instructorComponent.instructors[0]?.name || 'Instructor Name'
    : 'Instructor Name';

  const renderComponent = (component: any) => {
    switch (component.component) {
      case 'feature_list':
        return <FeatureList key={component.key} data={component} />;
      case 'text_block':
        return <TextBlock key={component.key} data={component} />;
      case 'instructors':
        return <Instructors key={component.key} data={component} />;
      case 'promo_banner':
        return <PromoBanner key={component.key} data={component} />;
      case 'skills':
        return <Skills key={component.key} data={component} />;
      case 'faqs':
        return <FAQs key={component.key} data={component} />;
      case 'testimonials':
        return (
          <div key={component.key} className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-8">{component.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {component.testimonials.map((testimonial: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.jobTitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'newsletter':
        return (
          <div key={component.key} className="py-12 bg-blue-900 text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-4">{component.title}</h2>
              <p className="text-lg mb-8">{component.description}</p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
                />
                <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-r-lg font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">DeepLearning.AI</div>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">Courses</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Programs</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              </div>
              {/* Partnership Logos */}
              {courseData.partnerships && courseData.partnerships.length > 0 && (
                <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-gray-200">
                  <span className="text-sm text-gray-500">In partnership with:</span>
                  {courseData.partnerships.map((partner, index) => (
                    <a
                      key={index}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.title}
                        className="h-8 object-contain hover:opacity-80 transition-opacity"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6">
        <HeroSection
          heroData={courseData.hero}
          videoData={courseData.video}
          title={courseData.title}
          instructorName={instructorName}
          enrollButton={courseData.enrollButton}
          isSelected={false}
          onSelect={() => {}}
          onUpdate={() => {}}
        />
      </div>

      {/* Page Layout Components */}
      <div>
        {courseData.pageLayout.map(component => renderComponent(component))}
      </div>

      {/* Course Outline Section */}
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Course Outline</h2>
          <div className="space-y-6">
            {courseData.syllabus.courses.map((course, index) => (
              <div key={course.slug} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Course {index + 1}: {course.title}
                </h3>
                <div className="text-gray-700 whitespace-pre-line">
                  {course.content.split('\n\n')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">DeepLearning.AI</h3>
              <p className="text-gray-300">
                Making AI education accessible to everyone
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Machine Learning</a></li>
                <li><a href="#" className="hover:text-white">Deep Learning</a></li>
                <li><a href="#" className="hover:text-white">AI for Everyone</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-300 hover:text-white">LinkedIn</a>
                <a href="#" className="text-gray-300 hover:text-white">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DeepLearning.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoursePreview;