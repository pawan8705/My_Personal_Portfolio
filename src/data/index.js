export const personal = {
  name: "Pawan Tripathi",
  Status: "Available",
  role: "Frontend Developer",
  location: "Uttarakhand, India",
  email: "tripathipawan8705@gmail.com",
  phone: "+91 6396096431",
  bio: "Passionate Frontend Developer crafting pixel-perfect, high-performance web applications. I blend clean code with creative design — turning complex ideas into seamless digital experiences.",
  status: "Open to Opportunities",
}

export const Resume = {
  link: "https://drive.google.com/file/d/1Q5rFXMimNR5cgKz56BMjXDXHqRt9ON6A/view?usp=drivesdk",
}

export const phrases = [
  "Frontend Developer",
  "React.js Specialist",
  "UI/UX Enthusiast",
  "JavaScript Aficionado",
  "AI Tools Explorer",
  "Tailwind CSS Expert",
  "Open Source Contributor",
]

export const socials = [
  { name: "GitHub", icon: "FaGithub", url: "https://github.com/pawan8705", color: "#939393" },
  { name: "LinkedIn", icon: "FaLinkedin", url: "https://www.linkedin.com/in/pawantripathi", color: "#0A66C2" },
  { name: "YouTube", icon: "FaYoutube", url: "https://youtube.com/@tripathidevlab", color: "#FF0000" },
  { name: "Instagram", icon: "FaInstagram", url: "https://www.instagram.com/tripathidevlab", color: "#E1306C" },
  { name: "CodePen", icon: "FaCodepen", url: "https://codepen.io/Pawan-Tripathi-the-lessful", color: "#aaaaaa" },
  { name: "WhatsApp", icon: "FaWhatsapp", url: "https://whatsapp.com/channel/0029Vb7sg2V3bbV4NpadBX1m", color: "#25D366" },
  { name: "FaceBook", icon: "FaFacebook", url: "https://www.facebook.com/profile.php?id=61572586097410", color: "#1877F2" },
]

export const stats = [
  { value: "75+", label: "Projects" },
  { value: "65+", label: "Repositories" },
  { value: "25+", label: "Technologies" },
]

export const skillCategories = [
  {
    cat: "Frontend Core", icon: "💻", color: "#6366f1",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "Responsive Design", "Web APIs"],
  },
  {
    cat: "React Ecosystem", icon: "⚛️", color: "#38bdf8",
    skills: ["React.js", "React Router", "React Hooks", "Context API", "Redux Toolkit", "Zustand", "React Query", "Custom Hooks"],
  },
  {
    cat: "Styling & UI", icon: "🎨", color: "#10d9a0",
    skills: ["Tailwind CSS v4", "Framer Motion", "GSAP", "ShadCN UI", "Material UI", "Bootstrap", "CSS Animations", "Neuromorphic UI"],
  },
  {
    cat: "Tools & Platforms", icon: "🛠️", color: "#f59e0b",
    skills: ["Git", "GitHub", "VS Code", "Vite", "Webpack", "npm", "Vercel", "Netlify"],
  },
  {
    cat: "Backend & Services", icon: "🔥", color: "#f472b6",
    skills: ["Firebase Auth", "Firestore", "REST APIs", "Axios"],
  },
  {
    cat: "AI Dev Tools", icon: "🤖", color: "#a78bfa",
    skills: ["Claude AI", "Lovable.dev", "Emergent", "Replit", "GitHub Copilot", "Cursor AI", "v0 by Vercel", "Bolt.new"],
  },
]

