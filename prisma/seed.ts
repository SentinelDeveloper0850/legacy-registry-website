import { seedDemoData } from "../lib/demo-data"
import { prisma } from "../lib/prisma"

seedDemoData()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
