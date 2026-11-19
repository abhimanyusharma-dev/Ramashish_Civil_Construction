/**
 * Indian States, Cities, Material Rates, Labour Rates & Construction Standards
 * RAMASHISH Civil Construction Calculator Database
 */

export const INDIAN_STATES = [
  { id: 'MP', nameEn: 'Madhya Pradesh', nameHi: 'मध्य प्रदेश' },
  { id: 'MH', nameEn: 'Maharashtra', nameHi: 'महाराष्ट्र' },
  { id: 'UP', nameEn: 'Uttar Pradesh', nameHi: 'उत्तर प्रदेश' },
  { id: 'DL', nameEn: 'Delhi NCR', nameHi: 'दिल्ली एनसीआर' },
  { id: 'RJ', nameEn: 'Rajasthan', nameHi: 'राजस्थान' },
  { id: 'GJ', nameEn: 'Gujarat', nameHi: 'गुजरात' },
  { id: 'KA', nameEn: 'Karnataka', nameHi: 'कर्नाटक' },
  { id: 'TG', nameEn: 'Telangana', nameHi: 'तेलंगाना' },
  { id: 'TN', nameEn: 'Tamil Nadu', nameHi: 'तमिलनाडु' },
  { id: 'HR', nameEn: 'Haryana', nameHi: 'हरियाणा' },
  { id: 'PB', nameEn: 'Punjab', nameHi: 'पंजाब' },
  { id: 'CG', nameEn: 'Chhattisgarh', nameHi: 'छत्तीसगढ़' },
  { id: 'BR', nameEn: 'Bihar', nameHi: 'बिहार' },
  { id: 'JH', nameEn: 'Jharkhand', nameHi: 'झारखंड' },
  { id: 'WB', nameEn: 'West Bengal', nameHi: 'पश्चिम बंगाल' },
  { id: 'UK', nameEn: 'Uttarakhand', nameHi: 'उत्तराखंड' },
  { id: 'AP', nameEn: 'Andhra Pradesh', nameHi: 'आंध्र प्रदेश' },
  { id: 'KL', nameEn: 'Kerala', nameHi: 'केरल' },
  { id: 'OD', nameEn: 'Odisha', nameHi: 'ओडिशा' },
  { id: 'AS', nameEn: 'Assam', nameHi: 'असम' },
  { id: 'HP', nameEn: 'Himachal Pradesh', nameHi: 'हिमाचल प्रदेश' },
  { id: 'GA', nameEn: 'Goa', nameHi: 'गोवा' },
];

