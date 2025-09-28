import { useRef, useState } from "react";
import ScrollProgress from "./components/ScrollProgress";
import { motion } from "framer-motion";
import StarBack from "./components/StarBack";
import useSectionObserver from "./useSectionObserver";
import ProjectResumeRow from "./components/ProjectRow";

/* ---------- Reusable layout ---------- */
type SectionProps = { id: string; className?: string; children: React.ReactNode };
const Section: React.FC<SectionProps> = ({ id, className = "", children }) => (
  <section id={id} className={`min-h-screen py-24 md:py-32 ${className}`}>
    <div className="relative z-10 container mx-auto px-6 max-w-6xl">{children}</div>
  </section>
);

/* ---------- Top nav ---------- */
function Nav({ active }: { active: string }) {
  const items = [
    ["Home", "home"],
    ["About", "about"],
    ["Skills", "skills"],
    ["Coursework", "coursework"],
    ["Projects", "projects"],
    ["Contact", "contact"],
  ] as const;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex gap-5 text-sm rounded-full bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/40 px-5 py-2 border border-white/10">
        {items.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`px-3 py-1 rounded-full transition ${
              active === id ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}

/* ---------- Small UI bits ---------- */
/* Darker pill (for starry sections like About/Coursework to increase contrast) */
const DarkPill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-sm md:text-base text-white">
    {children}
  </span>
);

function CopyEmailButton({ email = "contact@grecia.dev" }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } finally {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 1400);
    }
  };

  return (
    <button
      onClick={copy}
      className="relative inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white/90 hover:bg-white/10 transition"
    >
      Copy email
      <span
        aria-live="polite"
        className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-emerald-500/90 px-2 py-1 text-xs text-white shadow transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied!
      </span>
    </button>
  );
}

function QuickMail({ to = "contact@grecia.dev" }) {
  const [subject, setSubject] = useState("Let's build something...");
  const [body, setBody] = useState("Hi Grecia, I'd love to talk about...");

  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body
  )}`;

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
      <h3 className="text-xl font-semibold mb-2">Quick mail</h3>
      <p className="text-white/70 mb-4">Opens your mail app.</p>

      <label className="block text-sm text-white/70 mb-1">Subject</label>
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-sky-500 outline-none px-4 py-3 mb-4"
        placeholder="Let's build something..."
      />

      <label className="block text-sm text-white/70 mb-1">Message</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
        className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-sky-500 outline-none px-4 py-3 mb-5"
        placeholder="Hi Grecia, I'd love to talk about…"
      />

      <a
        href={mailto}
        className="inline-flex items-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 px-5 py-3 transition"
      >
        Open in Mail
      </a>
    </div>
  );
}

