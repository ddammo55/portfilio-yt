/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
         serverActions:true,
         // 서버 액션 실험 기능 활성화
    },
    images: {
        domains: ['cdn.sanity.io'],
    }
}

module.exports = nextConfig
