
// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Chrome, Github } from "lucide-react";
// import { signIn } from "@/auth";

// async function handleGoogleSignIn(){
// "use server"
// await signIn("google")
// }

// async function handleGithubSignIn(){
// "use server"
// await signIn("github")
// }

// const SignInFormClient = () => {
//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl font-bold text-center">
//           Sign In
//         </CardTitle>
//         <CardDescription className="text-center">
//           Choose your preferred sign-in method
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="grid gap-4">
//         <form action={handleGoogleSignIn}>
//           <Button type="submit" variant={"outline"} className="w-full">
//             <Chrome className="mr-2 h-4 w-4" />
//             <span>Sign in with google</span>
//           </Button>
//         </form>
//         <form action={handleGithubSignIn}>
//           <Button type="submit" variant={"outline"} className="w-full">
//             <Github className="mr-2 h-4 w-4" />
//             <span>Sign in with github</span>
//           </Button>
//         </form>
//       </CardContent>

//       <CardFooter>
//         <p className="text-sm text-center text-gray-500 dark:text-gray-400 w-full">
//           By signing in, you agree to our{" "}
//           <a href="#" className="underline hover:text-primary">
//             Terms of Service
//           </a>{" "}
//           and{" "}
//           <a href="#" className="underline hover:text-primary">
//             Privacy Policy
//           </a>
//           .
//         </p>
//       </CardFooter>
//     </Card>
//   );
// };

// export default SignInFormClient;
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Github } from "lucide-react";
import { signIn } from "@/auth";

async function handleGoogleSignIn() {
  "use server";
  await signIn("google");
}

async function handleGithubSignIn() {
  "use server";
  await signIn("github");
}

const SignInFormClient = () => {
  return (
    <Card className="relative w-full border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/50 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
      
      {/* Subtle top highlight line for 3D glass edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      
      <CardHeader className="space-y-2 pb-8 pt-10">
        <CardTitle className="text-3xl font-extrabold text-center tracking-tight text-zinc-900 dark:text-white">
          Sign In
        </CardTitle>
        <CardDescription className="text-center text-zinc-600 dark:text-zinc-400 text-base">
          Choose your preferred authentication method
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5 px-8">
        <form action={handleGoogleSignIn}>
          <Button 
            type="submit" 
            variant="outline" 
            className="w-full h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 group"
          >
            <Chrome className="mr-3 h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-zinc-800 dark:text-zinc-200">Continue with Google</span>
          </Button>
        </form>

        <form action={handleGithubSignIn}>
          <Button 
            type="submit" 
            variant="outline" 
            className="w-full h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 group"
          >
            <Github className="mr-3 h-5 w-5 text-zinc-900 dark:text-white group-hover:scale-110 transition-transform" />
            <span className="font-medium text-zinc-800 dark:text-zinc-200">Continue with GitHub</span>
          </Button>
        </form>
      </CardContent>

      <CardFooter className="pb-8 pt-4 px-8">
        <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 w-full leading-relaxed">
          By signing in, you agree to our{" "}
          <br className="sm:hidden"/>
          <a href="#" className="font-medium text-zinc-800 dark:text-zinc-200 underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4 hover:text-emerald-500 transition-colors">
            Terms of Service
          </a>
          {" "}and{" "}
          <a href="#" className="font-medium text-zinc-800 dark:text-zinc-200 underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4 hover:text-emerald-500 transition-colors">
            Privacy Policy
          </a>.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInFormClient;

