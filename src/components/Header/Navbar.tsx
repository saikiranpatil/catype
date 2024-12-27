import { Button } from "@/components/ui/button"
import { useTypingMode } from "@/hooks/useTypingMode";
import { BiSolidKeyboard } from "react-icons/bi"
import { FaUser } from "react-icons/fa"

const Navbar = () => {
    const { typingMode } = useTypingMode();
    return (
        <nav className="flex justify-between items-center">
            <div id="logo" className="flex gap-1">
                <BiSolidKeyboard className={`h-10 w-auto ${typingMode ? "text-sub" : "text-main"}`} />
                <span className={`text-2xl ${typingMode ? "text-sub" : "text-text"}`}>
                    catype
                </span>
            </div>
            <Button className={`flex gap-2 items-center text-xs font-normal ${typingMode ? "opacity-0" : ""}`}>
                <span>username</span>
                <FaUser />
            </Button>
        </nav>
    )
}

export default Navbar