export const CITIES_BY_STATE = {
  MP: [
    { id: 'bhopal', nameEn: 'Bhopal (HQ)', nameHi: 'भोपाल (मुख्यालय)', materialIndex: 1.0, labourIndex: 1.0, isVerified: true },
    { id: 'indore', nameEn: 'Indore', nameHi: 'इंदौर', materialIndex: 1.04, labourIndex: 1.06, isVerified: true },
    { id: 'jabalpur', nameEn: 'Jabalpur', nameHi: 'जबलपुर', materialIndex: 0.98, labourIndex: 0.95, isVerified: true },
    { id: 'gwalior', nameEn: 'Gwalior', nameHi: 'ग्वालियर', materialIndex: 1.01, labourIndex: 0.96, isVerified: true },
    { id: 'ujjain', nameEn: 'Ujjain', nameHi: 'उज्जैन', materialIndex: 1.02, labourIndex: 0.98, isVerified: true },
    { id: 'sagar', nameEn: 'Sagar', nameHi: 'सागर', materialIndex: 0.96, labourIndex: 0.92, isVerified: false },
    { id: 'satna', nameEn: 'Satna', nameHi: 'सतना', materialIndex: 0.97, labourIndex: 0.93, isVerified: false },
    { id: 'rewa', nameEn: 'Rewa', nameHi: 'रीवा', materialIndex: 0.96, labourIndex: 0.92, isVerified: false },
  ],
  MH: [
    { id: 'mumbai', nameEn: 'Mumbai (MMR)', nameHi: 'मुंबई (एमएमआर)', materialIndex: 1.25, labourIndex: 1.35, isVerified: true },
    { id: 'pune', nameEn: 'Pune', nameHi: 'पुणे', materialIndex: 1.15, labourIndex: 1.20, isVerified: true },
    { id: 'nagpur', nameEn: 'Nagpur', nameHi: 'नागपुर', materialIndex: 1.05, labourIndex: 1.05, isVerified: true },
    { id: 'nashik', nameEn: 'Nashik', nameHi: 'नासिक', materialIndex: 1.08, labourIndex: 1.10, isVerified: false },
    { id: 'aurangabad', nameEn: 'Chhatrapati Sambhajinagar', nameHi: 'छत्रपति संभाजीनगर', materialIndex: 1.06, labourIndex: 1.02, isVerified: false },
  ],
  UP: [
    { id: 'lucknow', nameEn: 'Lucknow', nameHi: 'लखनऊ', materialIndex: 1.03, labourIndex: 0.98, isVerified: true },
    { id: 'noida', nameEn: 'Noida / Greater Noida', nameHi: 'नोएडा / ग्रेटर नोएडा', materialIndex: 1.14, labourIndex: 1.18, isVerified: true },
    { id: 'kanpur', nameEn: 'Kanpur', nameHi: 'कानपुर', materialIndex: 1.01, labourIndex: 0.95, isVerified: true },
    { id: 'varanasi', nameEn: 'Varanasi', nameHi: 'वाराणसी', materialIndex: 1.02, labourIndex: 0.94, isVerified: true },
    { id: 'prayagraj', nameEn: 'Prayagraj', nameHi: 'प्रयागराज', materialIndex: 0.99, labourIndex: 0.92, isVerified: false },
    { id: 'agra', nameEn: 'Agra', nameHi: 'आगरा', materialIndex: 1.02, labourIndex: 0.96, isVerified: false },
  ],
  DL: [
    { id: 'delhi-south', nameEn: 'South / Central Delhi', nameHi: 'दक्षिण / मध्य दिल्ली', materialIndex: 1.22, labourIndex: 1.28, isVerified: true },
    { id: 'delhi-west', nameEn: 'West / North Delhi', nameHi: 'पश्चिम / उत्तर दिल्ली', materialIndex: 1.18, labourIndex: 1.22, isVerified: true },
    { id: 'gurugram', nameEn: 'Gurugram', nameHi: 'गुरुग्राम', materialIndex: 1.20, labourIndex: 1.26, isVerified: true },
    { id: 'faridabad', nameEn: 'Faridabad', nameHi: 'फरीदाबाद', materialIndex: 1.12, labourIndex: 1.15, isVerified: true },
    { id: 'ghaziabad', nameEn: 'Ghaziabad', nameHi: 'गाजियाबाद', materialIndex: 1.10, labourIndex: 1.12, isVerified: true },
  ],
  RJ: [
    { id: 'jaipur', nameEn: 'Jaipur', nameHi: 'जयपुर', materialIndex: 1.04, labourIndex: 1.02, isVerified: true },
    { id: 'jodhpur', nameEn: 'Jodhpur', nameHi: 'जोधपुर', materialIndex: 1.02, labourIndex: 0.98, isVerified: true },
    { id: 'udaipur', nameEn: 'Udaipur', nameHi: 'उदयपुर', materialIndex: 1.05, labourIndex: 1.00, isVerified: false },
    { id: 'kota', nameEn: 'Kota', nameHi: 'कोटा', materialIndex: 0.99, labourIndex: 0.96, isVerified: false },
  ],
  GJ: [
    { id: 'ahmedabad', nameEn: 'Ahmedabad', nameHi: 'अहमदाबाद', materialIndex: 1.10, labourIndex: 1.12, isVerified: true },
    { id: 'surat', nameEn: 'Surat', nameHi: 'सूरत', materialIndex: 1.12, labourIndex: 1.14, isVerified: true },
    { id: 'vadodara', nameEn: 'Vadodara', nameHi: 'वडोदरा', materialIndex: 1.08, labourIndex: 1.06, isVerified: false },
    { id: 'rajkot', nameEn: 'Rajkot', nameHi: 'राजकोट', materialIndex: 1.06, labourIndex: 1.04, isVerified: false },
  ],
  KA: [
    { id: 'bengaluru', nameEn: 'Bengaluru', nameHi: 'बेंगलुरु', materialIndex: 1.22, labourIndex: 1.28, isVerified: true },
    { id: 'mysuru', nameEn: 'Mysuru', nameHi: 'मैसूरु', materialIndex: 1.10, labourIndex: 1.12, isVerified: false },
    { id: 'hubballi', nameEn: 'Hubballi-Dharwad', nameHi: 'हुबली-धारवाड़', materialIndex: 1.06, labourIndex: 1.04, isVerified: false },
  ],
  TG: [
    { id: 'hyderabad', nameEn: 'Hyderabad', nameHi: 'हैदराबाद', materialIndex: 1.16, labourIndex: 1.20, isVerified: true },
    { id: 'warangal', nameEn: 'Warangal', nameHi: 'वारंगल', materialIndex: 1.05, labourIndex: 1.02, isVerified: false },
  ],
  TN: [
    { id: 'chennai', nameEn: 'Chennai', nameHi: 'चेन्नई', materialIndex: 1.18, labourIndex: 1.22, isVerified: true },
    { id: 'coimbatore', nameEn: 'Coimbatore', nameHi: 'कोयंबटूर', materialIndex: 1.12, labourIndex: 1.14, isVerified: false },
  ],
  HR: [
    { id: 'panipat', nameEn: 'Panipat', nameHi: 'पानीपत', materialIndex: 1.08, labourIndex: 1.06, isVerified: false },
    { id: 'karnal', nameEn: 'Karnal', nameHi: 'करनाल', materialIndex: 1.07, labourIndex: 1.05, isVerified: false },
  ],
  PB: [
    { id: 'chandigarh', nameEn: 'Chandigarh Tri-City', nameHi: 'चंडीगढ़ ट्राई-सिटी', materialIndex: 1.15, labourIndex: 1.18, isVerified: true },
    { id: 'ludhiana', nameEn: 'Ludhiana', nameHi: 'लुधियाना', materialIndex: 1.08, labourIndex: 1.06, isVerified: false },
    { id: 'amritsar', nameEn: 'Amritsar', nameHi: 'अमृतसर', materialIndex: 1.06, labourIndex: 1.04, isVerified: false },
  ],
  CG: [
    { id: 'raipur', nameEn: 'Raipur', nameHi: 'रायपुर', materialIndex: 1.02, labourIndex: 0.98, isVerified: true },
    { id: 'bilaspur', nameEn: 'Bilaspur', nameHi: 'बिलासपुर', materialIndex: 0.98, labourIndex: 0.94, isVerified: false },
  ],
  BR: [
    { id: 'patna', nameEn: 'Patna', nameHi: 'पटना', materialIndex: 1.06, labourIndex: 0.96, isVerified: true },
    { id: 'gaya', nameEn: 'Gaya', nameHi: 'गया', materialIndex: 1.01, labourIndex: 0.92, isVerified: false },
  ],
  JH: [
    { id: 'ranchi', nameEn: 'Ranchi', nameHi: 'राँची', materialIndex: 1.04, labourIndex: 0.98, isVerified: true },
    { id: 'jamshedpur', nameEn: 'Jamshedpur', nameHi: 'जमशेदपुर', materialIndex: 1.03, labourIndex: 0.97, isVerified: false },
  ],
  WB: [
    { id: 'kolkata', nameEn: 'Kolkata', nameHi: 'कोलकाता', materialIndex: 1.12, labourIndex: 1.10, isVerified: true },
    { id: 'siliguri', nameEn: 'Siliguri', nameHi: 'सिलीगुड़ी', materialIndex: 1.08, labourIndex: 1.02, isVerified: false },
  ],
  UK: [
    { id: 'dehradun', nameEn: 'Dehradun', nameHi: 'देहरादून', materialIndex: 1.12, labourIndex: 1.14, isVerified: true },
    { id: 'haridwar', nameEn: 'Haridwar', nameHi: 'हरिद्वार', materialIndex: 1.08, labourIndex: 1.06, isVerified: false },
  ],
  AP: [
    { id: 'visakhapatnam', nameEn: 'Visakhapatnam', nameHi: 'विशाखापत्तनम', materialIndex: 1.10, labourIndex: 1.08, isVerified: false },
    { id: 'vijayawada', nameEn: 'Vijayawada', nameHi: 'विजयवाड़ा', materialIndex: 1.12, labourIndex: 1.10, isVerified: false },
  ],
  KL: [
    { id: 'kochi', nameEn: 'Kochi', nameHi: 'कोच्चि', materialIndex: 1.24, labourIndex: 1.38, isVerified: true },
    { id: 'thiruvananthapuram', nameEn: 'Thiruvananthapuram', nameHi: 'तिरुवनंतपुरम', materialIndex: 1.20, labourIndex: 1.32, isVerified: false },
  ],
  OD: [
    { id: 'bhubaneswar', nameEn: 'Bhubaneswar', nameHi: 'भुवनेश्वर', materialIndex: 1.06, labourIndex: 1.02, isVerified: false },
    { id: 'cuttack', nameEn: 'Cuttack', nameHi: 'कटक', materialIndex: 1.04, labourIndex: 1.00, isVerified: false },
  ],
  AS: [
    { id: 'guwahati', nameEn: 'Guwahati', nameHi: 'गुवाहाटी', materialIndex: 1.16, labourIndex: 1.12, isVerified: false },
  ],
  HP: [
    { id: 'shimla', nameEn: 'Shimla', nameHi: 'शिमला', materialIndex: 1.26, labourIndex: 1.25, isVerified: false },
  ],
  GA: [
    { id: 'panaji', nameEn: 'Panaji', nameHi: 'पणजी', materialIndex: 1.22, labourIndex: 1.28, isVerified: false },
  ],
};

