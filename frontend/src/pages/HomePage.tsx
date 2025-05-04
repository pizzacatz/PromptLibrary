import { useState } from 'react';

const HomePage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="home-page">
      <h2>Welcome to the Prompt Library!</h2>
      <p>
        A modern web application for storing, retrieving, and managing useful prompts for AI systems.
      </p>
      
      <div className="demo-section">
        <h3>Interactive Demo</h3>
        <p>Click the button below to see it in action:</p>
        
        <button onClick={() => setCount(count + 1)}>
          Count is: {count}
        </button>
        
        <p>
          <small>
            This is a placeholder component. Actual prompt functionality will be implemented in MVP1.
          </small>
        </p>
      </div>
    </div>
  );
};

export default HomePage; 