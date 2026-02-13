import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  content: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ content }) => {
  const parts = content.split(/(\$\$[\s\S]*?\$\$)/g);

  return (
    <div className="proof-content space-y-3">
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          return (
            <div key={index} className="my-6 overflow-x-auto">
              <BlockMath math={math} />
            </div>
          );
        }

        // Split by single $ for inline math
        const inlineParts = part.split(/(\$[\s\S]*?\$)/g);
        return (
          <span key={index}>
            {inlineParts.map((inlinePart, i) => {
              if (inlinePart.startsWith('$') && inlinePart.endsWith('$')) {
                const math = inlinePart.slice(1, -1);
                return <InlineMath key={i} math={math} />;
              }
              // Handle ## headings and text
              const processed = inlinePart
                .replace(/^## (.+)$/gm, '<h2 class="proof-heading">$1</h2>')
                .replace(/\n/g, '<br/>');
              return (
                <span key={i} dangerouslySetInnerHTML={{ __html: processed }} />
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

export default MathRenderer;
