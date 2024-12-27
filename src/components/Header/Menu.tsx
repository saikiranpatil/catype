import { Button } from "@/components/ui/button"
import { useTypingMode } from "@/hooks/useTypingMode";
import { cn } from "@/lib/utils"
import { useEffect } from "react";
import { IconType } from "react-icons";
import { FaClock } from "react-icons/fa6";
import { TbLetterA } from "react-icons/tb";

interface menuItemProps {
    icon?: IconType;
    title: string;
    isActive?: boolean;
    onClick: () => void
}

const menuList: menuItemProps[][] = [
    [
        {
            icon: FaClock,
            title: "time",
            isActive: true,
            onClick: () => { }
        },
        {
            icon: TbLetterA,
            title: "word",
            isActive: false,
            onClick: () => { }
        },
    ],
    [
        {
            title: "15",
            isActive: true,
            onClick: () => { }
        },
        {
            title: "30",
            isActive: false,
            onClick: () => { }
        },
        {
            title: "60",
            isActive: false,
            onClick: () => { }
        },
        {
            title: "120",
            isActive: false,
            onClick: () => { }
        },
    ],
]

const Menu = () => {
    const { typingMode } = useTypingMode();
    useEffect(() => {
        console.log(typingMode);
    }, [typingMode]);

    return (
        <div className={`flex gap-4 items-center justify-center ${typingMode ? "opacity-0" : ""}`}>
            <div className="bg-sub-alt rounded-md flex p-1">
                {menuList.map((menuItems, menuListIdx) => (
                    <div key={"menu-list-idx-" + menuListIdx} className="flex [&:not(:last-child)]:after:w-1 [&:not(:last-child)]:after:relative after:right-0 after:w-0 after:bg-bg after:m-2 after:rounded-sm">
                        {menuItems.map((menuItem, menuItemIdx) => (
                            <div key={"menu-item-" + menuItemIdx + "-title-" + menuItem.title}>
                                <MenuItem {...menuItem} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

const MenuItem = ({
    icon: Icon,
    title,
    isActive = false,
    onClick
}: menuItemProps) => {
    return (
        <Button
            className={cn("group font-normal gap-2 flex justify-center items-center", isActive && "text-main")}
            size="sm"
            onClick={onClick}
        >
            {Icon && <Icon size={45} className={cn("group-hover:text-text", isActive && "text-main")} />}
            <span>{title}</span>
        </Button>
    )
}

export default Menu