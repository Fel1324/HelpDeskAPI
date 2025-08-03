import { prisma } from "@/database/prisma";
import { env } from "@/env";
import { hash } from "bcrypt";

async function seed() {
  await prisma.time.createMany({
    data: [
      { id: 1, time: "07:00" },
      { id: 2, time: "08:00" },
      { id: 3, time: "09:00" },
      { id: 4, time: "10:00" },
      { id: 5, time: "11:00" },
      { id: 6, time: "12:00" },
      { id: 7, time: "13:00" },
      { id: 8, time: "14:00" },
      { id: 9, time: "15:00" },
      { id: 10, time: "16:00" },
      { id: 11, time: "17:00" },
      { id: 12, time: "18:00" },
      { id: 13, time: "19:00" },
      { id: 14, time: "20:00" },
      { id: 15, time: "21:00" },
      { id: 16, time: "22:00" },
      { id: 17, time: "23:00" },
    ],
  });

  const password = env.ADMIN_PASSWORD
  const hashedPassword = await hash(password, 10)

  await prisma.user.create({
    data: {
      name: "Usuário Adm",
      email: "user.adm@email.com",
      password: hashedPassword,
      role: "admin"
    }
  })
}

seed().then(() => {
  console.log("Db seeded!")
  prisma.$disconnect()
});
