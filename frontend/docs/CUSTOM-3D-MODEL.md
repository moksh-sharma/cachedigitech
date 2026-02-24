# Adding a Custom 3D Model

## 1. Install dependencies

From the `frontend` folder run:

```bash
npm install
```

If you use **React 19** and see peer dependency errors, run:

```bash
npm install --legacy-peer-deps
```

(Dependencies `three`, `@react-three/fiber`, and `@react-three/drei` are already in `package.json`.)

## 2. Add your model file

- Put your **.glb** (or .gltf) file in the **`frontend/public/`** folder.
- Use a short, clear name, e.g. `hero-model.glb` or `values-model.glb`.

**Why `public/`?** Files in `public/` are served from the site root, so the URL is `"/your-file.glb"` (no `public` in the path).

## 3. Use the viewer in your page

Import and use `CustomModelViewer` with the public URL:

```jsx
import { CustomModelViewer } from "../HomeComponent/CustomModelViewer"; // adjust path to your file

// Simple use (no scroll):
<CustomModelViewer modelUrl="/hero-model.glb" />

// With scroll-based rotation (e.g. in a section that tracks scroll):
<CustomModelViewer modelUrl="/hero-model.glb" scrollProgress={scrollProgress} />
```

To have the model react to scroll when the user is in that section, use the **ScrollReactiveModelSection** component (see below) and pass your `modelUrl`.

## 4. Optional: preload the model

To reduce delay when the viewer mounts, preload the model once (e.g. in your page or App):

```jsx
import { useGLTF } from "@react-three/drei";

// Preload (e.g. in the same page that renders CustomModelViewer):
useGLTF.preload("/hero-model.glb");
```

## Model format tips

- **Preferred:** **.glb** (binary GLTF). Smaller and faster than .gltf.
- Export from **Blender** (File → Export → glTF 2.0, choose .glb).
- Or download from **Sketchfab**, **Poly Pizza**, etc. (check license).
- Keep polygon count moderate so mobile stays smooth.

## Component props

| Prop              | Type   | Default      | Description                                      |
|-------------------|--------|--------------|--------------------------------------------------|
| `modelUrl`        | string | `"/model.glb"` | Public path to your .glb/.gltf file.            |
| `scrollProgress`  | number | `0`          | 0–1; used to rotate the model with scroll.      |
| `enableOrbit`     | bool   | `false`      | If `true`, user can orbit the model with mouse.  |
| `className`       | string | `""`         | Extra CSS class for the viewer container.        |

## Example: scroll-reactive section with your model

Use **ScrollReactiveModelSection** and pass your model URL so the model rotates as the user scrolls through the section:

```jsx
import { ScrollReactiveModelSection } from "../HomeComponent/CustomModelViewer";

<ScrollReactiveModelSection modelUrl="/your-model.glb" />
```

Replace the existing `<ScrollReactiveModel />` in `Whoweare.jsx` with `<ScrollReactiveModelSection modelUrl="/your-model.glb" />` to use your custom model with scroll interaction.
