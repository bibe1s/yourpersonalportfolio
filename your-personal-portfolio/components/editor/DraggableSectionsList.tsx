"use client";

import { useProfile } from '@/contexts/ProfileContext';
import { Plus, Trash2, X, GripVertical, Edit } from 'lucide-react';
import { useState } from 'react';
import { ContentBlockEditor } from '@/components/modals/ContentBlockEditor';
import { TechStackEditor } from '@/components/modals/TechStackEditor';
import { SectionEditor } from '@/components/modals/SectionEditor';
import { ContentBlockType } from '@/lib/types';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


// Draggable Section Component
function DraggableSection({ section, mode }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const {
    addContentBlock,
    deleteContentBlock,
    addTechStack,
    deleteTechStack,
    deleteSection,
    updateSection,
  } = useProfile();

  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
  const [showAddTechModal, setShowAddTechModal] = useState(false);
  const [showEditSectionModal, setShowEditSectionModal] = useState(false);

  const handleSaveSectionName = (name: string) => {
  updateSection(mode, section.id, { name });
};

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSaveBlock = (type: ContentBlockType, content: string, duration?: string) => {
    addContentBlock(mode, section.id, { type, content, duration });
  };

  const handleSaveTech = (name: string, iconUrl: string) => {
    addTechStack(mode, section.id, { name, icon: iconUrl });
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="border rounded-lg p-4 space-y-3 bg-white"
      >
        {/* Section Header */}
        <div className="flex items-center gap-3">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded"
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </button>

          {/* Section Name */}
          <h3 className="font-semibold text-lg flex-1">{section.name}</h3>

          {/* Actions */}
          <button
            onClick={() => setShowEditSectionModal(true)}
            className="p-2 hover:bg-gray-100 rounded"
            title="Edit section"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => deleteSection(mode, section.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
            title="Delete section"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Section Type Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {section.type === 'techStack' ? '🔧 Tech Stack / Communities' : '📝 Content'}
          </span>
        </div>

        {/* Content Blocks */}
        {section.type === 'content' && section.contentBlocks && (
          <div className="space-y-2 mt-4">
            {section.contentBlocks.length === 0 ? (
              <p className="text-sm text-gray-500">No content blocks yet</p>
            ) : (
              section.contentBlocks
                .sort((a: any, b: any) => a.order - b.order)
                .map((block: any) => (
                  <div
                    key={block.id}
                    className="p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-500 uppercase">
                          {block.type}
                        </span>
                        <p className="text-sm mt-1">{block.content}</p>
                        {block.duration && (
                          <p className="text-xs text-gray-500 mt-1">
                            📅 {block.duration}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteContentBlock(mode, section.id, block.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete block"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
            )}

            {/* Add Block Button */}
            <button
              onClick={() => setShowAddBlockModal(true)}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-blue-600"
            >
              <Plus className="w-4 h-4" />
              Add Content Block
            </button>
          </div>
        )}

        {/* Tech Stack */}
        {section.type === 'techStack' && section.techStack && (
          <div className="mt-4 space-y-3">
            {section.techStack.length === 0 ? (
              <p className="text-sm text-gray-500">No items yet</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {section.techStack
                  .sort((a: any, b: any) => a.order - b.order)
                  .map((tech: any) => (
                    <div key={tech.id} className="relative group cursor-pointer">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200 hover:border-blue-300 transition-colors">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <p className="text-xs text-center mt-1 text-gray-600">
                        {tech.name}
                      </p>
                      <button
                        onClick={() => deleteTechStack(mode, section.id, tech.id)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        title="Delete"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
              </div>
            )}

            {/* Add Tech Button */}
            <button
              onClick={() => setShowAddTechModal(true)}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-blue-600"
            >
              <Plus className="w-4 h-4" />
              Add Tech/Community
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <ContentBlockEditor
        isOpen={showAddBlockModal}
        onClose={() => setShowAddBlockModal(false)}
        onSave={handleSaveBlock}
      />

      <TechStackEditor
        isOpen={showAddTechModal}
        onClose={() => setShowAddTechModal(false)}
        onSave={handleSaveTech}
      />

      <SectionEditor
        isOpen={showEditSectionModal}
        onClose={() => setShowEditSectionModal(false)}
        onSave={handleSaveSectionName}
        currentName={section.name}
    />
    </>
  );
}

// Main Component
export function DraggableSectionsList() {
  const { profile, currentMode, reorderSections } = useProfile();

  const currentSections = profile[currentMode].sections;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = currentSections.findIndex((s) => s.id === active.id);
      const newIndex = currentSections.findIndex((s) => s.id === over.id);

      // Get the new order of section IDs
      const reorderedIds = arrayMove(
        currentSections.map(s => s.id),
        oldIndex,
        newIndex
      );

      // Update sections with new order
      reorderSections(currentMode, reorderedIds);
    }
  };

  if (currentSections.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <p className="text-xl mb-2">📝</p>
        <p className="text-gray-500 mb-4">No sections yet!</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + Create Your First Section
        </button>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={currentSections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {currentSections
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <DraggableSection
                key={section.id}
                section={section}
                mode={currentMode}
              />
            ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}