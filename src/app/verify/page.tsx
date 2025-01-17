"use client";

import React, { useEffect } from "react";
import { Link } from "@mui/material";
import { useSearchParams } from "next/navigation";

const CenteredLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {children}
    </div>
  );
};

export default function Page() {
  // const [data, setData] = useState("");
  // const [error, setError] = useState("");

  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/signup/verify-email?token=${token}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const result = await response.json();
        // setData(result.status);
      } catch (error) {
        console.error("Fetch error:", error);
        // setError(error);
      } finally {
      }
    };

    fetchData();
  }, [params]);

  return (
    <CenteredLayout>
      <div className="text-center">
        Account Verified. <Link href="/sign-in">Sign in</Link>
      </div>
    </CenteredLayout>
  );
}
