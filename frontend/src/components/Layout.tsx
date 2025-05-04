import { Outlet, Link } from 'react-router-dom';

import Accessibility from './Accessibility';

const Layout = () => {
  return (
    <>
      <Accessibility />
      <div className="app">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        
        <header>
          <h1>Prompt Library</h1>
          <nav aria-label="Main navigation">
            <ul>
              <li>
                <Link to="/" aria-label="Home page">Home</Link>
              </li>
              {/* Additional nav items to be added in future MVPs */}
            </ul>
          </nav>
        </header>
        
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        
        <footer>
          <p>&copy; {new Date().getFullYear()} Prompt Library</p>
          <nav aria-label="Footer navigation">
            <ul className="footer-links">
              <li>
                <a href="#" aria-label="Accessibility statement">Accessibility</a>
              </li>
              <li>
                <a href="#" aria-label="Privacy policy">Privacy</a>
              </li>
              <li>
                <a href="#" aria-label="Terms of service">Terms</a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Layout; 