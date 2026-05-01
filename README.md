# BMH Design System

The shared visual language for the Sandra product family.

- **Sandra CRM** (`~/Sites/Sandra`) — wholesale real estate operator suite
- **Sandra University** (`~/Sites/Sandra University`) — internal LMS
- **Sandra Practice** (`~/Sites/Sandra Practice`) — AI roleplay gym

All three apps run **Next.js 16 + React 19 + Tailwind v4 + shadcn 4** and share the **"Warm Paper / Organic Utility"** identity originally synthesized in Stitch (`stitch_wholesale_real_estate_crm`).

## Layers

```
LAYER 1 — @sandra/tokens                          ✅ shipped
  CSS variables for color, typography, radius.
  264-line theme.css. 50+ tokens. Light + dark.

LAYER 2 — @sandra/registry                        ✅ shipped (10 components)
  shadcn custom registry hosting BMH component variants:
    • StatusChip                 — 6-hue semantic status pill
    • MetricCard                 — bento-grid stat card with tone
    • BrandLockup                — sidebar brand mark + product/sub-label
    • SearchInputPill            — pill-shaped search input
    • AvatarGroup                — overlapping avatars + overflow
    • Fab                        — floating action button
    • CircularPagination         — page strip with ellipsis logic
    • InvertedHighlightCard      — dark-bg spotlight tile
    • SidebarNav                 — primary-nav rail w/ left-border active
    • DataTableShell             — rounded card chrome + footer strip

LAYER 3 — Per-app shells
  Each app composes Layers 1 + 2 with its own routes, server actions,
  and domain components.
```

## Usage (Layer 1 — Tokens)

In each app's `src/app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@sandra/tokens/theme.css";

@custom-variant dark (&:is(.dark *));
```

That's it. All CSS variables (`--background`, `--primary`, `--radius`, status palette, alert palette) and Tailwind utility mappings (`bg-primary`, `text-foreground`, `rounded-xl`, `bg-status-hot`, `text-alert-critical`) are now available.

### Local development (before publishing)

Until this is published to a registry, each app references it via npm `file:` protocol:

```jsonc
// In each consuming app's package.json
{
  "dependencies": {
    "@sandra/tokens": "file:../Sandra Design System"
  }
}
```

Then `npm install` in the app picks it up. (Yes, the path has spaces — matches the sibling folder convention `~/Sites/Sandra`, `~/Sites/Sandra Practice`, `~/Sites/Sandra University`. npm handles spaces fine in file: refs.)

### Required app-side setup

This package declares Tailwind aliases for `--font-sans`, `--font-mono`, `--font-heading` that resolve to `--font-geist-sans` / `--font-geist-mono`. Each app's `layout.tsx` is responsible for loading the actual font files via `next/font`:

```tsx
import { Geist_Mono, Inter } from "next/font/google";

