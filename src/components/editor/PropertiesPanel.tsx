import React from 'react';
import { useForm } from 'react-hook-form';
import { CourseData, PageLayoutComponent } from '../../types/course';

interface PropertiesPanelProps {
  courseData: CourseData;
  selectedComponent: PageLayoutComponent | null;
  isHeroSelected?: boolean;
  onUpdateCourseData: (updater: (data: CourseData) => CourseData) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  courseData,
  selectedComponent,
  onUpdateCourseData
}) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [selectedComponentId, setSelectedComponentId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedComponent) {
      reset(selectedComponent);
      setSelectedComponentId(selectedComponent.key);
    } else {
      setSelectedComponentId(null);
    }
  }, [selectedComponent, reset]);

  const onSubmit = (data: any) => {
    if (!selectedComponent) return;

    onUpdateCourseData(courseData => ({
      ...courseData,
      pageLayout: courseData.pageLayout.map(component =>
        component.key === selectedComponent.key
          ? { ...component, ...data }
          : component
      )
    }));
  };

  const renderComponentForm = () => {
    if (!selectedComponent) {
      return (
        <div className="p-4 text-center text-gray-500">
          <p>Select a component to edit its properties</p>
        </div>
      );
    }

    switch (selectedComponent.component) {
      case 'feature_list':
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                {...register('title')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Feature list title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                {...register('description')}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Optional description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Style</label>
              <select {...register('itemStyle')} className="w-full px-3 py-2 border rounded-md">
                <option value="card">Card</option>
                <option value="list">List</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Update Component
            </button>
          </form>
        );

      case 'text_block':
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                {...register('title')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                {...register('body')}
                className="w-full px-3 py-2 border rounded-md"
                rows={8}
                placeholder="Section content (supports markdown)"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Update Component
            </button>
          </form>
        );

      case 'promo_banner':
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                {...register('title')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Banner title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Button Label</label>
              <input
                {...register('button.label')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Button text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Button URL</label>
              <input
                {...register('button.url')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Button Variant</label>
              <select {...register('button.variant')} className="w-full px-3 py-2 border rounded-md">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="white">White</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Update Component
            </button>
          </form>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                defaultValue={selectedComponent.title}
                onChange={(e) => {
                  onUpdateCourseData(courseData => ({
                    ...courseData,
                    pageLayout: courseData.pageLayout.map(component =>
                      component.key === selectedComponent.key
                        ? { ...component, title: e.target.value }
                        : component
                    )
                  }));
                }}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Skills section title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Skills (one per line)</label>
              <textarea
                defaultValue={selectedComponent.skills?.map((s: any) => s.text).join('\n') || ''}
                onChange={(e) => {
                  const skills = e.target.value.split('\n').filter(s => s.trim()).map(text => ({ text: text.trim() }));
                  onUpdateCourseData(courseData => ({
                    ...courseData,
                    pageLayout: courseData.pageLayout.map(component =>
                      component.key === selectedComponent.key
                        ? { ...component, skills }
                        : component
                    )
                  }));
                }}
                className="w-full px-3 py-2 border rounded-md"
                rows={6}
                placeholder="Python Programming&#10;Data Analysis&#10;Machine Learning"
              />
            </div>
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">FAQ Items</label>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedComponent.faqs?.map((faq: any, index: number) => (
                  <div key={index} className="p-3 border rounded bg-gray-50">
                    <input
                      placeholder="Question"
                      defaultValue={faq.question}
                      onChange={(e) => {
                        const newFaqs = [...(selectedComponent.faqs || [])];
                        newFaqs[index] = { ...newFaqs[index], question: e.target.value };
                        onUpdateCourseData(courseData => ({
                          ...courseData,
                          pageLayout: courseData.pageLayout.map(component =>
                            component.key === selectedComponent.key
                              ? { ...component, faqs: newFaqs }
                              : component
                          )
                        }));
                      }}
                      className="w-full px-2 py-1 text-sm border rounded mb-2"
                    />
                    <textarea
                      placeholder="Answer"
                      defaultValue={faq.answer}
                      onChange={(e) => {
                        const newFaqs = [...(selectedComponent.faqs || [])];
                        newFaqs[index] = { ...newFaqs[index], answer: e.target.value };
                        onUpdateCourseData(courseData => ({
                          ...courseData,
                          pageLayout: courseData.pageLayout.map(component =>
                            component.key === selectedComponent.key
                              ? { ...component, faqs: newFaqs }
                              : component
                          )
                        }));
                      }}
                      rows={2}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                    <button
                      onClick={() => {
                        const newFaqs = selectedComponent.faqs?.filter((_: any, i: number) => i !== index) || [];
                        onUpdateCourseData(courseData => ({
                          ...courseData,
                          pageLayout: courseData.pageLayout.map(component =>
                            component.key === selectedComponent.key
                              ? { ...component, faqs: newFaqs }
                              : component
                          )
                        }));
                      }}
                      className="mt-2 text-xs text-red-600 hover:text-red-800"
                    >
                      Remove FAQ
                    </button>
                  </div>
                )) || []}
              </div>
              <button
                onClick={() => {
                  const newFaqs = [...(selectedComponent.faqs || []), { question: '', answer: '' }];
                  onUpdateCourseData(courseData => ({
                    ...courseData,
                    pageLayout: courseData.pageLayout.map(component =>
                      component.key === selectedComponent.key
                        ? { ...component, faqs: newFaqs }
                        : component
                    )
                  }));
                }}
                className="w-full mt-2 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Add FAQ
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              Component type: {selectedComponent.component}
            </p>
            <p className="text-xs text-gray-500">
              Properties panel for this component is not implemented yet.
            </p>
          </div>
        );
    }
  };

  const renderCourseSettings = () => (
    <div className="mb-6">
      <h3 className="text-md font-medium mb-3">Course Settings</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Course Title</label>
          <input
            value={courseData.title}
            onChange={(e) => onUpdateCourseData(data => ({ ...data, title: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={courseData.description}
            onChange={(e) => onUpdateCourseData(data => ({ ...data, description: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md text-sm"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            value={courseData.slug}
            onChange={(e) => onUpdateCourseData(data => ({ ...data, slug: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="properties-panel">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      
      {renderCourseSettings()}
      
      <div className="border-t pt-4">
        <h3 className="text-md font-medium mb-3">
          {selectedComponent ? `${selectedComponent.component.replace('_', ' ')} Settings` : 'Component Settings'}
        </h3>
        {renderComponentForm()}
      </div>
    </div>
  );
};

export default PropertiesPanel;