/* ─── BASE RAW MATERIAL MARKET PRICES (Bhopal Baseline 2026 Q1) ─── */
export const BASE_MATERIAL_RATES = {
  // Cement (OPC 53 / PPC IS:1489)
  cementPerBag: 375, // ₹ per 50kg bag (UltraTech / Birla A1 / ACC)
  
  // TMT Reinforcement Steel (Fe-550D primary branded)
  steelPerKg: 62, // ₹ per kg (Tata Tiscon / Jindal Panther / SAIL)
  
  // Aggregates & Sand
  riverSandPerCuFt: 52, // ₹ per cu.ft (Clean coarse river sand)
  crushedAggregatePerCuFt: 38, // ₹ per cu.ft (20mm & 10mm crushed blue metal)
  rubbleStonePerCuFt: 28, // ₹ per cu.ft (Black basalt stone soling)
  
  // Bricks & Masonry
  redBrickPerPiece: 8.5, // ₹ per brick (First-class kiln-burned red clay)
  flyAshBrickPerPiece: 6.2, // ₹ per brick (Standard fly ash block)
  
  // Finishing Materials Base
  vitrifiedTilesBasicPerSqFt: 45, // 2x2 double charge
  vitrifiedTilesStandardPerSqFt: 75, // 2x4 glazed vitrified (GVT)
  vitrifiedTilesPremiumPerSqFt: 135, // 4x2 / 6x4 PGVT Italian look
  
  tileAdhesivePerBag: 380, // 20kg bag (Roff / Laticrete)
  graniteKitchenPerSqFt: 140, // 20mm mirror polished Black Granite
  
  // Putty & Paint
  wallPuttyPerBag: 850, // 40kg bag (Birla White / JK WallMaxx)
  primerPerLitre: 145, // Interior/exterior primer
  interiorPaintBasicPerLitre: 190, // Tractor Emulsion
  interiorPaintStandardPerLitre: 320, // Premium Acrylic Emulsion (Apcolite)
  interiorPaintPremiumPerLitre: 540, // Luxury Silk / Royale
  exteriorPaintPerLitre: 310, // Apex Weatherproof
  
  // Chemical Waterproofing
  waterproofingCompoundPerLitre: 165, // Dr. Fixit Pidiproof / URP
};

