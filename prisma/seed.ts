import db from "../backend/utils/db";
import bcrypt from "bcryptjs";
import { Product } from "@prisma/client";

type User = {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

type PuppylProduct = Omit<Product, "id" | "createdAt" | "updatedAt" | "userId">;

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

const products: PuppylProduct[] = [
  {
    name: "Pastor Aleman",
    description:
      "Pastor Aleman de 6 meses, vacunado y desparasitado, listo para un nuevo hogar.",
    image: "https://images.unsplash.com/photo-1560807707-9b1b8b5e0f0b",
    breed: "Pastor Aleman",
    price: 1200,
    category: "Perros",
    countInStock: 3,
    rating: 4.5,
    numReviews: 0,
  },
  {
    name: "Bulldog Frances",
    description:
      "Bulldog Frances de 3 meses, vacunado y desparasitado, listo para un nuevo hogar.",
    image: "https://images.unsplash.com/photo-1556740731-4c6f2d6e9d2b",
    breed: "Bulldog Frances",
    price: 1500,
    category: "Perros",
    countInStock: 5,
    rating: 4.0,
    numReviews: 0,
  },
  {
    name: "American Pitbull",
    description:
      "American Pitbull de 5 meses, vacunado y desparasitado, listo para un nuevo hogar. Solo para personas con experiencia en la raza.",
    image: "https://images.unsplash.com/photo-1560807707-9b1b8b5e0f0b",
    breed: "American Pitbull",
    price: 1000,
    category: "Perros",
    countInStock: 2,
    rating: 4.8,
    numReviews: 0,
  },
  {
    name: "Tortuga de orejas rojas",
    description:
      "Tortuga de orejas rojas de 1 año, sana y activa, lista para un nuevo hogar.",
    image: "https://images.unsplash.com/photo-1560807707-9b1b8b5e0f0b",
    breed: "Tortuga de orejas rojas",
    price: 100,
    category: "Reptiles",
    countInStock: 1,
    rating: 4.8,
    numReviews: 0,
  },
  {
    name: "Gato Persa",
    description:
      "Gato Persa de 4 meses, vacunado y desparasitado, listo para un nuevo hogar.",
    image: "https://images.unsplash.com/photo-1560807707-9b1b8b5e0f0b",
    breed: "Gato Persa",
    price: 800,
    category: "Gatos",
    countInStock: 3,
    rating: 4.8,
    numReviews: 0,
  },
  {
    name: "Boa Constrictor",
    description:
      "Boa Constrictor macho de 5 años, sana y activa, lista para un nuevo hogar.",
    image: "https://images.unsplash.com/photo-1560807707-9b1b8b5e0f0b",
    breed: "Boa Constrictor",
    price: 5000,
    category: "Reptiles",
    countInStock: 1,
    rating: 4.5,
    numReviews: 0,
  },
];

async function seed() {
  await db.user.deleteMany({});
  await db.product.deleteMany({});

  await Promise.all(
    users.map((author) => {
      return db.user.create({
        data: author,
      });
    })
  );

  const julio = await db.user.findUnique({
    where: {
      email: "julio.sanic.gt.256@gmail.com",
    },
  });

  await Promise.all(
    products.map((product) => {
      return db.product.create({
        data: {
          ...product,
          userId: julio!.id,
        },
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
