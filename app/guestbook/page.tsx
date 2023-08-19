import React from 'react';
import Form from '../components/Form';
import { prisma } from '../db';

//게시글 데이터를 가져오는 비동기 함수
async function getEntries() {
    const data = await prisma.guestbook.findMany({
        take:50,
        orderBy:{
            created_at: 'desc'
        }
    })

    return data;
}

// 페이지 재유효화 시간 설정
export const revalidate = 60;


// Guestbook 컴포넌트 내용
export default async function Guestbook() {
    // 게시글 데이터 가져오기
    const data = await getEntries();
    return (
        <div className='divide-y divide-gray-200 dark:divide-gray-700'>
            <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
                <h1 className='text-3 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
                    Guestbook
                </h1>
            </div>

            <div className='w-full'>
                <div className='max-w-[500px] mx-auto mt-8'>
                   <Form/>

                    <div className='flex flex-col space-y-2'>
                        {data.map((entry) => (
                            <div key={entry.id} className='w-full text-sm break-words'>
                                {entry.message}
                            </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

