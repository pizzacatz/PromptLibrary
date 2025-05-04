import { NextFunction, Request, Response } from 'express';

/**
 * Security middleware that adds various HTTP headers to enhance API security
 */
export const securityMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy
  if (process.env.NODE_ENV === 'production') {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'"
    );
  }
  
  // In production, force HTTPS
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    if (req.method === 'GET') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    } else {
      return res
        .status(400)
        .json({ error: 'HTTPS Required' });
    }
  }
  
  next();
}; 