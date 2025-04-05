
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check if the page is being served from GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Only render React app if not on GitHub Pages
if (!isGitHubPages) {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    // Clear any fallback content that might exist in the root element
    rootElement.innerHTML = '';
    createRoot(rootElement).render(<App />);
  }
} else {
  console.log('Static HTML version is being displayed for GitHub Pages compatibility');
  // The static HTML in index.html will be shown instead
}
