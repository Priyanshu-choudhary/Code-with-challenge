import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


function Test({description}) {
  const [markdownText, setMarkdownText] = useState(description);

  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
    </div>
  );
}

export default Test;
