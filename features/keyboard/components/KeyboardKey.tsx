import React, { useCallback } from "react";
import { Note } from "@/types/interface";
import { getKeyStyle } from "@/features/keyboard/components/styles";

interface KeyboardKeyProps {
  note: Note;
  onKeyPress: (frequency: number) => void;
  onKeyRelease: () => void;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = React.memo(({ note, onKeyPress, onKeyRelease }) => {
  const isBlackKey = note.en_note_name.includes('#');
  const keyStyle = getKeyStyle(isBlackKey);

  const handleMouseDown = useCallback(() => onKeyPress(note.frequency), [note.frequency, onKeyPress]);

  const getLabelStyle = (isBlackKey: boolean) => ({
    position: 'absolute' as const,
    bottom: '5px',
    left: '0',
    right: '0',
    textAlign: 'center' as const,
    fontSize: isBlackKey ? '8px' : '12px',
    color: isBlackKey ? 'white' : 'black',
  });

  return (
    <div
      data-testid={`key-${note.ja_note_name}`}
      style={{
        ...keyStyle,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={onKeyRelease}
      onMouseLeave={onKeyRelease}
    >
      <span style={getLabelStyle(isBlackKey)}>
        {note.ja_note_name}
      </span>
    </div>
  );
});

KeyboardKey.displayName = 'KeyboardKey';

export default KeyboardKey;