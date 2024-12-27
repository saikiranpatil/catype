import { Button } from "@/components/ui/button"
import { footerLinks } from "@/constants"

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