export const projects = [
  {
    id: 1, emoji: "🏥", title: "Personal Portfolio", cat: "Frontend", featured: true,
    desc: "Personal portfolio showcasing projects, skills, and experience using React, responsive UI, modern styling, and smooth interactions.",
    tech: ["JavaScript", "React.js", "Tailwind CSS", "Lucide React", "React Icons"],
    github: "https://github.com/pawan8705/Doctor_Booking_App",
    live: "https://appointment-booking-app-87.vercel.app/",
    color: "#12c600",
  },
  {
    id: 2, emoji: "🏥", title: "Doctor Appointment Booking App", cat: "Frontend", featured: true,
    desc: "Doctor appointment booking with Firebase auth, real-time Firestore, light/dark mode, and fully responsive UI.",
    tech: ["JavaScript", "React.js", "Tailwind CSS", "Firebase", "Firestore", "Lucide Icons"],
    github: "https://github.com/pawan8705/Doctor_Booking_App",
    live: "https://appointment-booking-app-87.vercel.app/",
    color: "#7510ff",
  },
  {
    id: 3, emoji: "🛍️", title: "Nova Shop", cat: "E-Commerce", featured: true,
    desc: "Modern e-commerce frontend with product listings, cart management, filter and sleek responsive design.",
    tech: ["JavaScript", "React.js", "Tailwind CSS", "Context API", "Axios", "Lucide Icons", "Framer Motion", "Slick-carousel", "Clerk"],
    github: "https://github.com/pawan8705/Nova_Shop/",
    live: "https://nova-shop8705.vercel.app/",
    color: "#ffe000",
  },
  {
    id: 4, emoji: "📈", title: "Admin Dashboard", cat: "AI Project", featured: false,
    desc: "Comprehensive analytics dashboard with real-time data viz, KPI tracking and enterprise-grade UI.",
    tech: ["TypeScript", "React.js", "Lovable AI", "Chart.js", "Supabase", "Tailwind CSS", "shadcn-ui", "zod", "Recharts", "Sonner", "Tanstack Query"],
    github: "https://github.com/pawan8705/insight-hub",
    live: "https://dashboard-bypawan8705.lovable.app",
    color: "#ff7800",
  },

  {
    id: 5, emoji: "🎨", title: "Bella Vista Restaurant", cat: "AI Project", featured: false,
    desc: "AI-assisted theme customization with dynamic color palettes, typography previews and real-time generation.",
    tech: ["Vite", "TypeScript", "React.js", "Tanstack Query", "Tailwind CSS", "shadcn-ui", "zod"],
    github: "https://github.com/pawan8705/tasteful-themes-pro",
    live: "https://tasteful-themes-pro.lovable.app/",
    color: "#34d399",
  },
  {
    id: 6, emoji: "💰", title: "Expense Tracker", cat: "AI Project", featured: false,
    desc: "Smart expense tracking with categorized spending, monthly summaries, visual charts and budget alerts.",
    tech: ["TypeScript", "React.js", "Lovable AI", "Firebase", "Zod", "Tailwind CSS", "recharts", "Supabase"],
    github: "https://github.com/pawan8705/expense-tracker-8705",
    live: "https://expense-tracker-8705.lovable.app",
    color: "#ff09ea",
  },
  {
    id: 7, emoji: "👟", title: "Nike Landing Page", cat: "Frontend", featured: false,
    desc: "Pixel-perfect Nike landing page with smooth animations and premium feel showcasing advanced Tailwind.",
    tech: ["JavaScript", "React.js", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
    github: "https://github.com/pawan8705/Nike",
    live: "https://nike-eta-beryl.vercel.app/",
    color: "#f43f5e",
  },
  {
    id: 8, emoji: "📊", title: "Projects Showcase Website", cat: "Frontend", featured: true,
    desc: "Multiple Projects Showcase Website with responsive design and smooth animations.",
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    github: "https://github.com/pawan8705/",
    live: "https://manyprojects.netlify.app/",
    color: "#38bdf8",
  }
]

export const projectCats = ["All", "Frontend", "E-Commerce", "AI Project"]

export const experience = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Tripathi Dev Lab",
    period: "2025 – Present",
    type: "Self-Initiative",
    current: true,
    desc: 'Running "Tripathi Dev Lab" — building full-featured web apps, sharing knowledge on YouTube, growing developer community.',
    tags: ["JavaScript", "TypeScript", "React.js", "GSAP", "Framer Motion", "AI Tools"],
  },
]

export const education = [
  {
    id: 1,
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Maharaja Agrasen Himalayan Garhwal University (MAHGU)",
    loc: "Uttarakhand, India",
    period: "2022 – 2025",
    desc: "Bachelor of Computer Applications with a strong foundation in programming, data structures, web dev, and software engineering.",
    tags: ["Data Structures", "Python", "Web Dev", "OOPs", "Software Engineering"],
    grade: "8.03 CGPA",
  },
  {
    id: 2,
    degree: "Intermediate (12th) — PCM",
    school: "Rana Pratap Inter College (U.K Board)",
    loc: "Uttarakhand, India",
    period: "2021 – 2022",
    desc: "Completed Class 12 (PCM) with a strong foundation in mathematics, logical reasoning, and problem-solving.",
    tags: ["Physics", "Chemistry", "Mathematics"],
    grade: "74%",
  },
  {
    id: 3,
    degree: "High School (10th) — Mathematics",
    school: "Guru Nanak Public School (U.K Board)",
    loc: "Uttarakhand, India",
    period: "2019 – 2020",
    desc: "Completed Class 10 with Mathematics, building a strong base in numerical and logical thinking.",
    tags: ["Mathematics", "Science", "English", "Social Science",],
    grade: "79%",
  },
]

export const certifications = [
  {
    id: 1,
    name: "JavaScript — The Complete Guide",
    platform: "CodeChef",
    year: "2024",
    color: "#f59e0b",
    icon: "🏅",
    URL: "https://www.codechef.com/certificates/public/5292983",
  },
]