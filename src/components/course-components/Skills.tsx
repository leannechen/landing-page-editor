import React from 'react';
import { SkillsComponent } from '../../types/course';

interface SkillsProps {
  data: SkillsComponent;
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const { title, skills } = data;

  return (
    <div className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title || 'Skills You\'ll Gain'}
          </h2>
          <p className="text-lg text-gray-600">
            Master these key skills and concepts
          </p>
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
            >
              {skill.text}
            </span>
          ))}
        </div>

        {/* Empty state */}
        {skills.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-gray-400">🛠️</span>
            </div>
            <p className="text-gray-500">No skills added yet. Use the properties panel to add skills.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;