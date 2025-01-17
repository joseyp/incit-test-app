"use client";

import React, { useEffect } from "react";
import Profile from "./Profile";

export default function Page() {
  useEffect(() => {
    document.title = "Profile - INCIT Test App";
  });

  return (
    <div>
      <Profile />
    </div>
  );
}
