import React ,{useContext}from 'react';
import styles from '/src/HtmlContentCss.module.css'; // Import the CSS module
import { UserContext } from '../Context/UserContext';
const HtmlRenderer = ({ htmlContent }) => {
  const { ibg,bg, light,dark } = useContext(UserContext);
  return (
    <div className={ibg=="white" ? 'dark-theme' : ''}>
    <div className={styles['mce-content-body']} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default HtmlRenderer;
