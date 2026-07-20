import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SupportedDatabases } from "@/components/landing/supported-databases";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function LandingPage() {
  const { userId, getToken } = await auth();
  if (userId) {
    const user = await currentUser();
    const token = await getToken(); // Clerk session token

    // Fire-and-forget sync call to your backend
    fetch(`${process.env.BACKEND_URL}/users/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: user?.emailAddresses[0]?.emailAddress,
        first_name: user?.firstName,
        last_name: user?.lastName,
        image_url: user?.imageUrl,
      }),
    }).catch((err) => console.error("User sync failed:", err));
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <SupportedDatabases />
      <CTA />
      <Footer />
    </>
  );
}
