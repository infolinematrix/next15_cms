"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign in failed:", error);

      alert("Sign-in failed, please try again.");
    }
  };
  return (
    <Button size="sm" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
