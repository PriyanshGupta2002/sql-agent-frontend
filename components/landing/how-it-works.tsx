"use client";

import { motion } from "framer-motion";
import {
  RiDatabase2Line,
  RiChat3Line,
  RiRobot2Line,
  RiBarChartGroupedLine,
  RiArrowDownLine,
} from "@remixicon/react";

import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: RiDatabase2Line,
    title: "Connect Database",
    description:
      "Securely connect PostgreSQL, MySQL, SQLite or SQL Server in seconds.",
  },
  {
    icon: RiChat3Line,
    title: "Ask a Question",
    description:
      "Describe what you want using natural language instead of SQL.",
  },
  {
    icon: RiRobot2Line,
    title: "AI Generates SQL",
    description:
      "The assistant understands your schema and creates optimized queries.",
  },
  {
    icon: RiBarChartGroupedLine,
    title: "Get Results",
    description:
      "Review generated SQL, execution time and data insights instantly.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-medium text-primary">HOW IT WORKS</p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            From question to SQL
            <br />
            in just a few seconds
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Let AI understand your database, generate SQL, and explain the
            results—all in one seamless workflow.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                }}
                className="relative"
              >
                <Card className="relative h-full rounded-3xl p-8 transition-all hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon size={28} className="text-primary" />
                  </div>

                  <div className="mb-2 text-sm font-medium text-primary">
                    Step {index + 1}
                  </div>

                  <h3 className="text-xl font-semibold">{step.title}</h3>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </Card>

                {index !== steps.length - 1 && (
                  <div className="absolute -right-6 top-1/2 hidden -translate-y-1/2 lg:block">
                    <RiArrowDownLine
                      size={24}
                      className="rotate-[-90deg] text-muted-foreground"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
