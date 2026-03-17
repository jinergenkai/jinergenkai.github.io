import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
// import IconCoffee from "@/assets/icons/IconCoffee.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jinergenkai",
    linkTitle: `${SITE.title} trên LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/jinergenkai",
    linkTitle: `${SITE.title} trên GitHub`,
    icon: IconGitHub,
  },
  {
    name: "Mail",
    href: "mailto:jinergenkai@gmail.com",
    linkTitle: `Send email to ${SITE.title}`,
    icon: IconMail,
  },
  //   for later use, if you want to add more contact methods, just uncomment and fill in the details
  // {
  //   name: "BuyMeACoffee",
  //   href: "https://buymeacoffee.com/USERNAME",
  //   linkTitle: `Mua cà phê cho ${SITE.title}`,
  //   icon: IconCoffee,
  // },
] as const;

export const CONTACT = {
  phone: "+84 xxx xxx xxx",
  zalo: "https://zalo.me/0000000000",
  buymeacoffee: "https://buymeacoffee.com/USERNAME",
  substack: "https://USERNAME.substack.com",
};

import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";

export const SHARE_LINKS: Social[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Chia sẻ bài viết này trên Facebook`,
    icon: IconFacebook,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Chia sẻ bài viết này trên X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Chia sẻ bài viết này qua Telegram`,
    icon: IconTelegram,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Chia sẻ bài viết này qua WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Mail",
    href: "mailto:?subject=Bài viết hay&body=",
    linkTitle: `Chia sẻ bài viết này qua Email`,
    icon: IconMail,
  },
] as const;
