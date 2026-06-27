import type { Package } from "@/lib/packages";
import { TIERS } from "@/lib/packages";

export type FlightBlock = {
  type: "flight";
  title: string;
  subtitle: string;
  fromCity: string;
  toCity: string;
  fromCode: string;
  toCode: string;
  fromAirport: string;
  toAirport: string;
  airline: string;
  date: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: string;
  cabinBaggage: string;
  checkInBaggage: string;
};

export type TransferBlock = {
  type: "transfer";
  title: string;
  subtitle: string;
  from: string;
  to: string;
  duration: string;
  capacity: number;
  vehicle: string;
  image?: string;
};

export type HotelBlock = {
  type: "hotel";
  title: string;
  subtitle?: string;
  name: string;
  stars: number;
  rating: number;
  distanceM: number;
  walkMinutes: number;
  address: string;
  nights: number;
  amenities: string[];
  mode: "check-in" | "check-out";
  image?: string;
};

export type ServiceBlock = {
  type: "service";
  title: string;
  name: string;
  desc: string;
  tag?: string;
  image?: string;
  gallery?: string[];
};

export type AlertBlock = {
  type: "alert";
  title: string;
  body: string;
};

export type GalleryBlock = {
  type: "gallery";
  title: string;
  subtitle?: string;
  images: string[];
};

export type ZiyaratBlock = {
  type: "ziyarat";
  title: string;
  activities: string[];
};

export type GuideBlock = {
  type: "guide";
  title: string;
  desc: string;
  href: string;
  cta: string;
};

export type NoteBlock = {
  type: "note";
  text: string;
};

export type ItineraryBlock =
  | FlightBlock
  | TransferBlock
  | HotelBlock
  | ServiceBlock
  | ZiyaratBlock
  | GuideBlock
  | NoteBlock
  | AlertBlock
  | GalleryBlock;

export type ItineraryDay = {
  id: string;
  label: string;
  date?: string;
  blocks: ItineraryBlock[];
};

export type MealPlan = {
  title: string;
  items: string[];
};

export type PackagePolicy = {
  title: string;
  body: string;
};

export type VisaInfo = {
  title: string;
  items: string[];
};

export type InsuranceInfo = {
  title: string;
  items: string[];
};

const AIRPORTS: Record<string, { code: string; name: string }> = {
  Lahore: { code: "LHE", name: "Allama Iqbal International (LHE)" },
  Karachi: { code: "KHI", name: "Jinnah International (KHI)" },
  Islamabad: { code: "ISB", name: "Islamabad International (ISB)" },
  Faisalabad: { code: "LYP", name: "Faisalabad International (LYP)" },
  Multan: { code: "MUX", name: "Multan International (MUX)" },
};

const HOTEL_AMENITIES = [
  "Toiletries",
  "WiFi",
  "Led TV",
  "Air Conditioning",
  "Kettle",
  "Mini Fridge",
  "Closet",
  "Elevator",
];

const MAKKAH_ZIYARAT = [
  "Jabal al-Noor",
  "Jabal Thawr",
  "Masjid Aisha",
  "Mina",
  "Muzdalifah",
  "Arafat",
];

const MADINAH_ZIYARAT = [
  "Masjid Quba",
  "Mount Uhud",
  "Masjid Qiblatain",
  "Dates Market",
];

function airport(city: string) {
  return AIRPORTS[city] ?? { code: city.slice(0, 3).toUpperCase(), name: `${city} Airport` };
}

function addDays(iso: string, days: number): Date {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d;
}

