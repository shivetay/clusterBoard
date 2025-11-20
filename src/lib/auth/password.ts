import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (candidate: string, passwordHash: string) =>
  bcrypt.compare(candidate, passwordHash);
