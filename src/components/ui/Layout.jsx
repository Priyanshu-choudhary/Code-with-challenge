import React from 'react';
import Navbar from '../../dashBoard/Dashboard';
import Footer2 from '../../home/Footer2';

/**
 * Standard page layout: Navbar on top, optional footer at bottom.
 * Use this in every page instead of importing Dashboard + Footer2 separately.
 *
 * Usage:
 *   <Layout>
 *     <YourPageContent />
 *   </Layout>
 *
 *   <Layout footer={false}>
 *     <FullHeightEditorPage />
 *   </Layout>
 */
export default function Layout({ children, footer = true, className = '' }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      {footer && <Footer2 />}
    </div>
  );
}
