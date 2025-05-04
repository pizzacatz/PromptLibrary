import { NextFunction, Request, Response } from 'express';

/**
 * CORS middleware for allowing cross-origin requests
 * Uses environment variable CORS_ORIGIN or falls back to localhost for development
 */
export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Get allowed origins from environment or use default for development
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:5173'];

  const origin = req.headers.origin;
  
  // Set CORS headers
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (allowedOrigins.includes('*')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  // Set additional CORS headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  next();
};