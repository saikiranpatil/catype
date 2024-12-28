import { Button } from "@/components/ui/button"
import { footerLinks } from "@/common/contants"

const FooterLinks = () => {
    return (
        <div className="flex gap-2 text-sm items-center justify-center">
            {footerLinks.map(({ link, title, icon: Icon }) => (
                <Button>
                    <Icon />
                    <a href={link} target="_blank">
                        {title}
                    </a>
                </Button>
            ))}
        </div>
    )
}

export default FooterLinks