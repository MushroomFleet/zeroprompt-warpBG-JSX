import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// =============================================================================
// DEFAULT PROFILE - Embedded fallback
// =============================================================================

const DEFAULT_PROFILE = {
  "name": "Default",
  "description": "Full vocabulary profile with all categories - 188+ trillion combinations",
  "version": "1.0.0",
  
  "templates": [
    "{subject} {action} {environment}, {style}, {lighting}, {camera}, {details}, {mood} atmosphere",
    "{camera} of {subject} {action} {environment}, {style}, {lighting}, {details}, {mood}",
    "{style} {subject}, {environment}, {lighting}, {mood} mood, {details}",
    "{subject} in {environment}, {mood} {style}, {lighting}, {camera}, {details}",
    "{mood} scene of {subject} {action} {environment}, {style}, {lighting}, {details}",
    "{style} depicting {subject}, {environment} setting, {lighting}, {camera}",
    "{camera}, {subject} {action} {environment}, {style}, {mood}, {details}",
    "{subject}, {environment}, {style}, {lighting}, {mood} atmosphere, {details}"
  ],
  
  "pools": {
    "subject": [
      "a woman", "a man", "a young woman", "a young man", "an elderly woman",
      "an elderly man", "a child", "a teenager", "a couple", "a group of people",
      "a knight", "a wizard", "a witch", "a sorceress", "a necromancer",
      "a paladin", "a rogue", "an assassin", "a ranger", "a barbarian",
      "a druid", "a monk", "a bard", "a warlock", "an elven archer",
      "a dwarven smith", "an orc warrior", "a goblin", "a fairy", "a nymph",
      "a cyborg", "an android", "a robot", "a mech pilot", "an astronaut",
      "a space marine", "an alien", "a hacker", "a scientist", "a bounty hunter",
      "a samurai", "a ninja", "a viking", "a gladiator", "a pharaoh",
      "a geisha", "a shogun", "a roman soldier", "a medieval peasant", "a noble",
      "a detective", "a soldier", "a pilot", "a doctor", "an artist",
      "a musician", "a dancer", "an athlete", "a chef", "a photographer",
      "a dragon", "a phoenix", "a griffin", "a unicorn", "a werewolf",
      "a vampire", "a demon", "an angel", "a ghost", "a spirit",
      "a wolf", "a lion", "a tiger", "an eagle", "a raven",
      "a serpent", "a whale", "a shark", "a butterfly", "a spider",
      "a mechanical spider", "a clockwork automaton", "a golem", "a sentient statue",
      "a living shadow", "an elemental being", "a slime creature", "a treant"
    ],
    
    "action": [
      "standing in", "sitting in", "kneeling in", "floating above", "hovering over",
      "resting in", "meditating in", "posing in", "waiting in", "watching over",
      "walking through", "running through", "flying over", "swimming in", "climbing",
      "falling into", "descending into", "ascending toward", "emerging from", "diving into",
      "fighting in", "battling through", "defending", "attacking", "dueling in",
      "charging through", "retreating from", "ambushing in", "hunting in",
      "exploring", "discovering", "searching through", "investigating",
      "uncovering secrets in", "finding treasure in", "mapping",
      "summoning power in", "casting a spell in", "channeling energy in",
      "communing with nature in", "praying in", "performing a ritual in",
      "transforming in", "shapeshifting in", "awakening in",
      "mourning in", "celebrating in", "contemplating in", "dreaming in",
      "remembering in", "lost in thought in"
    ],
    
    "environment": [
      "a dark forest", "an enchanted forest", "a misty forest", "a bamboo forest",
      "a snowy mountain", "a volcanic mountain", "a floating mountain",
      "a vast desert", "an oasis", "a canyon", "a waterfall", "a river",
      "a beach at sunset", "a stormy sea", "a coral reef", "an underwater cavern",
      "a medieval castle", "a ruined fortress", "a gothic cathedral",
      "an ancient temple", "a hidden shrine", "a sacred grove",
      "a wizard's tower", "an alchemist's laboratory", "a royal throne room",
      "a dungeon", "catacombs", "a crypt", "a graveyard at midnight",
      "a cyberpunk city", "a neon-lit alley", "a futuristic metropolis",
      "a space station", "an alien planet", "a terraformed moon",
      "a dystopian wasteland", "a post-apocalyptic city", "a megastructure",
      "a virtual reality world", "inside a computer mainframe",
      "a crystal cave", "a bioluminescent cavern", "a floating island",
      "the astral plane", "between dimensions", "the void",
      "a pocket dimension", "a mirror world", "a dream realm",
      "cherry blossom gardens", "an autumn forest", "a field of flowers",
      "under the northern lights", "during a solar eclipse",
      "at the edge of the world", "at the crossroads of fate"
    ],
    
    "style": [
      "photorealistic", "hyperrealistic", "cinematic", "film still",
      "documentary photography", "portrait photography", "fashion photography",
      "oil painting", "watercolor painting", "acrylic painting", "gouache",
      "charcoal drawing", "pencil sketch", "ink drawing", "fresco",
      "art nouveau", "art deco", "baroque", "renaissance", "romanticism",
      "impressionist", "expressionist", "surrealist", "cubist",
      "pre-raphaelite", "ukiyo-e", "chinese ink wash",
      "concept art", "digital painting", "matte painting", "3D render",
      "low poly 3D", "voxel art", "pixel art", "vector art",
      "anime style", "manga style", "studio ghibli style", "disney style",
      "pixar style", "cartoon style", "comic book style", "graphic novel style",
      "vaporwave aesthetic", "synthwave", "cyberpunk aesthetic", "solarpunk",
      "dark academia", "cottagecore", "steampunk", "dieselpunk", "biopunk",
      "dark souls style", "elden ring style", "final fantasy style",
      "metal gear style", "borderlands style", "breath of the wild style"
    ],
    
    "lighting": [
      "golden hour lighting", "blue hour lighting", "harsh midday sun",
      "soft overcast light", "dappled forest light", "sunset backlight",
      "sunrise light", "moonlight", "starlight",
      "dramatic rim lighting", "chiaroscuro lighting", "spotlight",
      "harsh shadows", "silhouette lighting", "contre-jour",
      "neon lighting", "fluorescent lighting", "candlelight", "firelight",
      "bioluminescent glow", "magical glow", "holographic light",
      "volumetric lighting", "god rays", "light shafts", "foggy atmosphere",
      "misty atmosphere", "dusty atmosphere", "rainy atmosphere",
      "warm lighting", "cool lighting", "neutral lighting",
      "high contrast", "low key lighting", "high key lighting"
    ],
    
    "camera": [
      "extreme close-up", "close-up portrait", "medium shot", "full body shot",
      "wide shot", "extreme wide shot", "establishing shot",
      "eye level", "low angle shot", "high angle shot", "bird's eye view",
      "worm's eye view", "dutch angle", "overhead shot",
      "first person view", "over the shoulder", "point of view shot",
      "three-quarter view", "profile view", "frontal view", "rear view",
      "shallow depth of field", "deep focus", "bokeh background",
      "motion blur", "long exposure", "tilt-shift", "fisheye lens",
      "wide angle lens", "telephoto compression", "macro shot"
    ],
    
    "details": [
      "highly detailed", "intricate details", "fine details", "subtle details",
      "sharp focus", "crystal clear", "pristine quality",
      "4k", "8k", "high resolution", "ultra HD",
      "masterpiece", "award winning", "professional", "museum quality",
      "trending on artstation", "featured on behance", "gallery quality",
      "ray tracing", "global illumination", "subsurface scattering",
      "ambient occlusion", "realistic textures", "photogrammetry",
      "expressive brushwork", "visible brushstrokes", "smooth gradients",
      "rich colors", "vibrant palette", "muted tones", "monochromatic"
    ],
    
    "mood": [
      "serene", "peaceful", "tranquil", "joyful", "euphoric",
      "whimsical", "playful", "romantic", "hopeful", "triumphant",
      "ominous", "foreboding", "melancholic", "sorrowful", "tragic",
      "terrifying", "horrific", "unsettling", "disturbing",
      "mysterious", "enigmatic", "surreal", "dreamlike", "ethereal",
      "nostalgic", "bittersweet", "contemplative", "introspective",
      "tense", "intense", "chaotic", "explosive", "dynamic",
      "calm", "still", "quiet", "subtle", "understated",
      "epic", "grand", "intimate", "cozy", "lonely", "isolated",
      "crowded", "bustling", "abandoned", "timeless"
    ]
  }
};

