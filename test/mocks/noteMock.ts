import { http, HttpResponse } from "msw";

const notes = [
  { id: 1, frequency: 97.999, ja_note_name: 'ソ2', en_note_name: 'G2' },
  { id: 2, frequency: 103.826, ja_note_name: 'ソ#2', en_note_name: 'G#2' },
  { id: 3, frequency: 110.000, ja_note_name: 'ラ2', en_note_name: 'A2' },
  { id: 4, frequency: 116.541, ja_note_name: 'ラ#2', en_note_name: 'A#2' },
  { id: 5, frequency: 123.471, ja_note_name: 'シ2', en_note_name: 'B2' },
  { id: 6, frequency: 130.813, ja_note_name: 'ド3', en_note_name: 'C3' },
  { id: 7, frequency: 138.591, ja_note_name: 'ド#3', en_note_name: 'C#3' },
  { id: 8, frequency: 146.832, ja_note_name: 'レ3', en_note_name: 'D3' },
  { id: 9, frequency: 155.563, ja_note_name: 'レ#3', en_note_name: 'D#3' },
  { id: 10, frequency: 164.814, ja_note_name: 'ミ3', en_note_name: 'E3' },
  { id: 11, frequency: 174.614, ja_note_name: 'ファ3', en_note_name: 'F3' },
  { id: 12, frequency: 184.997, ja_note_name: 'ファ#3', en_note_name: 'F#3' },
  { id: 13, frequency: 195.998, ja_note_name: 'ソ3', en_note_name: 'G3' },
  { id: 14, frequency: 207.652, ja_note_name: 'ソ#3', en_note_name: 'G#3' },
  { id: 15, frequency: 220.000, ja_note_name: 'ラ3', en_note_name: 'A3' },
  { id: 16, frequency: 233.082, ja_note_name: 'ラ#3', en_note_name: 'A#3' },
  { id: 17, frequency: 246.942, ja_note_name: 'シ3', en_note_name: 'B3' },
  { id: 18, frequency: 261.626, ja_note_name: 'ド4', en_note_name: 'C4' },
  { id: 19, frequency: 277.183, ja_note_name: 'ド#4', en_note_name: 'C#4' },
  { id: 20, frequency: 293.665, ja_note_name: 'レ4', en_note_name: 'D4' },
  { id: 21, frequency: 311.127, ja_note_name: 'レ#4', en_note_name: 'D#4' },
  { id: 22, frequency: 329.628, ja_note_name: 'ミ4', en_note_name: 'E4' },
  { id: 23, frequency: 349.228, ja_note_name: 'ファ4', en_note_name: 'F4' },
  { id: 24, frequency: 369.994, ja_note_name: 'ファ#4', en_note_name: 'F#4' },
  { id: 25, frequency: 391.995, ja_note_name: 'ソ4', en_note_name: 'G4' },
  { id: 26, frequency: 415.305, ja_note_name: 'ソ#4', en_note_name: 'G#4' },
  { id: 27, frequency: 440.000, ja_note_name: 'ラ4', en_note_name: 'A4' },
  { id: 28, frequency: 466.164, ja_note_name: 'ラ#4', en_note_name: 'A#4' },
  { id: 29, frequency: 493.883, ja_note_name: 'シ4', en_note_name: 'B4' },
  { id: 30, frequency: 523.251, ja_note_name: 'ド5', en_note_name: 'C5' },
  { id: 31, frequency: 554.365, ja_note_name: 'ド#5', en_note_name: 'C#5' },
  { id: 32, frequency: 587.330, ja_note_name: 'レ5', en_note_name: 'D5' },
  { id: 33, frequency: 622.254, ja_note_name: 'レ#5', en_note_name: 'D#5' },
  { id: 34, frequency: 659.255, ja_note_name: 'ミ5', en_note_name: 'E5' },
  { id: 35, frequency: 698.456, ja_note_name: 'ファ5', en_note_name: 'F5' },
  { id: 36, frequency: 739.989, ja_note_name: 'ファ#5', en_note_name: 'F#5' },
  { id: 37, frequency: 783.991, ja_note_name: 'ソ5', en_note_name: 'G5' },
  { id: 38, frequency: 830.609, ja_note_name: 'ソ#5', en_note_name: 'G#5' },
  { id: 39, frequency: 880.000, ja_note_name: 'ラ5', en_note_name: 'A5' },
  { id: 40, frequency: 932.328, ja_note_name: 'ラ#5', en_note_name: 'A#5' },
  { id: 41, frequency: 987.767, ja_note_name: 'シ5', en_note_name: 'B5' },
  { id: 42, frequency: 1046.502, ja_note_name: 'ド6', en_note_name: 'C6' },
];

export const noteHandlers = [
  http.get("/notes", () => {
    return HttpResponse.json(notes, { status: 200 })
  })
];

export const errorNoteHandlers = http.get("/notes", () => {
  return HttpResponse.json([...notes, { id: 999, name: '無効な音階'}], { status: 200 })
});