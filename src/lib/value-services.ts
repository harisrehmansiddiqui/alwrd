import { resolveUrl } from "@/lib/media";

export type ValueServiceSlug =
  | "triple-umrah"
  | "premium-umrah-kit"
  | "local-sim"
  | "wheelchair-assistance"
  | "on-ground-support"
  | "pre-departure-orientation"
  | "haramain-train"
  | "umrah-holidays";

export type ValueServiceConfig = {
  slug: ValueServiceSlug;
  title: string;
  icon: string;
  shortDesc: string;
  image: string;
  subtitle: string;
  metaDescription: string;
  intro: string;
  features: { title: string; desc: string }[];
  steps: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  inquiryMessage: string;
};

export const VALUE_SERVICE_SLUGS: ValueServiceSlug[] = [
  "triple-umrah",
  "premium-umrah-kit",
  "local-sim",
  "wheelchair-assistance",
  "on-ground-support",
  "pre-departure-orientation",
  "haramain-train",
  "umrah-holidays",
];

export const VALUE_SERVICES: Record<ValueServiceSlug, ValueServiceConfig> = {
  "triple-umrah": {
    slug: "triple-umrah",
    title: "Triple Umrah Journey",
    icon: "travel_explore",
    shortDesc: "Perform Umrah three times during your stay.",
    image: "/gallery/1.jpg",
    subtitle:
      "Maximise your time in the holy cities with a structured plan for multiple Umrah performances.",
    metaDescription:
      "Triple Umrah journey with Al Wrd — perform Umrah up to three times during your stay with guided support, transport, and a clear schedule in Makkah and Madinah.",
    intro:
      "For pilgrims who wish to perform Umrah more than once during a single trip, our Triple Umrah Journey add-on provides a practical schedule, coordinator support, and transport between the holy sites so each performance is focused on worship — not logistics.",
    inquiryMessage:
      "Assalamu alaikum, I am interested in the Triple Umrah Journey add-on.",
    features: [
      {
        title: "Structured schedule",
        desc: "A day-by-day plan that balances rest, travel between cities, and multiple Umrah performances.",
      },
      {
        title: "Coordinator guidance",
        desc: "On-ground staff help you navigate timing, crowd patterns, and entry to the Haram.",
      },
      {
        title: "Transport included",
        desc: "Transfers between Makkah and Madinah aligned with your Umrah plan.",
      },
      {
        title: "Flexible pacing",
        desc: "Adjustments for elderly travellers or families who need additional rest between performances.",
      },
    ],
    steps: [
      {
        title: "Choose your package",
        desc: "Select a departure that includes or supports the Triple Umrah add-on.",
      },
      {
        title: "Confirm your plan",
        desc: "Our team shares a proposed schedule based on your stay length and health needs.",
      },
      {
        title: "Perform with support",
        desc: "Travel with confidence — coordinators remain available throughout your journey.",
      },
    ],
    faqs: [
      {
        q: "How many Umrah can I perform on one trip?",
        a: "Up to three performances are typically planned depending on your package duration and personal capacity. We tailor the schedule with you before travel.",
      },
      {
        q: "Is this suitable for elderly pilgrims?",
        a: "Yes, with adjusted pacing. Mention mobility or health needs in your inquiry so we plan adequate rest between performances.",
      },
    ],
  },
  "premium-umrah-kit": {
    slug: "premium-umrah-kit",
    title: "Premium Umrah Kit",
    icon: "package_2",
    shortDesc: "Ihram, bag and essentials ready on arrival.",
    image: "/gallery/2.jpg",
    subtitle:
      "Arrive prepared with a curated kit of Ihram, travel bag, and everyday essentials.",
    metaDescription:
      "Premium Umrah Kit from Al Wrd — Ihram, travel bag, slippers, and essentials delivered before or on arrival for a hassle-free pilgrimage.",
    intro:
      "Skip last-minute shopping stress. Our Premium Umrah Kit bundles quality Ihram garments, a durable travel bag, and practical essentials so you can focus on spiritual preparation from the moment you land.",
    inquiryMessage:
      "Assalamu alaikum, I would like to add the Premium Umrah Kit to my booking.",
    features: [
      {
        title: "Quality Ihram set",
        desc: "Comfortable, breathable fabrics suitable for Makkah and Madinah climates.",
      },
      {
        title: "Travel-ready bag",
        desc: "Sized for hand luggage rules and easy movement between hotels and the Haram.",
      },
      {
        title: "Daily essentials",
        desc: "Slippers, prayer mat, and personal care items selected for pilgrim convenience.",
      },
      {
        title: "Pre-departure or on arrival",
        desc: "Collect in Pakistan before travel or receive on arrival — your choice.",
      },
    ],
    steps: [
      {
        title: "Add to your inquiry",
        desc: "Mention kit size and gender requirements when you request a package.",
      },
      {
        title: "Confirm contents",
        desc: "We share the full kit list and any optional upgrades.",
      },
      {
        title: "Collect and travel",
        desc: "Receive your kit and pack with confidence before departure.",
      },
    ],
    faqs: [
      {
        q: "Can I order kits for my whole family?",
        a: "Yes. Specify the number of kits and sizes needed for adults and children in your inquiry.",
      },
      {
        q: "Is the kit included in all packages?",
        a: "Some packages include it by default. Otherwise it is available as an add-on — ask our team when booking.",
      },
    ],
  },
  "local-sim": {
    slug: "local-sim",
    title: "Local SIM with Data",
    icon: "sim_card",
    shortDesc: "Stay connected across Makkah and Madinah.",
    image: "/gallery/3.jpg",
    subtitle:
      "Saudi SIM with data activated on arrival — stay in touch with family and our support team.",
    metaDescription:
      "Local SIM with data for Umrah pilgrims — stay connected in Makkah and Madinah with Al Wrd's on-arrival SIM setup and support.",
    intro:
      "Reliable connectivity matters when you are far from home. We arrange a local Saudi SIM with data so you can message family, use maps, and reach our coordinators instantly throughout your stay.",
    inquiryMessage:
      "Assalamu alaikum, I need a local SIM with data for my Umrah trip.",
    features: [
      {
        title: "Data for maps & messaging",
        desc: "Enough data for WhatsApp, navigation, and video calls with family in Pakistan.",
      },
      {
        title: "On-arrival setup",
        desc: "Our team assists with activation so you are online from day one.",
      },
      {
        title: "Coverage in both cities",
        desc: "Works across Makkah, Madinah, and travel routes between them.",
      },
      {
        title: "Support if issues arise",
        desc: "Contact our team if you need help topping up or troubleshooting.",
      },
    ],
    steps: [
      {
        title: "Request in your inquiry",
        desc: "Tell us how many SIMs you need and whether phones are unlocked.",
      },
      {
        title: "Receive on arrival",
        desc: "SIMs are handed over at the airport or your hotel check-in.",
      },
      {
        title: "Stay connected",
        desc: "Use data throughout your pilgrimage with our team one message away.",
      },
    ],
    faqs: [
      {
        q: "Will my Pakistani phone work with a Saudi SIM?",
        a: "Most unlocked smartphones work. If unsure, mention your device model in the inquiry.",
      },
      {
        q: "Can I share data with family members?",
        a: "Each traveller typically needs their own SIM for reliable connectivity. We can arrange multiple lines on one booking.",
      },
    ],
  },
  "wheelchair-assistance": {
    slug: "wheelchair-assistance",
    title: "Wheelchair Assistance",
    icon: "accessible",
    shortDesc: "Support for elderly and special-needs pilgrims.",
    image: "/gallery/4.jpg",
    subtitle:
      "Dedicated mobility support for elderly pilgrims and travellers with special needs.",
    metaDescription:
      "Wheelchair assistance for Umrah — Al Wrd provides mobility support, airport help, and Haram access guidance for elderly and special-needs pilgrims.",
    intro:
      "Umrah should be accessible to every pilgrim who wishes to go. Our wheelchair assistance service covers airport support, hotel mobility, and guidance around the Haram so elderly and special-needs travellers worship with dignity and safety.",
    inquiryMessage:
      "Assalamu alaikum, I need wheelchair assistance for my Umrah journey.",
    features: [
      {
        title: "Airport wheelchair support",
        desc: "Assistance from arrival through baggage collection and hotel transfer.",
      },
      {
        title: "Haram access guidance",
        desc: "Advice on accessible routes and timing to reduce physical strain.",
      },
      {
        title: "Hotel accessibility",
        desc: "We prioritise properties with elevator access and ground-floor options where possible.",
      },
      {
        title: "Dedicated coordinator",
        desc: "A named contact who understands your mobility needs before and during travel.",
      },
    ],
    steps: [
      {
        title: "Share your needs",
        desc: "Describe mobility requirements, wheelchair type, and any medical notes in your inquiry.",
      },
      {
        title: "Tailored package",
        desc: "We recommend hotels, pacing, and support levels suited to your situation.",
      },
      {
        title: "Assisted journey",
        desc: "Travel with coordinators who check in regularly throughout your stay.",
      },
    ],
    faqs: [
      {
        q: "Can I bring my own wheelchair?",
        a: "Yes. Inform us in advance so we arrange appropriate transport and storage at hotels.",
      },
      {
        q: "Is a travel companion required?",
        a: "We strongly recommend a mahram or family companion for elderly pilgrims. Our team advises based on your specific case.",
      },
    ],
  },
  "on-ground-support": {
    slug: "on-ground-support",
    title: "24/7 On-Ground Support",
    icon: "support_agent",
    shortDesc: "Our team is with you at every step.",
    image: "/gallery/5.jpg",
    subtitle:
      "Round-the-clock coordinators in Makkah and Madinah — before, during, and after your worship.",
    metaDescription:
      "24/7 on-ground Umrah support from Al Wrd — dedicated coordinators in Makkah and Madinah available by WhatsApp and phone throughout your pilgrimage.",
    intro:
      "From airport pickup to your return flight, our on-ground team is never more than a message away. Whether you need directions to the Haram, help with a hotel issue, or guidance during ziyarat, coordinators are available 24/7.",
    inquiryMessage:
      "Assalamu alaikum, I would like to know more about 24/7 on-ground support.",
    features: [
      {
        title: "WhatsApp & phone access",
        desc: "Direct lines to coordinators who know your package and hotel details.",
      },
      {
        title: "Bilingual support",
        desc: "Urdu and English-speaking staff familiar with Pakistani pilgrim needs.",
      },
      {
        title: "Emergency escalation",
        desc: "Clear protocols for medical or travel emergencies with local partners.",
      },
      {
        title: "Pre-departure briefing",
        desc: "Know who to contact and how before you leave Pakistan.",
      },
    ],
    steps: [
      {
        title: "Meet your coordinator",
        desc: "Receive contact details and a welcome briefing on arrival.",
      },
      {
        title: "Daily check-ins",
        desc: "Proactive updates on transport, meals, and any schedule changes.",
      },
      {
        title: "Departure assistance",
        desc: "Support until you are checked in for your return flight.",
      },
    ],
    faqs: [
      {
        q: "Is support included in every package?",
        a: "Yes — all Al Wrd packages include on-ground coordinator access. Premium tiers may add a dedicated single point of contact.",
      },
      {
        q: "What if I lose my passport or visa?",
        a: "Contact our team immediately. We guide you through embassy and local procedures step by step.",
      },
    ],
  },
  "pre-departure-orientation": {
    slug: "pre-departure-orientation",
    title: "Pre-Departure Orientation",
    icon: "assignment_turned_in",
    shortDesc: "Know the rituals before you travel.",
    image: "/gallery/6.jpg",
    subtitle:
      "A structured briefing on Umrah rites, packing, and what to expect on the ground.",
    metaDescription:
      "Pre-departure Umrah orientation with Al Wrd — learn the rituals, packing essentials, and travel expectations before you fly from Pakistan.",
    intro:
      "First-time pilgrims and families benefit from a clear pre-travel briefing. Our orientation covers the steps of Umrah, what to pack, airport procedures, and practical tips for Makkah and Madinah — so you arrive confident and prepared.",
    inquiryMessage:
      "Assalamu alaikum, I would like to join the pre-departure orientation session.",
    features: [
      {
        title: "Umrah rites walkthrough",
        desc: "Step-by-step explanation of Ihram, Tawaf, Sa'i, and shaving/cutting hair.",
      },
      {
        title: "Packing checklist",
        desc: "What to bring, what to leave home, and how to prepare spiritually.",
      },
      {
        title: "Travel day guide",
        desc: "Airport flow, immigration tips, and meeting our team on arrival.",
      },
      {
        title: "Q&A with experienced staff",
        desc: "Ask questions specific to your health, family, or first-time concerns.",
      },
    ],
    steps: [
      {
        title: "Register after booking",
        desc: "Confirmed pilgrims receive orientation session details via WhatsApp or email.",
      },
      {
        title: "Attend in person or online",
        desc: "Sessions run in major cities and virtually for out-of-town travellers.",
      },
      {
        title: "Travel prepared",
        desc: "Arrive with clarity on rituals and logistics — focus on worship.",
      },
    ],
    faqs: [
      {
        q: "Is orientation mandatory?",
        a: "It is strongly recommended, especially for first-time pilgrims. There is no extra charge for standard group sessions.",
      },
      {
        q: "Can my whole family attend?",
        a: "Yes. We encourage all travelling members to join, including teenagers who will perform Umrah.",
      },
    ],
  },
  "haramain-train": {
    slug: "haramain-train",
    title: "Haramain High-Speed Train",
    icon: "train",
    shortDesc: "Fast, comfortable travel between the holy cities.",
    image: "/gallery/7.jpg",
    subtitle:
      "Travel between Makkah and Madinah on the Haramain high-speed rail — fast, comfortable, and coordinated.",
    metaDescription:
      "Haramain high-speed train for Umrah pilgrims — Al Wrd coordinates rail travel between Makkah and Madinah with ticket support and station transfers.",
    intro:
      "The Haramain High-Speed Railway connects Makkah and Madinah in under three hours. We coordinate train tickets, station transfers, and luggage handling so your inter-city move is smooth and restful.",
    inquiryMessage:
      "Assalamu alaikum, I would like Haramain train travel included in my package.",
    features: [
      {
        title: "Ticket coordination",
        desc: "We arrange train seats aligned with your itinerary and hotel check-in times.",
      },
      {
        title: "Station transfers",
        desc: "Private transport between your hotel and the train station.",
      },
      {
        title: "Comfortable travel",
        desc: "Air-conditioned carriages — a restful alternative to long road journeys.",
      },
      {
        title: "Schedule flexibility",
        desc: "Morning and evening departures matched to your package plan.",
      },
    ],
    steps: [
      {
        title: "Included or add-on",
        desc: "Many packages include train travel — confirm when you select your departure.",
      },
      {
        title: "Receive tickets",
        desc: "Digital or printed tickets shared before travel day with meeting point details.",
      },
      {
        title: "Guided station day",
        desc: "Coordinators assist with boarding and arrival transfers in the next city.",
      },
    ],
    faqs: [
      {
        q: "Is the train always available?",
        a: "Train service depends on Saudi rail schedules and seat availability. We confirm options when you book.",
      },
      {
        q: "Can I choose my seat class?",
        a: "Business and economy classes are available subject to availability — mention your preference in the inquiry.",
      },
    ],
  },
  "umrah-holidays": {
    slug: "umrah-holidays",
    title: "Umrah Holidays",
    icon: "celebration",
    shortDesc: "Add guided ziyarat and city tours to your trip.",
    image: "/gallery/8.jpg",
    subtitle:
      "Extend your pilgrimage with guided ziyarat, historical tours, and curated experiences in the holy cities.",
    metaDescription:
      "Umrah Holidays with Al Wrd — guided ziyarat tours, historical sites, and curated experiences in Makkah and Madinah alongside your pilgrimage.",
    intro:
      "Beyond the core rituals, many pilgrims wish to visit historical sites and learn the seerah of the Prophet ﷺ in person. Our Umrah Holidays add-on includes guided ziyarat and thoughtfully paced city tours that complement — never overwhelm — your worship schedule.",
    inquiryMessage:
      "Assalamu alaikum, I am interested in Umrah Holidays with guided ziyarat.",
    features: [
      {
        title: "Guided ziyarat",
        desc: "Visit key sites in Makkah and Madinah with knowledgeable guides.",
      },
      {
        title: "Historical context",
        desc: "Briefings that connect each location to Islamic history and the seerah.",
      },
      {
        title: "Balanced scheduling",
        desc: "Tours planned around prayer times and your energy levels.",
      },
      {
        title: "Family-friendly options",
        desc: "Shorter routes and rest stops for groups with children or elderly members.",
      },
    ],
    steps: [
      {
        title: "Select your package",
        desc: "Choose a departure that includes ziyarat or request the holidays add-on.",
      },
      {
        title: "Review the tour plan",
        desc: "We share sites, timings, and transport details before travel.",
      },
      {
        title: "Experience with guides",
        desc: "Join organised tours with coordinators who manage logistics on the day.",
      },
    ],
    faqs: [
      {
        q: "Are ziyarat tours mandatory?",
        a: "No — they are optional enrichments. You can skip any tour and focus solely on Umrah and personal worship.",
      },
      {
        q: "Which sites are typically included?",
        a: "Common stops include Jabal al-Nour, Masjid Quba, Uhud, and other sites depending on your stay length. The exact list is shared per package.",
      },
    ],
  },
};

