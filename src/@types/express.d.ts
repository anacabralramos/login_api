declare global {
  namespace Express {
    export interface Request {
      user: {
        email: string;
        name: string;
      };
    }
  }
}
