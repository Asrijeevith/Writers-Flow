'use client';

import { Toaster } from 'react-hot-toast';

const ClientToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />
  );
};

export default ClientToaster;
