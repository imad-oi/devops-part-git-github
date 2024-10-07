import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;