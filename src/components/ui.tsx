import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "azure" | "light" }) {
  const color =
    tone === "light" ? "text-azure-200" : tone === "azure" ? "text-azure-500" : "text-brand-500";
  return (
    <p className={`u-eyebrow flex items-center gap-2.5 ${color}`}>
      <span aria-hidden className="inline-block h-px w-6 bg-current opacity-45" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "start",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  align?: "start" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  const titleColor = tone === "light" ? "text-white" : "text-ink";
  const leadColor = tone === "light" ? "text-white/70" : "text-ink-soft";
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow> : null}
      <As
        className={`u-balance mt-5 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
      >
        {title}
      </As>
      {lead ? <p className={`u-pretty mt-5 text-lg leading-relaxed ${leadColor}`}>{lead}</p> : null}
    </div>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`u-dir-flip h-4 w-4 ${className}`}
    >
      <path
        d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  className?: string;
  external?: boolean;
};

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition-colors duration-150";

export function Button({ href, children, variant = "primary", className = "", external }: ButtonProps) {
  const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-brand-500 text-white hover:bg-brand-600",
    secondary: "border border-line bg-white text-ink hover:border-brand-300 hover:text-brand-600",
    ghost: "text-brand-600 hover:text-brand-700 px-0",
    onDark: "bg-white text-brand-700 hover:bg-azure-50",
  };
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={`${buttonBase} ${styles[variant]} ${className}`} {...props}>
      {children}
      <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
    </Link>
  );
}

export function TextLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 underline-offset-4 hover:text-brand-700 hover:underline ${className}`}
      {...props}
    >
      {children}
      <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
    </Link>
  );
}

/** Numbered list used for capabilities and principles — hairline separated, no cards. */
export function NumberedGrid({
  items,
  columns = 2,
  tone = "dark",
  start = 1,
}: {
  items: { title: string; body: string }[];
  columns?: 2 | 3;
  tone?: "dark" | "light";
  start?: number;
}) {
  const border = tone === "light" ? "border-white/12" : "border-line";
  const num = tone === "light" ? "text-azure-300" : "text-brand-300";
  const titleColor = tone === "light" ? "text-white" : "text-ink";
  const bodyColor = tone === "light" ? "text-white/65" : "text-muted";
  const cols = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className="overflow-hidden">
      <ul className={`-me-px grid ${cols} border-t ${border}`}>
        {items.map((item, i) => (
          <li key={item.title} className={`border-b border-e ${border} py-7 pe-7`}>
            <div className="flex gap-4">
              <span className={`u-eyebrow mt-1.5 shrink-0 tabular-nums ${num}`}>
                {String(start + i).padStart(2, "0")}
              </span>
              <div>
                <h3 className={`text-base font-semibold ${titleColor}`}>{item.title}</h3>
                <p className={`u-pretty mt-2 text-[15px] leading-relaxed ${bodyColor}`}>{item.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CheckList({
  items,
  tone = "dark",
}: {
  items: string[];
  tone?: "dark" | "light";
}) {
  const iconColor = tone === "light" ? "text-azure-300" : "text-signal-500";
  const textColor = tone === "light" ? "text-white/75" : "text-ink-soft";
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden className={`mt-1 h-4 w-4 shrink-0 ${iconColor}`}>
            <path
              d="m3 8.4 3.2 3.1L13 4.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`u-pretty text-[15px] leading-relaxed ${textColor}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Section({
  children,
  className = "",
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "surface" | "brand";
  id?: string;
}) {
  const bg =
    tone === "brand" ? "bg-brand-900 text-white" : tone === "surface" ? "bg-surface" : "bg-paper";
  return (
    <section id={id} className={`${bg} py-18 sm:py-24 lg:py-28 ${className}`}>
      <div className="u-shell">{children}</div>
    </section>
  );
}
