"use client";

import { motion } from "framer-motion";
import { RiDatabase2Line, RiCheckboxCircleFill } from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const databases = [
  {
    name: "PostgreSQL",
    description: "Production ready",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "MySQL",
    description: "Fully supported",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    name: "SQLite",
    description: "Local development",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    name: "SQL Server",
    description: "Enterprise",
    color: "bg-violet-500/10 text-violet-500",
  },
  {
    name: "MariaDB",
    description: "Coming soon",
    color: "bg-zinc-500/10 text-zinc-400",
    comingSoon: true,
  },
  {
    name: "Oracle",
    description: "Coming soon",
    color: "bg-zinc-500/10 text-zinc-400",
    comingSoon: true,
  },
];

export function SupportedDatabases() {
  return (
    <section id="databases" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-medium text-primary">DATABASES</p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Works with your
            <br />
            favorite database
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Connect your existing database and start querying it using natural
            language in minutes.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {databases.map((db, index) => (
            <motion.div
              key={db.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
            >
              <Card className="group rounded-3xl p-6 transition-all hover:border-primary/40 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${db.color}`}
                  >
                    <RiDatabase2Line size={28} />
                  </div>

                  {db.comingSoon ? (
                    <Badge variant="secondary">Soon</Badge>
                  ) : (
                    <RiCheckboxCircleFill
                      size={22}
                      className="text-green-500"
                    />
                  )}
                </div>

                <h3 className="mt-6 text-xl font-semibold">{db.name}</h3>

                <p className="mt-2 text-muted-foreground">{db.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">Don't see your database?</p>

          <p className="mt-2 font-medium text-primary">
            More integrations are on the way.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
