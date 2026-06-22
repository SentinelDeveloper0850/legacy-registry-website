import { PrismaClient, UserRole } from "../lib/generated/prisma"

const prisma = new PrismaClient()

async function main() {
  const undertaker = await prisma.undertaker.upsert({
    where: { id: "sdk-head-office" },
    update: {},
    create: {
      id: "sdk-head-office",
      name: "Somdaka Funeral Services",
      tradingName: "SDK Funeral Services",
      branchName: "Head Office",
      contactEmail: "demo@legacyregistry.local",
      contactPhone: "+27 84 685 3064",
    },
  })

  const user = await prisma.user.upsert({
    where: { email: "demo@legacyregistry.local" },
    update: {
      undertakerId: undertaker.id,
      name: "SDK Demo User",
      role: UserRole.UNDERTAKER_ADMIN,
      isActive: true,
    },
    create: {
      undertakerId: undertaker.id,
      name: "SDK Demo User",
      email: "demo@legacyregistry.local",
      role: UserRole.UNDERTAKER_ADMIN,
    },
  })

  const mooifontein = await prisma.cemetery.upsert({
    where: { id: "cem-mooifontein" },
    update: {},
    create: {
      id: "cem-mooifontein",
      name: "Mooifontein Cemetery",
      municipality: "Ekurhuleni Metropolitan Municipality",
      province: "Gauteng",
    },
  })

  const waterfall = await prisma.cemetery.upsert({
    where: { id: "cem-waterfall" },
    update: {},
    create: {
      id: "cem-waterfall",
      name: "Waterfall Cemetery",
      municipality: "Ekurhuleni Metropolitan Municipality",
      province: "Gauteng",
    },
  })

  const block42b = await prisma.cemeteryBlock.upsert({
    where: { cemeteryId_name: { cemeteryId: mooifontein.id, name: "Block 42B" } },
    update: {},
    create: {
      cemeteryId: mooifontein.id,
      name: "Block 42B",
      capacity: 250,
    },
  })

  const block46 = await prisma.cemeteryBlock.upsert({
    where: { cemeteryId_name: { cemeteryId: mooifontein.id, name: "Block 46" } },
    update: {},
    create: {
      cemeteryId: mooifontein.id,
      name: "Block 46",
      capacity: 220,
    },
  })

  const blockD = await prisma.cemeteryBlock.upsert({
    where: { cemeteryId_name: { cemeteryId: waterfall.id, name: "Block D" } },
    update: {},
    create: {
      cemeteryId: waterfall.id,
      name: "Block D",
      capacity: 180,
    },
  })

  await prisma.mortuaryRegisterEntry.upsert({
    where: { undertakerId_bodyNumber: { undertakerId: undertaker.id, bodyNumber: "SDK 557" } },
    update: {},
    create: {
      undertakerId: undertaker.id,
      createdByUserId: user.id,
      bodyNumber: "SDK 557",
      firstNames: "Nomsa",
      lastName: "Dlamini",
      fullName: "Nomsa Dlamini",
      idNumber: "4808120000000",
      dateReceivedAtMortuary: new Date("2021-06-16T08:00:00.000Z"),
      dateReleasedFromMortuary: new Date("2021-06-18T08:00:00.000Z"),
      timeReleasedFromMortuary: "08:30",
      driverName: "M. Dube",
      coffinType: "Standard",
      cemeteryId: mooifontein.id,
      cemeteryBlockId: block42b.id,
      graveNumber: "111",
      publishToRegistry: true,
      publishedAt: new Date("2021-06-18T09:00:00.000Z"),
    },
  })

  await prisma.mortuaryRegisterEntry.upsert({
    where: { undertakerId_bodyNumber: { undertakerId: undertaker.id, bodyNumber: "SDK 558" } },
    update: {},
    create: {
      undertakerId: undertaker.id,
      createdByUserId: user.id,
      bodyNumber: "SDK 558",
      firstNames: "Joseph",
      lastName: "Mokoena",
      fullName: "Joseph Mokoena",
      idNumber: "3902250000000",
      dateReceivedAtMortuary: new Date("2017-08-31T08:00:00.000Z"),
      dateReleasedFromMortuary: new Date("2017-09-02T08:00:00.000Z"),
      timeReleasedFromMortuary: "09:15",
      driverName: "T. Maseko",
      coffinType: "Standard",
      cemeteryId: mooifontein.id,
      cemeteryBlockId: block46.id,
      graveNumber: "08",
      publishToRegistry: false,
    },
  })

  await prisma.mortuaryRegisterEntry.upsert({
    where: { undertakerId_bodyNumber: { undertakerId: undertaker.id, bodyNumber: "SDK 559" } },
    update: {},
    create: {
      undertakerId: undertaker.id,
      createdByUserId: user.id,
      bodyNumber: "SDK 559",
      firstNames: "Thandiwe",
      lastName: "Khumalo",
      fullName: "Thandiwe Khumalo",
      idNumber: "5606070000000",
      dateReceivedAtMortuary: new Date("2020-03-10T08:00:00.000Z"),
      dateReleasedFromMortuary: new Date("2020-03-12T08:00:00.000Z"),
      timeReleasedFromMortuary: "10:00",
      driverName: "S. Nkosi",
      coffinType: "Custom",
      cemeteryId: waterfall.id,
      cemeteryBlockId: blockD.id,
      graveNumber: "R-75",
      publishToRegistry: true,
      publishedAt: new Date("2020-03-12T10:30:00.000Z"),
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
