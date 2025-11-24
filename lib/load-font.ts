/**
 * Dynamically load Cedarville Cursive font to avoid render-blocking
 * Only loads when needed (when Encryption section is visible)
 */
export const loadCedarvilleFont = () => {
  if (typeof window === 'undefined') return;
  
  // Check if font is already loaded
  if (document.querySelector('link[href*="Cedarville+Cursive"]')) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap';
  link.media = 'print';
  link.onload = () => {
    if (link.media) {
      link.media = 'all';
    }
  };
  document.head.appendChild(link);
};

