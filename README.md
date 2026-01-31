# ZeroPrompt WarpBG JSX

A mesmerizing React component that creates an immersive warp tunnel effect with procedurally generated AI art prompts displayed on dynamic 3D billboards. Built with Three.js and React, featuring smooth animations, interactive speed controls, and deterministic prompt generation.

![ZeroPrompt WarpBG Demo](https://img.shields.io/badge/Demo-Live-00CED1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.157+-000000?style=for-the-badge&logo=three.js)

## ✨ Features

### Visual Experience
- 🌌 **Immersive Warp Tunnel** - Dynamic 3D billboard system with teal particle effects
- 📝 **Procedural Text Generation** - Infinite unique AI art prompts using position-based seeding
- 🎨 **Multi-line Billboard Text** - Landscape-oriented billboards with intelligent text wrapping
- 🔄 **Bidirectional Movement** - Toggle between forward (approaching) and backward (receding) warp effects
- 💫 **Smooth Animations** - Lerp-based speed transitions with no sudden movements
- 🌓 **Dynamic Opacity** - Billboards fade gracefully into the distance in backward mode

### Interactive Controls
- ⌨️ **Keyboard Speed Control** - Adjust warp speed on the fly (keys: 1, 2, 3)
- 🔀 **Direction Toggle** - Switch between forward and backward movement (key: 5)
- 📏 **Dynamic Scaling** - Text size and billboard dimensions scale with speed
- ⚡ **Particle Density** - Particle count adjusts based on speed for optimal performance

### Technical Features
- 🎯 **Deterministic Generation** - Same seed + index = same prompt, always
- 🧹 **Memory Efficient** - Proper cleanup and resource management
- 📱 **Responsive** - Auto-adjusts to window resizing
- ⚛️ **React 18+ Compatible** - Modern React with hooks
- 🎮 **Zero Dependencies** - Only requires React and Three.js

## 🎮 Quick Start

### Option 1: Instant Preview (No Installation)

Open `demo.html` in your browser for an immediate preview:

```bash
# Clone the repository
git clone https://github.com/MushroomFleet/zeroprompt-warpBG-JSX.git
cd zeroprompt-warpBG-JSX

# Open demo.html in your browser
# Double-click demo.html or:
open demo.html  # macOS
start demo.html # Windows
xdg-open demo.html # Linux
```

The demo includes:
- ✅ Full keyboard controls overlay
- ✅ Interactive help menu (toggle with button)
- ✅ All features demonstrated in real-time
- ✅ No build process required

### Option 2: Integrate Into Your React Project

1. **Install Dependencies**
   ```bash
   npm install three
   ```

2. **Copy the Component**
   ```bash
   # Copy ZeroPromptWarpBG.jsx to your components directory
   cp ZeroPromptWarpBG.jsx your-project/src/components/
   ```

3. **Import and Use**
   ```jsx
   import ZeroPromptWarpBG from './components/ZeroPromptWarpBG';

   function App() {
     return <ZeroPromptWarpBG />;
   }
   ```

For detailed integration instructions, see **[Integration Guide](zeroprompt-warpBG-JSX-integration.md)**

## 🎹 Keyboard Controls

| Key | Action | Description |
|-----|--------|-------------|
| `1` | Slow Down | Decrease speed by 10% (min: 0.1x) |
| `2` | Reset Speed | Return to default speed (1.0x) |
| `3` | Speed Up | Increase speed by 10% (max: 5.0x) |
| `5` | Toggle Direction | Switch between forward/backward warp |

### Speed Effects
- **Slower speeds** = Larger billboards, bigger text, fewer particles
- **Faster speeds** = Smaller billboards, smaller text, more particles
- All transitions are smoothly interpolated using lerp

## 🚀 How It Works

### ZeroPrompt Methodology
The component uses a **position-is-seed** approach for deterministic procedural generation:

1. **Coordinate-Based Hashing** - Each prompt index is hashed with a world seed
2. **Vocabulary Pools** - Subjects, actions, environments, styles, and moods
3. **Template System** - Multiple prompt structure templates for variety
4. **Deterministic Output** - Same `(seed, index)` always produces the same prompt

### Technical Architecture

```
┌─────────────────────────────────────────┐
│  React Component (useEffect)            │
├─────────────────────────────────────────┤
│  Three.js Scene Setup                   │
│  ├─ Camera (PerspectiveCamera)         │
│  ├─ Renderer (WebGLRenderer)           │
│  └─ Scene (Black void background)      │
├─────────────────────────────────────────┤
│  Billboard System (30 billboards)      │
│  ├─ Canvas text rendering              │
│  ├─ Multi-line text wrapping           │
│  ├─ Dynamic size scaling                │
│  └─ Opacity fade (backward mode)       │
├─────────────────────────────────────────┤
│  Particle System (100-1000 particles)  │
│  ├─ Teal particles (#00CED1)           │
│  ├─ Dynamic count based on speed       │
│  └─ Recycling/respawn logic            │
├─────────────────────────────────────────┤
│  Animation Loop                         │
│  ├─ Speed lerping                       │
│  ├─ Position updates                    │
│  ├─ Billboard rotation (face camera)   │
│  └─ Particle movement                   │
└─────────────────────────────────────────┘
```

### Prompt Generation Example

```javascript
// Given seed=42, index=0
generatePrompt(42, 0)
// Output: "a knight exploring a crystal cave, cinematic, mysterious atmosphere"

// Same inputs always produce same output
generatePrompt(42, 0) === generatePrompt(42, 0) // true
```

## 📊 Performance

### Default Configuration
- **Billboards:** 30 active at any time
- **Particles:** 100-1000 (scales with speed)
- **Canvas Resolution:** 2048×768 per billboard
- **Target FPS:** 60 FPS
- **Memory:** Automatic cleanup on unmount

### Optimization Tips
- Reduce `numBillboards` for lower-end devices
- Lower canvas resolution in `createBillboard()`
- Decrease `particleCount` maximum
- Use the component sparingly (one instance per page)

## 🛠️ Customization

The component is highly customizable:

### Vocabulary Pools
Modify the arrays in the component to change prompt generation:
- `SUBJECTS` - Characters and entities
- `ACTIONS` - Verbs and activities  
- `ENVIRONMENTS` - Settings and locations
- `STYLES` - Art styles and aesthetics
- `MOOD` - Emotional atmospheres

### Visual Settings
```jsx
// Billboard appearance
const fontSize = Math.floor(120 / Math.max(0.5, currentSpeed));
const sizeMultiplier = 1 / Math.max(0.3, currentSpeed);

// Particle color
color: 0x00CED1 // Teal (change to any hex color)

// Number of billboards
const numBillboards = 30; // Adjust for performance
```

See the **[Integration Guide](zeroprompt-warpBG-JSX-integration.md)** for detailed customization instructions.

## 📁 Project Structure

```
zeroprompt-warpBG-JSX/
├── ZeroPromptWarpBG.jsx              # Main React component
├── demo.html                          # Standalone demo (no build required)
├── zeroprompt-warpBG-JSX-integration.md  # Integration guide
├── README.md                          # This file
└── DJZ_ZeroPrompt_V1.py              # Original Python ComfyUI node
```

## 🔧 Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

**Requirements:**
- WebGL support
- ES6+ JavaScript support
- Canvas API support

## 📖 Documentation

- **[Integration Guide](zeroprompt-warpBG-JSX-integration.md)** - Comprehensive setup instructions
- **[Demo](demo.html)** - Live interactive demonstration
- **Source Code** - Fully commented for easy understanding

## 🎯 Use Cases

- 🎨 **Background Effects** - Dynamic backgrounds for creative web applications
- 🎮 **Game Menus** - Immersive menu backgrounds for web games
- 🖼️ **Art Installations** - Digital art displays and installations
- 📱 **Landing Pages** - Eye-catching hero sections
- 🎭 **Creative Portfolios** - Unique portfolio backgrounds
- 🎬 **Media Players** - Visualizer effects for media applications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- Bug fixes
- Performance improvements
- New features
- Documentation improvements
- Additional vocabulary pools

## 📝 Version History

### v1.0.0 (2025)
- Initial release
- Core warp tunnel functionality
- Keyboard speed controls
- Bidirectional movement toggle
- Procedural prompt generation
- Smooth lerp transitions
- Dynamic text/billboard scaling
- Particle system with density scaling

## 🔗 Links

- **Repository:** https://github.com/MushroomFleet/zeroprompt-warpBG-JSX
- **Issues:** https://github.com/MushroomFleet/zeroprompt-warpBG-JSX/issues
- **Discussions:** https://github.com/MushroomFleet/zeroprompt-warpBG-JSX/discussions

## 📄 License

This project is available for use in personal and commercial projects.

## 📚 Citation

### Academic Citation
If you use this codebase in your research or project, please cite:
```bibtex
@software{zeroprompt_warpbg_jsx,
  title = {ZeroPrompt WarpBG JSX: Procedural Warp Tunnel with AI Prompt Generation},
  author = {Drift Johnson},
  year = {2025},
  url = {https://github.com/MushroomFleet/zeroprompt-warpBG-JSX},
  version = {1.0.0}
}
```

### Donate
[![Ko-Fi](https://cdn.ko-fi.com/cdn/kofi3.png?v=3)](https://ko-fi.com/driftjohnson)

---

**Made with ❤️ by Drift Johnson** | [GitHub](https://github.com/MushroomFleet) | [Ko-fi](https://ko-fi.com/driftjohnson)