// =============================================================================
// PROFILE MANAGEMENT
// =============================================================================

function validateProfile(profile) {
  if (!profile.templates || !Array.isArray(profile.templates) || profile.templates.length === 0) {
    throw new Error("Profile must have 'templates' array with at least one template");
  }
  
  if (!profile.pools || typeof profile.pools !== 'object') {
    throw new Error("Profile must have 'pools' object");
  }
  
  for (const [key, pool] of Object.entries(profile.pools)) {
    if (!Array.isArray(pool) || pool.length === 0) {
      throw new Error(`Pool '${key}' must be a non-empty array`);
    }
  }
  
  return true;
}

function calculateCombinations(profile) {
  let total = profile.templates.length;
  for (const pool of Object.values(profile.pools)) {
    total *= pool.length;
  }
  return total;
}

// =============================================================================
// HASH FUNCTIONS - Position-is-Seed
// =============================================================================

function simpleHash(seed, ...coords) {
  let hash = seed & 0xFFFFFFFF;
  for (let coord of coords) {
    hash ^= coord;
    hash = Math.imul(hash, 0x01000193);
  }
  return Math.abs(hash);
}

function hashToIndex(hash, poolSize) {
  return hash % poolSize;
}

function generatePrompt(seed, promptIdx, profile) {
  const templates = profile.templates;
  const pools = profile.pools;
  
  // Select template
  const templateHash = simpleHash(seed, promptIdx, 0);
  const template = templates[hashToIndex(templateHash, templates.length)];
  
  // Generate components
  const components = {};
  let i = 1;
  for (const [key, pool] of Object.entries(pools)) {
    const componentHash = simpleHash(seed, promptIdx, i);
    components[key] = pool[hashToIndex(componentHash, pool.length)];
    i++;
  }
  
  // Format template
  let result = template;
  for (const [key, value] of Object.entries(components)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  
  return result;
}

// =============================================================================
// REACT COMPONENT
// =============================================================================

const ZeroPromptWarpBGV2 = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const billboardsRef = useRef([]);
  const particlesRef = useRef(null);
  
  // Profile state
  const [profiles, setProfiles] = useState([
    { name: 'default.json', data: DEFAULT_PROFILE }
  ]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profileError, setProfileError] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  
  // WebGL error state
  const [webglError, setWebglError] = useState(null);
  
  // Generation parameters
  const seedRef = useRef(Math.floor(Math.random() * 0xFFFFFFFF));
  const [seed, setSeed] = useState(seedRef.current);
  const promptIndexRef = useRef(0);
  
  // Speed control
  const DEFAULT_SPEED = 1.0;
  const speedRef = useRef(DEFAULT_SPEED);
  const targetSpeedRef = useRef(DEFAULT_SPEED);
  const [displaySpeed, setDisplaySpeed] = useState(DEFAULT_SPEED);
  const LERP_FACTOR = 0.05;
  
  // Direction control
  const directionForwardRef = useRef(true);
  const [isForward, setIsForward] = useState(true);
  
  // UI state
  const [showControls, setShowControls] = useState(true);
  const fileInputRef = useRef(null);

  // Get current profile
  const currentProfile = profiles[currentProfileIndex]?.data || DEFAULT_PROFILE;

  // Handle profile upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        validateProfile(json);
        
        // Add new profile
        setProfiles(prev => [...prev, { name: file.name, data: json }]);
        setCurrentProfileIndex(profiles.length);
        setProfileError(null);
        setShowUpload(false);
        
        // Reset seed to explore new profile
        const newSeed = Math.floor(Math.random() * 0xFFFFFFFF);
        seedRef.current = newSeed;
        setSeed(newSeed);
        
      } catch (error) {
        setProfileError(`Error loading profile: ${error.message}`);
      }
    };
    
    reader.onerror = () => {
      setProfileError('Failed to read file');
    };
    
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Three.js setup
  useEffect(() => {
    // Check for WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebglError('WebGL is not supported in your browser. Please try a different browser or enable hardware acceleration.');
      return;
    }

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 0;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      if (!containerRef.current) {
        setWebglError('Container not ready');
        return;
      }
      
      // Clear any existing canvas elements first
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

    // Keyboard controls
    const handleKeyPress = (event) => {
      if (event.key === '1') {
        // Slower (decrease by 10%)
        targetSpeedRef.current = Math.max(0.1, targetSpeedRef.current * 0.9);
        setDisplaySpeed(targetSpeedRef.current);
      } else if (event.key === '2') {
        // Reset to default
        targetSpeedRef.current = DEFAULT_SPEED;
        setDisplaySpeed(DEFAULT_SPEED);
      } else if (event.key === '3') {
        // Faster (increase by 10%)
        targetSpeedRef.current = Math.min(5.0, targetSpeedRef.current * 1.1);
        setDisplaySpeed(targetSpeedRef.current);
      } else if (event.key === '5') {
        // Reverse direction
        directionForwardRef.current = !directionForwardRef.current;
        setIsForward(directionForwardRef.current);
      } else if (event.key === 's' || event.key === 'S') {
        const newSeed = Math.floor(Math.random() * 0xFFFFFFFF);
        seedRef.current = newSeed;
        setSeed(newSeed);
      } else if (event.key === 'h' || event.key === 'H') {
        setShowControls(prev => !prev);
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);

    // Billboard creation with elastic multi-line support and speed-based scaling
    const createBillboard = (index, currentSpeed, isForward) => {
      promptIndexRef.current += 1;
      const promptText = generatePrompt(seedRef.current, promptIndexRef.current, currentProfile);
      
      // Inverse speed scaling: slower = larger text, faster = smaller text
      // Speed range: 0.1 to 5.0
      // Scale range: 2.0x at 0.1 speed down to 0.6x at 5.0 speed
      const speedScale = Math.max(0.6, Math.min(2.0, 1.0 / Math.sqrt(currentSpeed)));
      
      // Text wrapping function - wraps at ~50 characters per line
      const wrapText = (text, maxCharsPerLine = 50) => {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          if (testLine.length <= maxCharsPerLine) {
            currentLine = testLine;
          } else {
            if (currentLine) {
              lines.push(currentLine);
            }
            currentLine = word;
          }
        }
        if (currentLine) {
          lines.push(currentLine);
        }
        
        return lines;
      };
      
      const lines = wrapText(promptText, 50);
      const numLines = Math.max(1, lines.length);
      
      // Dynamic canvas sizing based on text and speed
      const charsPerLine = Math.max(...lines.map(l => l.length));
      const baseFontSize = 42;
      const fontSize = Math.floor(baseFontSize * speedScale);
      const lineHeight = Math.floor(60 * speedScale);
      const padding = Math.floor(40 * speedScale);
      
      const canvasWidth = Math.max(1024, Math.floor(charsPerLine * 20 * speedScale));
      const canvasHeight = (numLines * lineHeight) + (padding * 2);
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      // Background
      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw multi-line text with scaled font
      context.fillStyle = '#00CED1';
      context.font = `bold ${fontSize}px monospace`;
      context.textAlign = 'center';
      context.textBaseline = 'top';
      
      const startY = padding;
      lines.forEach((line, i) => {
        context.fillText(line, canvas.width / 2, startY + (i * lineHeight));
      });
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      
      // Elastic geometry - landscape aspect ratio based on text and speed
      // Width scales with speed, height scales with number of lines
      const billboardWidth = 24 * speedScale;
      const billboardHeight = (canvasHeight / canvasWidth) * billboardWidth;
      
      const geometry = new THREE.PlaneGeometry(billboardWidth, billboardHeight);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      
      const billboard = new THREE.Mesh(geometry, material);
      
      const angle = (index / 30) * Math.PI * 2;
      const radius = 15 + (index % 3) * 5;
      const distance = isForward ? 
        -50 - (Math.random() * 100) :
        10 + (Math.random() * 100);
      
      const opacity = 0.3 + Math.random() * 0.5;
      billboard.material.opacity = opacity;
      
      billboard.position.x = Math.cos(angle) * radius;
      billboard.position.y = Math.sin(angle) * radius - 5;
      billboard.position.z = distance;
      
      billboard.lookAt(camera.position);
      
      billboard.userData = {
        baseVelocity: 2 + Math.random() * 1,
        initialZ: distance,
        baseOpacity: opacity
      };
      
      scene.add(billboard);
      return billboard;
    };

    // Create initial billboards
    const numBillboards = 30;
    for (let i = 0; i < numBillboards; i++) {
      billboardsRef.current.push(createBillboard(i, DEFAULT_SPEED, true));
    }

    // Create particles
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount);
    const particleInitialZ = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 30;
      
      particlePositions[i3] = Math.cos(angle) * radius;
      particlePositions[i3 + 1] = Math.sin(angle) * radius - 5;
      particlePositions[i3 + 2] = -Math.random() * 200;
      
      particleVelocities[i] = 2 + Math.random() * 1;
      particleInitialZ[i] = particlePositions[i3 + 2];
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00CED1,
      size: 0.2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.userData.velocities = particleVelocities;
    particles.userData.initialZ = particleInitialZ;
    particles.userData.activeCount = particleCount;
    scene.add(particles);
    particlesRef.current = particles;

    // Animation loop
    let animationId = null;
    let isAnimating = true;
    
    const animate = () => {
      if (!isAnimating) return;
      
      animationId = requestAnimationFrame(animate);
      
      speedRef.current += (targetSpeedRef.current - speedRef.current) * LERP_FACTOR;
      const isForward = directionForwardRef.current;
      
      // Update billboards
      billboardsRef.current.forEach((billboard, index) => {
        billboard.lookAt(camera.position);
        
        if (isForward) {
          billboard.position.z += billboard.userData.baseVelocity * speedRef.current;
        } else {
          billboard.position.z -= billboard.userData.baseVelocity * speedRef.current;
        }
        
        if (!isForward) {
          const fadeStartDistance = -50;
          const fadeEndDistance = -150;
          
          if (billboard.position.z < fadeStartDistance) {
            const fadeProgress = Math.max(0, Math.min(1, 
              (fadeStartDistance - billboard.position.z) / (fadeStartDistance - fadeEndDistance)
            ));
            billboard.material.opacity = billboard.userData.baseOpacity * (1 - fadeProgress);
          } else {
            billboard.material.opacity = billboard.userData.baseOpacity;
          }
        } else {
          billboard.material.opacity = billboard.userData.baseOpacity;
        }
        
        const shouldRecycle = isForward ? 
          (billboard.position.z > 10) : 
          (billboard.position.z < -150);
        
        if (shouldRecycle) {
          scene.remove(billboard);
          billboard.geometry.dispose();
          billboard.material.map.dispose();
          billboard.material.dispose();
          
          billboardsRef.current[index] = createBillboard(index, speedRef.current, isForward);
        }
      });
      
      // Dynamic particle count based on speed (direct relationship)
      // Slower = fewer particles for calmer visuals, Faster = more particles for intensity
      // Speed 0.1 -> ~190 particles, Speed 1.0 -> 1000 particles, Speed 5.0 -> 1000 particles (capped)
      const targetParticleCount = Math.floor(Math.min(1000, 100 + (speedRef.current * 900)));
      particles.userData.activeCount = targetParticleCount;
      
      const positions = particles.geometry.attributes.position.array;
      const velocities = particles.userData.velocities;
      const initialZ = particles.userData.initialZ;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        if (i < particles.userData.activeCount) {
          if (isForward) {
            positions[i3 + 2] += velocities[i] * speedRef.current;
            if (positions[i3 + 2] > 10) {
              positions[i3 + 2] = -200;
              initialZ[i] = -200;
            }
          } else {
            positions[i3 + 2] -= velocities[i] * speedRef.current;
            if (positions[i3 + 2] < -200) {
              positions[i3 + 2] = 10;
              initialZ[i] = 10;
            }
          }
        } else {
          positions[i3 + 2] = -10000;
        }
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      isAnimating = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keypress', handleKeyPress);
      
      if (billboardsRef.current && scene) {
        billboardsRef.current.forEach(billboard => {
          if (billboard && scene) {
            scene.remove(billboard);
            if (billboard.geometry) billboard.geometry.dispose();
            if (billboard.material) {
              if (billboard.material.map) billboard.material.map.dispose();
              billboard.material.dispose();
            }
          }
        });
      }
      
      if (particles && scene) {
        scene.remove(particles);
        if (particles.geometry) particles.geometry.dispose();
        if (particles.material) particles.material.dispose();
      }
      
      if (renderer) {
        renderer.dispose();
        if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
    } catch (error) {
      console.error('WebGL initialization error:', error);
      setWebglError(`Failed to initialize 3D graphics: ${error.message}`);
    }
  }, [currentProfile, seed]);

  const profileStats = currentProfile ? {
    name: currentProfile.name || 'Unknown',
    templates: currentProfile.templates?.length || 0,
    pools: Object.keys(currentProfile.pools || {}).length,
    combinations: calculateCombinations(currentProfile)
  } : null;

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', position: 'fixed', top: 0, left: 0 }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      
      {/* WebGL Error Display */}
      {webglError && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.95)',
          border: '2px solid #ff0000',
          borderRadius: '12px',
          padding: '40px',
          color: '#ff6666',
          fontFamily: 'monospace',
          fontSize: '16px',
          maxWidth: '600px',
          textAlign: 'center',
          zIndex: 9999
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#ff0000' }}>
            ⚠ WebGL Error
          </div>
          <div style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            {webglError}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.8, lineHeight: '1.6' }}>
            <div style={{ marginBottom: '10px' }}>Try the following:</div>
            <div>• Refresh the page</div>
            <div>• Enable hardware acceleration in browser settings</div>
            <div>• Update your graphics drivers</div>
            <div>• Try a different browser (Chrome, Firefox, Edge)</div>
          </div>
        </div>
      )}
      
      {/* Control Panel */}
      {!webglError && showControls && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.85)',
          border: '2px solid #00CED1',
          borderRadius: '8px',
          padding: '20px',
          color: '#00CED1',
          fontFamily: 'monospace',
          fontSize: '14px',
          minWidth: '320px',
          maxWidth: '400px',
          maxHeight: '80vh',
          overflowY: 'auto',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #00CED1' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>ZeroPrompt Warp V2</div>
            <div style={{ fontSize: '11px', opacity: 0.7 }}>Multi-line Elastic Billboards</div>
          </div>
          
          {/* Profile Management */}
          <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #00CED144' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Profile</div>
            
            <select
              value={currentProfileIndex}
              onChange={(e) => setCurrentProfileIndex(parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '8px',
                background: '#000',
                color: '#00CED1',
                border: '1px solid #00CED1',
                borderRadius: '4px',
                fontFamily: 'monospace',
                marginBottom: '8px'
              }}
            >
              {profiles.map((profile, index) => (
                <option key={index} value={index}>{profile.name}</option>
              ))}
            </select>
            
            <button
              onClick={() => setShowUpload(!showUpload)}
              style={{
                width: '100%',
                padding: '8px',
                background: '#00CED1',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '8px'
              }}
            >
              {showUpload ? 'Cancel Upload' : 'Upload Profile'}
            </button>
            
            {showUpload && (
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                style={{
                  width: '100%',
                  padding: '8px',
                  background: '#000',
                  color: '#00CED1',
                  border: '1px solid #00CED1',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '12px'
                }}
              />
            )}
            
            {profileError && (
              <div style={{
                padding: '8px',
                background: '#ff000022',
                border: '1px solid #ff0000',
                borderRadius: '4px',
                color: '#ff6666',
                fontSize: '11px',
                marginTop: '8px'
              }}>
                {profileError}
              </div>
            )}
            
            {profileStats && (
              <div style={{ fontSize: '11px', marginTop: '8px', opacity: 0.8 }}>
                <div>Templates: {profileStats.templates}</div>
                <div>Pools: {profileStats.pools}</div>
                <div>Combinations: {profileStats.combinations.toExponential(2)}</div>
              </div>
            )}
          </div>
          
          {/* Generation Controls */}
          <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #00CED144' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Generation</div>
            <div style={{ fontSize: '11px', marginBottom: '4px' }}>Seed: {seed.toString(16).toUpperCase()}</div>
            <button
              onClick={() => {
                const newSeed = Math.floor(Math.random() * 0xFFFFFFFF);
                seedRef.current = newSeed;
                setSeed(newSeed);
              }}
              style={{
                width: '100%',
                padding: '6px',
                background: '#00CED122',
                color: '#00CED1',
                border: '1px solid #00CED1',
                borderRadius: '4px',
                fontFamily: 'monospace',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              New Seed (S)
            </button>
          </div>
          
          {/* Speed Controls */}
          <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #00CED144' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Speed: {displaySpeed.toFixed(2)}x</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  targetSpeedRef.current = Math.max(0.1, targetSpeedRef.current * 0.9);
                  setDisplaySpeed(targetSpeedRef.current);
                }}
                style={{
                  flex: 1,
                  padding: '6px',
                  background: '#00CED122',
                  color: '#00CED1',
                  border: '1px solid #00CED1',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                -10% (1)
              </button>
              <button
                onClick={() => {
                  targetSpeedRef.current = DEFAULT_SPEED;
                  setDisplaySpeed(DEFAULT_SPEED);
                }}
                style={{
                  flex: 1,
                  padding: '6px',
                  background: '#00CED122',
                  color: '#00CED1',
                  border: '1px solid #00CED1',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Reset (2)
              </button>
              <button
                onClick={() => {
                  targetSpeedRef.current = Math.min(5.0, targetSpeedRef.current * 1.1);
                  setDisplaySpeed(targetSpeedRef.current);
                }}
                style={{
                  flex: 1,
                  padding: '6px',
                  background: '#00CED122',
                  color: '#00CED1',
                  border: '1px solid #00CED1',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                +10% (3)
              </button>
            </div>
          </div>
          
          {/* Direction Control */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Direction: {isForward ? 'Forward' : 'Backward'}
            </div>
            <button
              onClick={() => {
                directionForwardRef.current = !directionForwardRef.current;
                setIsForward(!isForward);
              }}
              style={{
                width: '100%',
                padding: '6px',
                background: '#00CED122',
                color: '#00CED1',
                border: '1px solid #00CED1',
                borderRadius: '4px',
                fontFamily: 'monospace',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Reverse (5)
            </button>
          </div>
          
          {/* Keyboard Shortcuts */}
          <div style={{ fontSize: '11px', opacity: 0.6 }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Keyboard Shortcuts:</div>
            <div>1: -10% • 2: Reset • 3: +10%</div>
            <div>5: Reverse • S: New Seed • H: Toggle UI</div>
          </div>
        </div>
      )}
      
      {/* Toggle UI Button (always visible) */}
      {!webglError && !showControls && (
        <button
          onClick={() => setShowControls(true)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 16px',
            background: 'rgba(0, 206, 209, 0.2)',
            border: '2px solid #00CED1',
            borderRadius: '8px',
            color: '#00CED1',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          Show Controls (H)
        </button>
      )}
    </div>
  );
};

export default ZeroPromptWarpBGV2;
