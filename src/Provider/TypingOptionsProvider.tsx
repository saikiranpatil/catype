import { TypingOptionsTypes } from "@/common/contants"
import { TypingOptionsContext } from "@/hooks/useTypingOptions"
import { useState } from "react"

const TypingOptionsProvider = ({ children }: { children: React.ReactNode }) => {
    const [typingOptions, setTypingOptions] = useState<TypingOptionsTypes>({ type: "word", value: 25 })
    return (
        <TypingOptionsContext.Provider value={{ typingOptions, setTypingOptions }}>
            {children}
        </TypingOptionsContext.Provider>
    )
}

export default TypingOptionsProvider