import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <section className="relative px-6 py-24 overflow-hidden bg-black">
      {/* Grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
      {/* Your children (this will hold the form or any other content) */}
      <div className="flex justify-center pt-20">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;