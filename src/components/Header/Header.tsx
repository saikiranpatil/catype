import Menu from "./Menu"
import Navbar from "./Navbar"

const Header = () => {
    return (
        <header className="flex flex-col gap-6">
            <Navbar />
            <Menu />
        </header>
    )
}

export default Header