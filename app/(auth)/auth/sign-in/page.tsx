import React from 'react'
import Image from 'next/image'
import SignInFormClient from '@/modules/auth/components/sign-in-form-client'

export default function Page() {
  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 px-4 py-12">

      {/* --- INJECTED CSS ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />

      {/* --- BACKGROUND ORBEEZ --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-green-400/30 dark:bg-green-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-emerald-400/30 dark:bg-emerald-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-400/30 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000" />
      </div>

      {/* --- SPLIT SCREEN CONTAINER --- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Left Side: Floating Image & Branding */}
        <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 animate-float">
            <Image 
              src="/logo.svg" 
              alt="Login Illustration" 
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Welcome to <span className="text-emerald-500">OshCode</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto lg:mx-0">
            Your entire development environment, right in the browser. Sign in to access your workspaces, templates, and settings.
          </p>
        </div>

        {/* Right Side: The Form Component */}
        <div className="w-full max-w-md shrink-0">
          <SignInFormClient />
        </div>

      </div>
    </div>
  )
}


// import React from 'react'
// import Image from 'next/image'
// import SignInFormClient from '@/modules/auth/components/sign-in-form-client'
// function Page() {
//   return (
//     <>
//       <Image src={"/login.svg"} alt="login-image" height={300} width={300} className='m-6 object-cover'/>
//       <SignInFormClient />
//     </>
//   )
// }

// export default Page 