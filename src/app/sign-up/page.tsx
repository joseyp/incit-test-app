"use client";

import React, { useEffect } from "react";
import SignUp from "./SignUp";

export default function Page() {
  useEffect(() => {
    document.title = "Sign Up - INCIT Test App";
  });

  return <SignUp />;
}
