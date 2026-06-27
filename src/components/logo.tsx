import Image from "next/image";
import Link from "next/link";

type LogoVariant = "green" | "black";

const LOGOS: Record<LogoVariant, { src: string; width: number; height: number }> =
  {
    green: { src: "/brand/logo-green.png", width: 220, height: 56 },
    black: { src: "/brand/logo-black.png", width: 180, height: 48 },
  };

export function Logo({ variant = "green" }: { variant?: LogoVariant }) {
  const logo = LOGOS[variant];

  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
      <Image
        src={logo.src}
        alt="Al Wrd Hajj & Umrah"
        width={logo.width}
        height={logo.height}
        className="h-11 w-auto object-contain sm:h-12 md:h-14"
        priority
      />
    </Link>
  );
}
