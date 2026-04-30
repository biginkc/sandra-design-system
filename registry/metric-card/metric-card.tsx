// MetricCard — BMH bento-grid stat card.
//
// Source: Stitch wholesale_real_estate_crm leads pipeline mockup
// (Conversion Rate / AI Efficiency tiles).
// Used in: Sandra CRM (pipeline metrics), Sandra Practice (rubric
// dashboards), Sandra University (cohort progress).
//
// Depends on: @sandra/tokens for `--alert-*` CSS variables. The icon
// halo uses the alert color at 10% opacity; the delta badge uses
// the same color at full strength.

import { cn } from "@/lib/utils";

const TONE_HALO = {
  healthy: "bg-alert-healthy/10",
  warning: "bg-alert-warning/10",
  caution: "bg-alert-caution/10",
  info: "bg-alert-info/10",
  critical: "bg-alert-critical/10",
} as const;

const TONE_TEXT = {
  healthy: "text-alert-healthy",
  warning: "text-alert-warning",
  caution: "text-alert-caution",
  info: "text-alert-info",
  critical: "text-alert-critical",
} as const;

export type MetricTone = keyof typeof TONE_HALO;

export interface MetricCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Lucide (or any) icon node rendered inside the halo. */
  icon: React.ReactNode;
  /** Severity tone — drives halo + delta color via alert palette tokens. */
  tone: MetricTone;
  /** Small label-caps title above the value. */
  label: string;
  /** The headline number (e.g., "12.4%", "84%"). */
  value: string;
  /** Optional badge after the value (e.g., "+2.1%", "Optimal"). */
  delta?: string;
  /** Optional caption below the value. */
  description?: string;
}

/**
 * Bento-grid metric card with semantic severity tone.
 *
 * @example
 * <MetricCard
 *   icon={<TrendingUp className="size-5" />}
 *   tone="healthy"
 *   label="Conversion Rate"
 *   value="12.4%"
 *   delta="+2.1%"
 *   description="Up from 10.3% last month"
 * />
 *
 * @example
 * <MetricCard
 *   icon={<Zap className="size-5" />}
 *   tone="warning"
 *   label="AI Efficiency"
 *   value="84%"
 *   delta="Optimal"
 * />
 */
export function MetricCard({
  icon,
  tone,
  label,
  value,
  delta,
  description,
  className,
  ...props
}: MetricCardProps) {
  return (
    <div
      data-slot="metric-card"
      data-tone={tone}
      className={cn(
        "p-6 rounded-2xl bg-card border border-border",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "size-10 rounded-full flex items-center justify-center",
            TONE_HALO[tone],
            TONE_TEXT[tone]
          )}
        >
          {icon}
        </div>
        <span className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black tracking-tighter text-foreground">
          {value}
        </span>
        {delta ? (
          <span className={cn("text-sm font-bold", TONE_TEXT[tone])}>
            {delta}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="mt-2 text-[15px] font-medium leading-relaxed text-muted-foreground/70">
          {description}
        </p>
      ) : null}
    </div>
  );
}