/* ---------- App ---------- */
export default function Portfolio() {
  // keep stars on Home + About + Skills (scroll zoom handled inside StarBack)
  const active = useSectionObserver(["home", "about", "skills", "Coursework", "projects", "contact"]);

  return (
    <div className="min-h-screen text-white">
      <ScrollProgress />
      <StarBack visible={active === "home" || active === "about" || active === "skills"} />
      <Nav active={active} />

      {/* HOME */}
      <Section id="home" className="grid place-items-center text-center">
        <div>
          <p className="tracking-widest text-white/60 text-sm mb-3">PORTFOLIO</p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Hello, I'm <span className="text-sky-400">Grecia Ocando</span>.
            <br />
          </h1>
          <p className="mt-6 text-white/70 max-w-2xl mx-auto">
            I build thoughtful, performant web experiences. Scroll to explore my work, coursework,
            and the tools I love.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#projects"
              className="px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition"
            >
              View my work ↓
            </a>
            <a
              href="#contact"
              className="px-5 py-3 rounded-xl bg-sky-600/25 border border-sky-400/40 hover:bg-sky-600/35 transition"
            >
              Contact
            </a>
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="underline underline-offset-8 decoration-4 decoration-sky-400/80">
                About me
              </span>
            </h2>
            <p className="text-lg text-white/85 leading-relaxed">
              I’m a senior <strong>Computer Science student at the University of Florida 🐊 </strong> {'\u00A0'} with 
              a growing passion for <strong>cybersecurity</strong>, <strong>databases</strong>, and modern web development.
              I enjoy building thoughtful interfaces with <strong>React/TypeScript</strong> on the front-end and 
              working with data and backend systems that bring projects to life.
            <br /><br />
              Beyond code, I love reading 📚, working out, and  cuddling my dog 🐶. I’m always looking to 
              learn new technologies, explore fresh ideas ✨, and collaborate on creative projects that blend security, data, and design.
            </p>
          </div>

          {/* Right column card with photo */}
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
            <motion.img
              src="/professional.jpg"
              alt="Grecia Ocando"
              loading="lazy"
              className="
                absolute left-1/2 top-1/2
                h-[82%] w-auto                      /* ↓ smaller than before (try 80–84%) */
                -translate-x-1/2 -translate-y-1/2
                object-contain
                rounded-[22px]                      /* rounded corners on the image */
                "
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            />
          </div>
        </div>
      </Section>

      {/* SKILLS & TOOLS */}
      <Section id="skills" className="pb-8">
        <h2 className="text-5xl font-bold mb-6">
          <span className="underline underline-offset-8 decoration-4 decoration-sky-400/80">
            Skills &amp; Tools
          </span>
        </h2>

        {/* little helper so lanes feel consistent */}
        <style>
          {`
            .lane {
              -webkit-overflow-scrolling: touch;
              scroll-snap-type: x proximity;
            }
            .lane > * {
              scroll-snap-align: start;
            }
            .lane::-webkit-scrollbar { height: 6px; }
            .lane::-webkit-scrollbar-thumb { background: rgba(255,255,255,.15); border-radius: 9999px; }
            .lane::-webkit-scrollbar-track { background: transparent; }
          `}
        </style>

        <div className="space-y-6">
          {/* Languages */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Languages</h3>
            </div>
            <div className="lane flex flex-wrap items-center gap-3 overflow-x-auto">
              <DarkPill>JavaScript / TypeScript</DarkPill>
              <DarkPill>Python</DarkPill>
              <DarkPill>C++</DarkPill>
              <DarkPill>SQL</DarkPill>
              <DarkPill>HTML / CSS</DarkPill>
              <DarkPill>MATLAB</DarkPill>
            </div>
          </div>

          {/* Frontend */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Frontend</h3>
            </div>
            <div className="lane flex flex-wrap items-center gap-3 overflow-x-auto">
              <DarkPill>React</DarkPill>
              <DarkPill>Next.js</DarkPill>
              <DarkPill>TypeScript</DarkPill>
              <DarkPill>Tailwind</DarkPill>
              <DarkPill>CSS</DarkPill>
              <DarkPill>Framer Motion</DarkPill>
            </div>
          </div>

          {/* Backend & Data */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Backend &amp; Data</h3>
            </div>
            <div className="lane flex flex-wrap items-center gap-3 overflow-x-auto">
              <DarkPill>Node.js</DarkPill>
              <DarkPill>Express.js</DarkPill>
              <DarkPill>REST APIs</DarkPill>
              <DarkPill>Auth (JWT/OAuth)</DarkPill>
              <DarkPill>MariaDB</DarkPill>
              <DarkPill>MySQL</DarkPill>
              <DarkPill>MongoDB</DarkPill>
            </div>
          </div>

          {/* Dev Tools & Platforms */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Dev Tools &amp; Platforms</h3>
            </div>
            <div className="lane flex flex-wrap items-center gap-3 overflow-x-auto">
              <DarkPill>VS Code</DarkPill>
              <DarkPill>Visual Studio</DarkPill>
              <DarkPill>PyCharm</DarkPill>
              <DarkPill>IntelliJ</DarkPill>
              <DarkPill>SolidWorks (basic)</DarkPill>
              <DarkPill>Git/GitHub</DarkPill>
              <DarkPill>Docker</DarkPill>
            </div>
          </div>

          {/* Languages Spoken */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Languages Spoken</h3>
            </div>
            <div className="lane flex items-center gap-3 overflow-x-auto">
              <DarkPill>Spanish (native)</DarkPill>
              <DarkPill>English (fluent)</DarkPill>
              <DarkPill>French (intermediate)</DarkPill>
            </div>
          </div>
        </div>
      </Section>

      {/* COURSEWORK (separate section) */}
      <Section id="coursework" className="pt-4">
        <h2 className="text-5xl font-bold mb-6">
          <span className="underline underline-offset-8 decoration-4 decoration-sky-400/80">
            Coursework
          </span>
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><DarkPill>Data Structures &amp; Algorithms (COP3530)</DarkPill></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><DarkPill>Computer Organization (CDA3101)</DarkPill></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><DarkPill>Operating Systems</DarkPill></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><DarkPill>Programming Language Concepts</DarkPill></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><DarkPill>Information and Database &amp; Systems</DarkPill></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><DarkPill>Discrete Structures</DarkPill></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><DarkPill>Software Engineering</DarkPill></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><DarkPill>Cyber-Physical System Security</DarkPill></div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><DarkPill>Intro to Web Dev / Front-End Projects</DarkPill></div>
        </div>
      </Section>


      {/* PROJECTS */}
      <Section id="projects">
        <h2 className="text-5xl font-bold mb-10">
          <span className="underline underline-offset-8 decoration-4 decoration-sky-400/80">
            Projects
          </span>
        </h2>

        <ProjectResumeRow
          title="The Gamer Journal"
          subtitle="MEAN Stack"
          image="/GamerTracker.jpg"
          bullets={[
            "Full-stack journaling platform to reflect on gameplay & support mental well-being.",
            "Express.js + MongoDB backend with sentiment analysis & routed API calls.",
            "JWT for secure authentication & authorization."
          ]}
          stack={["MongoDB","Express","Angular","Node","JWT"]}
          links={[
            { label: "GitHub", href: "https://github.com/itsomort/gamer-tracker" },
          ]}
        />

        <ProjectResumeRow
          reverse
          title="littleC"
          subtitle="C++"
          image="/littleC.png"
          bullets={[
            "C-style interpreter to evaluate tree-based memory models.",
            "Custom lexer + recursive descent parser for tokenization, validation, and execution.",
            "Runtime charts & automated builds/tests with Makefiles."
          ]}
          stack={["C++","Make","Chart.js"]}
          links={[
            { label: "Live Demo", href: "https://www.youtube.com/watch?v=fnTGJZHinwQ&feature=youtu.be" },
            { label: "GitHub", href: "https://github.com/OnStarPrograms/littlec" },
          ]}
        />

        <ProjectResumeRow
          title="Minesweeper Game"
          subtitle="C++"
          image="/Minesweeper.png"
          bullets={[
            "Algorithms to dynamically generate randomized grids & guarantee solvable states.",
            "UI enabling players to flag, uncover tiles, and determine win/loss states based on logic."
          ]}
          stack={["C++"]}
          links={[]}
        />
        
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <h2 className="text-5xl font-bold mb-10">
          <span className="underline underline-offset-8 decoration-4 decoration-sky-400/80">
            Get in touch!
          </span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: links + copy */}
          <div>
            <p className="text-white/80 mb-6">
              Want to collaborate, see more code, or just say hi? My inbox is open.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 hover:bg-white/10 transition"
                href="mailto:gree1819@gmail.com"
              >
                Email
              </a>
              <a
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 hover:bg-white/10 transition"
                href="https://github.com/gocando/gocando"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 hover:bg-white/10 transition"
                href="https://www.linkedin.com/in/grecia-ocando-80493b362"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="rounded-xl border border-sky-400/40 bg-sky-600/25 px-5 py-3 hover:bg-sky-600/35 transition"
                href="/Grecia_Ocando_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
            </div>

            <div className="mt-6">
              <CopyEmailButton email="gree1819@gmail.com" />
            </div>
          </div>

          {/* Right: quick mail box */}
          <QuickMail to="gree1819@gmail.com" />
        </div>
        <footer className="py-10">
          <div className="container mx-auto px-6 max-w-6xl text-center text-sm text-white/60">
             © 2025 Grecia Ocando.
           </div>
        </footer>

      </Section>
    </div>
  );
}
