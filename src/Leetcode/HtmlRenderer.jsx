import React, { useContext } from 'react';
import styles from '/src/HtmlContentCss.module.css'; // Import the CSS module
import { UserContext } from '../Context/UserContext';
import parse, { domToReact } from 'html-react-parser';
import InLectureEditor from '../TutorialPage/InLectureEditor';

// Function to encode a string to Base64 with angle bracket placeholders

const HtmlRenderer = ({ htmlContent, renderAsHtml = false }) => {
  const { ibg } = useContext(UserContext);

  const replacePlaceholderWithComponent = (domNode) => {
    if (domNode.type === 'tag' && domNode.name === 'div' && domNode.attribs['data-placeholder'] === 'InPageEditor') {
      let placeholderContent = '';
  
      // Ensure that domNode.children is processed correctly
      if (domNode.children && domNode.children.length > 0) {
        // Use domToReact to convert the children to React nodes, or serialize them into a string
        placeholderContent = domToReact(domNode.children);
  
        // If the placeholderContent is an object or array (React nodes), serialize to string
        if (typeof placeholderContent !== 'string') {
          // Manually serialize the content if it's not already in string form
          placeholderContent = domNode.children.map(child => {
            return typeof child.data === 'string' ? child.data : ''; // Extract text content
          }).join('');
        }
      } else {
        // Default placeholder content if no children are present
        placeholderContent = '[InPageEditor] Your content here';
      }
  
      // Escape and encode the content to avoid issues with special characters
      try {
       
        
        
        if (typeof placeholderContent === 'string') {
          placeholderContent = atob(placeholderContent);
          placeholderContent=decodeURIComponent(placeholderContent)
        } else {
          console.log("Content is not a string: ", typeof placeholderContent);
        }
      } catch (error) {
        console.error("Problem encoding placeholder content:", error);
      }
  
      try {
        // Replace the placeholder with the EditorComponent, passing the content
        return <InLectureEditor initialValue={placeholderContent} />;
      } catch (error) {
        console.error('Error rendering InLectureEditor:', error);
        return (
          <div className="error-container">
            <p className="bg-red-300 px-2 py-1 rounded-md">An error occurred while rendering the editor. Please try again later.</p>
          </div>
        );
      }
    }
  };
  
  let renderedContent;

  if (renderAsHtml) {
    // Render as HTML using dangerouslySetInnerHTML
    renderedContent = (
      <div
        className={styles['mce-content-body']}
        dangerouslySetInnerHTML={{ __html: escapeHtml(htmlContent) }}
      />
    );
  } else {
    // Parse the string into JSX elements and replace placeholders with React components
    renderedContent = (
      <div className={styles['mce-content-body']}>
        {parse(htmlContent, {
          replace: replacePlaceholderWithComponent,
        })}
      </div>
    );
  }

  return (
    <div className={ibg === 'white' ? 'dark-theme' : ''}>
      {renderedContent}
    </div>
  );
};

export default HtmlRenderer;

