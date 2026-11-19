# SHREE RAM ASHISH — Civil Contractor Portfolio

> **"35 Years of Experience. A Foundation of Trust."**  
> Civil Construction & Structural Engineering Firm led by **Sandeep Sharma**, Bhopal, Madhya Pradesh, India.

---

## 🏗️ Overview

A modern, cinematic, high-performance web portfolio for **Shree Ram Ashish**, an established civil contractor in Bhopal with 35+ years of practical on-site experience and 30+ completed projects across residential, commercial, and heavy RCC construction.

Built using React, Vite, Tailwind CSS, Framer Motion, GSAP, and Lucide React with international architectural aesthetic standards (#101214 charcoal background, #C6A16A gold accents, Space Grotesk & Inter typography).

---

## ⚡ Technology Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (@tailwindcss/vite) + Custom Blueprint Grid System
- **Animations:** Framer Motion + GSAP
- **Icons:** Lucide React
- **Routing:** React Router DOM (v7)
- **Typography:** Space Grotesk (Headings) + Inter (Body)

---

## 📁 Project Structure

```
shree-ram-ashish/
│
├── public/
│   ├── images/
│   │   ├── owner/          # Sandeep Sharma's authentic photograph
│   │   ├── projects/       # Real completed site photographs
│   │   ├── services/       # Service illustrations
│   │   └── backgrounds/    # Architectural blueprint backgrounds
│   ├── icons/              # SVG icon definitions
│   └── favicon.svg         # Architectural foundation brand favicon
│
├── src/
│   ├── assets/             # Brand logos & graphics
│   │
│   ├── components/
│   │   ├── common/         # Navbar, Footer, Loader, ScrollToTop, SectionHeading
│   │   ├── home/           # Hero, Stats, About, Services, Projects, Founder, Expertise, Process, WhyUs, Testimonials, Contact
│   │   └── ui/             # Button, ProjectCard, ServiceCard, AnimatedText
│   │
│   ├── pages/
│   │   ├── Home.jsx        # Landing page with all sections
│   │   ├── ProjectsPage.jsx# Complete portfolio archive with search & filter
│   │   └── NotFound.jsx    # Custom luxury 404 page
│   │
│   ├── data/
│   │   ├── company.js      # Centralized business data (Phone, Address, Bio, Motto)
│   │   ├── services.js     # 4 Core services & technical deliverables
│   │   ├── projects.js     # Projects list with locations, years, & status
│   │   └── testimonials.js # Client reviews & ratings
│   │
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── utils/
│   │   └── constants.js
│   ├── styles/
│   │   ├── globals.css     # Base theme variables & luxury scrollbar
│   │   ├── animations.css  # Blueprint grid & shimmer animations
│   │   └── responsive.css  # Mobile adaptations
│   │
│   ├── App.jsx             # Router and layout configuration
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html              # Complete SEO & Open Graph meta tags
├── package.json
├── vite.config.js
└── postcss.config.js
```

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📷 How to Add Real Photographs

### 1. Owner Photograph (Sandeep Sharma)
Save your father's photograph to:
```
public/images/owner/sandeep-sharma.jpg
```
*Recommended format: Portrait JPG or PNG (e.g. 1200 x 1600 px).*  
The website will automatically load this photo in the Hero section, About section, and the Founder Leadership spotlight card.

### 2. Completed Project Photographs
1. Save project images into:
   ```
   public/images/projects/
   ```
2. Open `src/data/projects.js` and update the project's `images` array:
   ```js
   {
     id: "proj-1",
     title: "Modern 4BHK Duplex Villa",
     images: [
       "/images/projects/duplex-villa-front.jpg",
       "/images/projects/duplex-villa-rcc.jpg"
     ],
     placeholder: false
   }
   ```
3. Set `placeholder: false` once real photos are added.

### 3. Edit Business Details
To update phone number, location, WhatsApp number, or texts, edit:
```
src/data/company.js
```
All components automatically consume this centralized source of truth.

---

## 📞 Business Information

- **Firm Name:** Shree Ram Ashish
- **Owner:** Sandeep Sharma (Civil Contractor)
- **Experience:** 35 Years (Since 1989)
- **Projects:** 30+ Landmark Structures
- **Location:** Bhopal, Madhya Pradesh, India
- **Phone:** `+91 9826386803`
- **WhatsApp:** `https://wa.me/919826386803`
