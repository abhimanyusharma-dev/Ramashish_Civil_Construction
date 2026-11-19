/**
 * Quantity-Based BOQ House Construction Cost Calculation Engine
 * Compliant with CPWD / IS 456 / IS 1200 Standards
 * RAMASHISH Civil Construction
 */

import {
  BASE_MATERIAL_RATES,
  BASE_LABOUR_RATES,
  QUALITY_TIERS,
  CITIES_BY_STATE,
} from '../data/calculatorData.js';

/**
 * Main Calculation Function
 * Returns an uncompromised, quantity-based Bill of Quantities (BOQ),
 * floor-wise distribution, trade-wise labour costs, and summary metrics.
 */
export function calculateConstructionCost({
  builtUpAreaPerFloor = 1000,
  numberOfFloors = 1,
  constructionType = 'standard',
  stateId = 'MP',
  cityId = 'bhopal',
}) {
  const areaPerFloor = Math.max(100, Number(builtUpAreaPerFloor) || 1000);
  const floors = Math.max(1, Math.min(6, Number(numberOfFloors) || 1));
  const totalBuiltUpArea = areaPerFloor * floors;

  const qualityConfig = QUALITY_TIERS[constructionType] || QUALITY_TIERS.standard;

  // Resolve state & city index multipliers
  const stateCities = CITIES_BY_STATE[stateId] || CITIES_BY_STATE.MP;
  const cityData = stateCities.find((c) => c.id === cityId) || stateCities[0];

  const matMultiplier = (cityData.materialIndex || 1.0) * qualityConfig.multiplier;
  const labMultiplier = cityData.labourIndex || 1.0;

  // Adjusted unit rates
  const rates = {
    cement: BASE_MATERIAL_RATES.cementPerBag * (cityData.materialIndex || 1.0),
    steel: BASE_MATERIAL_RATES.steelPerKg * (cityData.materialIndex || 1.0),
    sand: BASE_MATERIAL_RATES.riverSandPerCuFt * (cityData.materialIndex || 1.0),
    aggregate: BASE_MATERIAL_RATES.crushedAggregatePerCuFt * (cityData.materialIndex || 1.0),
    rubble: BASE_MATERIAL_RATES.rubbleStonePerCuFt * (cityData.materialIndex || 1.0),
    brick: BASE_MATERIAL_RATES.redBrickPerPiece * (cityData.materialIndex || 1.0),
    tiles: (constructionType === 'premium'
      ? BASE_MATERIAL_RATES.vitrifiedTilesPremiumPerSqFt
      : constructionType === 'standard'
      ? BASE_MATERIAL_RATES.vitrifiedTilesStandardPerSqFt
      : BASE_MATERIAL_RATES.vitrifiedTilesBasicPerSqFt) * (cityData.materialIndex || 1.0),
    paint: (constructionType === 'premium'
      ? BASE_MATERIAL_RATES.interiorPaintPremiumPerLitre
      : constructionType === 'standard'
      ? BASE_MATERIAL_RATES.interiorPaintStandardPerLitre
      : BASE_MATERIAL_RATES.interiorPaintBasicPerLitre) * (cityData.materialIndex || 1.0),
    putty: BASE_MATERIAL_RATES.wallPuttyPerBag * (cityData.materialIndex || 1.0),
    granite: BASE_MATERIAL_RATES.graniteKitchenPerSqFt * matMultiplier,
  };

  // Adjust labour daily wages
  const wages = {
    mason: BASE_LABOUR_RATES.skilledMasonDaily * labMultiplier,
    barBender: BASE_LABOUR_RATES.barBenderDaily * labMultiplier,
    carpenter: BASE_LABOUR_RATES.carpenterShutteringDaily * labMultiplier,
    painter: BASE_LABOUR_RATES.painterDaily * labMultiplier,
    plumber: BASE_LABOUR_RATES.plumberDaily * labMultiplier,
    electrician: BASE_LABOUR_RATES.electricianDaily * labMultiplier,
    helper: BASE_LABOUR_RATES.unskilledHelperDaily * labMultiplier,
  };

  // -------------------------------------------------------------
  // 1. EXCAVATION & FOUNDATION (CALCULATED ONCE FOR THE ENTIRE BUILDING)
  // Sizing scales with the number of floors (foundation load increases)
  // -------------------------------------------------------------
  const footingCount = Math.max(6, Math.round(areaPerFloor / 130)); // 1 column per 130 sq.ft
  const footingDepth = 4.5 + (floors - 1) * 0.45; // Depth from 4.5ft to 6.75ft
  const excavationVolCuFt = Math.round(footingCount * 5.5 * 5.5 * footingDepth);
  
  // PCC 1:4:8 bed under footings
  const pccConcreteCuFt = Math.round(footingCount * 5.5 * 5.5 * 0.4); // 4" thick PCC
  const pccCementBags = Math.round(pccConcreteCuFt * 0.16);
  const pccSandCuFt = Math.round(pccConcreteCuFt * 0.48);
  const pccAggregateCuFt = Math.round(pccConcreteCuFt * 0.95);

  // RCC Footing & Plinth Beam Concrete (M20/M25 design mix)
  // Foundation concrete volume scales with floors to handle cumulative loads
  const footingConcreteCuFt = Math.round(footingCount * (18 + floors * 4));
  const footingCementBags = Math.round(footingConcreteCuFt * 0.23);
  const footingSteelKg = Math.round(footingCount * (42 + floors * 18));
  const footingSandCuFt = Math.round(footingConcreteCuFt * 0.42);
  const footingAggregateCuFt = Math.round(footingConcreteCuFt * 0.84);
  const rubbleSolingCuFt = Math.round(areaPerFloor * 0.45); // 5" rubble soling bed

  const foundationCementTotal = pccCementBags + footingCementBags;
  const foundationSandTotal = pccSandCuFt + footingSandCuFt;
  const foundationAggTotal = pccAggregateCuFt + footingAggregateCuFt;

  const foundationMatCost = Math.round(
    foundationCementTotal * rates.cement +
    footingSteelKg * rates.steel +
    foundationSandTotal * rates.sand +
    foundationAggTotal * rates.aggregate +
    rubbleSolingCuFt * rates.rubble
  );

  // Excavation & Foundation Labour
  const excavationLabour = Math.round(excavationVolCuFt * 7.5 * labMultiplier); // Earthwork digging & disposal
  const foundationMasonLabour = Math.round(footingCount * 2.2 * wages.mason);
  const foundationSteelLabour = Math.round((footingSteelKg * 7.0) * labMultiplier);
  const foundationLabourCost = Math.round(excavationLabour + foundationMasonLabour + foundationSteelLabour);

  // -------------------------------------------------------------
  // 2. RCC SUPERSTRUCTURE (PER FLOOR ACCUMULATOR)
  // Columns, Plinth/Floor Beams, 130mm Slab, Staircase
  // -------------------------------------------------------------
  // Concrete volume per floor = ~2.05 cu.ft per sq.ft built-up area
  const rccConcretePerFloorCuFt = areaPerFloor * 2.05;
  const rccCementPerFloorBags = Math.round(rccConcretePerFloorCuFt * 0.23); // ~8 bags / cu.m
  const rccSandPerFloorCuFt = Math.round(rccConcretePerFloorCuFt * 0.43);
  const rccAggPerFloorCuFt = Math.round(rccConcretePerFloorCuFt * 0.86);
  // Steel rebar per floor: 3.8kg / sq.ft for standard residential framing
  const rccSteelPerFloorKg = Math.round(areaPerFloor * 3.85 * (1 + (floors > 2 ? 0.06 : 0)));
  const bindingWirePerFloorKg = Math.round(rccSteelPerFloorKg * 0.012);

  const rccMatCostPerFloor = Math.round(
    rccCementPerFloorBags * rates.cement +
    rccSteelPerFloorKg * rates.steel +
    rccSandPerFloorCuFt * rates.sand +
    rccAggPerFloorCuFt * rates.aggregate +
    bindingWirePerFloorKg * 95
  );

  // RCC Labour: Barbending, Shuttering/Formwork, Concrete casting gang
  const rccLabourPerFloor = Math.round(
    (rccSteelPerFloorKg * 8.5 + areaPerFloor * 38) * labMultiplier
  );

  // -------------------------------------------------------------
  // 3. BRICKWORK & PLASTERING (PER FLOOR ACCUMULATOR)
  // 9" outer wall + 4.5" partition walls, deducting 18% openings
  // -------------------------------------------------------------
  const bricksPerFloor = Math.round(areaPerFloor * 9.2); // First class bricks
  const brickworkCementPerFloorBags = Math.round(areaPerFloor * 0.14);
  const brickworkSandPerFloorCuFt = Math.round(areaPerFloor * 0.62);

  // Plastering: Internal 12mm 1:6 + External 18mm 1:4 with waterproofing
  const plasterCementPerFloorBags = Math.round(areaPerFloor * 0.13);
  const plasterSandPerFloorCuFt = Math.round(areaPerFloor * 0.58);

  const brickworkPlasterCementBags = brickworkCementPerFloorBags + plasterCementPerFloorBags;
  const brickworkPlasterSandCuFt = brickworkSandPerFloorCuFt + plasterSandPerFloorCuFt;

  const brickworkPlasterMatCostPerFloor = Math.round(
    bricksPerFloor * rates.brick +
    brickworkPlasterCementBags * rates.cement +
    brickworkPlasterSandCuFt * rates.sand
  );

  // Mason & Helper Labour for Masonry & Plaster
  const brickworkPlasterLabourPerFloor = Math.round(areaPerFloor * 46 * labMultiplier);

  // -------------------------------------------------------------
  // 4. FLOORING & TILES (PER FLOOR ACCUMULATOR)
  // Carpet area ~82% of floor + 5% tile cutting wastage
  // -------------------------------------------------------------
  const tilesAreaPerFloorSqFt = Math.round(areaPerFloor * 0.82 * 1.05);
  const tileAdhesivePerFloorBags = Math.round(tilesAreaPerFloorSqFt / 55); // 20kg bags
  const tileBedCementPerFloorBags = Math.round(tilesAreaPerFloorSqFt * 0.08);

  const flooringMatCostPerFloor = Math.round(
    tilesAreaPerFloorSqFt * rates.tiles +
    tileAdhesivePerFloorBags * BASE_MATERIAL_RATES.tileAdhesivePerBag +
    tileBedCementPerFloorBags * rates.cement
  );

  const flooringLabourPerFloor = Math.round(tilesAreaPerFloorSqFt * 28 * labMultiplier);

  // -------------------------------------------------------------
  // 5. ELECTRICAL WORK (PER FLOOR ACCUMULATOR)
  // Conduits, FRLS copper wires, Modular switches, MCB DB
  // -------------------------------------------------------------
  const electricalPointsPerFloor = Math.round(areaPerFloor / 18);
  const wireCoilsPerFloor = Math.max(3, Math.round(areaPerFloor / 280));
  const conduitPipesLengthRmt = Math.round(areaPerFloor * 1.25);

  const electricalMatCostPerFloor = Math.round(
    (electricalPointsPerFloor * 650 + wireCoilsPerFloor * 1800 + conduitPipesLengthRmt * 45 + 3500) *
    (constructionType === 'premium' ? 1.45 : constructionType === 'standard' ? 1.15 : 0.9) *
    (cityData.materialIndex || 1.0)
  );

  const electricalLabourPerFloor = Math.round(
    (electricalPointsPerFloor * 160 + 1500) * labMultiplier
  );

  // -------------------------------------------------------------
  // 6. PLUMBING & SANITARY (PER FLOOR ACCUMULATOR)
  // CPVC water lines, SWR drainage, EWC, Washbasins, CP fittings
  // -------------------------------------------------------------
  const bathroomsCountPerFloor = Math.max(1, Math.round(areaPerFloor / 550));
  const plumbingMatCostPerFloor = Math.round(
    bathroomsCountPerFloor *
    (constructionType === 'premium' ? 42000 : constructionType === 'standard' ? 26000 : 16500) *
    (cityData.materialIndex || 1.0)
  );

  const plumbingLabourPerFloor = Math.round(
    bathroomsCountPerFloor * 5500 * labMultiplier
  );

  // -------------------------------------------------------------
  // 7. DOORS & WINDOWS (PER FLOOR ACCUMULATOR)
  // Main door, flush internal doors, UPVC/Aluminium windows
  // -------------------------------------------------------------
  const doorsCountPerFloor = Math.max(3, Math.round(areaPerFloor / 240));
  const windowsCountPerFloor = Math.max(4, Math.round(areaPerFloor / 220));

  const doorsWindowsMatCostPerFloor = Math.round(
    (doorsCountPerFloor * (constructionType === 'premium' ? 14500 : constructionType === 'standard' ? 9500 : 6200) +
     windowsCountPerFloor * (constructionType === 'premium' ? 9800 : constructionType === 'standard' ? 6400 : 4200)) *
    (cityData.materialIndex || 1.0)
  );

  const doorsWindowsLabourPerFloor = Math.round(
    (doorsCountPerFloor * 1200 + windowsCountPerFloor * 650) * labMultiplier
  );

  // -------------------------------------------------------------
  // 8. PAINTING (PER FLOOR ACCUMULATOR)
  // Putty 2 coats + Primer 1 coat + 2 coats interior & exterior paint
  // -------------------------------------------------------------
  const paintableAreaPerFloor = Math.round(areaPerFloor * 3.1);
  const puttyBagsPerFloor = Math.round(paintableAreaPerFloor / 380); // 40kg bags
  const primerLitresPerFloor = Math.round(paintableAreaPerFloor / 110);
  const paintLitresPerFloor = Math.round(paintableAreaPerFloor / 65);

  const paintingMatCostPerFloor = Math.round(
    puttyBagsPerFloor * rates.putty +
    primerLitresPerFloor * BASE_MATERIAL_RATES.primerPerLitre +
    paintLitresPerFloor * rates.paint
  );

  const paintingLabourPerFloor = Math.round(paintableAreaPerFloor * 14.5 * labMultiplier);

  // -------------------------------------------------------------
  // 9. KITCHEN & BATHROOM ACCESSORIES (PER FLOOR ACCUMULATOR)
  // Granite counter, SS sink, dado wall tiles, faucets
  // -------------------------------------------------------------
  const kitchenGraniteSqFt = 45;
  const kitchenMatCostPerFloor = Math.round(
    (kitchenGraniteSqFt * rates.granite +
     bathroomsCountPerFloor * (constructionType === 'premium' ? 16000 : 9500) +
     5500) *
    (cityData.materialIndex || 1.0)
  );

  const kitchenLabourPerFloor = Math.round(
    (kitchenGraniteSqFt * 45 + bathroomsCountPerFloor * 3000) * labMultiplier
  );

  // -------------------------------------------------------------
  // 10. MISCELLANEOUS (WATERPROOFING, TRANSPORT, WASTAGE)
  // -------------------------------------------------------------
  // Terrace waterproofing applied once for the top floor; sunken slab for each floor
  const terraceWaterproofingMat = Math.round(areaPerFloor * 38 * (cityData.materialIndex || 1.0));
  const sunkenWaterproofingPerFloorMat = Math.round(bathroomsCountPerFloor * 2800 * (cityData.materialIndex || 1.0));
  const totalWaterproofingMat = terraceWaterproofingMat + sunkenWaterproofingPerFloorMat * floors;

  // Material handling, transport, 3.5% safe construction contingency
  const subtotalMaterial =
    foundationMatCost +
    (rccMatCostPerFloor +
      brickworkPlasterMatCostPerFloor +
      flooringMatCostPerFloor +
      electricalMatCostPerFloor +
      plumbingMatCostPerFloor +
      doorsWindowsMatCostPerFloor +
      paintingMatCostPerFloor +
      kitchenMatCostPerFloor) * floors +
    totalWaterproofingMat;

  const transportWastageMat = Math.round(subtotalMaterial * 0.038);
  const miscellaneousMatCost = totalWaterproofingMat + transportWastageMat;

  const terraceWaterproofingLabour = Math.round(areaPerFloor * 12 * labMultiplier);
  const miscellaneousLabourCost = Math.round(
    (terraceWaterproofingLabour + floors * 4500) * labMultiplier
  );

  // -------------------------------------------------------------
  // COMPILE WORK-WISE MATERIAL DETAILS (10 SECTIONS)
  // -------------------------------------------------------------
  const workSections = [
    {
      id: 'foundation',
      nameEn: 'Excavation & Foundation',
      nameHi: 'खुदाई एवं नींव कार्य',
      descriptionEn: 'Footing excavation, PCC bed, M20/M25 isolated/raft footings, steel reinforcement & rubble soling.',
      descriptionHi: 'नींव खुदाई, पीसीसी 1:4:8 बेड, आरसीसी फुटिंग, सरिया जाल एवं पत्थर सोलिंग।',
      isOnce: true,
      materials: [
        { nameEn: 'Excavation Earthwork', nameHi: 'नींव मिट्टी खुदाई', qty: excavationVolCuFt, unit: 'cu.ft', unitHi: 'घन फीट' },
        { nameEn: 'Cement (OPC/PPC)', nameHi: 'सीमेंट (फुटिंग एवं पीसीसी)', qty: foundationCementTotal, unit: 'Bags', unitHi: 'बोरी' },
        { nameEn: 'TMT Rebar (Fe-550D)', nameHi: 'टीएमटी सरिया', qty: footingSteelKg, unit: 'Kg', unitHi: 'कि.ग्रा.' },
        { nameEn: 'Clean River Sand', nameHi: 'नदी का रेत', qty: foundationSandTotal, unit: 'cu.ft', unitHi: 'घन फीट' },
        { nameEn: 'Crushed Aggregate (10/20mm)', nameHi: 'गिट्टी (10/20 मि.मी.)', qty: foundationAggTotal, unit: 'cu.ft', unitHi: 'घन फीट' },
        { nameEn: 'Basalt Rubble Soling', nameHi: 'पत्थर सोलिंग', qty: rubbleSolingCuFt, unit: 'cu.ft', unitHi: 'घन फीट' },
      ],
      materialCost: foundationMatCost,
      labourCost: foundationLabourCost,
      totalCost: foundationMatCost + foundationLabourCost,
    },
    {
      id: 'rcc',
      nameEn: 'RCC Structural Frame',
      nameHi: 'आरसीसी स्ट्रक्चरल ढांचा',
      descriptionEn: 'Columns, Plinth & Roof Beams, 130mm Suspended Slabs, Staircase & Shuttering.',
      descriptionHi: 'कॉलम (पिलर), बीम, छत की 130मिमी ढलाई, सीढ़ियां एवं शटरिंग।',
      isOnce: false,
      materials: [
        { nameEn: 'Cement for RCC (M20/M25)', nameHi: 'सीमेंट आरसीसी ढलाई हेतु', qty: rccCementPerFloorBags * floors, unit: 'Bags', unitHi: 'बोरी' },
        { nameEn: 'TMT Steel Rebar (Fe-550D)', nameHi: 'टीएमटी सरिया (कॉलम, बीम, छत)', qty: rccSteelPerFloorKg * floors, unit: 'Kg', unitHi: 'कि.ग्रा.' },
        { nameEn: 'Coarse Sand for Concrete', nameHi: 'मोटा रेत (कंक्रीट)', qty: rccSandPerFloorCuFt * floors, unit: 'cu.ft', unitHi: 'घन फीट' },
        { nameEn: 'Machine Crushed Aggregate (20mm)', nameHi: 'क्रशर गिट्टी (20मि.मी.)', qty: rccAggPerFloorCuFt * floors, unit: 'cu.ft', unitHi: 'घन फीट' },
        { nameEn: 'Binding Wire (18 Gauge)', nameHi: 'बांधने का तार', qty: bindingWirePerFloorKg * floors, unit: 'Kg', unitHi: 'कि.ग्रा.' },
      ],
      materialCost: rccMatCostPerFloor * floors,
      labourCost: rccLabourPerFloor * floors,
      totalCost: (rccMatCostPerFloor + rccLabourPerFloor) * floors,
    },
    {
      id: 'brickwork',
      nameEn: 'Brickwork & Plastering',
      nameHi: 'ईंट चुनाई एवं प्लास्टर',
      descriptionEn: '9-inch exterior and 4.5-inch interior walls, 12mm internal plaster & 18mm external waterproof plaster.',
      descriptionHi: '9 इंच बाहरी दीवारें, 4.5 इंच पार्टीशन दीवारें, 12मिमी भीतरी व 18मिमी बाहरी प्लास्टर।',
      isOnce: false,
      materials: [
        { nameEn: 'First-Class Red Clay Bricks', nameHi: 'अव्वल लाल ईंटें', qty: bricksPerFloor * floors, unit: 'Pcs', unitHi: 'नग' },
        { nameEn: 'Cement for Masonry & Plaster', nameHi: 'सीमेंट (चुनाई व प्लास्टर)', qty: brickworkPlasterCementBags * floors, unit: 'Bags', unitHi: 'बोरी' },
        { nameEn: 'Washed Plaster Sand', nameHi: 'छना हुआ रेत (प्लास्टर)', qty: brickworkPlasterSandCuFt * floors, unit: 'cu.ft', unitHi: 'घन फीट' },
      ],
      materialCost: brickworkPlasterMatCostPerFloor * floors,
      labourCost: brickworkPlasterLabourPerFloor * floors,
      totalCost: (brickworkPlasterMatCostPerFloor + brickworkPlasterLabourPerFloor) * floors,
    },
    {
      id: 'flooring',
      nameEn: 'Flooring & Tiling',
      nameHi: 'फर्श एवं टाइल्स फिटिंग',
      descriptionEn: 'Vitrified tiles across living, bedrooms & anti-skid bathroom tiles with tile adhesive & grout.',
      descriptionHi: 'हॉल, कमरों में विट्रीफाइड टाइल्स एवं बाथरूम में एंटी-स्किड टाइल्स व ग्राउट।',
      isOnce: false,
      materials: [
        { nameEn: 'Vitrified Tiles (Living & Rooms)', nameHi: 'विट्रीफाइड फ्लोर टाइल्स', qty: tilesAreaPerFloorSqFt * floors, unit: 'sq.ft', unitHi: 'वर्ग फीट' },
        { nameEn: 'Polymer Tile Adhesive', nameHi: 'पॉलिमर टाइल एडहेसिव', qty: tileAdhesivePerFloorBags * floors, unit: 'Bags', unitHi: 'बोरी' },
        { nameEn: 'Cement for Tile Base Bedding', nameHi: 'सीमेंट (टाइल बेस)', qty: tileBedCementPerFloorBags * floors, unit: 'Bags', unitHi: 'बोरी' },
      ],
      materialCost: flooringMatCostPerFloor * floors,
      labourCost: flooringLabourPerFloor * floors,
      totalCost: (flooringMatCostPerFloor + flooringLabourPerFloor) * floors,
    },
    {
      id: 'electrical',
      nameEn: 'Electrical Conduit & Wiring',
      nameHi: 'बिजली फिटिंग एवं वायरिंग',
      descriptionEn: 'Concealed heavy PVC conduits, FRLS copper wires, modular switchboards, MCBs & Earthing.',
      descriptionHi: 'कंसील्ड पीवीसी पाइप, एफआरएलएस कॉपर वायर, मॉड्यूलर स्विच बोर्ड एवं एमसीबी अर्थिंग।',
      isOnce: false,
      materials: [
        { nameEn: 'FRLS Copper Wire (1.5/2.5/4 sq.mm)', nameHi: 'कॉपर वायर कॉइल्स', qty: wireCoilsPerFloor * floors, unit: 'Coils', unitHi: 'कॉइल' },
        { nameEn: 'PVC Heavy Duty Conduits & Boxes', nameHi: 'पीवीसी पाइप एवं जंक्शन बॉक्स', qty: conduitPipesLengthRmt * floors, unit: 'Rmt', unitHi: 'मीटर' },
        { nameEn: 'Modular Switches, Plates & Sockets', nameHi: 'मॉड्यूलर स्विच एवं प्लेट्स', qty: electricalPointsPerFloor * floors, unit: 'Points', unitHi: 'पॉइंट' },
      ],
      materialCost: electricalMatCostPerFloor * floors,
      labourCost: electricalLabourPerFloor * floors,
      totalCost: (electricalMatCostPerFloor + electricalLabourPerFloor) * floors,
    },
    {
      id: 'plumbing',
      nameEn: 'Plumbing & Sanitary Works',
      nameHi: 'प्लंबिंग एवं सैनिटरी फिटिंग्स',
      descriptionEn: 'SDR-11 CPVC hot/cold piping, SWR drainage lines, Western Commode (EWC), Washbasin & brass fittings.',
      descriptionHi: 'सीपीवीसी गर्म/ठंडा पाइप, एसडब्ल्यूआर ड्रेनेज, कमोड, वॉशबेसिन व ब्रास फिटिंग्स।',
      isOnce: false,
      materials: [
        { nameEn: 'CPVC & SWR Pipes with Fittings', nameHi: 'सीपीवीसी एवं ड्रेनेज पाइप्स', qty: Math.round(areaPerFloor * 0.45 * floors), unit: 'Rmt', unitHi: 'मीटर' },
        { nameEn: 'Sanitary Fixtures (EWC & Basin Sets)', nameHi: 'सैनिटरी वेयर (कमोड व बेसिन)', qty: bathroomsCountPerFloor * floors, unit: 'Sets', unitHi: 'सेट' },
        { nameEn: 'CP Brass Faucets, Diverters & Showers', nameHi: 'ब्रास नल, मिक्सर व शावर', qty: bathroomsCountPerFloor * 4 * floors, unit: 'Pcs', unitHi: 'नग' },
      ],
      materialCost: plumbingMatCostPerFloor * floors,
      labourCost: plumbingLabourPerFloor * floors,
      totalCost: (plumbingMatCostPerFloor + plumbingLabourPerFloor) * floors,
    },
    {
      id: 'doorsWindows',
      nameEn: 'Doors, Windows & Fabrication',
      nameHi: 'दरवाजे, खिड़कियां एवं फैब्रिकेशन',
      descriptionEn: 'Main entrance teak/veneer door, laminated flush internal doors, powder-coated UPVC/Aluminium windows.',
      descriptionHi: 'मुख्य सागवान/विनीयर दरवाजा, लैमिनेटेड फ्लश दरवाजे, यूपीवीसी/एल्युमिनियम खिड़कियां।',
      isOnce: false,
      materials: [
        { nameEn: 'Main Entrance & Internal Doors', nameHi: 'मुख्य व भीतरी दरवाजे (चौखट सहित)', qty: doorsCountPerFloor * floors, unit: 'Units', unitHi: 'दरवाजे' },
        { nameEn: 'UPVC / Aluminium Sliding Windows with Mesh', nameHi: 'यूपीवीसी/एल्युमिनियम खिड़कियां', qty: windowsCountPerFloor * floors, unit: 'Units', unitHi: 'खिड़की' },
        { nameEn: 'Architectural Hardware, Locks & Handles', nameHi: 'हार्डवेयर, लॉक एवं कब्जे', qty: (doorsCountPerFloor + windowsCountPerFloor) * floors, unit: 'Sets', unitHi: 'सेट' },
      ],
      materialCost: doorsWindowsMatCostPerFloor * floors,
      labourCost: doorsWindowsLabourPerFloor * floors,
      totalCost: (doorsWindowsMatCostPerFloor + doorsWindowsLabourPerFloor) * floors,
    },
    {
      id: 'painting',
      nameEn: 'Putty, Primer & Painting',
      nameHi: 'पुट्टी, प्राइमर एवं पेंटिंग कार्य',
      descriptionEn: '2 coats white cement acrylic putty, 1 coat primer, 2 coats interior washable emulsion & exterior weatherproof paint.',
      descriptionHi: '2 कोट सफेद पुट्टी, 1 कोट प्राइमर, भीतरी इमल्शन व बाहरी वेदरप्रूफ पेंट।',
      isOnce: false,
      materials: [
        { nameEn: 'White Cement Acrylic Putty', nameHi: 'सफेद सीमेंट वॉल पुट्टी', qty: puttyBagsPerFloor * floors, unit: 'Bags (40kg)', unitHi: 'बोरी (40किग्रा)' },
        { nameEn: 'Water-Thinnable Primer', nameHi: 'वॉल प्राइमर', qty: primerLitresPerFloor * floors, unit: 'Litres', unitHi: 'लीटर' },
        { nameEn: 'Interior & Exterior Premium Paint', nameHi: 'इंटीरियर व एक्सटीरियर पेंट', qty: paintLitresPerFloor * floors, unit: 'Litres', unitHi: 'लीटर' },
      ],
      materialCost: paintingMatCostPerFloor * floors,
      labourCost: paintingLabourPerFloor * floors,
      totalCost: (paintingMatCostPerFloor + paintingLabourPerFloor) * floors,
    },
    {
      id: 'kitchenBath',
      nameEn: 'Kitchen Counter & Bathrooms',
      nameHi: 'रसोई प्लेटफार्म एवं बाथरूम',
      descriptionEn: '20mm mirror polished jet black granite counter, 304 SS sink, 2ft glazed tiles dado, bathroom wall tiles.',
      descriptionHi: '20मिमी ब्लैक ग्रेनाइट प्लेटफार्म, एसएस सिंक, 2 फीट डिजाइनर टाइल्स एवं बाथरूम वॉल टाइल्स।',
      isOnce: false,
      materials: [
        { nameEn: '20mm Polished Granite Slab', nameHi: '20मिमी पॉलिश ब्लैक ग्रेनाइट', qty: kitchenGraniteSqFt * floors, unit: 'sq.ft', unitHi: 'वर्ग फीट' },
        { nameEn: '304 Stainless Steel Kitchen Sink', nameHi: 'एसएस किचन सिंक', qty: floors, unit: 'Pcs', unitHi: 'नग' },
        { nameEn: 'Glazed Ceramic Wall Dado Tiles', nameHi: 'किचन व बाथरूम वॉल टाइल्स', qty: (kitchenGraniteSqFt * 2 + bathroomsCountPerFloor * 120) * floors, unit: 'sq.ft', unitHi: 'वर्ग फीट' },
      ],
      materialCost: kitchenMatCostPerFloor * floors,
      labourCost: kitchenLabourPerFloor * floors,
      totalCost: (kitchenMatCostPerFloor + kitchenLabourPerFloor) * floors,
    },
    {
      id: 'miscellaneous',
      nameEn: 'Waterproofing, Transport & Wastage',
      nameHi: 'वाटरप्रूफिंग, परिवहन एवं विविध खर्च',
      descriptionEn: 'Terrace & sunken slab elastomeric chemical waterproofing, material freight, handling & 3.5% site wastage.',
      descriptionHi: 'छत व बाथरूम केमिकल वाटरप्रूफिंग, सामग्री लोडिंग/अनलोडिंग, परिवहन एवं 3.5% वेस्टेज।',
      isOnce: true,
      materials: [
        { nameEn: 'Polymer Waterproofing Chemical', nameHi: 'केमिकल वाटरप्रूफिंग कंपाउंड', qty: Math.round(areaPerFloor * 0.12 * floors), unit: 'Litres', unitHi: 'लीटर' },
        { nameEn: 'Freight, Logistics & Loading/Unloading', nameHi: 'परिवहन व साइट हैंडलिंग', qty: 1, unit: 'Job', unitHi: 'कार्य' },
        { nameEn: 'Site Material Wastage Allowance (3.5%)', nameHi: 'सामग्री वेस्टेज अलाउंस', qty: 1, unit: 'LumpSum', unitHi: 'एकमुश्त' },
      ],
      materialCost: miscellaneousMatCost,
      labourCost: miscellaneousLabourCost,
      totalCost: miscellaneousMatCost + miscellaneousLabourCost,
    },
  ];

  // -------------------------------------------------------------
  // FLOOR-WISE COST DISTRIBUTION
  // -------------------------------------------------------------
  const floorWiseBreakdown = [];
  const floorNames = [
    { en: 'Ground Floor', hi: 'ग्राउंड फ्लोर' },
    { en: 'First Floor (1st)', hi: 'प्रथम मंजिल (1st)' },
    { en: 'Second Floor (2nd)', hi: 'द्वितीय मंजिल (2nd)' },
    { en: 'Third Floor (3rd)', hi: 'तृतीय मंजिल (3rd)' },
    { en: 'Fourth Floor (4th)', hi: 'चौथी मंजिल (4th)' },
    { en: 'Fifth Floor (5th)', hi: 'पांचवीं मंजिल (5th)' },
  ];

  for (let i = 0; i < floors; i++) {
    const isGround = i === 0;
    const isTop = i === floors - 1;

    // Material for this floor
    const floorMat =
      (isGround ? foundationMatCost : 0) +
      rccMatCostPerFloor +
      brickworkPlasterMatCostPerFloor +
      flooringMatCostPerFloor +
      electricalMatCostPerFloor +
      plumbingMatCostPerFloor +
      doorsWindowsMatCostPerFloor +
      paintingMatCostPerFloor +
      kitchenMatCostPerFloor +
      (isTop ? terraceWaterproofingMat : 0) +
      sunkenWaterproofingPerFloorMat +
      Math.round(transportWastageMat / floors);

    // Labour for this floor
    const floorLab =
      (isGround ? foundationLabourCost : 0) +
      rccLabourPerFloor +
      brickworkPlasterLabourPerFloor +
      flooringLabourPerFloor +
      electricalLabourPerFloor +
      plumbingLabourPerFloor +
      doorsWindowsLabourPerFloor +
      paintingLabourPerFloor +
      kitchenLabourPerFloor +
      (isTop ? terraceWaterproofingLabour : 0) +
      Math.round(4500 * labMultiplier);

    floorWiseBreakdown.push({
      floorNumber: i + 1,
      floorNameEn: floorNames[i].en,
      floorNameHi: floorNames[i].hi,
      areaSqFt: areaPerFloor,
      materialCost: floorMat,
      labourCost: floorLab,
      totalCost: floorMat + floorLab,
      includesFoundation: isGround,
      includesTerrace: isTop,
    });
  }

  // -------------------------------------------------------------
  // TRADE-WISE LABOUR BREAKDOWN TABLE
  // -------------------------------------------------------------
  const labourByTrade = [
    {
      tradeEn: 'Excavation & Earthwork Gang',
      tradeHi: 'नींव खुदाई एवं मिट्टी भराई गैंग',
      amount: excavationLabour,
      unitEn: 'Volume & Depth Sized',
      unitHi: 'गहराई व आयतन अनुसार',
    },
    {
      tradeEn: 'Masons (Brickwork, Plaster & PCC)',
      tradeHi: 'मिस्त्री (ईंट चुनाई, प्लास्टर व पीसीसी)',
      amount: Math.round(foundationMasonLabour + brickworkPlasterLabourPerFloor * floors),
      unitEn: 'Wall & Plaster Area Sized',
      unitHi: 'दीवार एवं प्लास्टर क्षेत्र अनुसार',
    },
    {
      tradeEn: 'Bar-Benders (Steel Cutting & Binding)',
      tradeHi: 'बार-बेंडर (सरिया कटाई व जाल बंधाई)',
      amount: Math.round(foundationSteelLabour + (rccSteelPerFloorKg * 8.5 * floors) * labMultiplier),
      unitEn: 'IS:456 Weight Sized',
      unitHi: 'वजन अनुसार (आईएस 456)',
    },
    {
      tradeEn: 'Carpenters (Shuttering & Centering)',
      tradeHi: 'कारपेंटर (शटरिंग, सेंट्रिंग व फर्मा)',
      amount: Math.round((areaPerFloor * 38 * floors) * labMultiplier),
      unitEn: 'Formwork Area Sized',
      unitHi: 'शटरिंग क्षेत्रफल अनुसार',
    },
    {
      tradeEn: 'Tile Laying & Flooring Gang',
      tradeHi: 'टाइल फिटिंग व फर्श कारीगर',
      amount: flooringLabourPerFloor * floors,
      unitEn: 'Tile Area Laid',
      unitHi: 'टाइल लगाने का क्षेत्रफल',
    },
    {
      tradeEn: 'Licensed Electricians & Wiremen',
      tradeHi: 'इलेक्ट्रीशियन एवं वायरिंग टीम',
      amount: electricalLabourPerFloor * floors,
      unitEn: 'Conduit Points Completed',
      unitHi: 'कंसील्ड पॉइंट अनुसार',
    },
    {
      tradeEn: 'Plumbers & Sanitary Mechanics',
      tradeHi: 'प्लम्बर व सैनिटरी कारीगर',
      amount: plumbingLabourPerFloor * floors,
      unitEn: 'Bathrooms & Pipeline Lines',
      unitHi: 'बाथरूम एवं पाइपलाइन अनुसार',
    },
    {
      tradeEn: 'Painters (Putty, Primer & Finish)',
      tradeHi: 'पेंटर (पुट्टी, प्राइमर व पेंट)',
      amount: paintingLabourPerFloor * floors,
      unitEn: '3-Coat Surface Area',
      unitHi: '3-कोट सतह क्षेत्रफल',
    },
    {
      tradeEn: 'Finishing, Waterproofing & Helpers',
      tradeHi: 'वाटरप्रूफिंग, फिनिशिंग व साइट हेल्पर',
      amount: Math.round(kitchenLabourPerFloor * floors + miscellaneousLabourCost),
      unitEn: 'Curing & Supervision Shifts',
      unitHi: 'तराई एवं फिनिशिंग कार्य',
    },
  ];

  // -------------------------------------------------------------
  // TOTALS & GRAND SUMMARIES
  // -------------------------------------------------------------
  const totalMaterialCost = workSections.reduce((sum, sec) => sum + sec.materialCost, 0);
  const totalLabourCost = workSections.reduce((sum, sec) => sum + sec.labourCost, 0);
  const grandTotalCost = totalMaterialCost + totalLabourCost;
  const costPerSqFt = Math.round(grandTotalCost / totalBuiltUpArea);

  const materialCostPercent = Math.round((totalMaterialCost / grandTotalCost) * 100);
  const labourCostPercent = 100 - materialCostPercent;

  // Pie chart categories (mathematically consistent, no double counting)
  const chartData = [
    {
      id: 'foundation',
      nameEn: 'Foundation & Earthwork',
      nameHi: 'नींव एवं खुदाई',
      amount: foundationMatCost + foundationLabourCost,
      color: '#B8860B', // Dark golden rod
    },
    {
      id: 'rcc',
      nameEn: 'RCC Superstructure Frame',
      nameHi: 'आरसीसी स्ट्रक्चरल फ्रेम',
      amount: (rccMatCostPerFloor + rccLabourPerFloor) * floors,
      color: '#0B1B35', // Primary navy
    },
    {
      id: 'masonry',
      nameEn: 'Brickwork & Plastering',
      nameHi: 'ईंट चुनाई एवं प्लास्टर',
      amount: (brickworkPlasterMatCostPerFloor + brickworkPlasterLabourPerFloor) * floors,
      color: '#C69A45', // Metallic gold
    },
    {
      id: 'finishing',
      nameEn: 'Flooring, Tiles & Paint',
      nameHi: 'फर्श, टाइल्स व पेंटिंग',
      amount: (flooringMatCostPerFloor + flooringLabourPerFloor + paintingMatCostPerFloor + paintingLabourPerFloor) * floors,
      color: '#123B63', // Royal navy
    },
    {
      id: 'mep',
      nameEn: 'Electrical, Plumbing & Doors',
      nameHi: 'बिजली, प्लंबिंग व दरवाजे',
      amount: (electricalMatCostPerFloor + electricalLabourPerFloor +
               plumbingMatCostPerFloor + plumbingLabourPerFloor +
               doorsWindowsMatCostPerFloor + doorsWindowsLabourPerFloor +
               kitchenMatCostPerFloor + kitchenLabourPerFloor) * floors,
      color: '#E8C46B', // Light champagne
    },
    {
      id: 'misc',
      nameEn: 'Waterproofing & Contingency',
      nameHi: 'वाटरप्रूफिंग व विविध',
      amount: miscellaneousMatCost + miscellaneousLabourCost,
      color: '#5A6573', // Steel grey
    },
  ];

  return {
    inputs: {
      builtUpAreaPerFloor: areaPerFloor,
      numberOfFloors: floors,
      totalBuiltUpArea,
      constructionType,
      qualityConfig,
      stateId,
      cityId,
      cityData,
    },
    metrics: {
      totalMaterialCost,
      totalLabourCost,
      grandTotalCost,
      costPerSqFt,
      materialCostPercent,
      labourCostPercent,
    },
    workSections,
    floorWiseBreakdown,
    labourByTrade,
    chartData,
    rates,
    wages,
    metadata: {
      rateSourceEn: `${cityData.nameEn} Local Hardware Market & Builders Guild Survey (Q1 2026)`,
      rateSourceHi: `${cityData.nameHi} स्थानीय हार्डवेयर मार्केट एवं बिल्डर्स सर्वे (2026 प्रथम तिमाही)`,
      lastUpdated: '12-Feb-2026',
      isVerified: cityData.isVerified,
      statusLabelEn: cityData.isVerified ? 'Verified Local Rates' : 'Indicative Regional Rates',
      statusLabelHi: cityData.isVerified ? 'सत्यापित स्थानीय दरें' : 'सांकेतिक क्षेत्रीय दरें',
    },
  };
}
