import Image from "next/image";
import Link from "next/link";

type LogoVariant = "green" | "black";
type LogoSize = "header" | "footer";

const LOGOS: Record<LogoVariant, { src: string; width: number; height: number }> =
  {
    green: { src: "/brand/logo-green.png", width: 260, height: 68 },
    black: { src: "/brand/logo-black.png", width: 280, height: 72 },
  };

const SIZE_CLASS: Record<LogoSize, string> = {
  header: "h-10 w-auto object-contain sm:h-11 lg:h-12 xl:h-14",
  footer: "h-10 w-auto object-contain sm:h-11 md:h-12",
};

export function Logo({
  variant = "green",
  size = "header",
  src,
}: {
  variant?: LogoVariant;
  size?: LogoSize;
  /** Override logo URL from CMS media library */
  src?: string;
}) {
  const logo = LOGOS[variant];
  const imageSrc = src ?? logo.src;

  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
      <Image
        src={imageSrc}
        alt="Al Wrd Hajj & Umrah"
        width={logo.width}
        height={logo.height}
        className={SIZE_CLASS[size]}
        priority
      />
    </Link>
  );
}
