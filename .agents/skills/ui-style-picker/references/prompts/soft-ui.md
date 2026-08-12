# Soft UI — component restyle prompt

Paste this verbatim, replacing the placeholder with the component code. It restyles the aesthetic layer only; layout, structure, labels, and behavior stay untouched.

```text
Apply the **Soft UI** design style to the component provided below.

Do NOT change:
• layout
• HTML/JSX structure
• component hierarchy
• text labels
• functionality

Modify ONLY the aesthetic layer:
colors, shadows, gradients, radii, lighting, surfaces, and typography tone.

Follow these exact Soft UI rules:

GENERAL STYLE
• The entire interface should feel smooth, gentle, and lightly elevated.
• Use soft gradients, diffused shadows, and warm or pastel color palettes.
• Surfaces should appear subtly cushioned or "air-brushed," but NOT molded or carved like Neumorphism.
• Lighting should be ambient and even—not directional or harsh.

BACKGROUND & SURFACES (EXACT VALUES)
• Outer container background:
  background: linear-gradient(145deg, #f0f4f8 0%, #e8eef5 100%)
• Inner card/panel surface:
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)
• Subtle panel areas:
  background: linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)

SHADOWS (EXACT VALUES - SINGLE DIFFUSED ONLY)
• Primary floating shadow for cards:
  boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.15)'
• Lighter shadow for nested elements:
  boxShadow: '0px 4px 12px rgba(149, 157, 165, 0.1)'
• Stat items or small panels:
  boxShadow: '0px 4px 14px rgba(149, 157, 165, 0.12)'
• CRITICAL: Use ONLY single diffused shadows. NO dual-shadow systems. NO inner shadows.

SHAPE & RADIUS (EXACT VALUES)
• Outer container: border-radius: 24px (rounded-3xl)
• Inner cards: border-radius: 16px (rounded-2xl)
• Buttons and small elements: border-radius: 12px (rounded-xl)
• All shapes should feel smooth and friendly.

BUTTONS & ACCENTS (EXACT VALUES)
• CTA button gradient:
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)
• Button glow shadow:
  boxShadow: '0px 6px 20px rgba(139, 92, 246, 0.25)'
• Chart/accent color: #8b5cf6 (violet-500)

COLOR PALETTE (EXACT VALUES)
• Background greys: #f0f4f8, #e8eef5, #f8fafc, #f1f5f9, #fafbfc
• Text primary: #4a5568 (grey-700)
• Text muted: #a0aec0 (grey-400)
• Accent: #8b5cf6 (violet-500), #a78bfa (violet-400)

TYPOGRAPHY
• Header: font-weight 500 (medium), color #4a5568
• Subtext: font-weight 400, color #a0aec0
• Stats: font-weight 600 (semibold), color #4a5568

STRICT FORBIDDEN RULES
• DO NOT use dual shadows or inner shadows (that becomes Neumorphism).
• DO NOT use inset shadows for any element.
• DO NOT mimic toy-like thickness or inflated geometry (that becomes Claymorphism).
• DO NOT use transparency or frosted blur (that becomes Glassmorphism).
• DO NOT use harsh black/white contrast (that becomes Minimal Brutalism).
• DO NOT use sharp corners or strict grids.

The output must always reflect true Soft UI:
single diffused shadows, soft gradients, warm muted colors, smooth curves, and a gentle floating aesthetic.

---------------------------------
COMPONENT TO STYLE:
[Paste your component code here]
---------------------------------
```
