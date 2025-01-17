"use client";

import React, { useEffect } from "react";
import Dashboard from "./Dashboard";

export default function Page() {
  useEffect(() => {
    document.title = "Dashboard - INCIT Test App";
  });

  return (
    <div>
      <Dashboard />
    </div>
  );
}
