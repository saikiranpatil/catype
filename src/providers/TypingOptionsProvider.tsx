import { TypingOptionsProps } from "@/constants";
import { TypingOptionsContext } from "@/hooks/useTypingOptions";
import { useState } from "react";

const TypingOptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [typingOptions, setTypingOptions] = useState<TypingOptionsProps>({ type: "time", val: 50 });
  return (
    <TypingOptionsContext.Provider value={{ typingOptions, setTypingOptions }}>
      {children}
    </TypingOptionsContext.Provider>
  )
}

export default TypingOptionsProvider