import { createContext, useContext } from "react";

interface TypingModeContextProps {
    typingMode: boolean;
    setTypingMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const TypingModeContext = createContext<TypingModeContextProps | null>(null);

export const useTypingMode = () => {
    const context = useContext(TypingModeContext);
    if (!context) {
        throw new Error("useTypingMode must be used within TypingModeContext.Provider");
    }
    return context;
};