import Image from "next/image";
import { MaterialIcon } from "@/components/material-icon";
import { whatsappLink } from "@/lib/site";

const QR_API = "https://api.qrserver.com/v1/create-qr-code";

export function whatsAppQrImageUrl(message?: string, size = 200): string {
  const target = whatsappLink(
    message ?? "Assalamu alaikum, I need pilgrim support from Al Wrd.",
  );
  return `${QR_API}/?size=${size}x${size}&data=${encodeURIComponent(target)}`;
}

export function WhatsAppQrCard({
  message,
  title = "Scan to chat on WhatsApp",
  subtitle = "Our support team responds during Pakistan and KSA business hours.",
  size = 192,
  className = "",
}: {
  message?: string;
  title?: string;
  subtitle?: string;
  size?: number;
  className?: string;
}) {
  const href = whatsappLink(message);
  const qrSrc = whatsAppQrImageUrl(message, size);

  return (
    <div
      className={`relative rounded-3xl border-4 border-primary/10 bg-surface-container-lowest p-6 shadow-xl sm:p-8 ${className}`}
    >
      <div className="mx-auto w-fit overflow-hidden rounded-2xl bg-white p-2">
        <Image
          src={qrSrc}
          alt="WhatsApp QR code for Al Wrd pilgrim support"
          width={size}
          height={size}
          unoptimized
        />
      </div>
      <div className="absolute -right-3 -top-3 rounded-lg bg-primary p-2 text-on-primary shadow-lg">
        <MaterialIcon name="qr_code_scanner" />
      </div>
      <div className="mt-4 text-center">
        <p className="font-display text-base font-semibold text-on-surface">
          {title}
        </p>
        <p className="mt-1 text-xs text-on-surface-variant">{subtitle}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
        >
          Open WhatsApp instead →
        </a>
      </div>
    </div>
  );
}
