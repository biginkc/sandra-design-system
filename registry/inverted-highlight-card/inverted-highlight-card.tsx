// InvertedHighlightCard — dark bento tile with headline metric + inverted CTA.
//
// Source: Stitch wholesale_real_estate_crm leads pipeline mockup
// (the "Pipeline Value" tile at the end of the bento grid).
// Used in: Sandra CRM (pipeline value), Sandra University (lesson highlight),
// Sandra Practice (streak / forecast cards).
//
// Depends on: @bmh/tokens for --primary / --primary-foreground. Inverts the
// page palette — dark surface, light ink, with a white-on-dark pill CTA that
// inverts back to primary-on-light.

import { cn } from "@/lib/utils";

export interface InvertedHighlightCardCta {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface InvertedHighlightCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Label-caps eyebrow (e.g., "Pipeline Value"). */
  label: string;
  /** Headline number / value (e.g., "$2.4M"). */
  value: string;
  /** Optional caption beneath the value. */
  description?: string;
  /** Optional inline CTA. Renders <a> when href is set, else <button>. */
  cta?: InvertedHighlightCardCta;
  /** Render the decorative blur orbs. Defaults to true. */
  decorative?: boolean;
}

/**
 * Inverted highlight card — dark surface, headline metric, optional pill CTA.
 *
 * @example
 * <InvertedHighlightCard
 *   label="Pipeline Value"
 *   value="$2.4M"
 *   description="Projected closing within 90 days"
 *   cta={{ label: "View Forecast", href: "/forecast" }}
 * />
 */
export function InvertedHighlightCard({
  label,
  value,
  description,
  cta,
  decorative = true,
  className,
  ...props
}: InvertedHighlightCardProps) {
  return (
    <div
      data-slot="inverted-highlight-card"
      className={cn(
        "relative p-6 rounded-2xl overflow-hidden bg-primary text-primary-foreground",
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        <span className="block text-[13px] font-semibold uppercase tracking-widest mb-4 text-primary-foreground/60">
          {label}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black tracking-tighter text-primary-foreground">
            {value}
          </span>
        </div>
        {description ? (
          <p className="mt-2 text-[15px] font-medium leading-relaxed text-primary-foreground/60">
            {description}
          </p>
        ) : null}
        {cta ? (
          cta.href ? (
            <a
              href={cta.href}
              onClick={cta.onClick}
              className="mt-6 block w-full py-2 text-center text-sm font-bold rounded-full bg-primary-foreground text-primary"
            >
              {cta.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={cta.onClick}
              className="mt-6 w-full py-2 text-sm font-bold rounded-full bg-primary-foreground text-primary"
            >
              {cta.label}
            </button>
          )
        ) : null}
      </div>
      {decorative ? (
        <>
          <div
            aria-hidden
            className="absolute -right-4 -bottom-4 size-32 rounded-full blur-3xl bg-primary-foreground/10"
          />
          <div
            aria-hidden
            className="absolute right-12 top-4 size-12 rounded-full border border-primary-foreground/20"
          />
        </>
      ) : null}
    </div>
  );
}
