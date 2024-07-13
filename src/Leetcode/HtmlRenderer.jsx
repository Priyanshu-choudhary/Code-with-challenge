import React from 'react';
import "./markdownCSS.css"
const HtmlRenderer = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default HtmlRenderer;
