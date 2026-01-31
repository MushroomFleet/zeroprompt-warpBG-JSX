import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// =============================================================================
// ZEROPROMPT VOCABULARY POOLS - Adapted from Python
// =============================================================================

const SUBJECTS = [
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
];

const ACTIONS = [
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
];

const ENVIRONMENTS = [
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
];

const STYLES = [
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
];

const MOOD = [
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
];

const POOLS = {
  subject: SUBJECTS,
  action: ACTIONS,
  environment: ENVIRONMENTS,
  style: STYLES,
  mood: MOOD
};

const TEMPLATES = [
  "{subject} {action} {environment}, {style}, {mood} atmosphere",
  "{subject} {action} {environment}, {mood} {style}",
  "{style} {subject}, {environment}, {mood} mood",
  "{subject} in {environment}, {mood} {style}",
  "{mood} scene of {subject} {action} {environment}, {style}",
  "{style} depicting {subject}, {environment} setting",
  "{subject}, {environment}, {style}, {mood} atmosphere",
  "{subject} {action} {environment}, {style}, {mood}"
];

// =============================================================================
// SIMPLE HASH FUNCTION - JavaScript adaptation
// =============================================================================

function simpleHash(seed, ...coords) {
  // Simple FNV-1a-like hash for deterministic generation
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

function generatePrompt(seed, promptIdx) {
  // Select template
  const templateHash = simpleHash(seed, promptIdx, 0);
  const template = TEMPLATES[hashToIndex(templateHash, TEMPLATES.length)];
  
  // Generate components
  const components = {};
  let i = 1;
  for (const [key, pool] of Object.entries(POOLS)) {
    const componentHash = simpleHash(seed, promptIdx, i);
    components[key] = pool[hashToIndex(componentHash, pool.length)];
    i++;
  }
  
  // Format template
  let result = template;
  for (const [key, value] of Object.entries(components)) {
    result = result.replace(`{${key}}`, value);
  }
  
  // Truncate to 100 characters
  if (result.length > 100) {
    result = result.substring(0, 97) + "...";
  }
  
  return result;
}

// =============================================================================
// REACT COMPONENT
// =============================================================================

const ZeroPromptWarpBG = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const billboardsRef = useRef([]);
  const particlesRef = useRef(null);
  const seedRef = useRef(Math.floor(Math.random() * 0xFFFFFFFF));
  const promptIndexRef = useRef(0);
  
  // Speed control
  const DEFAULT_SPEED = 1.0;
  const speedRef = useRef(DEFAULT_SPEED);
  const targetSpeedRef = useRef(DEFAULT_SPEED);
  const LERP_FACTOR = 0.05; // Smooth interpolation speed
  
  // Direction control (true = forward/towards camera, false = backward/into distance)
  const directionForwardRef = useRef(true);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 0;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Keyboard controls
    const handleKeyPress = (event) => {
      if (event.key === '1') {
        // Decrease speed by 10%
        targetSpeedRef.current = Math.max(0.1, targetSpeedRef.current * 0.9);
      } else if (event.key === '2') {
        // Reset to default speed
        targetSpeedRef.current = DEFAULT_SPEED;
      } else if (event.key === '3') {
        // Increase speed by 10%
        targetSpeedRef.current = Math.min(5.0, targetSpeedRef.current * 1.1);
      } else if (event.key === '5') {
        // Toggle direction
        directionForwardRef.current = !directionForwardRef.current;
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);

    // Billboard creation function
    const createBillboard = (index, currentSpeed, isForward) => {
      // Generate prompt text
      const text = generatePrompt(seedRef.current, promptIndexRef.current++);
      
      // Dynamic text size based on speed (slower = larger)
      // Speed range: 0.1 to 5.0, text size range: 120px (slow) to 40px (fast)
      const fontSize = Math.floor(120 / Math.max(0.5, currentSpeed));
      
      // Create larger landscape canvas for multi-line text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 2048;
      canvas.height = 768;
      
      // Draw background
      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Setup text rendering
      context.fillStyle = '#ffffff';
      context.font = `bold ${fontSize}px Arial`;
      context.textAlign = 'left';
      context.textBaseline = 'top';
      
      // Text wrapping logic
      const maxWidth = canvas.width - 100; // Padding
      const lineHeight = fontSize * 1.2;
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
      
      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
        const metrics = context.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        lines.push(currentLine);
      }
      
      // Center the text block vertically
      const totalHeight = lines.length * lineHeight;
      const startY = (canvas.height - totalHeight) / 2;
      
      // Draw each line
      lines.forEach((line, index) => {
        const y = startY + (index * lineHeight);
        const x = (canvas.width - context.measureText(line).width) / 2;
        context.fillText(line, x, y);
      });
      
      // Create texture and material
      const texture = new THREE.CanvasTexture(canvas);
      const opacity = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: opacity,
        side: THREE.DoubleSide
      });
      
      // Scale billboard size with speed (slower = larger)
      // Base size: 20x7.5 (landscape), scales up when slow
      const sizeMultiplier = 1 / Math.max(0.3, currentSpeed);
      const width = 20 * sizeMultiplier;
      const height = 7.5 * sizeMultiplier;
      
      const geometry = new THREE.PlaneGeometry(width, height);
      const billboard = new THREE.Mesh(geometry, material);
      
      // Random position around the tunnel
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 10;
      
      // Position based on direction
      let distance;
      if (isForward) {
        // Forward: spawn far away, move towards camera
        distance = -50 - Math.random() * 100;
      } else {
        // Backward: spawn behind camera, move into distance
        distance = 5 + Math.random() * 15;
      }
      
      billboard.position.x = Math.cos(angle) * radius;
      billboard.position.y = Math.sin(angle) * radius - 5;
      billboard.position.z = distance;
      
      // Face camera
      billboard.lookAt(camera.position);
      
      billboard.userData = {
        baseVelocity: 2 + Math.random() * 1, // Base movement speed
        initialZ: distance,
        baseOpacity: opacity // Store base opacity for fading
      };
      
      scene.add(billboard);
      return billboard;
    };

    // Create initial billboards
    const numBillboards = 30;
    for (let i = 0; i < numBillboards; i++) {
      billboardsRef.current.push(createBillboard(i, DEFAULT_SPEED, true));
    }

    // Create teal particles
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
      
      particleVelocities[i] = 2 + Math.random() * 1; // Base velocity
      particleInitialZ[i] = particlePositions[i3 + 2];
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00CED1, // Teal
      size: 0.2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.userData.velocities = particleVelocities;
    particles.userData.initialZ = particleInitialZ;
    particles.userData.activeCount = particleCount; // Track active particles
    scene.add(particles);
    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth lerp speed towards target
      speedRef.current += (targetSpeedRef.current - speedRef.current) * LERP_FACTOR;
      
      const isForward = directionForwardRef.current;
      
      // Update billboards
      billboardsRef.current.forEach((billboard, index) => {
        // Always face the camera
        billboard.lookAt(camera.position);
        
        // Move based on direction
        if (isForward) {
          billboard.position.z += billboard.userData.baseVelocity * speedRef.current;
        } else {
          billboard.position.z -= billboard.userData.baseVelocity * speedRef.current;
        }
        
        // Fade out when moving backward into distance
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
          // Reset opacity when moving forward
          billboard.material.opacity = billboard.userData.baseOpacity;
        }
        
        // Recycle billboard based on direction
        const shouldRecycle = isForward ? 
          (billboard.position.z > 10) : 
          (billboard.position.z < -150);
        
        if (shouldRecycle) {
          scene.remove(billboard);
          billboard.geometry.dispose();
          billboard.material.map.dispose();
          billboard.material.dispose();
          
          // Create new billboard with current speed and direction
          billboardsRef.current[index] = createBillboard(index, speedRef.current, isForward);
        }
      });
      
      // Dynamic particle count based on speed (slower = fewer particles)
      // Speed 0.1 -> 100 particles, Speed 1.0 -> 1000 particles, Speed 5.0 -> 1000 particles
      const targetParticleCount = Math.floor(Math.min(1000, 100 + (speedRef.current * 900)));
      particles.userData.activeCount = targetParticleCount;
      
      // Update particles
      const positions = particles.geometry.attributes.position.array;
      const velocities = particles.userData.velocities;
      const initialZ = particles.userData.initialZ;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Only update active particles (hide inactive ones by moving them far away)
        if (i < particles.userData.activeCount) {
          // Move based on direction
          if (isForward) {
            positions[i3 + 2] += velocities[i] * speedRef.current;
            
            // Recycle particle - forward direction
            if (positions[i3 + 2] > 10) {
              positions[i3 + 2] = -200;
              initialZ[i] = -200;
            }
          } else {
            positions[i3 + 2] -= velocities[i] * speedRef.current;
            
            // Recycle particle - backward direction
            if (positions[i3 + 2] < -200) {
              positions[i3 + 2] = 10;
              initialZ[i] = 10;
            }
          }
        } else {
          // Hide inactive particles
          positions[i3 + 2] = -10000;
        }
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keypress', handleKeyPress);
      
      billboardsRef.current.forEach(billboard => {
        scene.remove(billboard);
        billboard.geometry.dispose();
        billboard.material.map.dispose();
        billboard.material.dispose();
      });
      
      scene.remove(particles);
      particles.geometry.dispose();
      particles.material.dispose();
      
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    />
  );
};

export default ZeroPromptWarpBG;
