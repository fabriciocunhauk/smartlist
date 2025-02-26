"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface ErrorsContextType {
  active: boolean;
  color: string;
  message: string;
  setToastContent: (content: Partial<ErrorsContextType>) => void;
}

const initialTheme: ErrorsContextType = {
  active: false,
  color: "",
  message: "",
  setToastContent: () => {},
};

const ErrorsContext = createContext<ErrorsContextType>(initialTheme);

export const ToastMessageProvider = ({ children }: { children: ReactNode }) => {
  const [toastContent, setToastContent] = useState<
    Omit<ErrorsContextType, "setToastContent">
  >({
    active: false,
    color: "",
    message: "",
  });

  const updateToastContent = (content: Partial<ErrorsContextType>) => {
    setToastContent((prev) => ({
      ...prev,
      ...content,
    }));
  };

  return (
    <ErrorsContext.Provider
      value={{
        ...toastContent,
        setToastContent: updateToastContent,
      }}
    >
      {children}
    </ErrorsContext.Provider>
  );
};

// Custom hook to use the context
export const useToastMessage = () => {
  const context = useContext(ErrorsContext);
  if (!context) {
    throw new Error(
      "useToastMessage must be used within a ToastMessageProvider"
    );
  }
  return context;
};