export function getValueService(slug: string): ValueServiceConfig | undefined {
  if (slug in VALUE_SERVICES) {
    return VALUE_SERVICES[slug as ValueServiceSlug];
  }
  return undefined;
}

export function resolveValueService(
  slug: ValueServiceSlug,
  media: Record<string, string>,
): ValueServiceConfig {
  const service = VALUE_SERVICES[slug];
  return {
    ...service,
    image: resolveUrl(media, `service.${slug}`, service.image),
  };
}

/** Homepage Unique Highlights cards — single source of truth for links and copy. */
export const highlightCards = VALUE_SERVICE_SLUGS.map(
  (slug) => VALUE_SERVICES[slug],
).map((s) => ({
  title: s.title,
  icon: s.icon,
  desc: s.shortDesc,
  image: s.image,
  href: `/our-services/${s.slug}`,
}));

export function resolveHighlightCards(
  media: Record<string, string>,
): typeof highlightCards {
  return VALUE_SERVICE_SLUGS.map((slug) => {
    const s = VALUE_SERVICES[slug];
    return {
      title: s.title,
      icon: s.icon,
      desc: s.shortDesc,
      image: resolveUrl(media, `service.${slug}`, s.image),
      href: `/our-services/${s.slug}`,
    };
  });
}

export function otherServices(current: ValueServiceSlug): ValueServiceConfig[] {
  return VALUE_SERVICE_SLUGS.filter((s) => s !== current).map(
    (s) => VALUE_SERVICES[s],
  );
}
