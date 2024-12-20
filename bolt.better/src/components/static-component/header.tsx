import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

async function Header() {

  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Reflct Logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} fallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}>
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;