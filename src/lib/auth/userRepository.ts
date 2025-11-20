import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { OAuthAccount, UserRecord } from './types';

const USERS_DB_PATH = path.join(process.cwd(), 'storage', 'users.json');

const ensureStore = async () => {
  await mkdir(path.dirname(USERS_DB_PATH), { recursive: true });
  try {
    await readFile(USERS_DB_PATH, 'utf-8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeFile(USERS_DB_PATH, JSON.stringify([], null, 2), 'utf-8');
      return;
    }

    throw error;
  }
};

const readUserStore = async (): Promise<UserRecord[]> => {
  await ensureStore();
  const data = await readFile(USERS_DB_PATH, 'utf-8');
  return JSON.parse(data) as UserRecord[];
};

const writeUserStore = async (users: UserRecord[]) =>
  writeFile(USERS_DB_PATH, JSON.stringify(users, null, 2), 'utf-8');

export const userRepository = {
  async all() {
    return readUserStore();
  },

  async findByEmail(email: string) {
    const users = await readUserStore();
    return users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  },

  async findById(id: string) {
    const users = await readUserStore();
    return users.find((user) => user.id === id);
  },

  async create(
    payload: Omit<UserRecord, 'id' | 'createdAt' | 'updatedAt'> & {
      id?: string;
    },
  ): Promise<UserRecord> {
    const users = await readUserStore();
    const now = new Date().toISOString();
    const user: UserRecord = {
      id: payload.id ?? randomUUID(),
      ...payload,
      createdAt: now,
      updatedAt: now,
    };
    users.push(user);
    await writeUserStore(users);
    return user;
  },

  async update(user: UserRecord) {
    const users = await readUserStore();
    const idx = users.findIndex((item) => item.id === user.id);
    if (idx === -1) {
      throw new Error('User not found');
    }
    users[idx] = { ...user, updatedAt: new Date().toISOString() };
    await writeUserStore(users);
    return users[idx];
  },

  async linkOAuthAccount(userId: string, account: OAuthAccount) {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const nextProviders = user.providers.filter(
      (item) =>
        !(
          item.provider === account.provider &&
          item.providerAccountId === account.providerAccountId
        ),
    );
    nextProviders.push(account);
    return this.update({
      ...user,
      providers: nextProviders,
    });
  },
};
