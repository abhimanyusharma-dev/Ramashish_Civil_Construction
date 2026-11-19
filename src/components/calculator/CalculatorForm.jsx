import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Building,
  Layers,
  Sparkles,
  CheckCircle2,
  Calculator,
  ShieldCheck,
  Info,
  HelpCircle,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import {
  INDIAN_STATES,
  CITIES_BY_STATE,
  QUALITY_TIERS,
  FLOOR_OPTIONS,
} from '../../data/calculatorData.js';
import { translations } from '../../data/translations.js';

export default function CalculatorForm({
  lang = 'en',
  initialValues = {
    stateId: 'MP',
    cityId: 'bhopal',
    builtUpAreaPerFloor: 1000,
    constructionType: 'standard',
    numberOfFloors: 1,
  },
  onCalculate,
  onReset,
  isCalculating = false,
}) {
  const t = translations[lang] || translations.en;

  const [stateId, setStateId] = useState(initialValues.stateId || 'MP');
  const [cityId, setCityId] = useState(initialValues.cityId || 'bhopal');
  const [areaPerFloor, setAreaPerFloor] = useState(
    initialValues.builtUpAreaPerFloor !== undefined && initialValues.builtUpAreaPerFloor !== null
      ? initialValues.builtUpAreaPerFloor
      : 1000
  );
  const [quality, setQuality] = useState(initialValues.constructionType || 'standard');
  const [floors, setFloors] = useState(initialValues.numberOfFloors || 1);
  const [error, setError] = useState('');

  // Sync internal state when initialValues change from outside (e.g. parent reset)
  useEffect(() => {
    setStateId(initialValues.stateId || 'MP');
    setCityId(initialValues.cityId || 'bhopal');
    setAreaPerFloor(
      initialValues.builtUpAreaPerFloor !== undefined && initialValues.builtUpAreaPerFloor !== null
        ? initialValues.builtUpAreaPerFloor
        : ''
    );
    setQuality(initialValues.constructionType || 'standard');
    setFloors(initialValues.numberOfFloors || 1);
    setError('');
  }, [initialValues]);

  // Handle explicit form reset
  const handleReset = (e) => {
    if (e) e.preventDefault();
    setStateId('MP');
    setCityId('bhopal');
    setAreaPerFloor('');
    setQuality('standard');
    setFloors(1);
    setError('');
    if (onReset) {
      onReset();
    }
  };

  // Update cities list when state changes
  const availableCities = CITIES_BY_STATE[stateId] || CITIES_BY_STATE.MP;

  // Ensure selected city belongs to the selected state
  useEffect(() => {
    if (!availableCities.some((c) => c.id === cityId)) {
      setCityId(availableCities[0]?.id || 'bhopal');
    }
  }, [stateId, availableCities, cityId]);

  const selectedCity = availableCities.find((c) => c.id === cityId) || availableCities[0];
  const totalBuiltUpArea = (Number(areaPerFloor) || 0) * Number(floors);

  const handleSubmit = (e) => {
    e.preventDefault();
    const numArea = Number(areaPerFloor);
    if (!numArea || numArea <= 0) {
      setError(t.errorArea || 'Please enter a valid built-up area greater than 0.');
      return;
    }
    if (numArea < 100) {
      setError(lang === 'hi' ? 'कृपया न्यूनतम 100 वर्ग फुट क्षेत्रफल दर्ज करें।' : 'Minimum built-up area per floor is 100 sq.ft.');
      return;
    }
    setError('');

    onCalculate({
      stateId,
      cityId,
      builtUpAreaPerFloor: numArea,
      constructionType: quality,
      numberOfFloors: Number(floors),
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#0B1B35]/20 shadow-xl overflow-hidden">
      {/* Form Header Banner — dark green */}
      <div className="bg-gradient-to-r from-[#0A2E1A] via-[#09412B] to-[#061F12] px-6 py-6 sm:px-8 sm:py-7 border-b border-[#4C2A6B]/40">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#A78BFA] animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest font-mono text-[#A78BFA] font-semibold">
                IS 456 / IS 1200 STANDARDS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white tracking-wide">
              {t.configHeader}
            </h2>
            <p className="text-sm text-slate-300 font-sans mt-1">
              {t.configSub}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Header Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-400/40 hover:border-red-400 text-red-200 hover:text-white text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title={t.resetTooltip}
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>{t.resetButton}</span>
            </button>

            <div className="flex items-center gap-2 bg-[#FAFAF7]/10 backdrop-blur-sm border border-[#4C2A6B]/50 rounded-xl px-3.5 py-2 shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#A78BFA]" />
              <div className="text-xs">
                <span className="block text-white font-semibold">
                  {selectedCity?.isVerified ? t.verifiedBadge : (lang === 'hi' ? 'सांकेतिक दरें' : 'Indicative Index')}
                </span>
                <span className="block text-[#E8D8B8] text-[11px]">
                  {selectedCity?.[lang === 'hi' ? 'nameHi' : 'nameEn']} ({selectedCity?.stateCode})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        {/* ROW 1: Geographic Location (State & City) */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#0B1B35] font-bold mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C69A45]" />
            <span>{t.locationCardTitle}</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* State Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 font-sans">
                {t.stateLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#D8D2C2] rounded-xl text-sm font-sans font-medium text-[#0B1B35] focus:outline-none focus:ring-2 focus:ring-[#C69A45] focus:border-transparent transition-all"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st.id} value={st.id}>
                      {lang === 'hi' ? st.nameHi : st.nameEn} ({st.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 font-sans flex items-center justify-between">
                <span>{t.cityLabel} <span className="text-red-500">*</span></span>
                {selectedCity?.isVerified && (
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-medium">
                    ✓ {lang === 'hi' ? 'सत्यापित मार्केट' : 'Live Survey'}
                  </span>
                )}
              </label>
              <div className="relative">
                <select
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#D8D2C2] rounded-xl text-sm font-sans font-medium text-[#0B1B35] focus:outline-none focus:ring-2 focus:ring-[#C69A45] focus:border-transparent transition-all"
                >
                  {availableCities.map((ct) => (
                    <option key={ct.id} value={ct.id}>
                      {lang === 'hi' ? ct.nameHi : ct.nameEn} {ct.isVerified ? '★' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Rate status subnote */}
          <p className="text-[11px] font-sans text-slate-500 mt-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#C69A45] shrink-0" />
            <span>
              {lang === 'hi'
                ? `वर्तमान चयनित स्थान: ${selectedCity?.nameHi} (सामग्री सूचकांक: ${selectedCity?.materialIndex}x, श्रम दर सूचकांक: ${selectedCity?.labourIndex}x)`
                : `Current Market Context: ${selectedCity?.nameEn} (Material Index: ${selectedCity?.materialIndex}x, Labour Index: ${selectedCity?.labourIndex}x)`}
            </span>
          </p>
        </div>

        {/* ROW 2: Built-up Area & Floors */}
        <div className="pt-2 border-t border-[#E8E4DA]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Area Per Floor */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#0B1B35] font-bold mb-2 flex items-center gap-2">
                <Building className="w-4 h-4 text-[#C69A45]" />
                <span>{t.areaLabel}</span> <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="100"
                  max="50000"
                  step="10"
                  value={areaPerFloor}
                  onChange={(e) => {
                    setAreaPerFloor(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full px-4 py-3 pr-20 bg-[#FAFAF7] border rounded-xl text-base font-sans font-bold text-[#0B1B35] focus:outline-none focus:ring-2 focus:ring-[#C69A45] transition-all ${
                    error ? 'border-red-400 bg-red-50/30' : 'border-[#D8D2C2]'
                  }`}
                  placeholder="e.g. 1000"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-500 bg-white/80 px-2 py-1 rounded border border-[#E8E4DA]">
                  {t.areaUnit}
                </span>
              </div>

              {error ? (
                <p className="text-xs text-red-600 mt-1.5 font-medium">{error}</p>
              ) : (
                <p className="text-xs text-slate-500 mt-1.5 font-sans">
                  {t.areaHelp}
                </p>
              )}
            </div>

            {/* Floors Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#0B1B35] font-bold mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C69A45]" />
                <span>{t.floorsLabel}</span> <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  value={floors}
                  onChange={(e) => setFloors(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#D8D2C2] rounded-xl text-sm font-sans font-bold text-[#0B1B35] focus:outline-none focus:ring-2 focus:ring-[#C69A45] focus:border-transparent transition-all"
                >
                  {FLOOR_OPTIONS.map((fl) => (
                    <option key={fl.floors} value={fl.floors}>
                      {lang === 'hi' ? fl.labelHi : fl.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-xs text-slate-500 mt-1.5 font-sans">
                {t.floorsHelp}
              </p>
            </div>
          </div>

          {/* Dynamic Total Area Live Bar */}
          <div className="mt-4 bg-[#FAFAF7] border border-[#E8E4DA] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C69A45]"></span>
              <span className="text-xs font-heading font-medium text-[#172033]">
                {t.totalAreaCalcLabel}:
              </span>
              <span className="text-xs font-mono text-slate-500">
                ({areaPerFloor || 0} sq.ft × {floors} {lang === 'hi' ? 'तल' : 'floors'})
              </span>
            </div>
            <div className="text-sm font-mono font-bold text-[#0B1B35] bg-white px-3 py-1 rounded-lg border border-[#D8D2C2] shadow-xs">
              {totalBuiltUpArea.toLocaleString('en-IN')} {t.sqftSuffix}
            </div>
          </div>
        </div>

        {/* ROW 3: Construction Quality Tier (Radio Selection Cards) */}
        <div className="pt-2 border-t border-[#E8E4DA]">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-mono uppercase tracking-wider text-[#0B1B35] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C69A45]" />
              <span>{t.qualityLabel}</span> <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] font-sans text-slate-500 hidden sm:inline">
              {lang === 'hi' ? 'सामग्री एवं फिनिशिंग स्तर चुनें' : 'Select specification & finishing tier'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* BASIC TIER */}
            <label
              className={`relative flex flex-col justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                quality === 'basic'
                  ? 'border-[#0B1B35] bg-[#0B1B35]/5 shadow-md'
                  : 'border-[#E8E4DA] bg-[#FAFAF7] hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <input
                      type="radio"
                      name="constructionType"
                      value="basic"
                      checked={quality === 'basic'}
                      onChange={() => setQuality('basic')}
                      className="sr-only"
                    />
                    <h3 className="text-base font-heading font-bold text-[#0B1B35]">
                      {t.basicTitle}
                    </h3>
                    <span className="inline-block text-[11px] font-mono text-slate-500 mt-0.5">
                      {QUALITY_TIERS.basic.tagline}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      quality === 'basic'
                        ? 'border-[#0B1B35] bg-[#0B1B35]'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {quality === 'basic' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                  {t.basicDesc}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-[#E8E4DA]">
                  {(lang === 'hi' ? QUALITY_TIERS.basic.specsHi : QUALITY_TIERS.basic.specsEn).map(
                    (spec, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E8E4DA] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Indicative Range</span>
                <span className="font-mono font-bold text-[#0B1B35]">
                  ₹{QUALITY_TIERS.basic.costPerSqFtEst}/sq.ft
                </span>
              </div>
            </label>

            {/* STANDARD TIER (RECOMMENDED) */}
            <label
              className={`relative flex flex-col justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                quality === 'standard'
                  ? 'border-[#C69A45] bg-[#C69A45]/10 shadow-lg ring-1 ring-[#C69A45]'
                  : 'border-[#E8E4DA] bg-[#FAFAF7] hover:border-[#C69A45]/50'
              }`}
            >
              {/* Popular Badge */}
              <div className="absolute -top-3 right-5 bg-[#C69A45] text-white text-[10px] font-heading font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                {t.recommendedTag}
              </div>

              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <input
                      type="radio"
                      name="constructionType"
                      value="standard"
                      checked={quality === 'standard'}
                      onChange={() => setQuality('standard')}
                      className="sr-only"
                    />
                    <h3 className="text-base font-heading font-bold text-[#0B1B35]">
                      {t.standardTitle}
                    </h3>
                    <span className="inline-block text-[11px] font-mono text-[#C69A45] font-semibold mt-0.5">
                      {QUALITY_TIERS.standard.tagline}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      quality === 'standard'
                        ? 'border-[#C69A45] bg-[#C69A45]'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {quality === 'standard' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                  {t.standardDesc}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-[#C69A45]/20">
                  {(lang === 'hi' ? QUALITY_TIERS.standard.specsHi : QUALITY_TIERS.standard.specsEn).map(
                    (spec, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C69A45] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#C69A45]/20 flex items-center justify-between text-xs">
                <span className="text-[#0B1B35] font-medium">RAMASHISH Benchmark</span>
                <span className="font-mono font-bold text-[#C69A45]">
                  ₹{QUALITY_TIERS.standard.costPerSqFtEst}/sq.ft
                </span>
              </div>
            </label>

            {/* PREMIUM TIER */}
            <label
              className={`relative flex flex-col justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                quality === 'premium'
                  ? 'border-[#0B1B35] bg-[#0B1B35]/5 shadow-md'
                  : 'border-[#E8E4DA] bg-[#FAFAF7] hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <input
                      type="radio"
                      name="constructionType"
                      value="premium"
                      checked={quality === 'premium'}
                      onChange={() => setQuality('premium')}
                      className="sr-only"
                    />
                    <h3 className="text-base font-heading font-bold text-[#0B1B35]">
                      {t.premiumTitle}
                    </h3>
                    <span className="inline-block text-[11px] font-mono text-slate-500 mt-0.5">
                      {QUALITY_TIERS.premium.tagline}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      quality === 'premium'
                        ? 'border-[#0B1B35] bg-[#0B1B35]'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {quality === 'premium' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                  {t.premiumDesc}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-[#E8E4DA]">
                  {(lang === 'hi' ? QUALITY_TIERS.premium.specsHi : QUALITY_TIERS.premium.specsEn).map(
                    (spec, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B1B35] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E8E4DA] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Luxury Spec</span>
                <span className="font-mono font-bold text-[#0B1B35]">
                  ₹{QUALITY_TIERS.premium.costPerSqFtEst}/sq.ft
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit & Reset Action Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-sans flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#C69A45]" />
            <span>
              {lang === 'hi'
                ? 'मात्रा-आधारित BOQ गणना तुरंत तैयार की जाएगी।'
                : 'Instant BOQ with IS 456 quantities, trade-wise labour and floor breakdown.'}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-4 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-red-200 hover:border-red-300 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              title={t.resetTooltip}
            >
              <RotateCcw className="w-4 h-4 text-red-500" />
              <span>{t.resetButton}</span>
            </button>

            <button
              type="submit"
              disabled={isCalculating}
              className="w-full sm:w-auto px-8 py-4 bg-[#09412B] hover:bg-[#0A2E1A] text-white rounded-xl font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-[#09412B]/30 hover:shadow-xl hover:shadow-[#0A2E1A]/40 hover:scale-[1.01] active:scale-[0.99] transition-all border border-[#4C2A6B]/40 cursor-pointer"
            >
              <Calculator className="w-5 h-5 text-[#A78BFA]" />
              <span>{isCalculating ? (lang === 'hi' ? 'गणना हो रही है...' : 'Calculating...') : t.calculateButton}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
