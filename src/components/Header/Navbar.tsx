import { Button } from "@/components/ui/button"
import { BiSolidKeyboard } from "react-icons/bi"
import { FaUser } from "react-icons/fa"

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center">
            <div id="logo" className="flex gap-1">
                <BiSolidKeyboard className="h-10 w-auto text-main" />
                <span className="text-2xl text-text">
                    catype
                </span>
            </div>
            <Button className="flex gap-2 items-center text-xs font-normal">
                <span>username</span>
                <FaUser />
            </Button>
        </nav>
    )
}

export default Navbar