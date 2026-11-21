import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
}

interface Segment {
  type: 'text' | 'inline' | 'display';
  content: string;
}

function parseMathSegments(input: string): Segment[] {
  const segments: Segment[] = [];
  let idx = 0;

  while (idx < input.length) {
    const nextDisplay = input.indexOf('$$', idx);
    const nextInline = input.indexOf('$', idx);

    if (nextDisplay !== -1 && (nextInline === -1 || nextDisplay <= nextInline)) {
      if (nextDisplay > idx) {
        segments.push({ type: 'text', content: input.slice(idx, nextDisplay) });
      }
      const endDisplay = input.indexOf('$$', nextDisplay + 2);
      if (endDisplay === -1) {
        segments.push({ type: 'text', content: input.slice(nextDisplay) });
        break;
      }
      segments.push({
        type: 'display',
        content: input.slice(nextDisplay + 2, endDisplay).trim(),
      });
      idx = endDisplay + 2;
    } else if (nextInline !== -1) {
      if (nextInline > idx) {
        segments.push({ type: 'text', content: input.slice(idx, nextInline) });
      }
      const endInline = input.indexOf('$', nextInline + 1);
      if (endInline === -1) {
        segments.push({ type: 'text', content: input.slice(nextInline) });
        break;
      }
      segments.push({
        type: 'inline',
        content: input.slice(nextInline + 1, endInline).trim(),
      });
      idx = endInline + 1;
    } else {
      segments.push({ type: 'text', content: input.slice(idx) });
      break;
    }
  }

  return segments;
}

function renderBoldText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-zinc-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const segments = React.useMemo(() => parseMathSegments(text), [text]);

  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === 'text') {
          return <React.Fragment key={idx}>{renderBoldText(seg.content)}</React.Fragment>;
        }
        try {
          const html = katex.renderToString(seg.content, {
            displayMode: seg.type === 'display',
            throwOnError: false,
            strict: false,
          });
          if (seg.type === 'display') {
            return (
              <span
                key={idx}
                className="block my-2.5 overflow-x-auto rounded-xl bg-zinc-50 border border-zinc-200/80 px-4 py-2.5 text-center"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }
          return (
            <span
              key={idx}
              className="inline-block align-baseline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <code key={idx}>{seg.content}</code>;
        }
      })}
    </span>
  );
};

interface MathBlockProps {
  latex: string;
  className?: string;
}

export const MathBlock: React.FC<MathBlockProps> = ({ latex, className = '' }) => {
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return latex;
    }
  }, [latex]);

  return (
    <div
      className={`overflow-x-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
