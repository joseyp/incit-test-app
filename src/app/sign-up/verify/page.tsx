"use client";

import React, { useEffect, useState } from "react";
import AppTheme from "../../shared-theme/AppTheme";
import { CssBaseline, Link } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ColorModeSelect from "../../shared-theme/ColorModeSelect";
import Button from "@mui/material/Button";
import { useSearchParams } from "next/navigation";

const LandingContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  position: "relative",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const CenteredLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {children}
    </div>
  );
};

export default function Page(props: { disableCustomTheme?: boolean }) {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
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
        const result = await response.json();
        setData(result.status);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <LandingContainer direction="column" justifyContent="space-between">
        <CenteredLayout>
          <div className="text-center">
            Account Verified. <Link href="/sign-in">Sign in</Link>
          </div>
        </CenteredLayout>
      </LandingContainer>
    </AppTheme>
  );
}
