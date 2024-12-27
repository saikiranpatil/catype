import { TypingOptionsTypes } from "@/constants"
import { TypingOptionsContext } from "@/hooks/useTypingOptions"
import { useState } from "react"

const TypingOptionsProvider = ({ children }: { children: React.ReactNode }) => {
    const [typingOptions, setTypingOptions] = useState({ type: "time", timeLimit: 45, wordCount: 45 })
    return (
        <TypingOptionsContext.Provider value={{ typingOptions, setTypingOptions }}>
            {children}
        </TypingOptionsContext.Provider>
    )
}

export default TypingOptionsProvider