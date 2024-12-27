import { TypingOptionsProps } from "@/constants";
import { createContext, useContext } from "react";

interface TypingOptionsContextProps {
    typingOptions: TypingOptionsProps;
    setTypingOptions: React.Dispatch<React.SetStateAction<TypingOptionsProps>>
}

export const TypingOptionsContext = createContext<TypingOptionsContextProps | null>(null);

export const useTypingOptions = () => {
    const context = useContext(TypingOptionsContext);
    if (!context) {
        throw new Error("useTypingOptions must be used within TypingOptionsContext.Provider");
    }
    return context;
};