const inter = Inter({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
```

## Adding a new consumer

End-to-end checklist for wiring a fresh app (or a sibling repo) to `@sandra/tokens`:

1. **Add the dependency** to the consuming app's `package.json`:
   ```jsonc
   {
     "dependencies": {
       "@sandra/tokens": "file:../Sandra Design System"
     }
   }
   ```
   Use a relative path if the consumer is a sibling folder (`~/Sites/*`), or an absolute path otherwise. Spaces in the path are fine.

2. **Install** to materialize the symlink:
   ```bash
   npm install
   ```
   Verify it worked:
   ```bash
   ls -la node_modules/@sandra/tokens
   # should be a symlink → ../../../Sandra Design System
   ```

3. **Import in `globals.css`** — after Tailwind, before any custom variants:
   ```css
   @import "tailwindcss";
   @import "tw-animate-css";
   @import "@sandra/tokens/theme.css";

   @custom-variant dark (&:is(.dark *));
   ```

4. **Remove competing `:root` / `.dark` blocks** from the consuming app's `globals.css`. `@sandra/tokens` is the sole owner of those tokens — if the app also defines them locally, the cascade wins/loses unpredictably. Leave a breadcrumb comment so future-you doesn't re-add them:
   ```css
   /* No :root or .dark blocks here — all owned by @sandra/tokens. */
   ```

5. **Wire the fonts** in `layout.tsx` (see [Required app-side setup](#required-app-side-setup) above). The token package declares the Tailwind aliases; the consuming app loads the actual font files.

6. **Smoke test** — render any element using a token-driven utility (`bg-primary`, `text-foreground`, `bg-status-hot`) and confirm both light and dark themes resolve.

### Caveats

- The package is `"private": true`. To publish to npm later, flip that flag and add a `repository` field. Until then, all consumers must use `file:` protocol.
- `file:` references are **path-coupled** — moving either the consuming repo or `Sandra Design System` to a different relative location breaks `npm install` until the path is updated.
- Layer 2 (registry components) is **not** in `package.exports` yet. Only `theme.css` is consumable via this package. Components are added per-app with `npx shadcn add` against `registry/registry.json`.

## What's in `theme.css`

| Section | Tokens |
|---|---|
| Surfaces | `--background`, `--foreground`, `--card`, `--popover` (+ foregrounds, + dark variants) |
| Action | `--primary`, `--secondary`, `--accent`, `--destructive` (+ foregrounds) |
| Muted | `--muted`, `--muted-foreground` |
| Borders & rings | `--border`, `--input`, `--ring` |
| Charts | `--chart-1` through `--chart-5` (stone scale) |
| Sidebar | `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, etc. (8 tokens) |
| Status (lead pipeline) | `--status-{replying,hot,new,contacted,cold,dead}-{bg,fg,border}` (18 tokens) |
| Alert (severity) | `--alert-{critical,warning,caution,info,healthy}` (5 tokens) |
| Geometry | `--radius` (1rem base) + `--radius-{sm,md,lg,xl,2xl,3xl,4xl}` |
| Typography | `--font-sans`, `--font-mono`, `--font-heading` (aliased to next/font variables) |

## Status palette quick reference

| State | Bg | Fg | Border | Use |
|---|---|---|---|---|
| Replying | `#ffedd5` | `#c2410c` | `#fed7aa` | Conversation in progress |
| Hot | `#fee2e2` | `#b91c1c` | `#fecaca` | High-intent / closing soon |
| New | `#dbeafe` | `#1d4ed8` | `#bfdbfe` | Fresh inbound |
| Contacted | `#f5f5f4` | `#57534e` | `#e7e5e4` | Default in-progress |
| Cold | `#cffafe` | `#0e7490` | `#a5f3fc` | Stalled / low-intent |
| Dead | `#1c1917` | `#e7e5e4` | `#292524` | Terminal / closed-lost |

For Sandra Practice score chips: map score buckets (0–40 / 41–60 / 61–80 / 81–100) to Cold / Contacted / Replying / Hot.

## Migration order (recommended)

1. **Sandra Practice** (greenfield, easiest) — adopt at scaffold time
2. **Sandra University** (in-flight, low risk) — drop in during normal feature work
3. **Sandra CRM** (deployed, retrofit last) — replace `:root { ... }` block in existing `globals.css` with the import; verify no visual regressions

## Versioning

Standard semver. Until v1.0.0, treat as unstable — token additions are likely as Layer 2 components surface new needs.

- `0.x` — pre-1.0, additive changes expected
- `1.0.0` — locked tokens; breaking changes only via major bump

## See also

- Source spec: `~/Sites/Sandra Practice/.stitch/DESIGN.md`
- Stitch original: `~/Downloads/stitch_wholesale_real_estate_crm/{DESIGN.md, code.html, screen.png}`
- Consistency report: `~/Sites/Sandra Practice/.stitch/CONSISTENCY-REPORT.md`
