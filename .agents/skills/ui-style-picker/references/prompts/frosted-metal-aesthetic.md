# Frosted Metal Aesthetic — component restyle prompt

Paste this verbatim, replacing the placeholder with the component code. It restyles the aesthetic layer only; layout, structure, labels, and behavior stay untouched.

```text
Apply the **Frosted Metal Aesthetic** design style to the component provided below.

Do NOT change:
• layout
• HTML/JSX structure
• component hierarchy
• text labels
• functionality

Modify ONLY the aesthetic layer:
colors, shadows, gradients, radii, lighting, surfaces, and typography tone.

Follow these exact Frosted Metal Aesthetic rules:

GENERAL STYLE
• Surfaces must look like cold, anodized metal with a smooth matte sheen.
• Design should feel engineered, minimal, and precise — not soft, liquid, or plasticky.
• Use cool tones, metallic gradients, and subtle edge reflections.

METALLIC SURFACES (CSS-ACHIEVABLE)
Use layered gradients to simulate metal:

Examples:
• Silver Metal:
  linear-gradient(180deg, #E3E6EB 0%, #C9CED6 50%, #B6BCC7 100%)

• Dark Titanium:
  linear-gradient(180deg, #4A4F59 0%, #373B44 50%, #2C3036 100%)

• Blue Anodized:
  linear-gradient(180deg, #3C6E96 0%, #355E82 50%, #2C4F6A 100%)

Rules:
• Always use subtle, vertical gradient shifts.
• Avoid high-contrast or rainbow gradients — metal = controlled, muted sheen.

EDGE HIGHLIGHTS (CRUCIAL FOR METAL)
Apply precise edge lighting to simulate machined surfaces:

• Top-edge highlight:
  border-top: 1px solid rgba(255,255,255,0.35)

• Bottom-edge shadow:
  border-bottom: 1px solid rgba(0,0,0,0.25)

• Optional chamfered look:
  box-shadow: inset 0px 1px 0px rgba(255,255,255,0.25),
              inset 0px -1px 0px rgba(0,0,0,0.3)

LIGHTING & SHADOWS
• Use crisp, minimal, directional shadows for metal separation:
  0px 4px 16px rgba(0,0,0,0.20)

• No soft Neumorphic shadows.
• No glow or neon diffusion.
• Lighting must feel controlled and industrial.

SHAPE & RADIUS
• Slight rounding allowed (4px–8px), but shapes must feel machined.
• Avoid pill shapes or bubbly geometry.

COLOR PALETTE (COOL + METALLIC)
Recommended tones:

• Light Metal: #E3E6EB, #C9CED6, #B6BCC7  
• Dark Metal: #4A4F59, #373B44, #2C3036  
• Cool Accents: #4FC3F7, #81D4FA, #29B6F6  
• High-Tech Greens: #26C281, #2ECC71  
• Text Colors: #F0F0F0 (light UI), #D1D5DB, #A8B0BA

Rules:
• Accents should be small and precise — not dominant.
• Avoid warm or pastel colors unless intentional.

TYPOGRAPHY
• Use clean, tight, industrial sans-serif fonts.
• No shadows, glows, or embossed effects.
• High contrast text for readability against metal surfaces.

STRICT FORBIDDEN RULES
• DO NOT use glass blur or transparency (that becomes Glassmorphism).
• DO NOT use dual shadows or molded edges (that becomes Neumorphism).
• DO NOT use inflated, toy-like forms (that becomes Claymorphism).
• DO NOT use liquid, glossy, or organic curvature (that becomes Gooey/Liquid).
• DO NOT use neon gradients (that becomes Vaporwave).
• DO NOT add texture grain unless extremely subtle — keep metal clean.

The output must always reflect true Frosted Metal Aesthetic:
matte metallic gradients, crisp edge highlights, cool industrial tones, precise geometry, and no softness or glossiness.

----------------------------------
COMPONENT TO STYLE:
{{PASTE_OR_DESCRIBE_COMPONENT_HERE}}
----------------------------------
```
