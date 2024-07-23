import db from "../backend/utils/db";
import bcrypt from "bcryptjs";

type User = {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

const users: User[] = [
  {
    name: "Julio Sanic",
    email: "julio.sanic.gt.256@gmail.com",
    password: bcrypt.hashSync("borden16", 10),
    role: "ADMIN",
  },
  {
    name: "Angela Canel",
    email: "angy@gmail.com",
    password: bcrypt.hashSync("borden16", 10),
    role: "USER",
  },
];

async function seed() {
  await Promise.all(
    users.map((author) => {
      return db.user.create({
        data: author,
      });
    })
  );
}

seed()
  .then((result) => {
    console.log("Seed successful 🌱");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed ❌");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
