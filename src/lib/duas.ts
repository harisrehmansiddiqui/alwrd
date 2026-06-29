export type DuaEntry = {
  title: string;
  arabic?: string;
  transliteration: string;
  translation: string;
  note?: string;
};

export type DuaPhase = {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  icon: string;
  duas: DuaEntry[];
};

export const DUAS_TIMELINE: DuaPhase[] = [
  {
    id: "before-travel",
    step: 1,
    title: "Before You Travel",
    subtitle: "Intention, protection, and leaving home with trust in Allah.",
    icon: "flight_takeoff",
    duas: [
      {
        title: "Intention for Umrah",
        transliteration:
          "Allahumma inni uridu al-'umrata fa-yassirha li wa taqabbalha minni.",
        translation:
          "O Allah, I intend to perform Umrah — make it easy for me and accept it from me.",
        note: "Make your sincere niyyah before wearing Ihram or at the miqat.",
      },
      {
        title: "Travel supplication",
        transliteration:
          "Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina la-munqalibun.",
        translation:
          "Glory be to Him who has subjected this to us, and we could not have done so ourselves. To our Lord we shall surely return.",
      },
      {
        title: "Protection on the journey",
        transliteration:
          "Allahumma inna nas'aluka fi safarina hadha al-birra wat-taqwa wa minal-'amali ma tarda.",
        translation:
          "O Allah, we ask You on this journey for righteousness, piety, and deeds that please You.",
      },
    ],
  },
  {
    id: "ihram",
    step: 2,
    title: "Entering Ihram",
    subtitle: "At the miqat — the sacred state begins before Makkah.",
    icon: "checkroom",
    duas: [
      {
        title: "When putting on Ihram",
        transliteration: "Labbaik Allahumma bi-'umrah.",
        translation: "Here I am, O Allah, for Umrah.",
      },
      {
        title: "Talbiyah (begin reciting)",
        arabic:
          "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
        transliteration:
          "Labbayk Allahumma labbayk, labbayk la sharika laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.",
        translation:
          "Here I am, O Allah, here I am. Here I am — You have no partner, here I am. Truly all praise, favour and sovereignty belong to You. You have no partner.",
        note: "Recite frequently until you begin Tawaf. Men raise their voice; women recite softly.",
      },
    ],
  },
  {
    id: "haram",
    step: 3,
    title: "Entering the Haram",
    subtitle: "First steps into Masjid al-Haram with humility.",
    icon: "mosque",
    duas: [
      {
        title: "Entering the masjid",
        transliteration: "Allahumma aftah li abwaba rahmatik.",
        translation: "O Allah, open for me the doors of Your mercy.",
        note: "Enter with the right foot and avoid worldly talk inside the Haram.",
      },
      {
        title: "First sight of the Ka'bah",
        transliteration:
          "Allahumma zid hadha al-bayta tashrifan wa ta'ziman wa takriman wa mahabbatan, wa zid man tashrifahu wa 'azzamahu min khalqika tashrifan wa ta'ziman wa takriman wa burhan.",
        translation:
          "O Allah, increase this House in honour, reverence and nobility, and increase those who honour it among Your creation in honour, reverence and nobility.",
        note: "Raise your hands, make personal du'a, and send salawat upon the Prophet ﷺ.",
      },
    ],
  },
  {
    id: "tawaf",
    step: 4,
    title: "During Tawaf",
    subtitle: "Seven circuits around the Ka'bah — dhikr and heartfelt du'a.",
    icon: "sync",
    duas: [
      {
        title: "General supplication during Tawaf",
        transliteration:
          "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
        translation:
          "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
      },
      {
        title: "Between the Yemeni Corner and the Black Stone",
        transliteration:
          "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
        translation:
          "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
        note: "Recite this between Rukn al-Yamani and Hajar al-Aswad if possible. Otherwise make any personal du'a.",
      },
      {
        title: "After completing Tawaf",
        transliteration:
          "Wa attakhidhu min maqami Ibrahima musalla.",
        translation:
          "And take the station of Ibrahim as a place of prayer. (Qur'an 2:125 — pray two rak'ah behind Maqam Ibrahim if possible.)",
      },
    ],
  },
  {
    id: "sai",
    step: 5,
    title: "Sa'i (Safa & Marwah)",
    subtitle: "Walking between Safa and Marwah seven times in remembrance of Hajar عليها السلام.",
    icon: "directions_walk",
    duas: [
      {
        title: "At Safa and Marwah",
        arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
        transliteration: "Inna as-Safa wal-Marwata min sha'a'irillah.",
        translation:
          "Indeed, Safa and Marwah are among the symbols of Allah. (Qur'an 2:158)",
        note: "Face the Ka'bah, raise hands, say Allahu Akbar, then make du'a before beginning Sa'i.",
      },
      {
        title: "On the green markers (men jog)",
        transliteration: "Rabbighfir warham wa 'fu 'annak anta al-A'azzu al-Akram.",
        translation:
          "My Lord, forgive and have mercy; pardon me — You are the Most Mighty, Most Generous.",
      },
    ],
  },
  {
    id: "exit-ihram",
    step: 6,
    title: "Completing Umrah",
    subtitle: "Hair cutting, exiting Ihram, and gratitude.",
    icon: "content_cut",
    duas: [
      {
        title: "After shaving or cutting hair",
        transliteration:
          "Alhamdulillahil-ladhi qad dana 'anna li's-sa'ya wa ja'alahu lana 'ibadatan.",
        translation:
          "All praise is due to Allah who enabled us to complete Sa'i and made it an act of worship for us.",
        note: "Umrah is complete after hair is cut or shaved. Talbiyah stops once you begin Tawaf.",
      },
      {
        title: "Gratitude upon completion",
        transliteration:
          "Allahumma taqabbal minni wa ghfir li wa irhamni.",
        translation: "O Allah, accept from me, forgive me, and have mercy on me.",
      },
    ],
  },
  {
    id: "madinah",
    step: 7,
    title: "Visiting Madinah",
    subtitle: "Etiquette for Masjid an-Nabawi and sending salawat.",
    icon: "location_city",
    duas: [
      {
        title: "Salawat upon the Prophet ﷺ",
        transliteration:
          "Allahumma salli 'ala Muhammad wa 'ala ali Muhammad, kama sallayta 'ala Ibrahima wa 'ala ali Ibrahima, innaka Hamidun Majid.",
        translation:
          "O Allah, send blessings upon Muhammad and the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. You are indeed Praiseworthy, Glorious.",
      },
      {
        title: "Entering Masjid an-Nabawi",
        transliteration: "Allahumma aftah li abwaba rahmatik.",
        translation: "O Allah, open for me the doors of Your mercy.",
        note: "Proceed with adab — give priority to worship and avoid raising the voice.",
      },
    ],
  },
];

export const DUAS_FAQS = [
  {
    q: "Do I need to memorise every du'a before Umrah?",
    a: "No. It helps to memorise the Talbiyah and a few core supplications, but you may read transliteration and translation from this guide or a printed card during Tawaf and Sa'i.",
  },
  {
    q: "When should I stop reciting the Talbiyah?",
    a: "Stop when you reach the Black Stone to begin Tawaf. From that point, focus on dhikr and personal du'a during the circuits.",
  },
  {
    q: "Can I make personal du'a in my own language?",
    a: "Yes. Outside of prescribed recitations, you may ask Allah in any language for anything halal — especially during Tawaf and Sa'i.",
  },
  {
    q: "Is there a PDF version I can take with me?",
    a: "Yes. Tap the WhatsApp button on this page and our team will send you a printable Essential Du'as PDF for offline use during your journey.",
  },
  {
    q: "What if I forget a du'a during the rituals?",
    a: "Your Umrah remains valid. Sincere intention and correct sequence of acts matter most. Ask our coordinators on-ground if you need a quick reminder.",
  },
];

export const DUAS_WHATSAPP_MESSAGE =
  "Assalamu alaikum, please send me the Essential Du'as PDF for Umrah.";
