import { cn } from "@/lib/utils";

export interface AvatarGroupItem {
  src?: string;
  alt?: string;
  initials?: string;
}

export interface AvatarGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Avatars to render. Each may be an image (`src`) or initials. */
  avatars: AvatarGroupItem[];
  /** Cap visible avatars; remainder collapse into a `+N` chip. Default 3. */
  max?: number;
  /** Avatar diameter. `sm` = size-6, `md` = size-8. Default `md`. */
  size?: "sm" | "md";
}

/**
 * Overlapping circular avatars with a `+N` overflow chip.
 *
 * @example
 * <AvatarGroup
 *   avatars={[
 *     { src: "/u1.jpg", alt: "Ava" },
 *     { initials: "MW" },
 *     { src: "/u3.jpg", alt: "Eli" },
 *     { initials: "TC" },
 *   ]}
 *   max={3}
 * />
 */
export function AvatarGroup({
  avatars,
  max = 3,
  size = "md",
  className,
  ...props
}: AvatarGroupProps) {
  const sizeClass = size === "sm" ? "size-6" : "size-8";
  const borderClass = size === "sm" ? "border" : "border-2";
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;

  const baseChip = cn(
    sizeClass,
    "rounded-full bg-secondary flex items-center justify-center text-[10px] font-black text-muted-foreground",
    borderClass,
    "border-card"
  );

  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-2", className)}
      {...props}
    >
      {visible.map((a, i) =>
        a.src ? (
          <img
            key={i}
            src={a.src}
            alt={a.alt ?? ""}
            className={cn(
              sizeClass,
              "rounded-full object-cover",
              borderClass,
              "border-card"
            )}
          />
        ) : (
          <div key={i} className={baseChip}>
            {a.initials}
          </div>
        )
      )}
      {overflow > 0 && <div className={baseChip}>+{overflow}</div>}
    </div>
  );
}
