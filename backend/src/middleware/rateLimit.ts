import { NextFunction, Request, Response } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// Simple in-memory store for rate limiting
// In production, use Redis or another distributed store
const store: RateLimitStore = {};

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime <= now) {
      delete store[key];
    }
  });
}, 60000); // Clean up every minute

interface RateLimitOptions {
  windowMs?: number;
  max?: number;
  message?: string;
  statusCode?: number;
  keyGenerator?: (req: Request) => string;
}

/**
 * Rate limiting middleware to prevent abuse
 */
export const rateLimitMiddleware = (options: RateLimitOptions = {}) => {
  const {
    windowMs = 60 * 1000, // 1 minute by default
    max = 100, // 100 requests per windowMs by default
    message = 'Too many requests, please try again later.',
    statusCode = 429,
    keyGenerator = (req) => req.ip || 'unknown'
  } = options;

  return (req: Request, res: Response, next: NextFunction): void => {
    const key = keyGenerator(req);
    const now = Date.now();

    // Initialize or reset if window has passed
    if (!store[key] || store[key].resetTime <= now) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs
      };
      return next();
    }

    // Increment request count
    store[key].count++;

    // Set remaining headers
    const remaining = Math.max(0, max - store[key].count);
    res.setHeader('X-RateLimit-Limit', max.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', Math.ceil(store[key].resetTime / 1000).toString());

    // If over limit, send error response
    if (store[key].count > max) {
      res.status(statusCode).json({ error: message });
      return;
    }

    next();
  };
}; 