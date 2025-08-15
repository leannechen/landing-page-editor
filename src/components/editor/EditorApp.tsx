import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { CourseData, EditorState, PageLayoutComponent } from '../../types/course';
import { createDefaultCourseData, defaultComponents } from '../../utils/mockData';
import { saveToStorage, loadFromStorage, exportAsJSON } from '../../utils/storage';
import { scCourseData } from '../../utils/scData';
import ComponentPalette from './ComponentPalette';
import EditableCanvas from './EditableCanvas';
import PropertiesPanel from './PropertiesPanel';
import CoursePreview from '../preview/CoursePreview';

const EditorApp: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const savedData = loadFromStorage();
    return {
      courseData: savedData || createDefaultCourseData(),
      selectedComponentId: null,
      isDragging: false,
      mode: 'edit'
    };
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      saveToStorage(editorState.courseData);
    }, 1000);
    return () => clearTimeout(timer);
  }, [editorState.courseData]);

  const updateCourseData = (updater: (data: CourseData) => CourseData) => {
    setEditorState(prev => ({
      ...prev,
      courseData: updater(prev.courseData)
    }));
  };

  const setSelectedComponent = (componentId: string | null) => {
    setEditorState(prev => ({
      ...prev,
      selectedComponentId: componentId
    }));
  };

  const toggleMode = () => {
    setEditorState(prev => ({
      ...prev,
      mode: prev.mode === 'edit' ? 'preview' : 'edit'
    }));
  };

  const loadSCData = () => {
    setEditorState(prev => ({
      ...prev,
      courseData: scCourseData,
      selectedComponentId: null
    }));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setEditorState(prev => ({ ...prev, isDragging: true }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setEditorState(prev => ({ ...prev, isDragging: false }));

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Handle dropping new components
    if (activeId.startsWith('new-') && overId === 'canvas-droppable') {
      const componentType = activeId.replace('new-', '') as PageLayoutComponent['component'];
      const newComponent = defaultComponents[componentType]();
      
      updateCourseData(data => ({
        ...data,
        pageLayout: [...data.pageLayout, newComponent]
      }));
      
      // Select the newly added component
      setSelectedComponent(newComponent.key);
      return;
    }

    // Handle reordering existing components
    if (overId !== activeId && !activeId.startsWith('new-')) {
      updateCourseData(data => {
        const oldIndex = data.pageLayout.findIndex(c => c.key === activeId);
        const newIndex = data.pageLayout.findIndex(c => c.key === overId);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          const newPageLayout = [...data.pageLayout];
          const [movedComponent] = newPageLayout.splice(oldIndex, 1);
          newPageLayout.splice(newIndex, 0, movedComponent);
          
          return {
            ...data,
            pageLayout: newPageLayout
          };
        }
        
        return data;
      });
    }
  };

  const selectedComponent = editorState.selectedComponentId 
    ? editorState.courseData.pageLayout.find(c => c.key === editorState.selectedComponentId)
    : null;
  
  const isHeroSelected = editorState.selectedComponentId === 'hero';

  if (editorState.mode === 'preview') {
    return (
      <div className="h-screen bg-gray-100">
        <div className="bg-white shadow-sm border-b px-4 py-2 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Course Preview</h1>
          <div className="flex gap-2">
            <button
              onClick={toggleMode}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Editor
            </button>
          </div>
        </div>
        <CoursePreview courseData={editorState.courseData} />
      </div>
    );
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-4 py-2 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Course Landing Page Editor</h1>
          <div className="flex gap-2">
            <button
              onClick={loadSCData}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Load SC Data
            </button>
            <button
              onClick={toggleMode}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Preview
            </button>
            <button
              onClick={() => exportAsJSON(editorState.courseData)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Export JSON
            </button>
          </div>
        </div>

        {/* Editor Layout */}
        <div className="editor-layout">
          <ComponentPalette />
          <EditableCanvas
            courseData={editorState.courseData}
            selectedComponentId={editorState.selectedComponentId}
            onSelectComponent={setSelectedComponent}
            onUpdateCourseData={updateCourseData}
          />
          <PropertiesPanel
            courseData={editorState.courseData}
            selectedComponent={selectedComponent}
            isHeroSelected={isHeroSelected}
            onUpdateCourseData={updateCourseData}
          />
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <div className="p-3 bg-white border rounded-lg shadow-lg">
              Dragging component...
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default EditorApp;