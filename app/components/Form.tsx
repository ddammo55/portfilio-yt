"use client";

import { useRef } from "react"; // React의 useRef 훅을 가져옴
import { postEntry } from "../action"; // "../action" 경로에서 postEntry 함수를 가져옴
import { experimental_useFormStatus as useFormStatus } from "react-dom";
// React DOM의 experimental_useFormStatus 훅을 가져옴

// 양식 컴포넌트 정의
export default function Form() {
  const formRef = useRef<HTMLFormElement>(null); // HTMLFormElement를 가리키는 Ref 객체 생성
  const { pending } = useFormStatus();  // useFormStatus 훅을 사용하여 양식 상태 가져오기
  return (
    <form
      action={async (formData) => { 
        await postEntry(formData);   // postEntry 함수를 사용하여 데이터 게시
        formRef.current?.reset();  // 양식 리셋
      }}
      ref={formRef}
      className="relative flex items-center text-sm mb-5"
      style={{ opacity: pending ? 0.7 : 1 }} // 상태에 따라 양식 투명도 조정
    >
      <input
        type="text"
        placeholder="Your message..."
        name="entry"
        required
        disabled={pending} // 상태에 따라 입력 비활성화
        className="pl-4 pr-32 py-2 mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
      />

      <button
        type="submit"
        disabled={pending} // 상태에 따라 버튼 비활성화
        className="flex items-center justify-center absolute right-2 mt-1 font-medium h-7 bg-teal-500/30 text-neutral-900 dark:text-neutral-100 rounded w-16"
      >
        Send
      </button>
    </form>
  );
}