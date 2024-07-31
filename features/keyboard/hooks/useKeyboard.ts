import { useCallback, useState } from "react";
import * as Tone from 'tone';

export const useKeyboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const synth = new Tone.Synth().toDestination();

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleKeyPress = useCallback(async (frequency: number) => {
    await Tone.start();
    synth.triggerAttackRelease(frequency, '8n');
  }, [synth]);

  const handleKeyRelease = useCallback(() => {
    synth.triggerRelease();
  }, [synth]);

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleKeyPress,
    handleKeyRelease,
  };
};
