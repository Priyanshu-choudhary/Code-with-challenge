import React, { useContext } from 'react';
import styles from '/src/HtmlContentCss.module.css'; // Import the CSS module
import { UserContext } from '../Context/UserContext';
import parse, { domToReact } from 'html-react-parser';

import InLectureEditor from '../TutorialPage/InLectureEditor';

const HtmlRenderer = ({ htmlContent, renderAsHtml = false }) => {
  const { ibg } = useContext(UserContext);

  const replacePlaceholderWithComponent = (domNode) => {
    if (domNode.type === 'tag' && domNode.name === 'div' && domNode.attribs['data-placeholder'] === 'InPageEditor') {
      // Extract the content inside the placeholder
      const placeholderContent = domNode.children ? domToReact(domNode.children) : `[InPageEditor] Your no content find content here`;
  
      // Replace the placeholder with the EditorComponent, passing the content
      return <InLectureEditor initialValue={placeholderContent} />;
    }
  };
  

  let renderedContent;

  if (renderAsHtml) {
    // Render as HTML using dangerouslySetInnerHTML
    renderedContent = (
      <div
        className={styles['mce-content-body']}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  } else {
    // Parse the string into JSX elements and replace placeholders with React components
    renderedContent = (
      <div className={styles['mce-content-body']}>
        {parse(htmlContent, {
          replace: replacePlaceholderWithComponent
        })}
      </div>
    );
  }

  return (
    <div className={ibg === "white" ? 'dark-theme' : ''}>
      {renderedContent}
    </div>
  );
};

export default HtmlRenderer;
