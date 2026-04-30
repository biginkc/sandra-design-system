// BrandLockup — BMH product brand mark + name + sub-label.
//
// Source: Stitch wholesale_real_estate_crm sidebar header
// ("Wholesale Pro / MANAGEMENT SUITE").
// Used in: Sandra CRM, Sandra Practice, Sandra University sidebars.
//
// Designed to drop INSIDE a shadcn `<SidebarMenuButton size="lg">`,
// so it renders content only — no button wrapper, no link affordance.

import { cn } from "@/lib/utils";

export interface BrandLockupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Brand mark — typically a Lucide icon (Layers, Workflow, etc.). */
  mark: React.ReactNode;
  /** Product name (e.g., "Wholesale Pro"). */
  productName: string;
  /** Sub-label, rendered uppercase + tracked-out (e.g., "Management Suite"). */
  subLabel: string;
}

/**
 * Sidebar brand lockup. Renders a primary-filled mark tile + two-line
 * product/sub-label stack. Intended as the child of `SidebarMenuButton`.
 *
 * @example
 * <SidebarMenuButton size="lg">
 *   <BrandLockup
 *     mark={<Layers className="size-4 text-primary-foreground" />}
 *     productName="Wholesale Pro"
 *     subLabel="Management Suite"
 *   />
 * </SidebarMenuButton>
 */
export function BrandLockup({
  mark,
  productName,
  subLabel,
  className,
  ...props
}: BrandLockupProps) {
  return (
    <div
      data-slot="brand-lockup"
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg shrink-0 bg-primary">
        {mark}
      </div>
      <div className="grid flex-1 text-left leading-tight">
        <span className="truncate text-base font-black tracking-wide text-foreground">
          {productName}
        </span>
        <span className="truncate text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
          {subLabel}
        </span>
      </div>
    </div>
  );
}
