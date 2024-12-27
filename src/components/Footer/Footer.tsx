import { useTypingMode } from "@/hooks/useTypingMode";
import FooterLinks from "./FooterLinks"
import Shortcuts from "./Shortcuts"

const Footer = () => {
  const { typingMode } = useTypingMode();
  return (
    <footer className={` ${typingMode ? "opacity-0" : ""}`}>
      <Shortcuts />
      <FooterLinks />
    </footer>
  )
}

export default Footer