import { Note } from "@/types/interface";
import React from "react";
import { getKeyStyle } from "./styles";

interface KeyboardKeyProps {
  note: Note;
  onKeyPress: (frequency: number) => void;
  onKeyRelease: () => void;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ note, onKeyPress, onKeyRelease }) => {
  const isBlackKey = note.en_note_name.includes('#');
  const keyStyle = getKeyStyle(isBlackKey);

  const getLabelStyle = (isBlackKey: boolean) => {
    const commonStyle = {
      position: 'absolute' as const,
      bottom: '5px',
      left: '0',
      right: '0',
      textAlign: 'center' as const,
    };

    if (isBlackKey) {
      return {
        ...commonStyle,
        fontSize: '8px',
        color: 'white',
      };
    } else {
      return {
        ...commonStyle,
        fontSize: '12px',
        color: 'black',
      };
    }
  };

  return (
    <div
      style={{
        ...keyStyle,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
      onMouseDown={() => onKeyPress(note.frequency)}
      onMouseUp={onKeyRelease}
      onMouseLeave={onKeyRelease}
    >
      <span style={getLabelStyle(isBlackKey)}>
        {note.ja_note_name}
      </span>
    </div>
  );
};

export default KeyboardKey;