/* ─── BASE TRADE LABOUR WAGE RATES (Bhopal Baseline 2026 Q1) ─── */
export const BASE_LABOUR_RATES = {
  headMasonDaily: 950, // ₹ per day
  skilledMasonDaily: 800,
  barBenderDaily: 850,
  carpenterShutteringDaily: 850,
  painterDaily: 750,
  plumberDaily: 850,
  electricianDaily: 850,
  unskilledHelperDaily: 520,
};

/* ─── CONSTRUCTION QUALITY TIERS ─── */
export const QUALITY_TIERS = {
  basic: {
    id: 'basic',
    nameEn: 'Basic Quality',
    nameHi: 'बेसिक निर्माण (आर्थिक)',
    tagline: 'Economy · Budget · Safe',
    costPerSqFtEst: '1200–1500',
    specsEn: [
      'PPC Cement (Birla/ACC/Ambuja)',
      'Fe-500 ISI Certified Steel',
      '2×2 ft Vitrified Tiles (₹42–48/sqft)',
      'Pressed Steel Door Frames + Flush Doors',
      '2-Track Aluminium Sliding Windows',
      'Acrylic Tractor Emulsion Paint (2 coats)',
    ],
    specsHi: [
      'PPC सीमेंट (बिरला/एसीसी/अंबुजा)',
      'Fe-500 ISI प्रमाणित सरिया',
      '2×2 फीट विट्रिफाइड टाइल्स (₹42–48/sqft)',
      'प्रेस्ड स्टील फ्रेम + फ्लश दरवाजे',
      '2-ट्रैक एल्यूमीनियम खिड़कियां',
      'एक्रेलिक ट्रैक्टर इमल्शन पेंट (2 कोट)',
    ],
    badgeEn: 'Economical & Safe',
    badgeHi: 'किफायती एवं सुरक्षित',
    descriptionEn: 'Economical materials, standard IS code structural compliance, reliable residential finishing for budget-conscious homeowners.',
    descriptionHi: 'किफायती सामग्री, मानक आईएस कोड स्ट्रक्चरल सुरक्षा, बजट-अनुकूल टिकाऊ फिनिशिंग।',
    specs: {
      cement: 'PPC Standard (Birla/ACC/Ambuja)',
      steel: 'Fe-500/550 Standard ISI Certified',
      sand: 'Zone-II Coarse Sand / Filtered M-Sand',
      aggregate: '20mm & 10mm Machine Crushed',
      bricks: 'First-Class Red Clay / Fly Ash Bricks',
      flooring: '2x2 ft Polished Vitrified Tiles (₹42-₹48/sq.ft)',
      doors: 'Pressed Steel Frames with Solid Core Flush Doors',
      windows: '2-Track Anodized Aluminium Sliding Windows with 4mm Glass',
      electrical: 'Concealed ISI PVC Conduits, Anchor/GreatWhite Modular Switches, Finolex Wires',
      plumbing: 'Supreme/Prince CPVC Pipes, Cera/Parryware Basic Sanitaryware & CP Fittings',
      painting: '2 Coats Wall Putty, 1 Coat Primer, 2 Coats Acrylic Tractor Emulsion',
      kitchen: '18mm Black Granite Platform with Stainless Steel Sink (₹110-₹130/sq.ft)',
    },
    multiplier: 1.0,
  },
  standard: {
    id: 'standard',
    nameEn: 'Standard Quality',
    nameHi: 'स्टैंडर्ड निर्माण (सर्वोत्तम)',
    tagline: 'Most Popular · IS456 · Branded',
    costPerSqFtEst: '1500–1900',
    specsEn: [
      'UltraTech/ACC 53 Grade OPC+PPC',
      'Tata/Jindal Fe-550D Primary Steel',
      '2×4 ft GVT Tiles (₹70–85/sqft)',
      'Teakwood Main Door + UPVC Windows',
      'Havells/Polycab FRLS Wiring',
      'Asian Paints Apcolite Premium Emulsion',
    ],
    specsHi: [
      'UltraTech/ACC 53 ग्रेड OPC+PPC सीमेंट',
      'Tata/Jindal Fe-550D प्राइमरी स्टील',
      '2×4 फीट GVT टाइल्स (₹70–85/sqft)',
      'सागवान मुख्य द्वार + UPVC खिड़कियां',
      'Havells/Polycab FRLS वायरिंग',
      'Asian Paints Apcolite प्रीमियम इमल्शन',
    ],
    badgeEn: 'Most Popular / Recommended',
    badgeHi: 'सर्वाधिक लोकप्रिय एवं अनुशंसित',
    descriptionEn: 'High-grade primary branded materials, 2x4 ft GVT tiles, UPVC windows, premium sanitaryware, and superior aesthetic longevity.',
    descriptionHi: 'उच्च गुणवत्ता की प्राथमिक ब्रांडेड सामग्री, 2x4 जीवीटी टाइल्स, यूपीवीसी खिड़कियां, प्रीमियम सैनिटरी एवं बेहतरीन मजबूती।',
    specs: {
      cement: 'UltraTech / ACC Gold 53 Grade & PPC',
      steel: 'Primary Branded Fe-550D (Tata Tiscon / Jindal Panther / SAIL)',
      sand: 'Clean Narmada/River Coarse Sand',
      aggregate: 'Double-Washed Machine Crushed Blue Metal',
      bricks: 'High-Density Kiln Clay Bricks / Autoclaved Aerated (AAC) Blocks',
      flooring: '2x4 ft Glazed Vitrified Tiles (GVT) (₹70-₹85/sq.ft)',
      doors: 'Teakwood Main Door Frame with Decorative Veneer; Flush Doors with Laminate inside',
      windows: '2.5-Track Heavy UPVC Sliding Windows with Mosquito Mesh & 5mm Toughened Glass',
      electrical: 'Havells / Polycab FRLS Wires, Legrand/Schneider Modular Switches & RCCB DB',
      plumbing: 'Astral/Ashirvad CPVC, Jaquar/Kohler Quarter-Turn CP Brass Fittings, Hindware EWC',
      painting: 'Birla White Putty, Asian Paints Apcolite Premium Emulsion & Apex Weatherproof Exterior',
      kitchen: '20mm Premium Jet Black Granite Countertop with Nirali SS Sink & Designer Dado',
    },
    multiplier: 1.22,
  },
  premium: {
    id: 'premium',
    nameEn: 'Premium Luxury',
    nameHi: 'प्रीमियम लक्जरी (शानदार)',
    tagline: 'Luxury · Italian · Smart-Home',
    costPerSqFtEst: '1900–2600',
    specsEn: [
      'UltraTech Super M25 High-Strength Mix',
      'Tata Tiscon 550D Super Ductile Rebar',
      '4×2 ft PGVT Italian Marble Finish Tiles',
      'Carved CP Teakwood + Acoustic UPVC',
      'Schneider/Legrand Touch Smart Switches',
      'Asian Paints Royale Luxury Silk (Full)',
    ],
    specsHi: [
      'UltraTech Super M25 हाई-स्ट्रेंथ मिक्स',
      'Tata Tiscon 550D सुपर डक्टाइल सरिया',
      '4×2 फीट PGVT इटालियन मार्बल फिनिश टाइल्स',
      'नक्काशीदार CP सागवान + ध्वनिरोधी UPVC',
      'Schneider/Legrand टच स्मार्ट स्विच',
      'Asian Paints Royale Luxury Silk (पूर्ण)',
    ],
    badgeEn: 'Architectural Luxury',
    badgeHi: 'आर्किटेक्चरल लक्जरी फिनिश',
    descriptionEn: 'Luxury imported Italian-look PGVT tiles, designer teak woodwork, smart modular switches, premium Grohe/Kohler concealed fittings.',
    descriptionHi: 'लक्जरी इटैलियन-लुक पीजीवीटी टाइल्स, नक्काशीदार सागवान चौखट, स्मार्ट मॉड्यूलर स्विच एवं लग्जरी ग्रोह/कोहलर फिटिंग्स।',
    specs: {
      cement: 'UltraTech Super / Birla White Level Max (M25 High Strength Design Mix)',
      steel: 'Tata Tiscon 550D Super Ductile Earthquake Resistant Rebar',
      sand: 'Double Screened Washed River Sand',
      aggregate: 'Tested Graded Cubical Basalt Aggregate',
      bricks: 'Wire-Cut Machine Pressed Bricks / High-Strength AAC Blocks',
      flooring: '4x2 ft / 6x4 ft Polished Glazed Vitrified Tiles (PGVT) Italian Marble Finish (₹125-₹150/sq.ft)',
      doors: '100% Seasoned CP Teakwood Frames & Heavy Carved Designer Main Door; Flush Doors with 1mm Merino Laminate',
      windows: 'System Aluminium / Deceuninck Heavy UPVC Acoustic Insulated Windows with Saint-Gobain Glass',
      electrical: 'Polycab FlameRetardant ZeroHalogen Wires, Schneider/Legrand Touch Smart Switches, Siemens DB',
      plumbing: 'Astral Silencio Noise-Free Drainage, Kohler/Grohe Thermostatic Diverters & Wall-Hung EWCs',
      painting: 'Full Asian Paints Royale Luxury Silk Interior Emulsion & Apex Ultima Protek with 10-Yr Warranty',
      kitchen: 'Full Quartz / Exotic Brazilian Granite Countertop with Quartz Composite Sink & Hafele Hardware',
    },
    multiplier: 1.54,
  },
};

