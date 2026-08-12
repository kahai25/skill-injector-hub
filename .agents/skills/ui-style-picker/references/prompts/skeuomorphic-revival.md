# Skeuomorphic Revival — component restyle prompt

Paste this verbatim, replacing the placeholder with the component code. It restyles the aesthetic layer only; layout, structure, labels, and behavior stay untouched.

```text
Apply the **Skeuomorphic Revival** design style to the component provided below.

Do NOT change:
• layout
• HTML/JSX structure
• component hierarchy
• text labels
• functionality

Modify ONLY the aesthetic layer:
colors, shadows, gradients, radii, lighting, surfaces, and typography tone.

Follow these exact Skeuomorphic Revival rules:

GENERAL STYLE
• Components must mimic physical materials (e.g., leather, metal, plastic, wood, fabric).
• Every element should have clear tactile affordance—look pressable, movable, or physically interactive.
• Depth, texture, and realistic lighting are required.

SURFACES & TEXTURES (CSS-ACHIEVABLE)
• Create texture through CSS gradients and patterns:
  - Brushed metal: linear-gradient(135deg, #2d3436 0%, #636e72 50%, #2d3436 100%)
  - Dark leather: linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)
  - Matte rubber: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%)
• Add noise texture via pseudo-elements or subtle gradient overlays

LIGHTING & SHADOWS (EXACT VALUES)
• Light source: top-left or top-center
• Use this exact layered shadow system for raised elements:
  - Ambient shadow: 0px 8px 24px rgba(0, 0, 0, 0.4)
  - Contact shadow: 0px 2px 4px rgba(0, 0, 0, 0.3)
  - Combined: boxShadow: '0px 2px 4px rgba(0,0,0,0.3), 0px 8px 24px rgba(0,0,0,0.4)'
• For pressed/inset elements:
  - boxShadow: 'inset 0px 2px 8px rgba(0,0,0,0.5), inset 0px -1px 2px rgba(255,255,255,0.1)'

BEVELS & EDGE HIGHLIGHTS (EXACT VALUES)
• Top edge highlight for raised surfaces:
  - border-top: 1px solid rgba(255, 255, 255, 0.15)
• Bottom edge shadow for depth:
  - border-bottom: 1px solid rgba(0, 0, 0, 0.3)
• Embossed text effect:
  - textShadow: '0px 1px 0px rgba(255,255,255,0.1), 0px -1px 2px rgba(0,0,0,0.5)'
• Debossed/engraved text:
  - textShadow: 'inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.1)'

SHAPE & RADIUS
• Corners: 8px–16px for panels, 6px–10px for buttons
• Use subtle beveled edges via border gradients or box-shadow layers

COLOR PALETTE (EXACT HEX VALUES)
• Metal: #2d3436, #636e72, #b2bec3, #dfe6e9
• Leather/Dark: #1a1a2e, #16213e, #0f0f23, #2c3e50
• Accent highlights: #f39c12, #e74c3c, #27ae60
• Text on dark: #a0aec0, #718096

TYPOGRAPHY
• Embossed style for headers:
  textShadow: '0px 2px 4px rgba(0,0,0,0.8), 0px -1px 0px rgba(255,255,255,0.1)'
• Regular text: color #a0aec0 or #718096

STRICT FORBIDDEN RULES
• DO NOT use glass, transparency, or blur (that becomes Glassmorphism).
• DO NOT use soft dual shadows or pill-shaped forms (that becomes Neumorphism/Soft UI).
• DO NOT mimic toy-like inflated shapes (that becomes Claymorphism).
• DO NOT use flat surfaces without texture simulation.
• DO NOT ignore physical light direction.

The output must always reflect true Skeuomorphic Revival:
realistic material textures via CSS gradients, layered shadows for depth, beveled edges, and tangible UI.

---------------------------------
COMPONENT TO STYLE:
[Paste your component code here]
---------------------------------
```
