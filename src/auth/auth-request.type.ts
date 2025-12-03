import { Request } from 'express';

export interface AuthUser {
  user_id: string;
  email: string;
}

export type AuthRequest = Request & { user: AuthUser };
