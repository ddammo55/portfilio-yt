// "use server" 지시어를 사용하여 서버 사이드 렌더링을 나타냄
"use server";  

// Next.js 캐시 모듈에서 revalidatePath 함수를 가져옴
import { revalidatePath } from "next/cache";

// "./db" 경로에서 Prisma 데이터베이스 모듈을 가져옴
import { prisma } from "./db";

// 게시글을 생성하는 비동기 함수
export async function postEntry(formData: FormData) {
  "use server";  // "use server" 지시어를 사용하여 서버 사이드 렌더링을 나타냄

   // Prisma를 사용하여 게시글 생성
  const data = await prisma.guestbook.create({
    data: {
      message: formData.get("entry") as string,  // "entry" 필드의 내용을 가져와서 메시지로 저장
      username: "hello",  // 사용자 이름을 "hello"로 지정
    },
  });

  // "/guestbook" 경로의 페이지 캐시를 갱신하여 재유효화
  revalidatePath("/guestbook");
}