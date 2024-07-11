"use client"

import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { Icon } from './icon';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

type ExternalAuthButtonProps = {
  provider: 'github' | 'google';
  label: string;
};

const ExternalAuthButton: React.FC<ExternalAuthButtonProps> = ({ provider, label }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn(provider);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingButton
      variant="outline"
      isLoading={isLoading}
      onClick={handleSignIn}
    >
      {provider === 'github' ? <Icon.github className="mr-2"/> : <Icon.google className="mr-2" />}
      {label}
    </LoadingButton>
  );
};

export default ExternalAuthButton