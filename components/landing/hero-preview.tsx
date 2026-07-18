"use client";

import { motion } from "framer-motion";
import {
  RiCheckLine,
  RiDatabase2Line,
  RiRobot2Line,
  RiTerminalBoxLine,
  RiLoader4Line,
} from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function HeroPreview() {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative mx-auto w-full max-w-2xl"
    >
      {/* Glow */}
      <div className="absolute inset-0 -z-10 rounded-[36px] bg-primary/15 blur-3xl" />

      <Card className="overflow-hidden rounded-3xl border shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <RiRobot2Line size={22} className="text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">SQL AI Assistant</h3>

              <p className="text-xs text-muted-foreground">
                Connected to PostgreSQL
              </p>
            </div>
          </div>

          <Badge className="rounded-full">Live</Badge>
        </div>

        {/* Conversation */}
        <div className="space-y-6 p-6">
          {/* User */}
          <div className="ml-auto max-w-md rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground">
            Show the top 10 customers by revenue this month.
          </div>

          {/* AI */}
          <div className="flex gap-3">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <RiRobot2Line size={18} className="text-primary" />
            </div>

            <div className="flex-1 space-y-4">
              {/* Tool Calls */}
              <Card className="rounded-2xl bg-muted/40 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <RiCheckLine className="text-green-500" size={18} />
                    Reading database schema
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <RiCheckLine className="text-green-500" size={18} />
                    Detecting revenue tables
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <RiLoader4Line
                      className="animate-spin text-primary"
                      size={18}
                    />
                    Generating optimized SQL...
                  </div>
                </div>
              </Card>

              {/* SQL */}
              <Card className="overflow-hidden rounded-2xl">
                <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
                  <RiTerminalBoxLine size={18} />
                  <span className="text-sm font-medium">Generated SQL</span>
                </div>

                <pre className="overflow-x-auto p-4 text-sm leading-7">
                  {`SELECT c.name,
SUM(o.total_amount) AS revenue

FROM customers c

JOIN orders o
ON c.id = o.customer_id

GROUP BY c.name

ORDER BY revenue DESC

LIMIT 10;`}
                </pre>
              </Card>

              {/* Result */}
              <Card className="rounded-2xl bg-primary/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <RiDatabase2Line size={20} className="text-primary" />
                    </div>

                    <div>
                      <p className="font-medium">Query Executed Successfully</p>

                      <p className="text-sm text-muted-foreground">
                        10 rows returned
                      </p>
                    </div>
                  </div>

                  <Badge variant="secondary">128 ms</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between px-6 py-4 text-sm text-muted-foreground">
          <span>Powered by AI Agents</span>

          <span>Streaming Results</span>
        </div>
      </Card>
    </motion.div>
  );
}