function fmt(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

function flightBlock(
  pkg: Package,
  direction: "outbound" | "return",
  date: Date,
  airline: string,
): FlightBlock {
  const ap = airport(pkg.city);
  const outbound = direction === "outbound";
  return {
    type: "flight",
    title: outbound
      ? `Departure From ${pkg.city} Airport → Arrival In Jeddah`
      : `Departure From Jeddah Airport → Arrival In ${pkg.city}`,
    subtitle: outbound
      ? `Arrive at Jeddah Airport (JED) via ${airline}`
      : `Arrive at ${pkg.city} Airport (${ap.code}) with ${airline}.`,
    fromCity: outbound ? pkg.city : "Jeddah",
    toCity: outbound ? "Jeddah" : pkg.city,
    fromCode: outbound ? ap.code : "JED",
    toCode: outbound ? "JED" : ap.code,
    fromAirport: outbound ? ap.name : "King Abdulaziz International (JED)",
    toAirport: outbound ? "King Abdulaziz International (JED)" : ap.name,
    airline,
    date: fmt(date),
    departTime: outbound ? "08:10" : "16:15",
    arriveTime: outbound ? "11:45" : "23:55",
    duration: outbound ? "5h 35m" : "5h 10m",
    stops: "NonStop",
    cabinBaggage: "Cabin Baggage 1 Piece - 7 Kg",
    checkInBaggage: "Check-In Baggage 1 Piece - 25 Kg",
  };
}

function hotelBlock(
  title: string,
  subtitle: string | undefined,
  name: string,
  stars: number,
  distanceM: number,
  walkMinutes: number,
  address: string,
  nights: number,
  mode: "check-in" | "check-out",
  image?: string,
): HotelBlock {
  return {
    type: "hotel",
    title,
    subtitle,
    name,
    stars,
    rating: stars === 5 ? 4.8 : stars === 4 ? 4.2 : 3.5,
    distanceM,
    walkMinutes,
    address,
    nights,
    amenities: HOTEL_AMENITIES,
    mode,
    image,
  };
}

const GUIDE_IMAGES = ["/gallery/1.jpg", "/gallery/2.jpg", "/gallery/4.jpg"];
const UMRAH_IMAGES = ["/gallery/3.jpg", "/gallery/5.jpg", "/gallery/6.jpg"];
const APP_IMAGES = ["/gallery/7.jpg", "/gallery/8.jpg"];

export function buildItinerary(pkg: Package): ItineraryDay[] {
  const stars = TIERS[pkg.tier].stars;
  const airline = pkg.tier === "premium" ? "Saudia" : "PIA";
  const makkahNights = Math.max(1, Math.round(pkg.durationNights * 0.57));
  const madinahNights = Math.max(1, pkg.durationNights - makkahNights);
  const makkahHotel = pkg.makkahHotel ?? `Olyan Al Khalil`;
  const madinahHotel = pkg.madinahHotel ?? `Amjad Al Salaam`;
  const start = pkg.departureDate;
  const moveDay = makkahNights + 1;

  return [
    {
      id: "day-1",
      label: "Day 1",
      date: fmt(addDays(start, 0)),
      blocks: [
        flightBlock(pkg, "outbound", addDays(start, 0), airline),
        {
          type: "alert",
          title: "Group Departure Notice",
          body: "Please arrive at the airport 3 hours before departure. Group leader will assist with check-in. Baggage limits apply — excess charges are payable directly to the airline.",
        },
        {
          type: "transfer",
          title: "Transfer from Jeddah Airport to Makkah Hotel",
          subtitle:
            "One-way transfer from Jeddah International Airport to your hotel in Makkah.",
          from: "Jeddah Airport",
          to: "Makkah Hotel",
          duration: "1h 30m",
          capacity: 45,
          vehicle: "Private Coach",
          image: "/gallery/1.jpg",
        },
        hotelBlock(
          "Stay in Makkah",
          "Arrive at your hotel and settle in comfortably.",
          makkahHotel,
          stars,
          600,
          8,
          "Ibrahim Khalil Road",
          makkahNights,
          "check-in",
          pkg.image,
        ),
        {
          type: "service",
          title: "Free SIM Card with Data Pack",
          name: "Local SIM",
          desc: `${pkg.durationDays} days validity & up to 5 GB internet. Travel, connect, pray, and share in the holy cities.`,
          image: "/gallery/6.jpg",
        },
        {
          type: "gallery",
          title: "Professional Tour Guide",
          subtitle: "Experienced Moallem guidance for a spiritually fulfilling Umrah journey.",
          images: GUIDE_IMAGES,
        },
        {
          type: "gallery",
          title: "Umrah Performance",
          subtitle: "Step-by-step support during your sacred rituals.",
          images: UMRAH_IMAGES,
        },
        {
          type: "gallery",
          title: "Tech & Management Support",
          subtitle: "Digital tools and on-ground team support throughout your journey.",
          images: APP_IMAGES,
        },
      ],
    },
    {
      id: "day-2-makkah",
      label: `Day 2-${makkahNights}`,
      blocks: [
        {
          type: "ziyarat",
          title: "Ziyarat in Makkah",
          activities: MAKKAH_ZIYARAT,
        },
      ],
    },
    {
      id: `day-${moveDay}`,
      label: `Day ${moveDay}`,
      date: fmt(addDays(start, makkahNights)),
      blocks: [
        hotelBlock(
          "Hotel Check-out",
          "Check out from your hotel and get ready for a comfortable journey to Madinah.",
          makkahHotel,
          stars,
          600,
          8,
          "Ibrahim Khalil Road",
          makkahNights,
          "check-out",
          pkg.image,
        ),
        {
          type: "transfer",
          title: "Travel from Makkah to Madinah",
          subtitle:
            "One-way transfer from your hotel in Makkah to your hotel in Madinah.",
          from: "Makkah Hotel",
          to: madinahHotel,
          duration: "5h 45m",
          capacity: 45,
          vehicle: "Private Coach",
          image: "/gallery/2.jpg",
        },
        hotelBlock(
          "Stay in Madinah",
          "Arrive at your hotel and settle in comfortably.",
          madinahHotel,
          Math.min(stars + 1, 5),
          150,
          3,
          "Salaam Street",
          madinahNights,
          "check-in",
          "/gallery/3.jpg",
        ),
      ],
    },
    {
      id: "day-madinah-prayer",
      label: `Day ${moveDay + 2}`,
      date: fmt(addDays(start, moveDay + 1)),
      blocks: [
        {
          type: "service",
          title: "Rest and prayers at Masjid an-Nabawi",
          name: "Rawdah e Rasool Permit",
          desc: "Settle into your hotel and enjoy peaceful moments of prayer at the Prophet's Mosque.",
          tag: "Permit Support",
        },
        {
          type: "guide",
          title: "Rawdah Booking Guide",
          desc: "Step-by-step Nusuk booking guide for Rawdah appointment slots.",
          href: "/resources",
          cta: "Check it out",
        },
      ],
    },
    {
      id: "day-madinah-ziyarat",
      label: `Day ${moveDay + 1}-${pkg.durationNights}`,
      blocks: [
        {
          type: "ziyarat",
          title: "Ziyarat in Madinah",
          activities: MADINAH_ZIYARAT,
        },
      ],
    },
    {
      id: `day-${pkg.durationDays}`,
      label: `Day ${pkg.durationDays}`,
      date: fmt(addDays(start, pkg.durationNights)),
      blocks: [
        hotelBlock(
          "Hotel Check-out",
          "Check out from your hotel and get ready for your journey back home.",
          madinahHotel,
          Math.min(stars + 1, 5),
          150,
          3,
          "Salaam Street",
          madinahNights,
          "check-out",
        ),
        {
          type: "note",
          text: "It is never easy to leave the holy cities. Insha'Allah, with Al Wrd, you will soon return.",
        },
        {
          type: "transfer",
          title: "Hotel to Jeddah Airport",
          subtitle:
            "One-way transfer from your hotel to Jeddah International Airport for your departure.",
          from: "Madinah Hotel",
          to: "Jeddah Airport",
          duration: "5h 30m",
          capacity: 45,
          vehicle: "Private Coach",
          image: "/gallery/1.jpg",
        },
        {
          type: "service",
          title: "Zamzam Water Bottle",
          name: "5L Zamzam Water Bottle",
          desc: "Bottle for each adult and child. Infants are excluded as per laws.",
        },
        flightBlock(pkg, "return", addDays(start, pkg.durationNights), airline),
        {
          type: "note",
          text: "May Allah accept your Umrah and bless you, insha'Allah we will meet soon.",
        },
      ],
    },
  ];
}

export function buildMealPlan(pkg: Package): MealPlan[] {
  const tier = TIERS[pkg.tier];
  return [
    {
      title: "Daily Meals",
      items: [
        "Pakistani breakfast buffet at hotel",
        "Dinner at hotel or nearby halal restaurant",
        tier.stars >= 4 ? "Welcome dinner on arrival day" : "Standard meal plan",
        "Zamzam water available at hotels",
      ],
    },
    {
      title: "Special Arrangements",
      items: [
        "Vegetarian and dietary requests accommodated on request",
        "Child-friendly meal options available",
        "Meals during ziyarat day trips included where noted",
      ],
    },
  ];
}

export const packagePolicies: PackagePolicy[] = [
  {
    title: "Booking & Payment",
    body: "Submit an inquiry to reserve your seat. Our team confirms availability and shares payment instructions. Full payment is required before visa processing begins.",
  },
  {
    title: "Cancellation Policy",
    body: "Cancellations made 30+ days before departure receive a partial refund minus administrative fees. Within 30 days, airline and hotel penalties apply as per supplier terms.",
  },
  {
    title: "Visa & Documentation",
    body: "Valid passport with 6+ months validity is required. We assist with Umrah visa processing; approval is subject to Saudi authorities.",
  },
  {
    title: "Travel Insurance",
    body: "Comprehensive travel insurance is recommended. Al Wrd can guide you on coverage options during booking.",
  },
];

export function buildVisaInfo(): VisaInfo[] {
  return [
    {
      title: "Umrah Visa Processing",
      items: [
        "Complete visa documentation handled by our team",
        "Passport must be valid for at least 6 months",
        "Processing time typically 5–10 working days",
        "Visa approval subject to Saudi authorities",
        "Biometric and health requirements as per current regulations",
      ],
    },
    {
      title: "Required Documents",
      items: [
        "Original passport with blank pages",
        "Recent passport-size photographs",
        "CNIC copy",
        "Vaccination certificate (if applicable)",
        "Mahram documentation for female pilgrims (if applicable)",
      ],
    },
  ];
}

export function buildInsuranceInfo(): InsuranceInfo[] {
  return [
    {
      title: "Travel Insurance",
      items: [
        "Comprehensive coverage recommended for all pilgrims",
        "Medical emergencies and hospitalisation abroad",
        "Trip cancellation and interruption protection",
        "Lost baggage and travel delay coverage",
        "Our team can guide you on suitable plans during booking",
      ],
    },
    {
      title: "What's Covered",
      items: [
        "Emergency medical expenses in Saudi Arabia",
        "Repatriation assistance when required",
        "24/7 helpline support during your journey",
        "Optional upgrade for pre-existing conditions",
      ],
    },
  ];
}

export function allOverviewBlocks(days: ItineraryDay[]): ItineraryBlock[] {
  return days.flatMap((d) => d.blocks);
}

export function collectBlocks(
  days: ItineraryDay[],
  type: ItineraryBlock["type"],
): ItineraryBlock[] {
  return days.flatMap((d) => d.blocks.filter((b) => b.type === type));
}
