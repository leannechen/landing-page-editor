import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CourseData, PageLayoutComponent } from '../../types/course';
import { defaultComponents } from '../../utils/mockData';
import SortableComponent from './SortableComponent';
import HeroSection from '../course-components/HeroSection';

interface EditableCanvasProps {
  courseData: CourseData;
  selectedComponentId: string | null;
  onSelectComponent: (componentId: string | null) => void;
  onUpdateCourseData: (updater: (data: CourseData) => CourseData) => void;
}

const EditableCanvas: React.FC<EditableCanvasProps> = ({
  courseData,
  selectedComponentId,
  onSelectComponent,
  onUpdateCourseData
}) => {
  const {
    isOver,
    setNodeRef
  } = useDroppable({
    id: 'canvas-droppable'
  });

  const handleAddComponent = (componentType: PageLayoutComponent['component']) => {
    const newComponent = defaultComponents[componentType]();
    onUpdateCourseData(data => ({
      ...data,
      pageLayout: [...data.pageLayout, newComponent]
    }));
  };

  const handleDeleteComponent = (componentKey: string) => {
    onUpdateCourseData(data => ({
      ...data,
      pageLayout: data.pageLayout.filter(c => c.key !== componentKey)
    }));
    if (selectedComponentId === componentKey) {
      onSelectComponent(null);
    }
  };

  const handleDuplicateComponent = (componentKey: string) => {
    const component = courseData.pageLayout.find(c => c.key === componentKey);
    if (component) {
      const duplicated = {
        ...component,
        key: `${component.component}-${Date.now()}`
      };
      onUpdateCourseData(data => ({
        ...data,
        pageLayout: [...data.pageLayout, duplicated]
      }));
    }
  };

  // Get instructor name from the instructors component
  const instructorComponent = courseData.pageLayout.find(comp => comp.component === 'instructors');
  const instructorName = instructorComponent && 'instructors' in instructorComponent 
    ? instructorComponent.instructors[0]?.name || 'Instructor Name'
    : 'Instructor Name';

  return (
    <div className="editable-canvas">
      <div ref={setNodeRef} className="p-6 min-h-full">
        {/* Hero Section - Fixed position, editable fields */}
        <HeroSection
          heroData={courseData.hero}
          videoData={courseData.video}
          title={courseData.title}
          instructorName={instructorName}
          enrollButton={courseData.enrollButton}
          isSelected={selectedComponentId === 'hero'}
          onSelect={() => onSelectComponent('hero')}
          onUpdate={(heroData, videoData, title, instructorName, enrollButton) => {
            onUpdateCourseData(data => ({
              ...data,
              hero: heroData,
              video: videoData,
              title,
              enrollButton
            }));
          }}
        />

        {/* Sortable Page Layout Components */}
        <SortableContext 
          items={courseData.pageLayout.map(c => c.key)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {courseData.pageLayout.map((component) => (
              <SortableComponent
                key={component.key}
                component={component}
                isSelected={selectedComponentId === component.key}
                onSelect={() => onSelectComponent(component.key)}
                onDelete={() => handleDeleteComponent(component.key)}
                onDuplicate={() => handleDuplicateComponent(component.key)}
              />
            ))}
          </div>
        </SortableContext>

        {/* Drop Zone */}
        {courseData.pageLayout.length === 0 && (
          <div className={`drop-zone ${isOver ? 'active' : ''}`}>
            <p className="text-center">
              Drag components from the palette to start building your course page
            </p>
          </div>
        )}

        {/* Add Component Buttons - for testing */}
        {courseData.pageLayout.length === 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium mb-3">Quick Add:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(defaultComponents).map((type) => (
                <button
                  key={type}
                  onClick={() => handleAddComponent(type as PageLayoutComponent['component'])}
                  className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
                >
                  Add {type.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Course Outline - Static Mock Section */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Course Outline</h2>
          <div className="space-y-4">
            {courseData.syllabus.courses.map((course, index) => (
              <div key={course.slug} className="bg-white p-4 rounded border">
                <h3 className="font-semibold">
                  Course {index + 1}: {course.title}
                </h3>
                <div className="text-sm text-gray-600 mt-2">
                  {course.content.split('\n')[0]}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            * Course outline is not editable in this version
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditableCanvas;