"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

import { setAuthTokenGetter } from "@/service/instances/axiosInstance";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getToken } = useAuth();

  useEffect(() => {
    setAuthTokenGetter(getToken);
  }, [getToken]);

  return <>{children}</>;
}
