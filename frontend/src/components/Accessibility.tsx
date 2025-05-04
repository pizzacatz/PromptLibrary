import { useEffect } from 'react';

/**
 * Component to enhance accessibility features across the application
 * - Manages focus trap for modals and dialogs
 * - Adds keyboard navigation support
 * - Implements skip-to-content functionality
 */
const Accessibility: React.FC = () => {
  useEffect(() => {
    // Add skip-to-content functionality
    const handleSkipToContent = (e: KeyboardEvent) => {
      // Tab key press when page first loads
      if (e.key === 'Tab' && !e.altKey && !e.ctrlKey && !e.metaKey) {
        const skipLink = document.createElement('a');
        skipLink.className = 'skip-to-content';
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to content';
        skipLink.style.position = 'absolute';
        skipLink.style.top = '0';
        skipLink.style.left = '0';
        skipLink.style.padding = '10px';
        skipLink.style.background = '#f5f5f5';
        skipLink.style.zIndex = '9999';
        skipLink.style.transform = 'translateY(-100%)';
        skipLink.style.transition = 'transform 0.3s';
        
        skipLink.addEventListener('focus', () => {
          skipLink.style.transform = 'translateY(0)';
        });
        
        skipLink.addEventListener('blur', () => {
          skipLink.style.transform = 'translateY(-100%)';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Remove event listener after it's added once
        document.removeEventListener('keydown', handleSkipToContent);
      }
    };
    
    // Add improved focus outline for keyboard users
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        
        window.removeEventListener('keydown', handleTabKey);
        window.addEventListener('mousedown', handleMouseDown);
      }
    };
    
    const handleMouseDown = () => {
      document.body.classList.remove('user-is-tabbing');
      
      window.removeEventListener('mousedown', handleMouseDown);
      window.addEventListener('keydown', handleTabKey);
    };
    
    // Set up event listeners
    document.addEventListener('keydown', handleSkipToContent);
    window.addEventListener('keydown', handleTabKey);
    
    // Inject CSS for focus styles
    const style = document.createElement('style');
    style.textContent = `
      .user-is-tabbing *:focus {
        outline: 2px solid #4a90e2 !important;
        outline-offset: 2px !important;
      }
      
      .user-is-tabbing .skip-to-content:focus {
        outline: 2px solid #4a90e2 !important;
        outline-offset: 2px !important;
      }
      
      [role="button"],
      button,
      a {
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('keydown', handleSkipToContent);
      window.removeEventListener('keydown', handleTabKey);
      window.removeEventListener('mousedown', handleMouseDown);
      
      // Remove injected style
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

export default Accessibility; 