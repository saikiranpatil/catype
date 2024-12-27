import { FaCode, FaTwitter } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"
import { FaClock } from "react-icons/fa6";
import { TbLetterA } from "react-icons/tb";

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

export const menuListItems = [
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

type TypingType = "word" | "time";
const menuTimes = [15, 30, 60, 120] as const;
const menuWordCounts = [10, 25, 50, 100] as const;

export interface TypingOptionsProps {
    type: TypingType
    val: TypingType extends "time" ? typeof menuTimes[number] : typeof menuWordCounts[number];
}