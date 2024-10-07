"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Icons } from "@/components/ui/icons";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {/* {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )} */}
              Sign In
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" disabled={isLoading}>
            {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
            GitHub
          </Button>
          <Button variant="outline" disabled={isLoading}>
            {/* <Icons.google className="mr-2 h-4 w-4" /> */}
            Google
          </Button>
          <Button variant="outline" disabled={isLoading}>
            {/* <Icons.apple className="mr-2 h-4 w-4" /> */}
            Apple
          </Button>
        </div>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        <a
          href="/reset-password"
          className="hover:text-brand underline underline-offset-4"
        >
          Forgot your password?
        </a>
      </p>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="hover:text-brand underline underline-offset-4"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
