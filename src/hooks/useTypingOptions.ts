import { TypingOptionsTypes } from "@/constants/typingOptions";
import { createContext, useContext } from "react";

interface TypingOptionsContextProps {
    typingOptions: TypingOptionsTypes;
    setTypingOptions: React.Dispatch<React.SetStateAction<TypingOptionsTypes>>
}

export const TypingOptionsContext = createContext<TypingOptionsContextProps | null>(null);

export const useTypingOptions = () => {
    const context = useContext(TypingOptionsContext);
    if (!context) {
        throw new Error("useTypingOptions must be used within TypingOptionsContext.Provider");
    }
    return context;
};