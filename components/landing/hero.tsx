"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiArrowRightLine,
  RiSparkling2Line,
  RiDatabase2Line,
  RiRobot2Line,
  RiFlashlightLine,
} from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { HeroPreview } from "./hero-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute left-1/2 top-24 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-20 px-6 py-20 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">
            <RiSparkling2Line className="mr-2" size={16} />
            AI Powered SQL Assistant
          </Badge>

          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
              Talk to your
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
                Database
              </span>
              <br />
              using AI
            </h1>

            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Generate SQL, inspect schemas, analyze your data, and understand
              your database using natural language instead of writing complex
              queries.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="rounded-full px-8"
              nativeButton={false}
              render={
                <Link href="/chat">
                  Start Chatting
                  <RiArrowRightLine className="ml-2" size={18} />
                </Link>
              }
            />

            <Button size="lg" variant="outline" className="rounded-full px-8">
              Connect Database
            </Button>
          </div>

          {/* Stats */}
          <div className="grid max-w-lg grid-cols-3 gap-6 pt-6">
            <div>
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <RiDatabase2Line className="text-primary" size={22} />
              </div>

              <p className="font-semibold">PostgreSQL</p>

              <p className="text-sm text-muted-foreground">
                MySQL, SQLite & more
              </p>
            </div>

            <div>
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <RiRobot2Line className="text-primary" size={22} />
              </div>

              <p className="font-semibold">AI Generated</p>

              <p className="text-sm text-muted-foreground">Optimized SQL</p>
            </div>

            <div>
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <RiFlashlightLine className="text-primary" size={22} />
              </div>

              <p className="font-semibold">Instant</p>

              <p className="text-sm text-muted-foreground">Query Results</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="relative"
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  );
}
