import { TypingOptionsContext } from "@/hooks/useTypingOptions"
import { useState } from "react"
import { TypingOptionsProps } from "../contants"

const TypingOptionsProvider = ({ children }: { children: React.ReactNode }) => {
    const [typingOptions, setTypingOptions] = useState<TypingOptionsProps>({ type: "word", value: 50 });

    return (
        <TypingOptionsContext.Provider value={{ typingOptions, setTypingOptions }}>
            {children}
        </TypingOptionsContext.Provider>
    )
}

export default TypingOptionsProvider