export const getKeyStyle = (isBlackKey: boolean) => {
  const whiteKeyWidth = 46;
  const blackKeyWidth = 30;
  const whiteKeyHeight = 160;
  const blackKeyHeight = 100;

  return isBlackKey
    ? {
        backgroundColor: '#000000',
        width: `${blackKeyWidth}px`,
        height: `${blackKeyHeight}px`,
        marginLeft: `-${blackKeyWidth / 2}px`,
        marginRight: `-${blackKeyWidth / 2}px`,
        zIndex: 1,
        color: 'white',
        position: 'relative' as const,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }
    : {
        backgroundColor: '#ffffff',
        border: '1px solid #c0c0c0',
        width: `${whiteKeyWidth}px`,
        height: `${whiteKeyHeight}px`,
        zIndex: 0,
        borderRadius: '0 0 4px 4px',
        position: 'static' as const,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      };
};
