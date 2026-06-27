import { MaterialIcon } from "@/components/material-icon";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Assalamu alaikum, I have a question about Umrah packages.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-primary p-4 text-on-primary shadow-2xl transition-all hover:scale-110 hover:bg-primary-dark active:scale-95"
    >
      <MaterialIcon name="chat" />
      <span className="hidden text-sm font-semibold md:inline">Need Help?</span>
    </a>
  );
}
