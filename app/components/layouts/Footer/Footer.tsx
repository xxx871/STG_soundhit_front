import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-inherit fixed bottom-0 w-full text-white border-gray-200 border-t">
      <div className="flex flex-col items-center pt-0">
        <nav className="flex justify-center w-full max-w-2xl mx-auto">
          <Link href="/terms" className="flex-1 text-center">
            利用規約
          </Link>
          <Link href="/privacy" className="flex-1 text-center">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="flex-1 text-center">
            お問い合わせ
          </Link>
        </nav>
        <p className="text-xs">
          copyright ©2024. 音ぴしゃ
        </p>
      </div>
    </div>
  );
};

export default Footer;