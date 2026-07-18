"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  RiArrowRightLine,
  RiDatabase2Line,
  RiSparkling2Line,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CTA() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative overflow-hidden rounded-[40px] border bg-gradient-to-br from-background to-muted/40 p-12 lg:p-20">
            {/* Background Glow */}
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

            <div className="relative mx-auto max-w-4xl text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <RiSparkling2Line className="text-primary" size={30} />
              </div>

              <h2 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">
                Ready to talk to
                <br />
                your database?
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                Stop writing repetitive SQL. Let AI understand your schema,
                generate queries, explain results and help you discover insights
                faster.
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-4">
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

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                >
                  <RiDatabase2Line className="mr-2" size={18} />
                  Connect Database
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                <div>✓ No credit card</div>

                <div>✓ Secure connections</div>

                <div>✓ AI powered</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
