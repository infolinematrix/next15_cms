"use client";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";

export default function SigninGoogleButton() {
  const handleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in failed:", error);

      alert("Sign-in failed, please try again.");
    }
  };
  return (
    <Button variant="outline" className="w-full py-5" onClick={handleSignIn}>
      Login with Google
    </Button>
  );
}
