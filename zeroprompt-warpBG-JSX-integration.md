# ZeroPrompt WarpBG JSX - Integration Guide

This guide will help you integrate the ZeroPrompt WarpBG component into your React projects.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Basic Integration](#basic-integration)
- [Framework-Specific Integration](#framework-specific-integration)
  - [Create React App](#create-react-app)
  - [Next.js](#nextjs)
  - [Vite](#vite)
  - [Vanilla HTML/JS](#vanilla-htmljs)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before integrating ZeroPrompt WarpBG, ensure you have:

- **React 18+** installed in your project
- **Three.js** library (`three`)
- Node.js and npm/yarn/pnpm

---

## Installation

### 1. Install Dependencies

```bash
npm install three
# or
yarn add three
# or
pnpm add three
```

### 2. Copy the Component

Copy `ZeroPromptWarpBG.jsx` into your project's components directory:

```
your-project/
├── src/
│   ├── components/
│   │   └── ZeroPromptWarpBG.jsx
│   └── ...
```

---

## Basic Integration

### Importing the Component

```jsx
import ZeroPromptWarpBG from './components/ZeroPromptWarpBG';

function App() {
  return (
    <div>
      <ZeroPromptWarpBG />
      {/* Your other components */}
    </div>
  );
}

export default App;
```

### Using as Background

```jsx
import ZeroPromptWarpBG from './components/ZeroPromptWarpBG';

function App() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Background layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
        <ZeroPromptWarpBG />
      </div>
      
      {/* Foreground content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Your Content Here</h1>
      </div>
    </div>
  );
}

export default App;
```

---

## Framework-Specific Integration

### Create React App

1. **Install dependencies:**
   ```bash
   npm install three
   ```

2. **Import and use:**
   ```jsx
   // src/App.js
   import React from 'react';
   import ZeroPromptWarpBG from './components/ZeroPromptWarpBG';
   import './App.css';

   function App() {
     return (
       <div className="App">
         <ZeroPromptWarpBG />
       </div>
     );
   }

   export default App;
   ```

3. **CSS (optional):**
   ```css
   /* src/App.css */
   .App {
     width: 100vw;
     height: 100vh;
     overflow: hidden;
   }
   ```

---

### Next.js

Since Three.js uses browser APIs, you need to use dynamic imports with SSR disabled.

1. **Install dependencies:**
   ```bash
   npm install three
   ```

2. **Create a wrapper component:**
   ```jsx
   // components/WarpBGWrapper.js
   'use client'; // For Next.js 13+ App Router
   
   import dynamic from 'next/dynamic';

   const ZeroPromptWarpBG = dynamic(
     () => import('./ZeroPromptWarpBG'),
     { ssr: false }
   );

   export default function WarpBGWrapper() {
     return <ZeroPromptWarpBG />;
   }
   ```

3. **Use in your page:**
   ```jsx
   // app/page.js (App Router)
   import WarpBGWrapper from '@/components/WarpBGWrapper';

   export default function Home() {
     return (
       <main>
         <WarpBGWrapper />
       </main>
     );
   }
   ```

   **OR for Pages Router:**
   ```jsx
   // pages/index.js
   import dynamic from 'next/dynamic';

   const WarpBGWrapper = dynamic(
     () => import('../components/WarpBGWrapper'),
     { ssr: false }
   );

   export default function Home() {
     return <WarpBGWrapper />;
   }
   ```

---

### Vite

1. **Install dependencies:**
   ```bash
   npm install three
   ```

2. **Import and use directly:**
   ```jsx
   // src/App.jsx
   import ZeroPromptWarpBG from './components/ZeroPromptWarpBG';

   function App() {
     return (
       <div className="app-container">
         <ZeroPromptWarpBG />
       </div>
     );
   }

   export default App;
   ```

3. **Vite configuration (if needed):**
   ```js
   // vite.config.js
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     optimizeDeps: {
       include: ['three']
     }
   });
   ```

---

### Vanilla HTML/JS

Use the provided `demo.html` as a reference. Key points:

1. **Include React and Three.js via CDN:**
   ```html
   <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
   <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
   <script type="importmap">
     {
       "imports": {
         "three": "https://unpkg.com/three@0.157.0/build/three.module.js"
       }
     }
   </script>
   ```

2. **Use Babel standalone for JSX:**
   ```html
   <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
   <script type="text/babel" data-type="module">
     // Your component code here
   </script>
   ```

---

## Customization

### Keyboard Controls

The component includes built-in keyboard controls:

| Key | Action |
|-----|--------|
| `1` | Decrease speed by 10% |
| `2` | Reset to default speed |
| `3` | Increase speed by 10% |
| `5` | Toggle direction (forward/backward) |

### Modifying Default Values

Edit the component constants to customize behavior:

```jsx
// In ZeroPromptWarpBG.jsx

// Change default speed
const DEFAULT_SPEED = 1.5; // Original: 1.0

// Change lerp smoothness
const LERP_FACTOR = 0.1; // Original: 0.05 (higher = faster transitions)

// Change number of billboards
const numBillboards = 50; // Original: 30

// Change particle count
const particleCount = 2000; // Original: 1000
```

### Customizing Vocabulary Pools

Modify the vocabulary arrays to generate different prompts:

```jsx
// Add your own subjects
const SUBJECTS = [
  "a custom character",
  "your subject here",
  // ... add more
];

// Customize other pools similarly
```

### Styling Billboard Text

Modify the canvas rendering in `createBillboard()`:

```jsx
// Change text color
context.fillStyle = '#FF00FF'; // Original: '#ffffff'

// Change font
context.font = `bold ${fontSize}px "Custom Font", Arial`;

// Add text shadow
context.shadowColor = 'rgba(0, 206, 209, 0.5)';
context.shadowBlur = 10;
```

### Customizing Particles

Modify particle appearance:

```jsx
const particleMaterial = new THREE.PointsMaterial({
  color: 0xFF1493,      // Change color (original: 0x00CED1 teal)
  size: 0.5,            // Change size (original: 0.2)
  transparent: true,
  opacity: 0.8,         // Change opacity (original: 0.6)
  blending: THREE.AdditiveBlending
});
```

---

## Troubleshooting

### Issue: "Module not found: three"

**Solution:**
```bash
npm install three
# or ensure it's in your package.json dependencies
```

### Issue: Black screen or nothing renders

**Checklist:**
- Ensure the container div has proper dimensions (width/height)
- Check browser console for Three.js errors
- Verify React 18+ is installed
- Check that the component is properly imported

### Issue: Next.js "window is not defined"

**Solution:** Use dynamic imports with SSR disabled (see [Next.js section](#nextjs))

### Issue: Performance problems

**Solutions:**
- Reduce `numBillboards` (default: 30)
- Reduce `particleCount` (default: 1000)
- Lower canvas resolution in `createBillboard()`:
  ```jsx
  canvas.width = 1024;  // Original: 2048
  canvas.height = 384;  // Original: 768
  ```

### Issue: Text too small/large

**Solution:** Adjust the fontSize calculation in `createBillboard()`:
```jsx
const fontSize = Math.floor(150 / Math.max(0.5, currentSpeed)); // Original: 120
```

---

## Advanced: Programmatic Control

### Controlling Speed Programmatically

Modify the component to accept props:

```jsx
const ZeroPromptWarpBG = ({ initialSpeed = 1.0, onSpeedChange }) => {
  const speedRef = useRef(initialSpeed);
  const targetSpeedRef = useRef(initialSpeed);
  
  // Expose speed control
  useEffect(() => {
    if (onSpeedChange) {
      onSpeedChange({
        setSpeed: (newSpeed) => {
          targetSpeedRef.current = Math.max(0.1, Math.min(5.0, newSpeed));
        },
        getSpeed: () => speedRef.current
      });
    }
  }, [onSpeedChange]);
  
  // ... rest of component
};
```

Usage:
```jsx
function App() {
  const [speedControl, setSpeedControl] = useState(null);
  
  const handleSlowDown = () => {
    if (speedControl) {
      speedControl.setSpeed(speedControl.getSpeed() * 0.5);
    }
  };
  
  return (
    <div>
      <ZeroPromptWarpBG onSpeedChange={setSpeedControl} />
      <button onClick={handleSlowDown}>Slow Down</button>
    </div>
  );
}
```

---

## Best Practices

1. **Use as background:** Place the component in a fixed position with `z-index: -1` for background effects
2. **Performance:** Monitor frame rate and adjust settings for your target devices
3. **Accessibility:** Consider adding a pause/disable option for users sensitive to motion
4. **Responsive design:** The component auto-resizes, but test on various screen sizes
5. **Memory management:** Component properly cleans up on unmount, but avoid rapid mount/unmount cycles

---

## Support

For issues, questions, or contributions:
- **GitHub Issues:** https://github.com/MushroomFleet/zeroprompt-warpBG-JSX/issues
- **Discussions:** https://github.com/MushroomFleet/zeroprompt-warpBG-JSX/discussions

---

## License

This component is provided as-is for use in your projects. See the repository LICENSE file for details.
