import { initialMenuList, MenuListItemProps } from "@/common/contants";
import { Button } from "@/components/ui/button"
import { useTypingMode } from "@/hooks/useTypingMode";
import { useTypingOptions } from "@/hooks/useTypingOptions";
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react";
import { IconType } from "react-icons";

const Menu = () => {
    const { typingMode } = useTypingMode();

    const [menuList, setMenuList] = useState<MenuListItemProps[]>(initialMenuList);
    const [currentMenuIdx, setCurrentMenuIdx] = useState(0);

    const { setTypingOptions } = useTypingOptions();

    useEffect(() => {
        const { type, value } = menuList[currentMenuIdx];
        setTypingOptions({ type, value });
    }, [menuList, currentMenuIdx]);

    return (
        <div className={`flex gap-4 items-center justify-center ${typingMode ? "opacity-0" : ""}`}>
            <div className="bg-sub-alt rounded-md flex p-1">
                {menuList.map((menuListItem, menuListIdx) => (
                    <div key={"menu-list-idx-" + menuListIdx} className="flex">
                        <MenuItem
                            title={menuListItem.type}
                            icon={menuListItem.icon}
                            isActive={currentMenuIdx === menuListIdx}
                            onClick={() => setCurrentMenuIdx(menuListIdx)}
                        />
                    </div>
                ))}
                <div className="bg-bg w-1 h-6 m-2 rounded my-auto" />
                {menuList[currentMenuIdx].values.map((menuListItem, menuListIdx) => (
                    <div key={"menu-list-idx-" + menuListIdx} className="flex">
                        <MenuItem
                            title={menuListItem.toString()}
                            isActive={menuList[currentMenuIdx].value === menuListItem}
                            onClick={() => setMenuList(menuList.map((menuItem, menuIdx) => menuIdx === currentMenuIdx ? { ...menuItem, value: menuListItem } : menuItem))}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

interface MenuItemProps {
    icon?: IconType;
    title: string;
    isActive: boolean;
    onClick: () => void;
}

const MenuItem = ({
    icon: Icon,
    title,
    isActive = false,
    onClick
}: MenuItemProps) => {
    return (
        <Button
            className={cn("group font-normal gap-2 flex justify-center items-center", isActive && "text-main hover:text-main")}
            size="sm"
            onClick={onClick}
        >
            {Icon && <Icon size={45} className={cn("group-hover:text-text", isActive && "text-main group-hover:text-main")} />}
            <span>{title}</span>
        </Button>
    )
}

export default Menu