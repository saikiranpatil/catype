import { Button } from "@/components/ui/button"
import { useTypingMode } from "@/hooks/useTypingMode";
import { BiSolidKeyboard } from "react-icons/bi"
import { FaUser } from "react-icons/fa"

const Navbar = () => {
    const { typingMode } = useTypingMode();
    return (
        <nav className="flex justify-between items-center">
            <div id="logo" className="flex items-end gap-2">
                <BiSolidKeyboard className={`h-8 w-auto ${typingMode ? "text-sub" : "text-main"}`}/>
                <span className={`hidden sm:block text-4xl ${typingMode ? "text-sub" : "text-text"}`}>
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