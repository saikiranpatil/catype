import { FaCode, FaTwitter } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"
import { Button } from "@/components/ui/button"

const footerLinks = [
    {
        icon: FaCode,
        title: "github",
        link: "github.com"
    },
    {
        icon: FaTwitter,
        title: "twitter",
        link: "x.com"
    },
    {
        icon: IoIosMail,
        title: "mail",
        link: "gmail.com"
    },
];

const FooterLinks = () => {
    return (
        <div className="flex gap-2 text-sm items-center justify-center">
            {footerLinks.map(({ link, title, icon: Icon }) => (
                <Button>
                    <Icon />
                    <a href={link}>
                        {title}
                    </a>
                </Button>
            ))}
        </div>
    )
}

export default FooterLinks