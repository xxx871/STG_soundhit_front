import { GameUser, Note } from "@/types/interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserNotesRange } from "@/features/game/api/getUserNotesRange";
import { getGenderNotesRange } from "@/features/game/api/getGenderNotesRange";
import * as Tone from "tone";

export const useGameLogic = (userInfo: GameUser, filterSharpNotes: boolean = false) => {
  const [note, setNote] = useState<Note | null>(null);
  const [noteInfo, setNoteInfo] = useState<{ en_note_name: string; ja_note_name: string; frequency: number } | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialize = async () => {
      try {
        let notes = await getNotes(userInfo, searchParams);
        if(filterSharpNotes) {
          notes = notes.filter(note => !note.en_note_name.includes('#'));
        }
        if (notes.length === 0) {
          console.error("No notes available after filtering");
          return;
        }
        const randomNote = getRandomNote(notes);
        setNote(randomNote);
        setNoteInfo({
          en_note_name: randomNote.en_note_name,
          ja_note_name: randomNote.ja_note_name,
          frequency: randomNote.frequency
        });
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };
    initialize();
  }, [userInfo, filterSharpNotes, searchParams]);

  
  const playNote = async (onPlayNote: (note: string) => void) => {
    if (!note) {
      console.error("No note to play", Error);
      return;
    }
    await Tone.start();
    const synth = new Tone.PolySynth().toDestination();
    synth.triggerAttackRelease(note.en_note_name, '1s');
    onPlayNote(note.en_note_name);
  };

  return { note, noteInfo, playNote };
};

const getNotes = async (userInfo: GameUser, searchParams: URLSearchParams): Promise<Note[]> => {
  const urlGenderId = parseInt(searchParams.get('genderId') || '', 10);

  if (userInfo?.user_high_note && userInfo?.user_low_note) {
    return await getUserNotesRange(userInfo.user_high_note.en_note_name, userInfo.user_low_note.en_note_name);
  }

  if (userInfo?.gender_id !== null && userInfo?.gender_id !== undefined) {
    return await getGenderNotesRange(userInfo.gender_id);
  }

  if (!isNaN(urlGenderId)) {
    return await getGenderNotesRange(urlGenderId);
  }

  console.error('No valid parameters found for getNotes');
  throw new Error("Unable to get notes: No valid user settings or URL parameters found");
};

const getRandomNote = (notes: Note[]): Note => {
  const randomIndex = Math.floor(Math.random() * notes.length);
  return notes[randomIndex];
};