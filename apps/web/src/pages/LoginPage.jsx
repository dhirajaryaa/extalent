import { Logo } from "@/components/custom";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/google.svg?react";

function LoginPage() {
  const loginWithGoogle = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center  bg-gradient-to-b from-slate-50 to-primary/90">
      <div className="w-full max-w-md bg-background rounded-2xl py-8 px-6 text-center shadow-lg">
        <Logo variant="default" />
        <h1 className="text-lg sm:text-xl font-bold mt-4 text-primary">
          Start your career with ExTalent.
        </h1>
        <p className="text-xs sm:text-sm mt-2 mb-4">
          Sign in with Google to upload your resume and view AI-powered instant
          job matches.
        </p>
        <Button
          onClick={loginWithGoogle}
          size={"lg"}
          className={"w-full shadow-md"}
        >
          <GoogleIcon className="invert dark:invert-0 size-5" />
          Sign in with Google
        </Button>
      </div>
    </main>
  );
}

export default LoginPage;
