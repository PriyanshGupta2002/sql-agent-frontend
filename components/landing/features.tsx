"use client";

import { motion } from "framer-motion";
import {
  RiRobot2Line,
  RiDatabase2Line,
  RiTerminalBoxLine,
  RiFlashlightLine,
  RiLineChartLine,
  RiShieldCheckLine,
} from "@remixicon/react";

import { Card } from "@/components/ui/card";

const features = [
  {
    icon: RiRobot2Line,
    title: "Natural Language",
    description:
      "Ask questions in plain English. No need to remember SQL syntax.",
  },
  {
    icon: RiTerminalBoxLine,
    title: "AI SQL Generation",
    description:
      "Generate optimized SQL queries instantly using powerful AI models.",
  },
  {
    icon: RiDatabase2Line,
    title: "Schema Understanding",
    description:
      "Automatically understands your tables, columns and relationships.",
  },
  {
    icon: RiFlashlightLine,
    title: "Fast Execution",
    description: "Execute queries securely and get results in milliseconds.",
  },
  {
    icon: RiLineChartLine,
    title: "Data Insights",
    description:
      "Summarize trends and understand your data without writing reports.",
  },
  {
    icon: RiShieldCheckLine,
    title: "Secure by Design",
    description:
      "Your database credentials stay protected while queries are executed safely.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-medium text-primary">FEATURES</p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Everything you need to
            <br />
            query your database with AI
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Built for developers, analysts and teams who want answers from their
            data without writing complex SQL.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.45,
                }}
                whileHover={{
                  y: -6,
                }}
              >
                <Card className="group h-full rounded-3xl p-7 transition-all hover:border-primary/40 hover:shadow-xl">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
