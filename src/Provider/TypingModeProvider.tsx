import { TypingModeContext } from "@/hooks/useTypingMode";
import { useEffect, useState } from "react";

const TypingModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [typingMode, setTypingMode] = useState(false);
    useEffect(() => {
        const handleMouseMove = () => setTypingMode(false);

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);
    return (
        <TypingModeContext.Provider value={{ typingMode, setTypingMode }}>
            {children}
        </TypingModeContext.Provider>
    )
}

export default TypingModeProvider