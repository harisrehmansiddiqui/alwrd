import type { Office } from "@/lib/company";
import { mapsEmbedUrl } from "@/lib/company";

export function OfficeMap({
  office,
  className = "",
}: {
  office: Office;
  className?: string;
}) {
  return (
    <iframe
      title={`Map — ${office.city} office`}
      src={mapsEmbedUrl(office.lat, office.lng)}
      className={`h-full w-full border-0 ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
