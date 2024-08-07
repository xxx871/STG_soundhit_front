"use client"

import { Gender, Note, User } from '@/types/interface';
import React from 'react'
import { useEditForm } from '../hooks/useEditForm';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/app/components/elements/LoadingButton';
import Keyboard from '@/features/keyboard/components/Keyboard';

export interface EditProfileProps {
  userData: User;
  genders: Gender[];
  notes: Note[];
}

const EditProfileForm: React.FC<EditProfileProps> = ({ userData, genders, notes }) => {
  const { form, onSubmit, errorMessage, isLoading } = useEditForm(userData, notes);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;


  return (
    <div className="text-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mb-5 text-3xl font-medium">プロフィール編集</h2>
        <div className="text-black">
          <label htmlFor="name" className="mb-1 block text-2xl text-white">ユーザー名</label>
          <Input
            type="text"
            id="name"
            placeholder="xxx"
            className="w-full h-12 text-lg px-4"
            {...register('name')}
          />
          <div className="text-black">
            {errors.name && <p>※{errors.name.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="gender" className="mb-1 block text-2xl text-white">性別</label>
          <select
            id="gender"
            {...register('gender')}
            defaultValue={userData.gender || ''}
            className="w-full h-12 text-lg px-4 border border-gray-300 text-gray-900 rounded-sm focus:border-blue-500"
          >
            <option value="">未選択</option>
            {genders.map(gender => (
              <option
                key={gender.id} value={gender.name}
              >
                {gender.name}
              </option>
            ))}
          </select>
          <div className="text-white">
            {errors.gender && <span>{errors.gender.message}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="user_high_note" className="mb-1 block text-2xl text-white">音域高</label>
          <select
            id="user_high_note"
            {...register('user_high_note')}
            defaultValue={userData.user_high_note?.ja_note_name || ''}
            className="w-full h-12 text-lg px-4 border border-gray-300 text-gray-900 rounded-sm focus:border-blue-500"
          >
            <option value="">未選択</option>
            {notes.map(note => (
              <option
                key ={note.id} value={note.ja_note_name}
              >
                {note.ja_note_name}
              </option>
            ))}
          </select>
          <div className="text-white">
            {errors.user_high_note && <span>{errors.user_high_note.message}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="user_low_note" className="mb-1 block text-2xl text-white">音域低</label>
          <select
            id="user_low_note"
            {...register('user_low_note')}
            defaultValue={userData.user_low_note?.ja_note_name || ''}
            className="w-full h-12 text-lg px-4 border border-gray-300 text-gray-900 rounded-sm focus:border-blue-500"
          >
            <option value="">未選択</option>
            {notes.map(note => (
              <option
                key ={note.id} value={note.ja_note_name}
              >
                {note.ja_note_name}
              </option>
            ))}
          </select>
          <div className="text-white">
            {errors.user_low_note && <span>{errors.user_low_note.message}</span>}
          </div>
        </div>
        <div className="mt-6 justify-center flex">
          <Keyboard notes={notes} />
        </div>
        <div className="mt-10 flex flex-col items-center">
          {errorMessage && (
            <div className="mb-4 text-white text-center">{errorMessage}</div>
          )}
          <LoadingButton
            type="submit"
            variant="outline"
            className="text-black w-40 h-16 text-2xl rounded-full flex items-center justify-center transition-all hover:scale-105"
            isLoading={isLoading}
          >
            保存
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

export default EditProfileForm