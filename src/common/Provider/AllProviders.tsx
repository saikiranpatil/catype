import TypingModeProvider from "./TypingModeProvider"
import TypingOptionsProvider from "./TypingOptionsProvider"

const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <TypingModeProvider>
            <TypingOptionsProvider>
                {children}
            </TypingOptionsProvider>
        </TypingModeProvider>
    )
}

export default AllProviders