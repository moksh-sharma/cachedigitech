# CacheDigitech – Complete website sitemap

Base URL (development): `http://localhost:5178`  
Base URL (production): replace with your domain (e.g. `https://www.cachedigitech.com`)

---

## Pages and routes

### Home
| Path | Description |
|------|-------------|
| `/` | Home page |

**Home page sections (in order):**
- Hero
- Cache Solutions
- Who We Are
- Insights
- Partnership
- Partners
- CTA / Subscribe

---

### About Us
| Path | Description |
|------|-------------|
| `/about` | About Cache Digitech (main about page) |
| `/about/profile` | Profile of Cache |
| `/about/awards` | Awards and Accolades |
| `/about/alliances` | Our Alliances |
| `/about/certifications` | Certifications |
| `/about/leadership` | Leadership Team |

**About page (`/about`) anchor sections:**
- `#concept-of-cache` – Concept of Cache (video section)
- `#profile-of-cache` – Profile of Cache
- `#mission-vision` – Mission & Vision
- `#team` – Team
- `#meaning-of-logo` – Meaning of Logo

---

### Products & services
| Path | Description |
|------|-------------|
| `/cloudservices` | Cloud Solutions |
| `/cybersecurity` | Cybersecurity |
| `/infrastructureservice` | Infrastructure Services |
| `/aianddataservice` | AI & Data Services |
| `/manageservices` | Managed Services |
| `/consultingservice` | Consulting & Auditing |
| `/grc-dashboard` | GRC Dashboard |
| `/telecom` | Telecom |

**Alternate service routes (same pages):**
| Path | Serves |
|------|--------|
| `/service/infra` | Infrastructure Services |
| `/service/network` | Networking Services |
| `/service/cloud-solutions` | Cloud Services |

---

### Service page anchor sections (for deep links)

**Infrastructure** (`/infrastructureservice`):  
`#consult`, `#design`, `#build`, `#operate`, `#migrate`

**Networking** (`/service/network` or `/infrastructureservice`):  
`#audit`, `#consult`, `#design`, `#build`, `#operate`

**Managed Services** (`/manageservices`):  
`#audit`, `#manpower`, `#contract`, `#noc-soc`, `#remote-infra`

**Cloud** (`/cloudservices`):  
`#capabilities`, `#approach`, `#infrastructure`

**Cybersecurity** (`/cybersecurity`):  
`#capabilities`, `#specialized`, `#framework`, `#partnership`

**AI & Data** (`/aianddataservice`):  
`#services`, `#partners`, `#faq`

---

### Insights
| Path | Description |
|------|-------------|
| `/insights` | Insights (Leadership Vision, Blogs, Case Studies, etc.) |

**Insights page anchor sections:**
- `#LeadershipVision` – Leadership Vision
- `#blog` – Blogs
- `#success-stories` – Case Studies
- `#problems_and_diagnostics` – Problems & Diagnostics

---

### Contact & company
| Path | Description |
|------|-------------|
| `/contact` | Contact (services contact) |
| `/contactus` | Contact Us |
| `/community` | Community |
| `/developerteam` | Developer Team |
| `/careers` | Careers |

---

### Notifications / campaigns
| Path | Description |
|------|-------------|
| `/campaigns` | Campaigns |
| `/newsletter` | Newsletter |
| `/offers` | Offers |

---

### Legal & policies
| Path | Description |
|------|-------------|
| `/privacy-policy` | Privacy Policy |
| `/terms-of-use` | Terms of Use |
| `/epf-amendment-notice` | EPF Amendment Notice |

---

### Other
| Path | Description |
|------|-------------|
| `*` (any other path) | 404 – Not Found page |

---

## Admin (backend)
| URL | Description |
|-----|-------------|
| `/admin` | Admin portal (login + dashboard) – requires backend running and proxy or same origin |
| `/admin/login` | Admin login page |

---

## XML sitemap for search engines
A `sitemap.xml` is in `frontend/public/sitemap.xml`. It is served at `/sitemap.xml` when you deploy the frontend.

**Before going live:**  
Edit `frontend/public/sitemap.xml` and replace `https://www.cachedigitech.com` with your real domain.

---

*Generated from frontend routes and sections. Update this file when you add or change pages.*
