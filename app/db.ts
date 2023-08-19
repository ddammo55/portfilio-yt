import { PrismaClient } from '@prisma/client'

// PrismaClient의 전역 객체에 접근하기 위한 설정
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// prisma 객체 생성 또는 기존 객체 사용
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// 개발 환경이 아닌 경우에만 prisma 객체를 전역 객체에 
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma