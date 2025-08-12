import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const email = 'dksenghd123@gmail.com';
    const plain = '!!@@Ckdrbs2';

    const hash = await bcrypt.hash(plain, 10);

    await prisma.user.upsert({
        where: { email },
        update: { password: hash, role: 'ADMIN' },
        create: { email, password: hash, role: 'ADMIN', name: 'Admin'},
    });

    console.log('Seeded admin:', email, '(pw:', plain, ')');
}

main().finally(() => prisma.$disconnect());