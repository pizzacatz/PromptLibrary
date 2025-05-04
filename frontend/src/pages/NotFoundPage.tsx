import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary">
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage; 