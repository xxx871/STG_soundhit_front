import { useCallback, useMemo, useState } from "react";
import * as Tone from 'tone';

export const useKeyboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const synth = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new Tone.Synth().toDestination();
    }
    return null;
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleKeyPress = useCallback(async (frequency: number) => {
    if (synth) {
      await Tone.start();
      synth.triggerAttackRelease(frequency, '8n');
    }
  }, [synth]);

  const handleKeyRelease = useCallback(() => {
    if (synth) {
      synth.triggerRelease();
    }
  }, [synth]);

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleKeyPress,
    handleKeyRelease,
  };
};
