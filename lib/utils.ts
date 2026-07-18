import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const connectionsList = [
  {
    aliasName: "Production Database",
    dbString: "postgresql://admin:********@prod-db.company.com:5432/production",
    dbType: "postgres",
    color: "#3B82F6", // Blue
  },
  {
    aliasName: "Development Database",
    dbString: "postgresql://dev_user:********@localhost:5432/dev_db",
    dbType: "postgres",
    color: "#10B981", // Emerald
  },
  {
    aliasName: "Sales Analytics",
    dbString: "mysql://analytics:********@192.168.1.10:3306/sales_db",
    dbType: "mysql",
    color: "#F97316", // Orange
  },
  {
    aliasName: "HR Database",
    dbString: "mysql://hr_admin:********@localhost:3306/hr_db",
    dbType: "mysql",
    color: "#EC4899", // Pink
  },
  {
    aliasName: "Customer CRM",
    dbString: "postgresql://crm_user:********@db.example.com:5432/crm",
    dbType: "postgres",
    color: "#8B5CF6", // Violet
  },
  {
    aliasName: "Inventory System",
    dbString: "postgresql://inventory:********@inventory-db:5432/inventory",
    dbType: "postgres",
    color: "#14B8A6", // Teal
  },
  {
    aliasName: "Finance Reporting",
    dbString: "mysql://finance:********@finance-db:3306/reporting",
    dbType: "mysql",
    color: "#EAB308", // Yellow
  },
  {
    aliasName: "SQLite Demo",
    dbString: "sqlite:///dvdrental.db",
    dbType: "sqlite",
    color: "#6B7280", // Gray
  },
];

export const threadsList = [
  {
    id: "th_1",
    name: "Executive Business Summary",
    createdAt: "2 mins ago",
  },
  {
    id: "th_2",
    name: "Top 10 Customers by Revenue",
    createdAt: "15 mins ago",
  },
  {
    id: "th_3",
    name: "Monthly Rental Trends",
    createdAt: "Today",
  },
  {
    id: "th_4",
    name: "Most Popular Film Categories",
    createdAt: "Today",
  },
  {
    id: "th_5",
    name: "Store Performance Comparison",
    createdAt: "Yesterday",
  },
  {
    id: "th_6",
    name: "Customer Lifetime Value Analysis",
    createdAt: "Yesterday",
  },
  {
    id: "th_7",
    name: "Unreturned Rentals Investigation",
    createdAt: "2 days ago",
  },
  {
    id: "th_8",
    name: "Revenue by Country",
    createdAt: "3 days ago",
  },
  {
    id: "th_9",
    name: "Top Actors by Rental Count",
    createdAt: "Last week",
  },
  {
    id: "th_10",
    name: "Inventory Health Report",
    createdAt: "Last week",
  },
];
