import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/prompts
 * Retrieve a list of prompts
 * To be implemented in MVP1
 */
router.get('/', (_req: Request, res: Response) => {
  // This is a placeholder - will be implemented in MVP1
  res.status(200).json({
    prompts: [
      { id: 1, title: 'Example Prompt', content: 'This is a placeholder prompt.' }
    ]
  });
});

/**
 * GET /api/prompts/:id
 * Retrieve a single prompt by ID
 * To be implemented in MVP1
 */
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  
  // This is a placeholder - will be implemented in MVP1
  res.status(200).json({
    prompt: { 
      id: parseInt(id, 10), 
      title: 'Example Prompt', 
      content: 'This is a placeholder prompt.' 
    }
  });
});

export const promptRoutes = router; 