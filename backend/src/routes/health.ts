import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/health
 * Health check endpoint to verify the API is running
 */
router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

export const healthRoutes = router; 