'use client';

import { SessionProvider } from 'next-auth/react';

export default function SessionProviderWrapper({ children }) {
  return (
    <SessionProvider 
      session={null}
      refetchInterval={0}
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}