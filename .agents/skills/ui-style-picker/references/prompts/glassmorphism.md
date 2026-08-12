# Glassmorphism — component restyle prompt

Paste this verbatim, replacing the placeholder with the component code. It restyles the aesthetic layer only; layout, structure, labels, and behavior stay untouched.

```text
Apply the **Glassmorphism** design style to the component provided below.

Do NOT change:
• layout
• HTML/JSX structure
• component hierarchy
• text labels
• functionality

Modify ONLY the aesthetic layer:
colors, shadows, gradients, radii, lighting, surfaces, and typography tone.

Follow these exact Glassmorphism rules:

BASE
• Use translucent, frosted-glass surfaces for all primary containers
• Background blur MUST be applied (between 12px and 20px)
• Background behind glass must be colorful, gradient-based, or abstract to show depth

GLASS PANEL SETTINGS
• Panel background: rgba(255, 255, 255, 0.18) to rgba(255, 255, 255, 0.28)
• Border: 1px solid rgba(255, 255, 255, 0.4)
• Corner radius: minimum 16px
• Apply subtle inner glow: inset 0px 0px 12px rgba(255, 255, 255, 0.25)

SHADOWS
• External shadow must be soft and subtle:
  0px 4px 24px rgba(0, 0, 0, 0.20)
• No heavy or hard shadows
• No inset shadows for raised elements

BACKDROP
• Must include color or gradient behind the glass to demonstrate transparency:
  Examples:
  - Purple → Blue radial gradient
  - Pink → Orange soft gradient
  - Multi-tone abstract blur
• DO NOT use flat grey backgrounds (breaks the effect)

ACCENTS
• Use bright, modern accent colors with 40–70% saturation
• Allowed colors: neon blues, purples, cyans, pinks, teals
• Buttons may use translucent or semi-solid fills

TYPOGRAPHY
• Use white or near-white text inside glass elements
• Optional text shadow for readability:
  0px 1px 3px rgba(0, 0, 0, 0.25)
• Font weight: regular or medium

STRICT FORBIDDEN RULES
• DO NOT remove transparency
• DO NOT remove the blur effect
• DO NOT use dark or muddy backgrounds
• DO NOT use matte surfaces (that becomes Neumorphism/Soft UI)
• DO NOT use multiple border layers
• DO NOT flatten the components — Glassmorphism must feel layered
• DO NOT use thick shadows or high-contrast outlines

The output must always look like true Glassmorphism:
transparent frosted panels, bright accents, soft shadows, layered depth, and visible backdrop color.

---------------------------------
COMPONENT TO STYLE:
[Paste your component code here]
---------------------------------
```
