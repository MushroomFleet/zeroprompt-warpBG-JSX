# ZeroPrompt Warp Background JSX V2

**Multi-line Elastic Billboards with JSON Profile Support**

A React/Three.js visualization of procedural prompt generation using position-is-seed methodology. Creates an infinite warp tunnel of dynamically generated AI prompts with speed-reactive scaling and customizable vocabulary profiles.

![Version](https://img.shields.io/badge/version-2.0.0-00CED1)
![React](https://img.shields.io/badge/react-18+-61DAFB)
![Three.js](https://img.shields.io/badge/three.js-r128-000000)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Quick Start

### Try the Demo

Open `demo-V2.html` in your browser for an instant preview:

```bash
# Clone repository
git clone https://github.com/MushroomFleet/zeroprompt-warpBG-JSX.git
cd zeroprompt-warpBG-JSX

# Open demo (no build required!)
open demo-V2.html
```

**Features:**
- ✅ No build process required
- ✅ CSP-compliant (uses whitelisted CDNs)
- ✅ Works in any subfolder (e.g., `/prompt-warp-2/`)
- ✅ Pure JavaScript (no JSX compilation)
- ✅ Two embedded profiles: Default & Volkyri Aesthetic
- ✅ Eight color themes: Teal, Magenta, Orange, Lime, Purple, Gold, Crimson, Cyan
- ✅ Press 'P' to switch profiles, 'C' to cycle colors, 'I' for controls

**[View Live Demo](demo-V2.html)** (Download and open locally)

### Basic Integration

```bash
# Install dependencies
npm install react react-dom three

# Copy component to your project
cp ZeroPromptWarpBG-V2.jsx src/components/
```

```jsx
import ZeroPromptWarpBGV2 from './components/ZeroPromptWarpBG-V2';

function App() {
  return <ZeroPromptWarpBGV2 />;
}
```

**[See Full Integration Guide →](zeroprompt-warpBG-JSX-V2-integration.md)**

---

## ✨ Features

### 🎨 Dynamic Visual System
- **Elastic Multi-line Billboards**: Text wraps intelligently at ~50 characters per line
- **Speed-Based Scaling**: Slower speed = larger text (inverse relationship)
- **Particle Density Control**: More particles at high speed for intense warp effect
- **Landscape Aspect Ratio**: Consistent width with adaptive height
- **Full Prompt Display**: No truncation - complete prompts visible

### 📦 Profile System
- **JSON Profile Support**: Upload custom vocabulary sets
- **Multi-Profile Management**: Load and switch between multiple profiles
- **Embedded Default**: Ships with 188+ trillion prompt combinations
- **Real-time Validation**: Automatic structure checking with error messages
- **Profile Statistics**: Shows templates, pools, and total combinations

### 🎮 Interactive Controls
- **Keyboard Controls**: 
  - `1/2/3`: Speed control (-10%, reset, +10%)
  - `5`: Reverse direction
  - `C`: Cycle color theme
  - `P`: Switch profile
  - `S`: New random seed
  - `H`: Toggle UI
- **Speed Range**: 0.1x to 5.0x with smooth interpolation
- **Direction Toggle**: Forward/backward warp motion
- **Seed Randomization**: Explore different prompt universes
- **Collapsible UI**: Clean, glassmorphic control panel
- **Color Themes**: 8 vibrant color palettes (Teal, Magenta, Orange, Lime, Purple, Gold, Crimson, Cyan)

### 🛡️ Robust Engineering
- **WebGL Detection**: Pre-flight checks with helpful error messages
- **Resource Cleanup**: Proper disposal prevents memory leaks
- **Error Handling**: Graceful degradation with troubleshooting steps
- **Cross-Browser**: Tested on Chrome, Firefox, Edge, Safari

---

## 🎯 What It Does

ZeroPrompt Warp BG creates an infinite tunnel of procedurally generated AI image prompts. Using position-is-seed methodology, the same seed always produces the same prompts, making generation:

- **Deterministic**: Same inputs → same outputs, always
- **O(1) Fast**: Constant-time generation regardless of prompt index
- **Infinite**: Generate prompts at any coordinate in an infinite space
- **Cross-Platform**: JavaScript and Python implementations produce identical results

Perfect for:
- **Visual Backgrounds**: Dynamic content for websites/apps
- **Prompt Exploration**: Discovering AI prompt combinations
- **Creative Inspiration**: Infinite semantic possibilities
- **Educational Demos**: Teaching procedural generation concepts

---

## 📊 Technical Highlights

### Position-is-Seed Generation

```javascript
hash = simpleHash(seed, promptIndex, componentIndex)
selectedValue = pool[hash % pool.length]
```

Same `(seed, promptIndex, profile)` → Same prompt, everywhere, always

### Speed-Based Dynamic Scaling

**Text Scaling (Inverse)**
```javascript
speedScale = 1.0 / sqrt(currentSpeed)
// 0.1x speed → 2.0x scale (large, readable)
// 1.0x speed → 1.0x scale (normal)
// 5.0x speed → 0.6x scale (compact, high-speed)
```

**Particle Density (Direct)**
```javascript
particleCount = min(1000, 100 + speed × 900)
// 0.1x speed → ~190 particles (calm)
// 1.0x speed → 1000 particles (standard)
// 5.0x speed → 1000 particles (maximum intensity)
```

### Performance

- **30 Billboards**: Simultaneous render with recycling
- **1000 Particles**: Adaptive density based on speed
- **Dynamic LOD**: Particle count scales automatically
- **Efficient Recycling**: Billboards regenerate when out of view

### Demo Implementation

The standalone demo (`demo-V2.html`) is:
- **CSP-Compliant**: Uses only whitelisted CDNs (cdnjs.cloudflare.com)
- **Pure JavaScript**: No JSX/Babel compilation required
- **Subfolder-Ready**: Works in any path including `/prompt-warp-2/`
- **Zero Dependencies**: Self-contained with external CDN resources

---

## 📁 Repository Structure

```
zeroprompt-warpBG-JSX/
├── ZeroPromptWarpBG-V2.jsx          # Main React component
├── demo-V2.html                      # Standalone demo (no build!)
├── default.json                      # Default vocabulary profile
├── volkyri-zeroprompt-v2.json       # Volkyri aesthetic profile
├── README.md                         # This file
├── zeroprompt-warpBG-JSX-V2-integration.md  # Developer guide
└── profiles/                         # Custom profile examples
    └── (your custom .json files)
```

**Note:** The demo (`demo-V2.html`) has both profiles embedded for security. The component (`ZeroPromptWarpBG-V2.jsx`) supports runtime JSON profile uploads.

---

## 🎨 Profile Format

Create custom vocabularies with JSON files:

```json
{
  "name": "My Profile",
  "description": "Custom prompt vocabulary",
  "version": "1.0.0",
  "templates": [
    "{subject} {action} {environment}, {style}, {mood}"
  ],
  "pools": {
    "subject": ["a warrior", "a mage", "a dragon"],
    "action": ["fighting in", "exploring", "guarding"],
    "environment": ["a castle", "a forest", "a dungeon"],
    "style": ["epic", "cinematic", "dramatic"],
    "mood": ["intense", "mysterious", "heroic"]
  }
}
```

**Total Combinations**: `templates × pool1 × pool2 × ... × poolN`

Upload via the UI or embed directly in the component.

### Included Profiles

**Default Profile** (`default.json`)
- General-purpose AI image prompt vocabulary
- 8 semantic pools (subject, action, environment, style, lighting, camera, details, mood)
- 188+ trillion unique combinations
- Suitable for any image generation workflow

**Volkyri Profile** (`volkyri-zeroprompt-v2.json`)
- Specialized sci-fi aesthetic generator
- Ancient starfaring warrior-attendants from Hel Vortex system
- Distinctive features: asymmetrical half-horn, metallic bodysuits, dramatic lighting
- 15+ semantic pools for highly specific prompts
- Perfect for character design and worldbuilding

Press `P` in the demo to switch between profiles and experience the difference!

---

## 🎮 Keyboard Controls

| Key | Action |
|-----|--------|
| `1` | Decrease speed by 10% |
| `2` | Reset speed to 1.0x |
| `3` | Increase speed by 10% |
| `5` | Reverse warp direction |
| `C` | Cycle color theme (8 colors) |
| `P` | Switch profile (Default ↔ Volkyri) |
| `S` | Generate new random seed |
| `H` | Toggle UI visibility |
| `I` | Toggle info panel (demo only) |

---

## 🔧 Integration Paths

### Standalone HTML
```html
<!-- Just open in browser -->
demo-V2.html
```

### React Project
```bash
npm install three
# Copy ZeroPromptWarpBG-V2.jsx to your components
```

### Next.js
```jsx
import dynamic from 'next/dynamic';
const ZeroPromptWarpBG = dynamic(() => import('./ZeroPromptWarpBG-V2'), { ssr: false });
```

### Vite
```bash
npm create vite@latest
npm install three
# Copy component
```

**[Full Integration Guide →](zeroprompt-warpBG-JSX-V2-integration.md)**

---

## 🐛 Troubleshooting

### WebGL Context Error

**Most Common Fix**: Simply refresh the page

Browsers limit WebGL contexts (8-16 max). Hot-reloading in development can exhaust contexts.

**Solutions:**
1. Refresh the page
2. Close other tabs using WebGL
3. Enable hardware acceleration in browser settings
4. Update graphics drivers

### Performance Issues

Reduce resource usage:

```jsx
const numBillboards = 15;        // Default: 30
const particleCount = 500;       // Default: 1000
renderer.setPixelRatio(1);       // Default: min(devicePixelRatio, 2)
const renderer = new THREE.WebGLRenderer({ antialias: false });
```

**[See Full Troubleshooting Guide →](zeroprompt-warpBG-JSX-V2-integration.md#troubleshooting)**

---

## 🤝 Related Projects

- **[DJZ-ZeroPrompt-V2](https://github.com/MushroomFleet/DJZ-ZeroPrompt)**: ComfyUI custom node (Python implementation)
- **ZeroBytes Methodology**: Position-is-seed procedural generation
- **ComfyUI**: Node-based AI image generation

---

## 📜 License

MIT License - Free to use in commercial and personal projects

---

## 📚 Citation

### Academic Citation

If you use this codebase in your research or project, please cite:

```bibtex
@software{zeroprompt_warpbg_jsx,
  title = {ZeroPrompt Warp Background JSX: Multi-line Elastic Billboards with JSON Profile Support},
  author = {Drift Johnson},
  year = {2025},
  url = {https://github.com/MushroomFleet/zeroprompt-warpBG-JSX},
  version = {2.0.0}
}
```

### Donate

[![Ko-Fi](https://cdn.ko-fi.com/cdn/kofi3.png?v=3)](https://ko-fi.com/driftjohnson)

---

## 🙏 Acknowledgments

- **Three.js Team**: Amazing 3D library
- **React Team**: Excellent UI framework  
- **Position-is-Seed**: ZeroBytes methodology
- **Community**: Beta testers and contributors

---

**Built with ❤️ by Drift Johnson**

[Report Issues](https://github.com/MushroomFleet/zeroprompt-warpBG-JSX/issues) • [Discussions](https://github.com/MushroomFleet/zeroprompt-warpBG-JSX/discussions) • [Ko-Fi](https://ko-fi.com/driftjohnson)
