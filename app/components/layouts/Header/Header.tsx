import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import ModalTutorial from '@/features/tutorial/components/ModalTutorial';
import AuthButtons from '@/features/auth/components/AuthButtons';

const Header = () => {
  return (
    <header className="divide-y border-gray-200 dark:border-gray-800 border-b bg-inherit h-12 flex items-center">
      <div className="px-4 md:py-2 lg:px-6 w-full">
        <div className="flex items-center justify-between space-y-2 md:space-y-0 md:space-x-6 text-white">
          <Link href="/" className="text-2xl font-bold font-palettemosaic flex items-center">
            <Image
              src="/header_icon.png"
              alt="Header Icon"
              height={50}
              width={50}
            />
            おんぴしゃ
          </Link>
          <nav className="flex justify-end items-center text-2xl font-medium text-white">
            <ModalTutorial />
            <Link href="/ranking" className="transition-colors hover:text-gray-300 mx-6">
              ランキング
            </Link>
            <AuthButtons />
          </nav>
        </div>
      </div>
    </header>
  )
};

export default Header;