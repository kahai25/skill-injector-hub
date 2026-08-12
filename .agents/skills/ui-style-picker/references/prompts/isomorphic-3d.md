# Isomorphic 3D — component restyle prompt

Paste this verbatim, replacing the placeholder with the component code. It restyles the aesthetic layer only; layout, structure, labels, and behavior stay untouched.

```text
Apply the **Isomorphic 3D** design style to the component provided below.

Do NOT change:
• layout
• HTML/JSX structure
• component hierarchy
• text labels
• functionality

Modify ONLY the aesthetic layer:
colors, shadows, gradients, radii, lighting, surfaces, and typography tone.

Follow these exact Isomorphic 3D rules:

GENERAL STYLE
• The interface should feel modern, soft, and premium — like floating 3D chips or cards.
• Use smooth gradients, soft lighting, and subtle depth to create a sleek 3D illusion.
• The overall aesthetic is clean, glossy, and contemporary — NOT retro or harsh.

BACKGROUND
• Use soft, dreamy gradient backgrounds with pastel color transitions:
  Example: linear-gradient(135deg, #FFD4E5 0%, #D4E4FF 30%, #FFE4D4 60%, #E4D4FF 100%)
• Add subtle radial gradient overlays for ambient lighting effects.
• Background should feel atmospheric and soft, not flat or dark.

COLOR PALETTE (SOFT MODERN 3D)
Use soft, luminous pastel tones:

• Sky Blue: #7EC8FF, #A8D8FF
• Soft Purple: #B8A4F0, #D4C4FF
• Mint/Teal: #8CE8D0, #B8F0E0
• Soft Pink: #FFB8D4, #FFD4E5
• Peach: #FFE4D4, #FFC6A0
• White/Cream: #FFFFFF, #F8FAFC

Rules:
• Colors should feel luminous and glowing, not flat.
• Use gradient transitions between colors for depth.
• Avoid harsh primaries or dark colors — keep it soft and modern.

3D ELEMENTS & FLOATING BLOCKS
• Create depth through layered elements and subtle transforms.
• Use CSS transforms like rotateX() and rotateZ() for isometric-style blocks.
• Add small accent strips with glowing effects to simulate LED/metallic details:
  Example: box-shadow: 0 0 6px #4AE89E;
• Blocks should appear to float with soft shadows beneath.

SURFACES & CARDS
• Card surfaces should be semi-transparent white with blur:
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
• Use generous border-radius (16px–24px) for a soft, modern feel.
• Add subtle white borders: border: 1px solid rgba(255,255,255,0.6);

SHADOWS & DEPTH
• Use soft, diffused shadows — NO hard offset shadows:
  Example: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)
• Add colored glow effects on accent elements:
  Example: box-shadow: 0 0 8px #7EC8FF;
• Shadows should feel ambient, not directional.

CHARTS & DATA
• Use gradient strokes and fills for visual interest.
• Add subtle area fills beneath chart lines with transparency.
• Data points should have soft glowing halos.

BUTTONS
• Use multi-color gradients across buttons:
  Example: linear-gradient(135deg, #7EC8FF 0%, #B8A4F0 50%, #8CE8D0 100%)
• Add colored shadow glow: box-shadow: 0 4px 16px rgba(126, 200, 255, 0.35);
• Use generous border-radius (12px+).

TYPOGRAPHY
• Clean, modern sans-serif fonts.
• Use soft gray for secondary text (#7B8794, #9CA3AF).
• Stat values can use the accent colors for visual hierarchy.
• NO text shadows or embossed effects.

STRICT FORBIDDEN RULES
• DO NOT use dark or retro color schemes.
• DO NOT use hard, offset shadows (like 8px 8px 0px) — shadows must be soft and diffused.
• DO NOT use harsh neon colors — keep pastels soft and luminous.
• DO NOT use sharp corners (0px radius) — this is soft modern 3D.
• DO NOT use heavy textures, grain, or noise.
• DO NOT use glass blur without the soft pastel aesthetic (that becomes pure Glassmorphism).

The output must always reflect true Isomorphic 3D:
soft pastel gradients, floating elements with gentle depth, luminous accent colors, glossy modern surfaces, and a dreamy atmospheric feel.

----------------------------------
COMPONENT TO STYLE:
{{PASTE_OR_DESCRIBE_COMPONENT_HERE}}
----------------------------------
```
