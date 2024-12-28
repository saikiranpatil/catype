import { IconType } from "react-icons";
import { FaClock } from "react-icons/fa";
import { TbLetterA } from "react-icons/tb";
import { FaCode, FaTwitter } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"

export interface MenuListItemProps {
    type: string;
    icon: IconType;
    values: number[];
    value: number;
}

export interface TypingOptionsProps {
    type: string;
    value: number;
}

export const initialMenuList: MenuListItemProps[] = [
    {
        type: "time",
        icon: FaClock,
        values: [15, 30, 60, 120],
        value: 60
    },
    {
        type: "word",
        icon: TbLetterA,
        values: [10, 25, 50, 100],
        value: 25
    },
]

export const footerLinks = [
    {
        icon: FaCode,
        title: "github",
        link: "https://github.com/saikiranpatil/catype"
    },
    {
        icon: FaTwitter,
        title: "twitter",
        link: "https://x.com/binuryhex"
    },
    {
        icon: IoIosMail,
        title: "post",
        link: "https://x.com/binuryhex"
    },
];

export interface TypingOptionsTypes {
    type: string;
    value: number;
}