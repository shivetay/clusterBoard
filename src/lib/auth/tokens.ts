import { jwtVerify, SignJWT } from 'jose';
import type { PublicUser } from './types';

const encoder = new TextEncoder();

const getSecret = () => {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error('NEXTAUTH_SECRET is not configured');
  }
  return encoder.encode(secret);
};

export const createAccessToken = async (user: PublicUser) => {
  return new SignJWT({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  })
    .setProtectedHeader({ alg: 'HS512', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(getSecret());
};

export const verifyAccessToken = async (token: string) => {
  const result = await jwtVerify(token, getSecret(), {
    algorithms: ['HS512'],
  });
  return result.payload;
};
