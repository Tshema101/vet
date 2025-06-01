
import React from 'react';
import { FaBone } from 'react-icons/fa'; // Bone icon

const Loading = () => {
  return (
    <div style={styles.overlay}>
      <FaBone style={styles.bone} />

      <style>{`
        @keyframes rotateBone {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bone: {
    fontSize: '3rem',
    color: '#113047',
    animation: 'rotateBone 2s linear infinite',
  },
};

export default Loading;
