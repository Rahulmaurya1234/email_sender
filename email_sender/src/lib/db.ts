// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
// src/lib/db.ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// export const users: User[] = [];

export const db = {
  user: {
    findUnique: async ({ where }: { where: { email: string } }) => {
      return users.find(u => u.email === where.email) || null;
    },
    create: async ({ data }: { data: User }) => {
      const newUser = { ...data, id: users.length + 1 };
      users.push(newUser);
      return newUser;
    }
  }
};
