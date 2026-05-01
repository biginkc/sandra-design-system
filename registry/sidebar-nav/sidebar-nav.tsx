// SidebarNav — BMH primary-nav rail.
//
// Source: Sandra CRM `dashboard-sidebar.tsx` (deployed). Per the
// .stitch/CONSISTENCY-REPORT, deployed reality is authoritative when it
// disagrees with DESIGN.md. The spec called for `font-black` on active
// items; deployed CRM uses `font-bold` for both — this component matches
// deployed reality so adopting it is visually identical to production today.
//
// The active affordance is a 4px solid left bar (`border-l-4 border-foreground`)
// rather than a fill or pill — a deliberate Warm Paper / Organic Utility
// choice favoring tonal layering and hairline accents over saturated highlights.

import { cn } from "@/lib/utils";

const ITEM_BASE =
  "flex items-center gap-3 py-3 text-sm font-bold tracking-wide transition-all duration-200 ease-in-out";
const ITEM_ACTIVE = "text-foreground border-l-4 border-foreground pl-4";
const ITEM_INACTIVE =
  "text-muted-foreground hover:bg-muted hover:text-foreground pl-5";

/**
 * Returns the className for a sidebar nav item. Use this when applying
 * BMH sidebar styling to a custom anchor element — most commonly when
 * wrapping with a framework `<Link>` for client-side routing, where
 * rendering `<SidebarNavItem>` (which is itself an `<a>`) inside `<Link>`
 * would nest anchors.
 *
 * @example
 * <Link href="/" className={sidebarNavItemClassName({ active: pathname === "/" })}>
 *   <Gauge className="size-5" aria-hidden />
 *   <span>Overview</span>
 * </Link>
 */
export function sidebarNavItemClassName({
  active,
}: {
  active: boolean;
}): string {
  return cn(ITEM_BASE, active ? ITEM_ACTIVE : ITEM_INACTIVE);
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Accessible landmark label. e.g. "Primary", "Admin". */
  "aria-label": string;
}

/**
 * Sidebar primary-nav container — a `<nav>` landmark with vertical-stack
 * layout. Compose `<SidebarNavItem>` (or any element styled via
 * `sidebarNavItemClassName`) inside.
 *
 * @example
 * <SidebarNav aria-label="Primary">
 *   <SidebarNavItem href="/" icon={<Gauge className="size-5" aria-hidden />} label="Overview" active />
 *   <SidebarNavItem href="/leads" icon={<Target className="size-5" aria-hidden />} label="Leads" />
 * </SidebarNav>
 */
export function SidebarNav({
  className,
  children,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      data-slot="sidebar-nav"
      className={cn("flex flex-1 flex-col gap-1", className)}
      {...props}
    >
      {children}
    </nav>
  );
}

export interface SidebarNavItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  /** Leading icon — typically a Lucide icon at `size-5`. */
  icon: React.ReactNode;
  /** Item label. */
  label: string;
  /** Whether this item represents the current route. */
  active?: boolean;
}

/**
 * Sidebar nav item — renders a styled `<a>`. For Next.js / client-side
 * routing, prefer wrapping a `<Link>` with `sidebarNavItemClassName({ active })`
 * directly to avoid nested anchors.
 *
 * @example
 * <SidebarNavItem
 *   href="/dashboard"
 *   icon={<Gauge className="size-5" aria-hidden />}
 *   label="Overview"
 *   active
 * />
 */
export function SidebarNavItem({
  icon,
  label,
  active = false,
  className,
  ...props
}: SidebarNavItemProps) {
  return (
    <a
      data-slot="sidebar-nav-item"
      data-active={active || undefined}
      className={cn(sidebarNavItemClassName({ active }), className)}
      {...props}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
