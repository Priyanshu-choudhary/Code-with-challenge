import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownDisplay = ({ markdownText }) => {
  return (
    <ReactMarkdown>
      {markdownText}
    </ReactMarkdown>
  );
};

export default MarkdownDisplay;
