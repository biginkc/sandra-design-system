// FAB — Floating Action Button.
//
// Source: Stitch wholesale_real_estate_crm leads pipeline mockup (bottom-right "+").
// Used in: Sandra CRM (add lead), Sandra University (add lesson), Sandra Practice
// (start practice).
//
// NOTE: `shadow-2xl` here is the single documented exception to the "no drop
// shadows" rule for the Warm Paper / Organic Utility identity. See DESIGN.md.

import { cn } from "@/lib/utils";

export interface FabProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
  /** Icon to render — typically a Lucide icon at `size-7`. */
  icon: React.ReactNode;
  /** Required accessible label — this is an icon-only control. */
  "aria-label": string;
  /** Corner anchor. Defaults to bottom-right. */
  position?: "bottom-right" | "bottom-left";
}

/**
 * Floating action button anchored to a screen corner.
 *
 * @example
 * <Fab icon={<Plus className="size-7" />} aria-label="Add lead" onClick={...} />
 * <Fab icon={<Mic className="size-7" />} aria-label="Start practice" position="bottom-left" />
 */
export function Fab({
  icon,
  position = "bottom-right",
  className,
  type = "button",
  ...props
}: FabProps) {
  return (
    <button
      data-slot="fab"
      data-position={position}
      type={type}
      className={cn(
        "fixed bottom-8 z-50 size-16 rounded-full",
        "bg-primary text-primary-foreground shadow-2xl",
        "flex items-center justify-center",
        "hover:scale-105 active:scale-95 transition-transform",
        position === "bottom-right" ? "right-8" : "left-8",
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
