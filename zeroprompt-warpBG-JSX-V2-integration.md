# ZeroPrompt WarpBG JSX V2 - Integration Guide

Complete guide for integrating the ZeroPrompt Warp Background component into your React projects.

## Table of Contents

1. [Quick Start](#quick-start)
2. [React Integration](#react-integration)
3. [Next.js Integration](#nextjs-integration)
4. [Vite Integration](#vite-integration)
5. [Custom Profile Integration](#custom-profile-integration)
6. [Component API](#component-api)
7. [Customization](#customization)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

- Node.js 16+ or modern browser with ES6+ support
- React 18+
- Three.js r128+

### Installation

```bash
# Install dependencies
npm install react react-dom three
# or
yarn add react react-dom three
```

---

## React Integration

### Step 1: Copy Component File

Copy `ZeroPromptWarpBG-V2.jsx` to your project:

```
src/
├── components/
│   └── ZeroPromptWarpBG-V2.jsx
└── App.jsx
```

### Step 2: Import and Use

```jsx
import React from 'react';
import ZeroPromptWarpBGV2 from './components/ZeroPromptWarpBG-V2';

function App() {
  return (
    <div className="App">
      <ZeroPromptWarpBGV2 />
    </div>
  );
}

export default App;
```

### Step 3: Full-Screen Layout

Ensure the component fills the viewport:

```css
/* App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```

---

## Next.js Integration

### Step 1: Create Component

Place component in `components/` directory:

```
components/
└── ZeroPromptWarpBG-V2.jsx
```

### Step 2: Dynamic Import (Client-Side Only)

Three.js requires browser environment. Use dynamic import with `ssr: false`:

```jsx
// pages/index.js or app/page.js
import dynamic from 'next/dynamic';

const ZeroPromptWarpBG = dynamic(
  () => import('../components/ZeroPromptWarpBG-V2'),
  { 
    ssr: false,
    loading: () => (
      <div style={{
        width: '100vw',
        height: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#00CED1',
        fontFamily: 'monospace'
      }}>
        Loading 3D Scene...
      </div>
    )
  }
);

export default function Home() {
  return <ZeroPromptWarpBG />;
}
```

### Step 3: Global Styles

```css
/* styles/globals.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```

---

## Vite Integration

### Step 1: Project Setup

```bash
npm create vite@latest my-zeroprompt-app -- --template react
cd my-zeroprompt-app
npm install three
```

### Step 2: Add Component

```
src/
├── components/
│   └── ZeroPromptWarpBG-V2.jsx
├── App.jsx
└── main.jsx
```

### Step 3: Use in App

```jsx
// src/App.jsx
import ZeroPromptWarpBGV2 from './components/ZeroPromptWarpBG-V2';
import './App.css';

function App() {
  return <ZeroPromptWarpBGV2 />;
}

export default App;
```

### Step 4: Index CSS

```css
/* src/index.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
```

---

## Custom Profile Integration

### Method 1: Embedded Profile

Modify the `DEFAULT_PROFILE` constant directly in the component:

```jsx
const DEFAULT_PROFILE = {
  "name": "Custom Profile",
  "description": "My custom vocabulary",
  "version": "1.0.0",
  "templates": [
    "{subject} {action} {environment}, {style}"
  ],
  "pools": {
    "subject": ["a warrior", "a mage"],
    "action": ["fighting in", "exploring"],
    "environment": ["a dungeon", "a castle"],
    "style": ["epic", "dramatic"]
  }
};
```

### Method 2: Profile Upload at Runtime

The component includes built-in profile upload functionality. Users can:

1. Click "Upload Profile" button in the UI
2. Select a `.json` file
3. Profile loads automatically

### Method 3: Programmatic Profile Loading

Add a prop to accept external profiles:

```jsx
// Modified component to accept profile prop
const ZeroPromptWarpBGV2 = ({ initialProfile = null }) => {
  const [profiles, setProfiles] = useState([
    { name: 'default.json', data: initialProfile || DEFAULT_PROFILE }
  ]);
  // ... rest of component
};

// Usage
import customProfile from './profiles/custom.json';

<ZeroPromptWarpBGV2 initialProfile={customProfile} />
```

### Profile JSON Structure

```json
{
  "name": "Profile Name",
  "description": "Description of vocabulary set",
  "version": "1.0.0",
  "templates": [
    "Template string with {placeholders}"
  ],
  "pools": {
    "placeholder": ["value1", "value2", "value3"]
  }
}
```

**Requirements:**
- `templates`: Array of strings with `{placeholder}` syntax
- `pools`: Object with arrays of strings
- All placeholders in templates must have corresponding pools

---

## Component API

### Props

The component currently doesn't accept props by default, but can be extended:

```jsx
// Extended version with props
const ZeroPromptWarpBGV2 = ({ 
  initialSpeed = 1.0,
  initialSeed = null,
  autoStart = true,
  showUI = true,
  onPromptGenerate = null
}) => {
  // Implementation
};
```

### Keyboard Controls

| Key | Action |
|-----|--------|
| `1` | Decrease speed by 10% |
| `2` | Reset speed to 1.0x |
| `3` | Increase speed by 10% |
| `5` | Reverse warp direction |
| `S` | Generate new random seed |
| `H` | Toggle UI visibility |

### Internal State

Access component state for integration:

```jsx
// Example: Expose current prompt via callback
const [currentPrompt, setCurrentPrompt] = useState('');

// In createBillboard function:
const promptText = generatePrompt(seedRef.current, promptIndexRef.current, currentProfile);
setCurrentPrompt(promptText);
if (onPromptGenerate) onPromptGenerate(promptText);
```

---

## Customization

### Change Color Scheme

```jsx
// Modify teal (#00CED1) to your color
const THEME_COLOR = '#FF00FF'; // Purple

// Update in component:
context.fillStyle = THEME_COLOR; // Billboard text
color: THEME_COLOR // Particle color
border: `2px solid ${THEME_COLOR}` // UI borders
```

### Adjust Performance

```jsx
// Reduce billboard count for performance
const numBillboards = 15; // Default: 30

// Reduce particle count
const particleCount = 500; // Default: 1000

// Lower pixel ratio
renderer.setPixelRatio(1); // Default: min(devicePixelRatio, 2)
```

### Modify Text Appearance

```jsx
// In createBillboard function
const baseFontSize = 56; // Default: 42
context.font = `bold ${fontSize}px Arial`; // Different font

// Adjust wrapping width
const wrapText = (text, maxCharsPerLine = 60) => { // Default: 50
```

### Custom Billboard Layout

```jsx
// Adjust positioning
const radius = 20 + (index % 3) * 8; // Default: 15 + (index % 3) * 5
const distance = isForward ? 
  -100 - (Math.random() * 150) : // Default: -50 - (Math.random() * 100)
  20 + (Math.random() * 150);    // Default: 10 + (Math.random() * 100)
```

---

## Troubleshooting

### WebGL Context Lost

**Problem:** White screen with WebGL error after hot reload

**Solution:**
```jsx
// Add to cleanup in useEffect
return () => {
  isAnimating = false;
  if (animationId) cancelAnimationFrame(animationId);
  
  // Force context loss
  if (renderer) {
    renderer.forceContextLoss();
    renderer.dispose();
  }
};
```

### Performance Issues

**Problem:** Low FPS or stuttering

**Solutions:**

1. Reduce billboard count:
```jsx
const numBillboards = 15; // Instead of 30
```

2. Lower particle count:
```jsx
const particleCount = 500; // Instead of 1000
```

3. Disable antialiasing:
```jsx
const renderer = new THREE.WebGLRenderer({ 
  antialias: false // Instead of true
});
```

4. Reduce pixel ratio:
```jsx
renderer.setPixelRatio(1);
```

### Profile Upload Not Working

**Problem:** Profile upload fails silently

**Check:**

1. JSON syntax is valid
2. Required fields present (`templates`, `pools`)
3. File is `.json` extension
4. Browser console for errors

**Debug:**
```jsx
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  console.log('File:', file.name, file.type);
  
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      console.log('Parsed JSON:', json);
      validateProfile(json);
      // ...
    } catch (error) {
      console.error('Parse error:', error);
    }
  };
};
```

### Memory Leaks

**Problem:** Memory usage increases over time

**Solution:**

Ensure proper cleanup in useEffect:

```jsx
return () => {
  // Stop animation
  isAnimating = false;
  if (animationId) cancelAnimationFrame(animationId);
  
  // Dispose billboards
  billboardsRef.current.forEach(billboard => {
    scene.remove(billboard);
    billboard.geometry.dispose();
    billboard.material.map.dispose();
    billboard.material.dispose();
  });
  
  // Dispose particles
  particles.geometry.dispose();
  particles.material.dispose();
  
  // Dispose renderer
  renderer.dispose();
};
```

### Content Security Policy (CSP) Issues

**Problem:** Script loading blocked by CSP when hosting demo

**Symptoms:**
```
Violates the following Content Security Policy directive: "script-src..."
```

**Solution:**

The `demo-V2.html` file is CSP-compliant and uses:
- ✅ **cdnjs.cloudflare.com** (whitelisted CDN)
- ✅ **Pure JavaScript** (no Babel/JSX compilation)
- ✅ **React.createElement** instead of JSX syntax

**For Custom Hosting:**

If you have custom CSP requirements, modify CDN sources:

```html
<!-- Replace cdnjs with your approved CDN -->
<script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
```

**Subfolder Hosting:**

The demo works in any subfolder (e.g., `/prompt-warp-2/`) because:
- All CDN URLs are absolute
- No relative path dependencies
- No local resource requirements

### TypeScript Integration

**Problem:** Type errors in TypeScript project

**Solution:**

Create type definitions:

```typescript
// types/zeroprompt.d.ts
interface ZeroPromptProfile {
  name: string;
  description: string;
  version: string;
  templates: string[];
  pools: {
    [key: string]: string[];
  };
}

interface ZeroPromptWarpBGProps {
  initialProfile?: ZeroPromptProfile;
  initialSpeed?: number;
  initialSeed?: number;
  autoStart?: boolean;
  showUI?: boolean;
}

declare module './components/ZeroPromptWarpBG-V2' {
  const ZeroPromptWarpBGV2: React.FC<ZeroPromptWarpBGProps>;
  export default ZeroPromptWarpBGV2;
}
```

---

## Advanced Integration

### Background Layer

Use as a background with content overlay:

```jsx
function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <ZeroPromptWarpBGV2 />
      </div>
      
      {/* Foreground content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '20px', color: 'white' }}>
        <h1>Your Content Here</h1>
      </div>
    </div>
  );
}
```

### Route-Based Backgrounds

Different profiles for different routes:

```jsx
// With React Router
import { useLocation } from 'react-router-dom';

function BackgroundLayer() {
  const location = useLocation();
  
  const profiles = {
    '/': defaultProfile,
    '/fantasy': fantasyProfile,
    '/scifi': scifiProfile
  };
  
  const currentProfile = profiles[location.pathname] || defaultProfile;
  
  return <ZeroPromptWarpBGV2 initialProfile={currentProfile} />;
}
```

### Event-Driven Interactions

Sync with external events:

```jsx
const ZeroPromptWithEvents = () => {
  const [triggerNewSeed, setTriggerNewSeed] = useState(0);
  
  useEffect(() => {
    const handleCustomEvent = () => {
      setTriggerNewSeed(prev => prev + 1);
    };
    
    window.addEventListener('regeneratePrompts', handleCustomEvent);
    return () => window.removeEventListener('regeneratePrompts', handleCustomEvent);
  }, []);
  
  return <ZeroPromptWarpBGV2 key={triggerNewSeed} />;
};

// Trigger from anywhere:
window.dispatchEvent(new Event('regeneratePrompts'));
```

---

## Best Practices

1. **Performance:** Start with lower billboard/particle counts and increase if performance allows
2. **Memory:** Always implement proper cleanup in useEffect return
3. **Profiles:** Validate custom profiles before deployment
4. **UX:** Provide loading states for slow devices
5. **Accessibility:** Consider motion preferences:

```jsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const DEFAULT_SPEED = prefersReducedMotion ? 0.5 : 1.0;
```

---

## Support

- **Repository:** [github.com/MushroomFleet/zeroprompt-warpBG-JSX](https://github.com/MushroomFleet/zeroprompt-warpBG-JSX)
- **Issues:** Use GitHub Issues for bug reports
- **Discussions:** Use GitHub Discussions for questions

---

## License

MIT License - See repository for details
