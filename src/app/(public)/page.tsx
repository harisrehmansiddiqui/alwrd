import { Hero } from "@/components/hero";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import {
  GroupPackages,
  PremiumPackages,
  GalleryCollaborations,
  UniqueHighlights,
  HaramainTrain,
  PartnerStrip,
  EsimPromo,
  ResourcesSection,
  TrustBadges,
} from "@/components/home-sections";
import { getHomepagePackages } from "@/lib/packages";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { group, premium } = await getHomepagePackages();

  return (
    <>
      <Hero />
      <GroupPackages packages={group} />
      <PremiumPackages packages={premium} />
      <GalleryCollaborations />
      <UniqueHighlights />
      <HaramainTrain />
      <PartnerStrip />
      <EsimPromo />
      <ResourcesSection />
      <TrustBadges />
      <WhatsAppFloat />
    </>
  );
}
