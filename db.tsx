import { PrismaClient } from '@prisma/client'
import store from 'store2'


declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
  var serverHost: string
}


export const prisma =
  global.prisma ||
  new PrismaClient({
    // log: ['query'],
  })

export const serverHost = "http://localhost:3000"

if (process.env.NODE_ENV !== 'production') global.prisma = prisma



