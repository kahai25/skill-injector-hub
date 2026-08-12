# Gooey / Liquid Morphism — component restyle prompt

Paste this verbatim, replacing the placeholder with the component code. It restyles the aesthetic layer only; layout, structure, labels, and behavior stay untouched.

```text
Apply the **Gooey / Liquid Morphism** design style to the component provided below.

Do NOT change:
• layout
• HTML/JSX structure
• component hierarchy
• text labels
• functionality

Modify ONLY the aesthetic layer:
colors, shadows, gradients, radii, lighting, surfaces, and typography tone.

Follow these exact Gooey / Liquid Morphism rules:

GENERAL STYLE
• The component should look organic, fluid, and gelatinous—like blobs of liquid merging.
• Edges must be soft, stretchy, and visually "wet."
• Elements should feel semi-translucent or glossy, with liquid-like highlights.

CSS-ONLY IMPLEMENTATION NOTES
• True "gooey merging" effects require SVG filters (see ADVANCED section below).
• For CSS-only: simulate the liquid aesthetic using large radii, glossy gradients, and blob-like background shapes.
• Focus on vibrant colors, soft edges, and glossy highlights to imply fluidity.

BACKGROUND (EXACT VALUES)
• Vibrant gradient base:
  background: linear-gradient(135deg, #f97316 0%, #ec4899 35%, #8b5cf6 65%, #3b82f6 100%)
• Alternative palettes:
  - Cyan-purple: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)
  - Blue-pink: linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)

BLOB SHAPES (CSS APPROACH)
• Create decorative blobs using absolute-positioned divs:
  - border-radius: 50% or irregular values like '60% 40% 30% 70% / 60% 30% 70% 40%'
  - background: radial-gradient with vibrant colors
  - filter: blur(40px) to soften edges
• Example blob:
  position: absolute; width: 150px; height: 150px;
  background: radial-gradient(circle, rgba(236,72,153,0.6) 0%, transparent 70%);
  border-radius: 50%; filter: blur(40px);

GLOSSY PANELS (EXACT VALUES)
• Main content panel:
  background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)
  backdropFilter: 'blur(12px)'
  border: 1px solid rgba(255,255,255,0.3)
  border-radius: 24px
• Glossy highlight (top edge):
  background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)
  height: 1-2px at top of element

SHADOWS (EXACT VALUES)
• Soft floating shadow:
  boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.18)'
• Inner glow for depth:
  boxShadow: 'inset 0px 1px 2px rgba(255,255,255,0.3), 0px 8px 24px rgba(0,0,0,0.15)'

SHAPE & RADIUS
• All containers: border-radius 24px–32px minimum
• Buttons: border-radius 16px–20px
• No sharp edges anywhere

ADVANCED: SVG GOOEY FILTER (OPTIONAL)
• For true blob-merging effects, add this SVG filter to your component:
  <svg style={{position:'absolute',width:0,height:0}}>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"/>
    </filter>
  </svg>
• Apply to container: filter: url(#goo)
• This makes overlapping elements visually "merge" like liquid blobs.

TYPOGRAPHY
• Text color: white (#ffffff) or near-white
• Text shadow for readability: textShadow: '0px 2px 4px rgba(0,0,0,0.3)'
• Font weight: medium to semibold

STRICT FORBIDDEN RULES
• DO NOT use matte or powdery surfaces (that becomes Soft UI).
• DO NOT use dual-shadow carved effects (that becomes Neumorphism).
• DO NOT use toy-like inflated surfaces (that becomes Claymorphism).
• DO NOT use frosted blur WITHOUT vibrant colors (that becomes Glassmorphism).
• DO NOT use sharp edges, straight corners, or geometric rigidity.

The output must always reflect true Gooey / Liquid Morphism:
vibrant gradient backgrounds, glossy translucent panels, blob-like shapes, soft floating shadows, and organic fluidity.

---------------------------------
COMPONENT TO STYLE:
[Paste your component code here]
---------------------------------
```
