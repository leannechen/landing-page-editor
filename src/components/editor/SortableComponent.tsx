import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageLayoutComponent } from '../../types/course';
import FeatureList from '../course-components/FeatureList';
import TextBlock from '../course-components/TextBlock';
import Instructors from '../course-components/Instructors';
import PromoBanner from '../course-components/PromoBanner';
import Skills from '../course-components/Skills';
import FAQs from '../course-components/FAQs';

interface SortableComponentProps {
  component: PageLayoutComponent;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const SortableComponent: React.FC<SortableComponentProps> = ({
  component,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderComponent = () => {
    switch (component.component) {
      case 'feature_list':
        return <FeatureList data={component} />;
      case 'text_block':
        return <TextBlock data={component} />;
      case 'instructors':
        return <Instructors data={component} />;
      case 'promo_banner':
        return <PromoBanner data={component} />;
      case 'skills':
        return <Skills data={component} />;
      case 'faqs':
        return <FAQs data={component} />;
      default:
        return (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800">
              Component type "{component.component}" not implemented yet
            </p>
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`editable-component ${isSelected ? 'selected' : ''} ${isDragging ? 'opacity-50' : ''}`}
      onClick={onSelect}
    >
      {/* Component Controls */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 flex gap-1 z-10">
          <button
            {...attributes}
            {...listeners}
            className="w-6 h-6 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 flex items-center justify-center"
            title="Drag to reorder"
          >
            ⋮⋮
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="w-6 h-6 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex items-center justify-center"
            title="Duplicate"
          >
            ⧉
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-6 h-6 bg-red-600 text-white rounded text-xs hover:bg-red-700 flex items-center justify-center"
            title="Delete"
          >
            ×
          </button>
        </div>
      )}

      {/* Component Content */}
      {renderComponent()}
    </div>
  );
};

export default SortableComponent;