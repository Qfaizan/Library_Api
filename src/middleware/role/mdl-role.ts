import { NextFunction } from 'express';

export const roleMiddleware = (roles: any | number[]) => {
  return (req: any, res: any, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || (!Array.isArray(roles) ? roles !== userRole : !roles.includes(userRole))) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};
