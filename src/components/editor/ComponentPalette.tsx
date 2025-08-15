import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ComponentType, PageLayoutComponent } from '../../types/course';

const componentTypes: ComponentType[] = [
  {
    type: 'feature_list',
    label: 'Feature List',
    icon: '📋',
    description: 'What you\'ll learn section'
  },
  {
    type: 'text_block',
    label: 'Text Block',
    icon: '📝',
    description: 'Rich text content area'
  },
  {
    type: 'instructors',
    label: 'Instructors',
    icon: '👨‍🏫',
    description: 'Instructor profiles'
  },
  {
    type: 'promo_banner',
    label: 'Promo Banner',
    icon: '🎯',
    description: 'Call-to-action banner'
  },
  {
    type: 'skills',
    label: 'Skills',
    icon: '🛠️',
    description: 'Skills and topics grid'
  },
  {
    type: 'faqs',
    label: 'FAQs',
    icon: '❓',
    description: 'Frequently asked questions'
  }
];

interface DraggableComponentProps {
  componentType: ComponentType;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ componentType }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({
    id: `new-${componentType.type}`,
    data: {
      type: 'new-component',
      componentType: componentType.type
    }
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`component-item ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{componentType.icon}</span>
        <div>
          <div className="font-medium text-sm">{componentType.label}</div>
          <div className="text-xs text-gray-600">{componentType.description}</div>
        </div>
      </div>
    </div>
  );
};

const ComponentPalette: React.FC = () => {
  return (
    <div className="component-palette">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="space-y-2">
        {componentTypes.map((componentType) => (
          <DraggableComponent
            key={componentType.type}
            componentType={componentType}
          />
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-md font-medium mb-3 text-gray-700">Fixed Components</h3>
        <div className="space-y-2">
          <div className="p-3 bg-gray-100 border rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦸</span>
              <div>
                <div className="font-medium text-sm text-gray-600">Hero Section</div>
                <div className="text-xs text-gray-500">Editable fields only</div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-gray-100 border rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <div className="font-medium text-sm text-gray-600">Course Outline</div>
                <div className="text-xs text-gray-500">Static content</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPalette;