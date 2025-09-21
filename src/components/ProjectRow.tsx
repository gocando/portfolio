import React from "react";

type Link = { label: string; href: string };
type ProjectResumeRowProps = {
  title: string;              // e.g. "The Gamer Journal"
  subtitle?: string;          // e.g. "MEAN Stack"
  bullets: string[];          // your resume-style lines
  stack?: string[];           // ["React","Node","MongoDB","JWT"]
  links: Link[];              // [{label:"GitHub", href:"..."}, {label:"Live", href:"..."}]
  image?: string;             // optional screenshot path in /public or /src/assets
  reverse?: boolean;          // flip media/text
};

const DarkPill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-xl border border-white/12 bg-white/5 px-3 py-1 text-[13px] text-white/85">
    {children}
  </span>
);

export default function ProjectResumeRow({
  title,
  subtitle,
  bullets,
  stack = [],
  links,
  image,
  reverse = false,
}: ProjectResumeRowProps) {
  return (
    <article
      className={`grid gap-8 md:grid-cols-2 items-stretch mb-10 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Media */}
      <div className="rounded-3xl border border-white/10 bg-black/35 p-3">
        {image ? (
          <img
            src={image}
            alt={`${title} preview`}
            loading="lazy"
            className="w-full h-[280px] md:h-[360px] object-cover rounded-2xl"
          />
        ) : (
          <div className="h-[280px] md:h-[360px] rounded-2xl bg-gradient-to-br from-sky-900/30 via-fuchsia-900/20 to-indigo-900/30 grid place-items-center">
            <div className="text-center text-white/70 text-sm">
              Screenshot coming soon
            </div>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="rounded-3xl border border-white/10 bg-black/40 p-6 md:p-8">
        <div className="flex flex-wrap items-baseline gap-3">
          <h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
          {subtitle && <span className="text-white/70 italic text-lg">| {subtitle}</span>}
        </div>

        <ul className="mt-5 space-y-2 text-white/85">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-sky-400/80" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((s) => (
              <DarkPill key={s}>{s}</DarkPill>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl bg-white/8 hover:bg-white/12 border border-white/15 px-4 py-2"
            >
              {l.label} →
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
