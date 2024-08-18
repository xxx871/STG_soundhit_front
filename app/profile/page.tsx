import { getProfile } from "@/lib/api/getProfile";
import UserProfile from "@/features/user/components/UserProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from 'react'

const Profile = async () => {
  const userData = await getProfile();
  if (!userData) {
    redirect("/login");
  }
  const { name, user_high_note: highNote, user_low_note: lowNote, scores, gender } = userData;

  return (
    <div className="max-w-sm mx-auto grig gap-6">
      <UserProfile
        name={name}
        gender={gender}
        highNote={highNote}
        lowNote={lowNote}
        scores={scores}
      />
      <div className="flex justify-center mt-6">
        <Link
          href="/profile/edit"
          className="w-40 h-12 bg-black text-white text-xl rounded-full flex items-center justify-center transition-all hover:scale-105 font-bold"
        >
          編集
        </Link>
      </div>
    </div>
  )
};

export default Profile;