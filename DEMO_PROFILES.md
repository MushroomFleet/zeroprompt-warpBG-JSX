# Demo Embedded Profiles

The `demo-V2.html` file includes two embedded profiles for safe public demonstration of the multi-profile feature.

## Why Embedded Instead of Upload?

For public-facing demos hosted on websites, allowing arbitrary file uploads poses security risks:
- Malicious JSON payloads
- XSS attacks via crafted strings
- Server resource abuse
- Unvetted content display

The embedded approach provides:
- ✅ **Security**: No user file uploads = no injection vectors
- ✅ **Quality Control**: Curated, tested profiles only
- ✅ **Performance**: Profiles pre-loaded, instant switching
- ✅ **UX**: Press 'P' to experience different aesthetics immediately

## Included Profiles

### 1. Default Profile
**Purpose:** General AI image generation vocabulary

**Highlights:**
- 8 semantic categories
- Broad subject matter (fantasy, sci-fi, contemporary)
- 188+ trillion combinations
- Great starting point for any project

**Use Cases:**
- General purpose image generation
- Learning prompt structure
- Baseline for custom profiles

### 2. Volkyri Aesthetic Profile
**Purpose:** Specialized sci-fi character aesthetic

**Highlights:**
- 15+ semantic categories
- Highly specific worldbuilding (Hel Vortex system)
- Unique visual signature (asymmetrical horns, metallic bodysuits)
- Demonstrates advanced profile design

**Lore:**
The Volkyri are ancient starfaring warrior-attendants from the Hel Vortex system. Their distinctive appearance features:
- Single half-horn fused to temple (left or right)
- Form-fitting metallic bodysuits
- Dramatic rim lighting and shadow work
- Pale skin tones contrasting dark environments
- Martial elegance and dangerous beauty

**Use Cases:**
- Character design demonstrations
- Worldbuilding examples
- Advanced profile structure reference
- Niche aesthetic generation

## Switching Profiles

### In the Demo
1. Open `demo-V2.html`
2. Press `I` to view controls
3. Press `P` to switch between Default and Volkyri
4. Observe how prompts change instantly
5. Notice text scaling, particle effects remain consistent

### Visual Feedback
When you press `P`:
- Notification appears: "Profile: [Name]"
- Info panel updates current profile name
- All billboards regenerate with new vocabulary
- Seed remains the same (deterministic across profiles)

## For Developers

### Adding More Embedded Profiles

```javascript
// In demo-V2.html, add to profile definitions:

const MY_CUSTOM_PROFILE = {
  "name": "My Custom Profile",
  "description": "Description here",
  "version": "1.0.0",
  "templates": ["..."],
  "pools": { /* ... */ }
};

// Add to registry
const EMBEDDED_PROFILES = {
  'default': DEFAULT_PROFILE,
  'volkyri': VOLKYRI_PROFILE,
  'custom': MY_CUSTOM_PROFILE  // Add here
};

// Update keyboard handler for 3+ profiles
// Instead of toggle, cycle through all profiles
```

### Cycle Through Multiple Profiles

For 3+ profiles, modify the keyboard handler:

```javascript
const profileKeys = Object.keys(EMBEDDED_PROFILES);
let currentIndex = 0;

// In handleKeyPress
else if (event.key === 'p' || event.key === 'P') {
  currentIndex = (currentIndex + 1) % profileKeys.length;
  setSelectedProfile(profileKeys[currentIndex]);
}
```

## Profile Design Tips

### Creating Themed Profiles

Use the Volkyri profile as a template for:
- **Specific Universes**: Star Wars, Warhammer 40k, etc.
- **Art Styles**: Studio Ghibli, Art Nouveau, Cyberpunk
- **Time Periods**: Victorian, Medieval, Future-tech
- **Moods**: Horror, Romance, Epic Fantasy

### Pool Relationships

Notice how Volkyri pools interconnect:
- `horn_shape` + `horn_side` + `horn_sheath` = unique visual signature
- `primary_metal` + `accent_color` = color palette cohesion
- `role` + `expression` + `action` = character personality
- `environment` + `lighting` = atmospheric consistency

This creates **synergistic combinations** rather than random mashups.

### Template Variety

Volkyri includes 4 core templates (shortened from 8 for demo):
- Subject-focused: Emphasizes character details
- Environment-focused: Sets scene context
- Portrait-focused: Close-up character study
- Action-focused: Dynamic poses and situations

Vary templates to create different prompt structures from same pools.

## Technical Implementation

### Profile Storage
```javascript
// Embedded as JavaScript objects (no JSON.parse needed)
const PROFILE = { /* direct object */ };

// Registry for easy lookup
const EMBEDDED_PROFILES = {
  'key': PROFILE_OBJECT
};
```

### Profile Switching
```javascript
// State management
const [selectedProfile, setSelectedProfile] = useState('default');
const currentProfile = EMBEDDED_PROFILES[selectedProfile];

// Triggers re-render when changed
useEffect(() => {
  // ... Three.js setup with currentProfile
}, [seed, selectedProfile]);
```

### Notification System
```javascript
// CSS animation for smooth appearance
@keyframes fadeInOut {
  0% { opacity: 0; transform: scale(0.8); }
  20% { opacity: 1; transform: scale(1); }
  80% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.8); }
}

// JavaScript trigger
notificationEl.textContent = `Profile: ${newProfile}`;
notificationEl.style.display = 'block';
setTimeout(() => {
  notificationEl.style.display = 'none';
}, 2000);
```

## FAQ

**Q: Can I add more profiles to the demo?**  
A: Yes! Follow the "Adding More Embedded Profiles" instructions above.

**Q: Why not use the React component with upload in the demo?**  
A: The React component (ZeroPromptWarpBG-V2.jsx) supports uploads for development. The demo uses embedded profiles for public hosting security.

**Q: How do I create my own profile?**  
A: See the integration guide (`zeroprompt-warpBG-JSX-V2-integration.md`) for detailed instructions.

**Q: Can profiles share pools?**  
A: No, each profile is self-contained. But you can copy pool definitions between profile JSON files.

**Q: What's the maximum profile size?**  
A: No hard limit, but keep pools reasonable (<1000 items each) for performance.

**Q: Do profiles affect performance?**  
A: Profile size doesn't impact render performance. Generation is O(1) regardless of vocabulary size.

## Example Prompt Comparison

### Default Profile (Seed 42, Index 1000)
```
a cyborg standing in a cyberpunk city, cinematic, 
dramatic rim lighting, close-up portrait, 
highly detailed, mysterious atmosphere
```

### Volkyri Profile (Seed 42, Index 1000)
```
Volkyri warrior-scholar in gold metallic bodysuit with 
deep purple accent panels, single swept-blade half-horn 
growing from left-temple, bone fused with polished chrome 
sheathing. She holds an ancient data-tome with both hands, 
scanning illuminated text. Expression of cold assessment. 
Within dimly lit archive chamber of ancient texts. 
Dramatic rim lighting from behind creates silhouette edge. 
Pale skin, dark hair slicked back from the asymmetrical horn. 
Medium shot. Volkyri aesthetic.
```

**Notice:**
- Both deterministic from same seed/index
- Volkyri much more specific and detailed
- Default broader, more flexible
- Different use cases, same underlying tech

---

**Built with ❤️ for safe, creative prompt exploration**
