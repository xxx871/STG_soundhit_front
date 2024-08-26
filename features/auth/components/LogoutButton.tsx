"use client"

import { useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react'
import { logout } from '@/features/auth/api/logout';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
}

const LogoutButton = ({
  children,
  type
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async() => {
    setIsLoading(true);
    try {
      await logout();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingButton
      onClick={handleLogout}
      type={type}
      isLoading={isLoading}
      className="bg-black py-1 px-3 rounded-md font-medium text-xl"
    >
      {children}
    </LoadingButton>
  );
};

export default LogoutButton;