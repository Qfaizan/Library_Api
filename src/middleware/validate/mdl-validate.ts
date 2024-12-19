import { NextFunction } from 'express';

export const validate = (schema: any) => {
  return (req: any, res: any, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
console.log("errr1",req.body)
    if (error) {
console.log("errr2",error)
      return res.status(400).json({ errors: error.details.map((err:any) => err.message) });
    }

    console.log("errr3",req.body)
    next();
  };
};