/* ─── FLOOR CONFIGURATION DEFINITIONS ─── */
export const FLOOR_OPTIONS = [
  { floors: 1, labelEn: 'Ground Floor Only (G)',      labelHi: 'केवल ग्राउंड फ्लोर (G)' },
  { floors: 2, labelEn: 'Ground + 1 Floor (G+1)',     labelHi: 'ग्राउंड + 1 मंजिल (G+1)' },
  { floors: 3, labelEn: 'Ground + 2 Floors (G+2)',    labelHi: 'ग्राउंड + 2 मंजिल (G+2)' },
  { floors: 4, labelEn: 'Ground + 3 Floors (G+3)',    labelHi: 'ग्राउंड + 3 मंजिल (G+3)' },
  { floors: 5, labelEn: 'Ground + 4 Floors (G+4)',    labelHi: 'ग्राउंड + 4 मंजिल (G+4)' },
  { floors: 6, labelEn: 'Ground + 5 Floors (G+5)',    labelHi: 'ग्राउंड + 5 मंजिल (G+5)' },
];

/* ─── 10 WORK SECTIONS METADATA ─── */
export const WORK_SECTIONS_META = [
  { id: 'foundation', nameEn: 'Excavation & Foundation', nameHi: 'खुदाई एवं नींव कार्य', icon: 'Hammer' },
  { id: 'rcc', nameEn: 'RCC Structural Frame', nameHi: 'आरसीसी स्ट्रक्चरल ढांचा', icon: 'Building2' },
  { id: 'brickwork', nameEn: 'Brickwork & Plastering', nameHi: 'ईंट चुनाई एवं प्लास्टर', icon: 'Layers' },
  { id: 'flooring', nameEn: 'Flooring & Tiling', nameHi: 'फर्श एवं टाइल्स फिटिंग', icon: 'Grid' },
  { id: 'electrical', nameEn: 'Electrical Conduit & Wiring', nameHi: 'बिजली फिटिंग एवं वायरिंग', icon: 'Zap' },
  { id: 'plumbing', nameEn: 'Plumbing & Sanitary Works', nameHi: 'प्लंबिंग एवं सैनिटरी फिटिंग्स', icon: 'Droplets' },
  { id: 'doorsWindows', nameEn: 'Doors, Windows & Fabrication', nameHi: 'दरवाजे, खिड़कियां एवं फैब्रिकेशन', icon: 'DoorClosed' },
  { id: 'painting', nameEn: 'Putty, Primer & Painting', nameHi: 'पुट्टी, प्राइमर एवं पेंटिंग कार्य', icon: 'Paintbrush' },
  { id: 'kitchenBath', nameEn: 'Kitchen Counter & Bathrooms', nameHi: 'रसोई प्लेटफार्म एवं बाथरूम', icon: 'Utensils' },
  { id: 'miscellaneous', nameEn: 'Waterproofing, Transport & Wastage', nameHi: 'वाटरप्रूफिंग, परिवहन एवं विविध खर्च', icon: 'ShieldAlert' },
];
