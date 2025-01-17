"use client";

import React, { useEffect } from "react";
import SignIn from "./SignIn";

export default function Page() {
  useEffect(() => {
    document.title = "Sign In - INCIT Test App";
  });

  return <SignIn />;
}
