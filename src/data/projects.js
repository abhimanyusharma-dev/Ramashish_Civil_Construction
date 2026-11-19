/**
 * Projects Data
 * RAMASHISH CIVIL CONSTRUCTION — Project Portfolio
 * 
 * Includes Residential, Commercial, RCC & Structural, and Renovation projects
 * with both Completed and Ongoing milestones.
 */

export const projectCategories = [
  "All",
  "Residential Projects",
  "Commercial Projects",
  "RCC & Structural Projects",
  "Renovation Projects"
];

export const projectStatuses = ["All", "Completed", "Ongoing"];

export const projects = [
  {
    id: "proj-1",
    title: "Modern 4BHK Turnkey Duplex Villa",
    category: "Residential Projects",
    status: "Completed",
    location: "Arera Colony, Bhopal, MP",
    year: "2023",
    area: "3,800 sq.ft.",
    scope: "Full Turnkey Construction & RCC Frame",
    description: "Complete turnkey residential villa constructed with high-grade M25 concrete, earthquake-resistant structural framework, premium brick masonry, and modern architectural finishing.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    placeholder: true,
    client: "Private Homeowner"
  },
  {
    id: "proj-2",
    title: "Multi-Storey Commercial Complex",
    category: "Commercial Projects",
    status: "Completed",
    location: "MP Nagar Zone II, Bhopal, MP",
    year: "2022",
    area: "14,500 sq.ft.",
    scope: "RCC Framework, Slabs, Masonry & Facade",
    description: "Heavy commercial construction including basement parking retention, heavy column grid casting, high-traffic commercial floor finishes, and complete exterior plastered elevation.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
    ],
    placeholder: true,
    client: "Commercial Enterprise"
  },
  {
    id: "proj-3",
    title: "Heavy RCC Raft Foundation & Column Framing",
    category: "RCC & Structural Projects",
    status: "Completed",
    location: "Hoshangabad Road, Bhopal, MP",
    year: "2023",
    area: "8,200 sq.ft.",
    scope: "Raft Foundation, Seismic Tie-Beams & Columns",
    description: "High-density concrete execution for deep raft foundation on challenging black cotton soil. Implemented anti-capillary waterproofing and precision steel rebar distribution.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    placeholder: true,
    client: "Institutional Developer"
  },
  {
    id: "proj-4",
    title: "Heritage Villa Structural Retrofitting & Remodeling",
    category: "Renovation Projects",
    status: "Completed",
    location: "Koh-e-Fiza, Bhopal, MP",
    year: "2023",
    area: "4,600 sq.ft.",
    scope: "Load redistribution, steel beam insertions, facade makeover",
    description: "Comprehensive civil renovation: removing non-structural internal walls, adding steel I-beams for wide living room spans, terrace waterproofing screed, and modern architectural facade.",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80"
    ],
    placeholder: true,
    client: "Private Residence"
  },
  {
    id: "proj-5",
    title: "Premium Residential Villa & Boundary Estate",
    category: "Residential Projects",
    status: "Ongoing",
    location: "Gulmohar Colony, Bhopal, MP",
    year: "2026 (In Progress)",
    area: "4,200 sq.ft.",
    scope: "Architectural Civil Construction, RCC Slabs & Elevation",
    description: "Independent luxury bungalow currently under stage-3 construction: second-floor slab casting, AAC block masonry, high-strength lintels, and double-height ceiling shuttering.",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    placeholder: true,
    client: "Private Homeowner"
  },
  {
    id: "proj-6",
    title: "Corporate Retail & Office Plaza",
    category: "Commercial Projects",
    status: "Ongoing",
    location: "Kolar Road, Bhopal, MP",
    year: "2026 (In Progress)",
    area: "9,600 sq.ft.",
    scope: "Commercial Structure, MEP Conduit Civil Prep",
    description: "Three-floor commercial building engineered for wide open spans with minimal interior columns using prestressed post-tensioned beam methodologies.",
    images: [
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    ],
    placeholder: true,
    client: "Retail Plaza Developer"
  },
  {
    id: "proj-7",
    title: "Multi-Storey Slab Casting & Cantilever Balconies",
    category: "RCC & Structural Projects",
    status: "Ongoing",
    location: "Bawadiya Kalan, Bhopal, MP",
    year: "2026 (In Progress)",
    area: "6,500 sq.ft.",
    scope: "Monolithic Slab & Cantilever Balcony Casting",
    description: "Complex structural execution involving cantilever projections, monolithic dog-legged RCC staircases, and 21-day continuous ponding curing management.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
    ],
    placeholder: true,
    client: "Residential Client"
  },
  {
    id: "proj-8",
    title: "Commercial Showroom Remodeling & Structural Strengthening",
    category: "Renovation Projects",
    status: "Ongoing",
    location: "Malviya Nagar, Bhopal, MP",
    year: "2026 (In Progress)",
    area: "5,200 sq.ft.",
    scope: "Structural strengthening, crack epoxy injection, column encasement",
    description: "Reinforcement of 20-year-old RCC columns using micro-concrete jacketing, epoxy injection of floor cracks, and contemporary commercial elevation overhaul.",
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
    ],
    placeholder: true,
    client: "Commercial Enterprise"
  }
];
