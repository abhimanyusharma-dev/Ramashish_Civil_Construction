/**
 * Centralized Bilingual Translation System (i18n)
 * English & Hindi Complete Dictionary for House Construction Cost Calculator
 * RAMASHISH Civil Construction
 */

export const translations = {
  en: {
    // ── Header & Navigation ───────────────────────────────
    calculatorTitle: 'House Construction Cost Calculator',
    calculatorSubtitle:
      'Accurate Quantity-Based BOQ Estimation & Real Local Material Rates',
    backToHome: 'Back to Home',
    languageLabel: 'Language',
    printEstimate: 'Print Estimate',
    downloadPdf: 'Download PDF',
    recalculate: 'Recalculate / Edit Inputs',
    verifiedBadge: 'Verified Civil Standard',

    // ── Form ─────────────────────────────────────────────
    configHeader: '1. Project Specifications & Location',
    configSub:
      'Select your construction site location, dimensions, quality tier and building height',
    stateLabel: 'State / Union Territory',
    statePlaceholder: 'Select your state',
    cityLabel: 'City / District',
    cityPlaceholder: 'Select your city',
    locationCardTitle: 'Location',

    areaLabel: 'Built-up Area (Per Floor)',
    areaUnit: 'Sq. Ft.',
    areaHelp:
      'Enter the slab / built-up area for one floor. Total built-up area will be calculated automatically based on total floors.',
    areaPlaceholder: 'e.g. 1000',
    totalAreaCalcLabel: 'Auto-Calculated Total Built-up Area',
    sqftSuffix: 'Sq. Ft.',
    perFloorNote: '/ floor',

    qualityLabel: 'Construction Quality Tier',
    qualityCardTitle: 'Quality Tier',
    qualityHelp:
      'Each tier changes finishing materials, tile grades, windows & fittings while maintaining strict structural IS code safety.',
    recommendedTag: 'Popular',

    basicTitle: 'Basic / Economy',
    basicDesc:
      'Cost-effective construction using economy materials. Suitable for budget residential projects with standard finishes.',
    standardTitle: 'Standard / Mid-Range',
    standardDesc:
      'Balanced quality with vitrified tiles, branded steel and ISI cement – the RAMASHISH recommended tier for most homes.',
    premiumTitle: 'Premium / Luxury',
    premiumDesc:
      'Top-spec materials: granite flooring, premium paint, hardwood doors and German-spec fittings throughout.',

    floorsLabel: 'Number of Floors (Building Height)',
    floorsCardTitle: 'Building Height',
    floorsHelp:
      'Foundation depth and steel reinforcement scale with building height to safely carry cumulative vertical loads.',

    calculateButton: 'Calculate Cost',
    resetButton: 'Reset',
    resetTooltip: 'Clear all inputs and reset section',
    calculating: 'Generating Detailed Structural BOQ...',

    // ── Validation ───────────────────────────────────────
    errorState: 'Please select a state',
    errorCity: 'Please select a city',
    errorArea: 'Please enter a valid built-up area greater than 100 sq.ft',

    // ── Summary Cards ────────────────────────────────────
    summaryHeader: 'Your Detailed BOQ Construction Estimate',
    summarySub:
      'Itemized material quantities, city-specific unit rates, and separate trade-wise labour costs',
    areaCardTitle: 'Built-up Area',
    materialCostTitle: 'Material Cost',
    labourCostTitle: 'Labour Cost',
    grandTotalTitle: 'Grand Total',
    costPerSqFtTitle: 'Cost / Sq. Ft.',

    // ── Chart ─────────────────────────────────────────────
    chartHeader: 'Cost Breakdown Visualization',
    chartSub: 'Hover over segments to inspect detailed cost allocation',
    chartCategoryView: 'By Phase',
    chartRatioView: 'Material vs Labour',
    legendNote: 'Hover segments for details',

    // ── Work Sections Table ───────────────────────────────
    workSectionsHeader: 'Work-Wise BOQ Material Breakdown',
    workSectionsSub:
      '10 construction phases with itemized quantities, unit rates and labour — IS 1200 / CPWD method of measurement',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    workSectionCol: 'Work Section',
    materialCostCol: 'Material Cost',
    labourCostCol: 'Labour Cost',
    totalCostCol: 'Total Cost',
    boqItemCol: 'Item Description',
    boqQtyCol: 'Quantity',
    boqUnitCol: 'Unit',
    boqRateCol: 'Rate',
    boqAmountCol: 'Amount',

    // ── Floor-wise Table ──────────────────────────────────
    floorWiseHeader: 'Floor-Wise Cost Distribution',
    floorWiseSub:
      "Each storey's individual cost share including foundation surcharge and upper-floor lifting charges",
    floorNameCol: 'Floor / Level',
    floorAreaCol: 'Built-up Area',
    floorNotesCol: 'Notes',
    groundFloorNote:
      'Includes deep foundation, plinth beams, and earthwork. Highest cost floor.',
    upperFloorNote:
      'Includes concrete pumping, scaffolding, and vertical material transport.',

    // ── Labour Table ──────────────────────────────────────
    labourTableHeader: 'Trade-Wise Skilled Labour Costs',
    labourTableSub:
      'Itemized wage cost breakdown by trade — masons, bar-benders, carpenters, electricians, plumbers & painters',
    labourTradeCol: 'Trade / Skilled Crew',
    labourScopeCol: 'Work Scope / Basis',
    labourPercentCol: '% of Labour',
    labourAmountCol: 'Amount',

    // ── Rate Transparency ─────────────────────────────────
    rateTransparencyHeader: 'Rate Transparency',
    rateSourceTitle: 'Rate Source & Engineering Standards',
    rateTransparencySub:
      'All material unit rates are sourced from local hardware market surveys and contractor guild pricing. Labour rates are based on verified daily wages for Madhya Pradesh / selected city markets.',
    lastUpdatedTitle: 'Last Survey Date',
    disclaimerHeader: 'Civil Engineering Notice',
    disclaimerText:
      'This estimate is generated using IS:456 and CPWD material consumption standards. Final costs may vary by ±5–8% depending on actual soil conditions, elevation details, steel market fluctuations, and site accessibility. A formal on-site inspection and soil test are recommended before contract finalization.',

    // ── CTA ───────────────────────────────────────────────
    contactCtaTitle: 'Need an Accurate On-Site Estimate?',
    contactCtaSub:
      'Sandeep Sharma visits your plot in person — no obligation site assessment available in Bhopal & surrounding areas.',
    contactCtaBtn: 'Call Now: +91 98273 86803',
    phoneConsultation: 'Free phone consultation. No advance fee.',

    // ── Print ─────────────────────────────────────────────
    dateOfEstimate: 'Date of Estimate',
    is456Compliance: 'IS 456-2000 & CPWD Compliance',
    disclaimerNote:
      'This BOQ estimate is for planning reference only. Actual construction costs may vary based on site conditions, final architectural design, and prevailing local market rates at time of execution.',
    validityPeriod: 'Estimate Validity',
    validityDays: '30 days from date of issue',
    clientAcceptance: 'Client Acceptance',
    authorizedSignature: 'Authorized Signatory',
  },

  // ══════════════════════════════════════════════════════
  hi: {
    // ── Header & Navigation ───────────────────────────────
    calculatorTitle: 'मकान निर्माण लागत कैलकुलेटर',
    calculatorSubtitle:
      'सटीक मात्रा-आधारित बीओक्यू (BOQ) गणना एवं स्थानीय सामग्री व मजदूरी की वास्तविक दरें',
    backToHome: 'मुख्य पृष्ठ पर लौटें',
    languageLabel: 'भाषा',
    printEstimate: 'एस्टिमेट प्रिंट करें',
    downloadPdf: 'पीडीएफ डाउनलोड करें',
    recalculate: 'पुनर्गणना करें / इनपुट बदलें',
    verifiedBadge: 'सत्यापित सिविल इंजीनियरिंग मानक',

    // ── Form ─────────────────────────────────────────────
    configHeader: '1. प्रोजेक्ट विवरण एवं स्थान का चयन',
    configSub:
      'अपने निर्माण स्थल का राज्य, शहर, प्लॉट का आकार, गुणवत्ता एवं मंजिलों की संख्या चुनें',
    stateLabel: 'राज्य / केंद्र शासित प्रदेश',
    statePlaceholder: 'अपना राज्य चुनें',
    cityLabel: 'शहर / जिला',
    cityPlaceholder: 'अपना शहर चुनें',
    locationCardTitle: 'निर्माण स्थल',

    areaLabel: 'निर्मित क्षेत्रफल (प्रति मंजिल)',
    areaUnit: 'वर्ग फीट',
    areaHelp:
      'केवल एक मंजिल का स्लैब क्षेत्रफल भरें। कुल क्षेत्रफल मंजिलों की संख्या से स्वतः गणना होगी।',
    areaPlaceholder: 'जैसे: 1000',
    totalAreaCalcLabel: 'स्वतः गणित कुल निर्मित क्षेत्रफल',
    sqftSuffix: 'वर्ग फीट',
    perFloorNote: '/ मंजिल',

    qualityLabel: 'निर्माण की गुणवत्ता (क्वालिटी टीयर)',
    qualityCardTitle: 'गुणवत्ता स्तर',
    qualityHelp:
      'क्वालिटी बदलने से फिनिशिंग सामग्री, टाइल्स, खिड़की-दरवाजे व फिटिंग्स बदलती हैं, स्ट्रक्चरल मजबूती समान रहती है।',
    recommendedTag: 'लोकप्रिय',

    basicTitle: 'बेसिक / इकॉनमी',
    basicDesc:
      'किफायती निर्माण जिसमें साधारण सामग्री का उपयोग होता है। बजट आवासीय परियोजनाओं के लिए उपयुक्त।',
    standardTitle: 'स्टैंडर्ड / मध्यम श्रेणी',
    standardDesc:
      'विट्रिफाइड टाइल्स, ब्रांडेड स्टील और ISI सीमेंट के साथ संतुलित गुणवत्ता — RAMASHISH की अनुशंसित श्रेणी।',
    premiumTitle: 'प्रीमियम / लक्ज़री',
    premiumDesc:
      'ग्रेनाइट फर्श, प्रीमियम पेंट, हार्डवुड दरवाजे और जर्मन-स्पेक फिटिंग्स सहित उच्चतम श्रेणी।',

    floorsLabel: 'मंजिलों की संख्या (भवन की ऊंचाई)',
    floorsCardTitle: 'भवन की ऊंचाई',
    floorsHelp:
      'मंजिलों के अनुसार नींव की गहराई और सरिए की मात्रा स्वतः बढ़ाई जाती है।',

    calculateButton: 'निर्माण लागत की गणना करें',
    resetButton: 'रीसेट करें',
    resetTooltip: 'सभी प्रविष्टियां हटाएं और रीसेट करें',
    calculating: 'सटीक स्ट्रक्चरल बीओक्यू तैयार हो रहा है...',

    // ── Validation ───────────────────────────────────────
    errorState: 'कृपया अपना राज्य चुनें',
    errorCity: 'कृपया अपना शहर चुनें',
    errorArea: 'कृपया 100 वर्ग फीट से अधिक सही निर्मित क्षेत्रफल दर्ज करें',

    // ── Summary Cards ────────────────────────────────────
    summaryHeader: 'आपका विस्तृत BOQ निर्माण अनुमान',
    summarySub:
      'सामग्री की वास्तविक मात्रा, शहर-अनुसार दरें एवं कार्यवार मजदूरी का पूर्ण विवरण',
    areaCardTitle: 'निर्मित क्षेत्रफल',
    materialCostTitle: 'सामग्री की लागत',
    labourCostTitle: 'मजदूरी की लागत',
    grandTotalTitle: 'कुल निर्माण लागत',
    costPerSqFtTitle: 'लागत प्रति वर्ग फीट',

    // ── Chart ─────────────────────────────────────────────
    chartHeader: 'लागत विश्लेषण चार्ट',
    chartSub: 'विस्तृत लागत जानने हेतु किसी भी खंड पर कर्सर ले जाएं',
    chartCategoryView: 'कार्य चरण अनुसार',
    chartRatioView: 'सामग्री बनाम मजदूरी',
    legendNote: 'खंडों पर कर्सर रखें',

    // ── Work Sections Table ───────────────────────────────
    workSectionsHeader: 'कार्यवार BOQ सामग्री विवरण',
    workSectionsSub:
      '10 निर्माण चरणों में मात्रा, दरें और मजदूरी — IS 1200 / CPWD मापन पद्धति के अनुसार',
    expandAll: 'सभी खोलें',
    collapseAll: 'सभी बंद करें',
    workSectionCol: 'कार्य का नाम',
    materialCostCol: 'सामग्री लागत',
    labourCostCol: 'मजदूरी लागत',
    totalCostCol: 'कुल लागत',
    boqItemCol: 'सामग्री विवरण',
    boqQtyCol: 'मात्रा',
    boqUnitCol: 'इकाई',
    boqRateCol: 'दर',
    boqAmountCol: 'राशि',

    // ── Floor-wise Table ──────────────────────────────────
    floorWiseHeader: 'मंजिलवार लागत वितरण',
    floorWiseSub:
      'प्रत्येक मंजिल की व्यक्तिगत लागत, नींव अधिभार एवं ऊपरी मंजिल ऊर्ध्वाधर परिवहन सहित',
    floorNameCol: 'मंजिल / स्तर',
    floorAreaCol: 'निर्मित क्षेत्रफल',
    floorNotesCol: 'टिप्पणी',
    groundFloorNote: 'गहरी नींव, प्लिंथ बीम एवं खुदाई सहित। सबसे अधिक लागत वाली मंजिल।',
    upperFloorNote: 'कंक्रीट पंपिंग, मचान एवं ऊर्ध्वाधर सामग्री परिवहन सहित।',

    // ── Labour Table ──────────────────────────────────────
    labourTableHeader: 'ट्रेडवार कुशल मजदूरी लागत',
    labourTableSub:
      'मिस्त्री, बारबेंडर, शटरिंग, इलेक्ट्रीशियन, प्लम्बर व पेंटर की व्यापारवार मजदूरी विवरण',
    labourTradeCol: 'ट्रेड / कुशल टीम',
    labourScopeCol: 'कार्य क्षेत्र / आधार',
    labourPercentCol: 'मजदूरी में %',
    labourAmountCol: 'राशि',

    // ── Rate Transparency ─────────────────────────────────
    rateTransparencyHeader: 'दरों की पारदर्शिता',
    rateSourceTitle: 'दर स्रोत एवं इंजीनियरिंग मानक',
    rateTransparencySub:
      'सामग्री की दरें स्थानीय हार्डवेयर बाजार सर्वे एवं कांट्रेक्टर गिल्ड मूल्य पर आधारित हैं। मजदूरी दरें मध्यप्रदेश के सत्यापित दैनिक वेतन पर आधारित हैं।',
    lastUpdatedTitle: 'अंतिम सर्वे तिथि',
    disclaimerHeader: 'सिविल इंजीनियरिंग सूचना',
    disclaimerText:
      'यह अनुमान IS:456 और CPWD मानकों के अनुसार तैयार है। वास्तविक मिट्टी की भार-वहन क्षमता, एलिवेशन डिजाइन, सरिए भाव एवं साइट स्थिति के आधार पर लागत में ±5–8% का अंतर संभव है।',

    // ── CTA ───────────────────────────────────────────────
    contactCtaTitle: 'सटीक साइट एस्टिमेट चाहिए?',
    contactCtaSub:
      'संदीप शर्मा भोपाल एवं आसपास के क्षेत्रों में आपके प्लॉट पर स्वयं जाकर बिना किसी शुल्क के निरीक्षण करते हैं।',
    contactCtaBtn: 'अभी कॉल करें: +91 98273 86803',
    phoneConsultation: 'फोन परामर्श नि:शुल्क। कोई अग्रिम शुल्क नहीं।',

    // ── Print ─────────────────────────────────────────────
    dateOfEstimate: 'एस्टिमेट दिनांक',
    is456Compliance: 'IS 456-2000 एवं CPWD अनुपालन',
    disclaimerNote:
      'यह BOQ अनुमान केवल योजना संदर्भ के लिए है। साइट की स्थिति, अंतिम डिज़ाइन और स्थानीय बाज़ार भाव के अनुसार वास्तविक लागत भिन्न हो सकती है।',
    validityPeriod: 'एस्टिमेट वैधता',
    validityDays: 'जारी तिथि से 30 दिन',
    clientAcceptance: 'ग्राहक की स्वीकृति',
    authorizedSignature: 'अधिकृत हस्ताक्षरकर्ता',
  },
};
