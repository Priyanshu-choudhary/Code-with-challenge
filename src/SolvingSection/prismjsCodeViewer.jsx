import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { base16Light } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code ,Codelanguage}) => {
  return (
    <SyntaxHighlighter language={Codelanguage} style={duotoneDark}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
