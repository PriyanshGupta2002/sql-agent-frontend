"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import {
  RiDatabase2Line,
  RiGithubLine,
  RiArrowRightUpLine,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <RiDatabase2Line size={22} />
          </div>

          <div>
            <p className="text-sm font-semibold leading-none">SQL AI</p>
            <p className="text-xs text-muted-foreground">Database Assistant</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>

          <Link
            href="#databases"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Databases
          </Link>

          <Link
            href="#pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>

          <Link
            href="https://github.com"
            target="_blank"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <RiGithubLine size={18} />
            GitHub
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton>
              <Button variant="ghost" className="rounded-full">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="rounded-full">
                Get Started
                <RiArrowRightUpLine className="ml-2" size={18} />
              </Button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
