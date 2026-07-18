import Link from "next/link";
import {
  RiDatabase2Line,
  RiGithubLine,
  RiTwitterXLine,
} from "@remixicon/react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <RiDatabase2Line size={20} />
          </div>

          <div>
            <p className="font-semibold">SQL AI</p>

            <p className="text-sm text-muted-foreground">
              AI Database Assistant
            </p>
          </div>
        </div>

        <div className="flex gap-8 text-sm text-muted-foreground">
          <Link href="/">Home</Link>

          <Link href="#features">Features</Link>

          <Link href="#">Docs</Link>

          <Link href="#">Privacy</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://github.com">
            <RiGithubLine size={22} />
          </Link>

          <Link href="https://twitter.com">
            <RiTwitterXLine size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
