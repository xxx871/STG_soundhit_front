import React, { useCallback, useRef, useState } from 'react'
import * as Pitchfinder from 'pitchfinder';
import { Note } from '@/types/interface';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface VoiceAnalysisProps {
  targetNote: string;
  notes: Note[];
  onResult: (isMatch: boolean) => void;
  onPitchDetected: (pitch: number, note: string) => void;
  difficulty: string | null;
}

const VoiceAnalysis:React.FC<VoiceAnalysisProps> = ({ targetNote, notes, onResult, onPitchDetected, difficulty }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [firstDetectedFrequency, setFirstDetectedFrequency] = useState<{ frequency: number, note: string, ja_note_name: string } | null>(null);
  const pitchesRef = useRef<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const bufferLength = 2048;
  const threshold = 0.01;

  const findClosestNote = useCallback((frequency: number): { note: string; ja_note_name: string; frequency: number, diff: number; } | undefined => {
    let filteredNotes = difficulty === '1' ? notes.filter(note => !note.en_note_name.includes('#')) : notes;
  
    return filteredNotes.reduce((acc, note) => {
      const diff = Math.abs(frequency - note.frequency);
      return diff < acc.diff ? { note: note.en_note_name, ja_note_name: note.ja_note_name, frequency: note.frequency, diff } : acc;
    }, { note: '', ja_note_name: '', frequency: 0, diff: Infinity });
  }, [notes, difficulty]);

  const startRecording = async () => {
    setIsRecording(true);
    setAnalyzing(false);
    pitchesRef.current = [];
    setFirstDetectedFrequency(null);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(bufferLength, 1, 1);

    source.connect(analyserRef.current);
    analyserRef.current.connect(scriptProcessorRef.current);
    scriptProcessorRef.current.connect(audioContextRef.current.destination);

    scriptProcessorRef.current.onaudioprocess = (event) => {
      if (analyzing) return;

      const inputBuffer = event.inputBuffer.getChannelData(0);
      const maxAmplitude = Math.max(...Array.from(inputBuffer).map(sample => Math.abs(sample)));

      if (maxAmplitude <= threshold) return;

      const detectPitch = Pitchfinder.AMDF({ sampleRate: audioContextRef.current!.sampleRate});
      const pitch = detectPitch(inputBuffer);
      
      if (pitch === null) return;

      if (pitchesRef.current.length === 0) {
        const closestNoteObj = findClosestNote(pitch);
        if (closestNoteObj) {
          setFirstDetectedFrequency({ frequency: pitch, note: closestNoteObj.note, ja_note_name: closestNoteObj.ja_note_name });
          onPitchDetected(pitch, closestNoteObj.note);
          const isMatch = closestNoteObj.note === targetNote;
          onResult(isMatch);  
        }
        }
        pitchesRef.current.push(pitch);
      };

    setTimeout(() => {
      setIsRecording(false);
      setAnalyzing(false);
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <Button
        variant="outline"
        onClick={startRecording}
        disabled={isRecording}
        className="w-60 h-16 mt-2 border-2 border-black text-2xl rounded-full items-center justify-center transition-all hover:scale-105"
      >
        {isRecording ? (
          <span className="text-xl">収音中...</span>
        ) : (
          <Image
            src="/mike.png"
            alt="Start Recording"
            width={30}
            height={30}
          />
        )}
      </Button>
      <p className="text-white text-center text-xl">クリックして録音開始！</p>
      <div className="text-white mt-8 text-center">
        {firstDetectedFrequency && (
          <div>
            <p className="text-4xl font-bold">判定：{firstDetectedFrequency.ja_note_name} ({firstDetectedFrequency.note})</p>
            <div>
              <p className="text-xl text-center">周波数 {firstDetectedFrequency.frequency.toFixed(2)} Hz</p>
            </div>
          </div>
          
        )}
      </div>
    </div>
  )
};

export default VoiceAnalysis;