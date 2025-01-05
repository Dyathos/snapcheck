const prismaDb = new (require("@prisma/client").PrismaClient)();
const { standardParts } = require("./seed-parts");

async function main() {
  console.log("Début du seed...");

  // Créer d'abord un véhicule par défaut
  const defaultVehicle = await prismaDb.vehicle.create({
    data: {
      brand: "Véhicule par défaut",
      affectation: "Template",
      healthStatus: "good",
    },
  });

  // Créer les pièces en les liant au véhicule par défaut
  for (const part of standardParts) {
    await prismaDb.part.create({
      data: {
        ...part,
        status: "good",
        vehicle: {
          connect: {
            id: defaultVehicle.id,
          },
        },
      },
    });
  }

  console.log("Seed terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaDb.$disconnect();
  });
