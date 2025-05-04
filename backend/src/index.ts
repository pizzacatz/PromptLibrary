import express, { Request, Response, NextFunction } from 'express';
import serverless from 'serverless-http';

import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { securityMiddleware } from './middleware/security';
import { healthRoutes } from './routes/health';
import { promptRoutes } from './routes/prompts';

const app = express();
const port = process.env.PORT || 3000;

// Apply security middleware first
app.use(securityMiddleware);

// CORS handling
app.use(corsMiddleware);

// Rate limiting for API routes
app.use('/api', rateLimitMiddleware({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Body parsing middleware
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/prompts', promptRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

// For serverless deployment
export const handler = serverless(app); 