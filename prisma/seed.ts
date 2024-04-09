import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const name = "admin";
    const email = "admin@email.com";
    const password = "admin";
    const role = "ADMIN";

    await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar usuarios:", error);
  }
}

createAdmin();
