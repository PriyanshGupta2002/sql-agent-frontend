import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

let getToken: (() => Promise<string | null>) | null = null;

const getServerClerkToken = async () => {
  if (typeof window !== "undefined") {
    return null;
  }

  try {
    const { auth } = await import("@clerk/nextjs/server");
    const clerkAuth = await auth();

    return clerkAuth.getToken ? await clerkAuth.getToken() : null;
  } catch (error) {
    console.error("Unable to resolve Clerk server token", error);
    return null;
  }
};

/**
 * Register Clerk's getToken function once.
 */
export const setAuthTokenGetter = (getter: () => Promise<string | null>) => {
  getToken = getter;
};

api.interceptors.request.use(
  async (config) => {
    const token = getToken ? await getToken() : await getServerClerkToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized");
      // Later:
      // router.push("/sign-in")
      // toast.error("Session expired")
    }

    return Promise.reject(error);
  },
);

export default api;
