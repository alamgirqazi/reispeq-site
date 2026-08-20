import type { SVGProps } from "react";

/**
 * Mark geometry, drawn once on a 40×40 grid and reused by the React logo, the
 * favicon, the social card and the standalone SVG in /public.
 *
 * The enclosure is an open path rather than a masked rectangle: its right edge
 * is simply omitted and the vertical arm of the "+" closes it. Every path
 * carries an explicit `fill="none"` because Satori (next/og) does not inherit
 * fill from the parent <svg>, and would otherwise fill the enclosure solid.
 */
export const MARK = {
  dots: [10.1, 17.9, 25.7],
  dotSize: 4.2,
  dotRadius: 1.4,
  enclosure:
    "M30.4 18.2A6.6 6.6 0 0 0 23.8 11.6L16.2 11.6A6.6 6.6 0 0 0 9.6 18.2L9.6 25.8A6.6 6.6 0 0 0 16.2 32.4L23.8 32.4A6.6 6.6 0 0 0 30.4 25.8",
  plus: ["M30.4 17.4L30.4 26.6", "M25.8 22L35 22"],
  stroke: 3.2,
} as const;

export function ReispeqMark({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {MARK.dots.map((x) => (
        <rect
          key={x}
          x={x}
          y={4.2}
          width={MARK.dotSize}
          height={MARK.dotSize}
          rx={MARK.dotRadius}
          fill="currentColor"
        />
      ))}
      {[MARK.enclosure, ...MARK.plus].map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={MARK.stroke}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function ReispeqLogo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  /** `dark` = navy on light surfaces. `light` = white on navy surfaces. */
  tone?: "dark" | "light";
}) {
  const markColor = tone === "light" ? "text-white" : "text-brand-500";
  const nameColor = tone === "light" ? "text-white" : "text-brand-700";
  const subColor = tone === "light" ? "text-white/55" : "text-muted";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} dir="ltr">
      <ReispeqMark className={`h-9 w-9 shrink-0 ${markColor}`} />
      <span className="flex flex-col leading-none">
        <span className={`text-[15px] font-semibold tracking-[0.09em] ${nameColor}`}>REISPEQ</span>
        <span className={`u-eyebrow mt-[4px] text-[8.5px] tracking-[0.26em] ${subColor}`}>
          Technologies
        </span>
      </span>
    </span>
  );
}
