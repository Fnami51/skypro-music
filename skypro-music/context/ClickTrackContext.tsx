"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClickTrackContextType {
  isClick: boolean;
  setClickTrack: () => void;
}

const ClickTrackContext = createContext<ClickTrackContextType | undefined>(undefined);

export const useClickTrack = () => {
  const context = useContext(ClickTrackContext);
  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};

export const ClickTrackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isClick, setIsClick] = useState<boolean>(false);

  const setClickTrack = () => {
    setIsClick((prevValue) => !prevValue);
  };

  return (
    <ClickTrackContext.Provider value={{ isClick, setClickTrack }}>
      {children}
    </ClickTrackContext.Provider>
  );
};

export default ClickTrackProvider
