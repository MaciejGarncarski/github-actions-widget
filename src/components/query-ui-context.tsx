"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type QueryUIState = {
  isManualRefetching: boolean;
  setIsManualRefetching: React.Dispatch<React.SetStateAction<boolean>>;
};

const QueryUIContext = createContext<QueryUIState | undefined>(undefined);

export const QueryUIProvider = ({ children }: { children: ReactNode }) => {
  const [isManualRefetching, setIsManualRefetching] = useState(false);

  return (
    <QueryUIContext.Provider
      value={{ isManualRefetching, setIsManualRefetching }}
    >
      {children}
    </QueryUIContext.Provider>
  );
};

export const useQueryUI = (): QueryUIState => {
  const context = useContext(QueryUIContext);
  if (!context) {
    throw new Error("useQueryUI must be used within a <QueryUIProvider>");
  }
  return context;
};
