import React from 'react';
import { TextBlockComponent } from '../../types/course';

interface TextBlockProps {
  data: TextBlockComponent;
}

const TextBlock: React.FC<TextBlockProps> = ({ data }) => {
  const { title, body } = data;

  // Simple markdown-like parsing for basic formatting
  const formatText = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Handle headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mb-4 mt-8">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mb-3 mt-6">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mb-2 mt-4">{line.substring(4)}</h3>;
        }

        // Handle bold text **text**
        const boldFormatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Handle bullet points
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="mb-1" dangerouslySetInnerHTML={{ __html: boldFormatted.substring(2) }} />
          );
        }

        // Handle numbered lists
        if (/^\d+\.\s/.test(line)) {
          return (
            <li key={index} className="mb-1" dangerouslySetInnerHTML={{ __html: boldFormatted.replace(/^\d+\.\s/, '') }} />
          );
        }

        // Regular paragraph
        if (line.trim()) {
          return (
            <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: boldFormatted }} />
          );
        }

        // Empty line
        return <br key={index} />;
      });
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {title}
        </h2>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          {body ? formatText(body) : (
            <p className="text-gray-500 italic">
              No content added yet. Use the properties panel to add content.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextBlock;