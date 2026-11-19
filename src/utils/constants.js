/**
 * Global Constants & Utility Helpers
 */

export const SITE_METADATA = {
  name: "Shree Ram Ashish",
  shortName: "SRA",
  tagline: "35 Years of Experience. A Foundation of Trust.",
  owner: "Sandeep Sharma",
  phone: "+91 9826386803",
  phoneRaw: "+919826386803",
  whatsappNumber: "919826386803",
  city: "Bhopal",
  state: "Madhya Pradesh",
  country: "India",
  primaryColor: "#101214",
  accentColor: "#C6A16A",
  experienceYears: 35,
  completedProjectsCount: 30
};

export const createWhatsAppUrl = (message) => {
  const defaultMsg = "Hello Sandeep ji, I would like to inquire about civil construction services from Shree Ram Ashish.";
  const encoded = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${SITE_METADATA.whatsappNumber}?text=${encoded}`;
};

export const createTelUrl = () => `tel:${SITE_METADATA.phoneRaw}`;

export const scrollToElement = (id) => {
  const el = document.getElementById(id.replace('#', ''));
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

