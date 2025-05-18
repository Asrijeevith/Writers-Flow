"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Providers({ children, session }) {
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SessionProvider session={session}>
      {mounted ? (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      ) : (
        <>{children}</>
      )}
    </SessionProvider>
  );
}
