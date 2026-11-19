import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  MapPin,
  Send,
  CheckCircle,
  FileText,
  Paperclip,
  UploadCloud,
  X,
  FileUp,
  Image as ImageIcon
} from 'lucide-react';
import { company } from '../../data/company';
import Button from '../ui/Button';

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Residential Construction',
    location: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsappShareUrl, setWhatsappShareUrl] = useState('');

  // File attachment state
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFiles = (newFiles) => {
    setFileError('');
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB per file
    const maxTotalFiles = 5;

    if (attachedFiles.length + newFiles.length > maxTotalFiles) {
      setFileError(`You can attach a maximum of ${maxTotalFiles} files at once.`);
      return;
    }

    const processed = [];
    for (const file of newFiles) {
      if (file.size > maxSizeBytes) {
        setFileError(`"${file.name}" exceeds the 10MB limit.`);
        continue;
      }
      if (attachedFiles.some((f) => f.name === file.name && f.size === file.size)) {
        continue;
      }
      const isImage = file.type.startsWith('image/');
      const previewUrl = isImage ? URL.createObjectURL(file) : null;
      processed.push({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl,
        isImage,
      });
    }

    setAttachedFiles((prev) => [...prev, ...processed]);
  };

  const removeFile = (indexToRemove) => {
    setAttachedFiles((prev) => {
      const fileToRemove = prev[indexToRemove];
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter((_, idx) => idx !== indexToRemove);
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name.';
    }

    const phoneClean = formData.phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(phoneClean) && phoneClean.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.location.trim()) {
      errs.location = 'Please enter project location / city / plot area.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 6) {
      errs.message = 'Please share your key requirements (floors, covered area, or stage).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const filesInfo =
      attachedFiles.length > 0
        ? `\n*Attached Files (${attachedFiles.length}):*\n${attachedFiles
            .map((f, i) => `  ${i + 1}. ${f.name} (${formatFileSize(f.size)})`)
            .join('\n')}\n_(Please attach these files in this WhatsApp chat)_`
        : '';

    const waText = `*Inquiry via RAMASHISH Civil Construction Website*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'N/A'}\n*Project Type:* ${formData.projectType}\n*Location:* ${formData.location}\n*Requirements:* ${formData.message}${filesInfo}`;
    const generatedUrl = `https://wa.me/919827386803?text=${encodeURIComponent(waText)}`;

    setWhatsappShareUrl(generatedUrl);
    setSubmitted(true);
  };

  const resetForm = () => {
    attachedFiles.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    setAttachedFiles([]);
    setFileError('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      projectType: 'Residential Construction',
      location: '',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="py-24 lg:py-32 bg-white/40 relative overflow-hidden border-b border-[#E8E4DA]"
    >
      {/* Background Architectural Photograph with White Fade Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/brand/commercial-construction.png"
          alt=""
          className="w-full h-full object-cover object-right opacity-10 mix-blend-multiply filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
      </div>

      {/* Blueprint grid subtle pattern */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, Business Intro, Phone, Bhopal Location (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] text-[#C99A32] font-bold uppercase mb-3">
                <span className="w-8 h-[2px] bg-[#C99A32]" />
                [ 08 // DIRECT CONSULTATION & ESTIMATES ]
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071B36] leading-[1.08]">
                START YOUR
                <br />
                <span className="text-gold-gradient">FOUNDATION TODAY.</span>
              </h2>
            </div>

            {/* Business Introduction */}
            <p className="text-[#5A6573] text-base leading-relaxed font-sans">
              Connect directly with master civil contractor <strong className="text-[#071B36]">Sandeep Sharma</strong>. We provide practical architectural feasibility guidance, soil study insights, and transparent Bill of Quantities (BOQ) with zero hidden charges.
            </p>

            {/* Contact Information Desk Cards */}
            <div className="space-y-4 pt-2">
              {/* Direct Phone */}
              <div className="p-4 rounded-xl bg-[#F7F7F5] border border-[#E8E4DA] flex items-start gap-4 hover:border-[#C99A32] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#C99A32]/40 flex items-center justify-center text-[#C99A32] shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A6573] block font-bold">
                    DIRECT PHONE CALL (SANDEEP SHARMA)
                  </span>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <a
                      href="tel:+919827386803"
                      className="font-heading text-lg font-black text-[#071B36] hover:text-[#C99A32] transition-colors"
                    >
                      +91 9827386803
                    </a>
                    <span className="text-xs text-[#5A6573]">|</span>
                    <a
                      href="tel:+919826386803"
                      className="font-heading text-base font-bold text-[#071B36] hover:text-[#C99A32] transition-colors"
                    >
                      +91 9826386803
                    </a>
                  </div>
                  <p className="text-xs text-[#5A6573] mt-1 font-mono">
                    Direct on-site calls · Monday to Sunday: 8:00 AM – 8:00 PM
                  </p>
                </div>
              </div>

              {/* Bhopal Location */}
              <div className="p-4 rounded-xl bg-[#F7F7F5] border border-[#E8E4DA] flex items-start gap-4 hover:border-[#C99A32] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#C99A32]/40 flex items-center justify-center text-[#C99A32] shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A6573] block font-bold">
                    LOCATION & REGION
                  </span>
                  <p className="font-heading text-lg font-bold text-[#071B36]">
                    Bhopal, Madhya Pradesh
                  </p>
                  <p className="text-xs text-[#5A6573] mt-0.5">
                    Serving Arera Colony, Kolar Road, MP Nagar, Hoshangabad Rd & Greater MP
                  </p>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="p-4 rounded-xl bg-[#F7F7F5] border border-[#E8E4DA] flex items-start gap-4 hover:border-[#C99A32] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0 shadow-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A6573] block font-bold">
                    INSTANT WHATSAPP CHAT
                  </span>
                  <a
                    href="https://wa.me/919827386803"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-lg font-bold text-[#128C7E] hover:underline block"
                  >
                    Chat Directly on WhatsApp →
                  </a>
                  <p className="text-xs text-[#5A6573] mt-0.5">
                    Share plots, elevation blueprints, or project requirements instantly
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                href="tel:+919827386803"
                icon={Phone}
                iconPosition="left"
                className="bg-[#071B36] text-white hover:bg-[#123B63] border border-[#C99A32]"
              >
                Call Sandeep Sharma
              </Button>

              <Button
                variant="whatsapp"
                size="md"
                href="https://wa.me/919827386803?text=Hello%20Sandeep%20ji%2C%20I%20would%20like%20to%20consult%20regarding%20a%20construction%20project%20in%20Bhopal."
                icon={MessageSquare}
                iconPosition="left"
              >
                WhatsApp Inquiry
              </Button>
            </div>
          </div>

          {/* Right Column: Contact & Quotation Form (7 cols) */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-white rounded-2xl border-2 border-[#C99A32]/50 p-8 sm:p-10 shadow-2xl overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA] mb-6">
                  <div>
                    <h3 className="font-heading text-2xl font-black text-[#071B36]">
                      Get Your Free Quotation & Estimate
                    </h3>
                    <p className="text-xs text-[#5A6573] mt-1 font-sans">
                      Direct response from Sandeep Sharma within 24 hours.
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-[#C99A32] font-bold bg-[#F7F7F5] px-2.5 py-1 rounded border border-[#E8E4DA]">
                    NO OBLIGATION
                  </span>
                </div>

                {submitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#071B36] text-[#E8C46B] flex items-center justify-center mx-auto border-2 border-[#C99A32]">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="font-heading text-2xl font-black text-[#071B36]">
                      Quotation Request Prepared
                    </h4>
                    <p className="text-sm text-[#5A6573] max-w-md mx-auto">
                      Thank you, <strong className="text-[#071B36]">{formData.name}</strong>. Your inquiry has been formatted. Click below to deliver it directly to Sandeep Sharma on WhatsApp for an immediate reply.
                    </p>

                    {attachedFiles.length > 0 && (
                      <div className="bg-[#FAFAF7] border border-[#C99A32]/40 rounded-xl p-3.5 text-left text-xs max-w-md mx-auto">
                        <div className="flex items-center gap-2 font-heading font-bold text-[#071B36] mb-1.5">
                          <Paperclip className="w-4 h-4 text-[#C99A32]" />
                          <span>Attached Files for Review ({attachedFiles.length}):</span>
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-600 font-mono text-[11px]">
                          {attachedFiles.map((f, i) => (
                            <li key={i} className="truncate">
                              {f.name} ({formatFileSize(f.size)})
                            </li>
                          ))}
                        </ul>
                        <p className="text-[11px] text-[#C99A32] font-sans mt-2 pt-2 border-t border-[#E8E4DA]">
                          💬 <strong>Note:</strong> Please send these file(s) in WhatsApp after opening the chat with Sandeep Sharma.
                        </p>
                      </div>
                    )}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Button
                        variant="whatsapp"
                        size="lg"
                        href={whatsappShareUrl}
                        icon={MessageSquare}
                        className="w-full sm:w-auto"
                      >
                        Send on WhatsApp Now
                      </Button>
                      <button
                        onClick={resetForm}
                        className="text-xs font-mono text-[#5A6573] hover:text-[#071B36] underline py-2 cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading uppercase tracking-wider text-[#071B36] font-bold mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Verma"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#071B36] bg-[#F7F7F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99A32] transition-all ${
                            errors.name ? 'border-red-500' : 'border-[#E8E4DA]'
                          }`}
                        />
                        {errors.name && (
                          <span className="text-[11px] text-red-600 mt-1 block">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-heading uppercase tracking-wider text-[#071B36] font-bold mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98273 00000"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#071B36] bg-[#F7F7F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99A32] transition-all ${
                            errors.phone ? 'border-red-500' : 'border-[#E8E4DA]'
                          }`}
                        />
                        {errors.phone && (
                          <span className="text-[11px] text-red-600 mt-1 block">
                            {errors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading uppercase tracking-wider text-[#071B36] font-bold mb-1.5">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className="w-full px-4 py-2.5 rounded-lg border border-[#E8E4DA] text-sm text-[#071B36] bg-[#F7F7F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99A32] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-heading uppercase tracking-wider text-[#071B36] font-bold mb-1.5">
                          Project Location *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Arera Colony, Bhopal"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#071B36] bg-[#F7F7F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99A32] transition-all ${
                            errors.location ? 'border-red-500' : 'border-[#E8E4DA]'
                          }`}
                        />
                        {errors.location && (
                          <span className="text-[11px] text-red-600 mt-1 block">
                            {errors.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading uppercase tracking-wider text-[#071B36] font-bold mb-1.5">
                        Project Nature / Service *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E8E4DA] text-sm text-[#071B36] bg-[#F7F7F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99A32] transition-all"
                      >
                        <option value="Residential Construction">Residential Construction (Villas, Duplexes, Houses)</option>
                        <option value="Commercial Construction">Commercial Construction (Complexes, Showrooms, Offices)</option>
                        <option value="RCC & Civil Works">RCC & Civil Works (Foundations, Framing, Heavy Slabs)</option>
                        <option value="Renovation & Remodeling">Renovation & Remodeling (Structural Retrofits, Facades)</option>
                        <option value="Finishing & Interior Works">Finishing & Interior Works (Plaster, Flooring, Paints)</option>
                        <option value="Waterproofing & Allied Works">Waterproofing & Allied Works (Terrace, Basements, Tanks)</option>
                        <option value="Other Civil Work">Other Civil Work</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-heading uppercase tracking-wider text-[#071B36] font-bold mb-1.5">
                        Project Scope & Requirements *
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please tell us about your plot size, expected number of floors, timeline, or specific construction questions..."
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#071B36] bg-[#F7F7F5]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99A32] transition-all resize-none ${
                          errors.message ? 'border-red-500' : 'border-[#E8E4DA]'
                        }`}
                      />
                      {errors.message && (
                        <span className="text-[11px] text-red-600 mt-1 block">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* File & Image Attachment Section */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-heading uppercase tracking-wider text-[#071B36] font-bold flex items-center gap-1.5">
                          <Paperclip className="w-3.5 h-3.5 text-[#C99A32]" />
                          <span>Attach Plot Layout / Floor Plan / Photos</span>
                        </label>
                        <span className="text-[11px] font-mono text-[#5A6573]">
                          Optional (Max 5 files)
                        </span>
                      </div>

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => {
                          if (e.target.files) {
                            handleFiles(Array.from(e.target.files));
                            e.target.value = '';
                          }
                        }}
                        multiple
                        accept="image/*,.pdf,.doc,.docx,.dwg"
                        className="hidden"
                      />

                      {/* Drag & Drop Area */}
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          if (e.dataTransfer.files) {
                            handleFiles(Array.from(e.dataTransfer.files));
                          }
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left ${
                          isDragging
                            ? 'border-[#C99A32] bg-[#C99A32]/10 scale-[1.01]'
                            : 'border-[#E8E4DA] bg-[#F7F7F5]/50 hover:bg-white hover:border-[#C99A32]/60 shadow-xs'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#071B36]/5 flex items-center justify-center text-[#C99A32] shrink-0 border border-[#C99A32]/30">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-heading font-bold text-[#071B36]">
                            <span className="text-[#C99A32] underline underline-offset-2">Click to browse</span> or drag & drop files here
                          </p>
                          <p className="text-[11px] font-sans text-[#5A6573] mt-0.5">
                            Supports Photos (JPG, PNG), Floor Plans, Drawings (PDF, DWG, DOC) up to 10MB each
                          </p>
                        </div>
                      </div>

                      {fileError && (
                        <p className="text-[11px] text-red-600 mt-1.5 font-medium flex items-center gap-1">
                          <span>⚠</span> {fileError}
                        </p>
                      )}

                      {/* Uploaded Files Preview Cards */}
                      {attachedFiles.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#5A6573]">
                            <span>Attached Files ({attachedFiles.length}/5)</span>
                            <button
                              type="button"
                              onClick={() => {
                                attachedFiles.forEach((f) => f.previewUrl && URL.revokeObjectURL(f.previewUrl));
                                setAttachedFiles([]);
                              }}
                              className="text-red-600 hover:underline cursor-pointer"
                            >
                              Remove all
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {attachedFiles.map((fileObj, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-[#E8E4DA] shadow-xs relative group"
                              >
                                {fileObj.isImage && fileObj.previewUrl ? (
                                  <img
                                    src={fileObj.previewUrl}
                                    alt={fileObj.name}
                                    className="w-10 h-10 object-cover rounded shrink-0 border border-[#E8E4DA]"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded bg-[#071B36]/5 border border-[#E8E4DA] flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5 text-[#C99A32]" />
                                  </div>
                                )}

                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-[#071B36] truncate" title={fileObj.name}>
                                    {fileObj.name}
                                  </p>
                                  <p className="text-[10px] font-mono text-[#5A6573]">
                                    {formatFileSize(fileObj.size)}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(idx);
                                  }}
                                  title="Remove file"
                                  className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-quotation w-full py-3.5 px-6 rounded-lg text-sm font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-[#E8C46B]" />
                        <span>GET YOUR FREE QUOTATION</span>
                        <Send className="w-4 h-4 text-[#E8C46B]" />
                      </button>
                      <p className="text-[11px] text-[#5A6573] text-center font-mono mt-2">
                        Your information is strictly confidential and reviewed personally by Sandeep Sharma.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
