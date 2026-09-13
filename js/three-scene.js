/**
 * WANDERPULSE BALI - REAL-TIME THREE.JS WEBGL 3D SCENES
 * 1. Hero 3D Interactive Celestial Travel Globe & Animated Flight Arcs
 * 2. Interactive 3D Island Topography Scene with Clickable 3D Beacons
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded. Falling back to CSS effects.');
    return;
  }

  initHero3DScene();
  initRegionalMap3DScene();
});

/* ==========================================================================
   1. HERO 3D CELESTIAL TRAVEL GLOBE & TRANSIT ARCS
   ========================================================================== */
function initHero3DScene() {
  const container = document.getElementById('hero3dCanvasContainer');
  if (!container) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 18);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group for all globe elements
  const globeGroup = new THREE.Group();
  globeGroup.position.set(4.5, -0.5, 0); // Position on the right side of hero
  scene.add(globeGroup);

  // 1. Base Celestial Wireframe Sphere
  const sphereGeo = new THREE.SphereGeometry(4.8, 36, 36);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0x8B5CF6,
    wireframe: true,
    transparent: true,
    opacity: 0.12
  });
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  globeGroup.add(sphereMesh);

  // 2. Inner Glow Core
  const coreGeo = new THREE.SphereGeometry(4.6, 24, 24);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x0B0F19,
    transparent: true,
    opacity: 0.95
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  globeGroup.add(coreMesh);

  // 3. Atmosphere Glow Halo
  const haloGeo = new THREE.SphereGeometry(5.2, 32, 32);
  const haloMat = new THREE.ShaderMaterial({
    uniforms: {
      c: { type: "f", value: 0.35 },
      p: { type: "f", value: 3.5 },
      glowColor: { type: "c", value: new THREE.Color(0x06B6D4) },
      viewVector: { type: "v3", value: camera.position }
    },
    vertexShader: `
      uniform vec3 viewVector;
      uniform float c;
      uniform float p;
      varying float intensity;
      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vNormel = normalize(normalMatrix * viewVector);
        intensity = pow(c - dot(vNormal, vNormel), p);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying float intensity;
      void main() {
        vec3 glow = glowColor * intensity;
        gl_FragColor = vec4(glow, intensity * 0.4);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
  });
  const haloMesh = new THREE.Mesh(haloGeo, haloMat);
  globeGroup.add(haloMesh);
  window.heroAtmosphere = { haloMesh, globeGroup };

  // 4. Coordinates & 3D Flight Arcs to Bali
  // Bali lat: -8.4, lon: 115.1
  const R = 4.8;
  function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  const baliPos = latLonToVector3(-8.4, 115.1, R);

  // Bali Center Glowing Beacon & Ripples
  const baliBeaconGeo = new THREE.SphereGeometry(0.18, 16, 16);
  const baliBeaconMat = new THREE.MeshBasicMaterial({ color: 0xFF5E62 });
  const baliBeacon = new THREE.Mesh(baliBeaconGeo, baliBeaconMat);
  baliBeacon.position.copy(baliPos);
  globeGroup.add(baliBeacon);

  // Concentric Expanding Ripple Ring at Bali
  const ringGeo = new THREE.RingGeometry(0.2, 0.45, 32);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xFF5E62, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
  const baliRing = new THREE.Mesh(ringGeo, ringMat);
  baliRing.position.copy(baliPos);
  baliRing.lookAt(new THREE.Vector3(0, 0, 0));
  globeGroup.add(baliRing);

  // Major Global Origins
  const origins = [
    { name: 'London', lat: 51.5, lon: -0.12, color: 0x8B5CF6 },
    { name: 'New York', lat: 40.7, lon: -74.0, color: 0x3B82F6 },
    { name: 'Sydney', lat: -33.8, lon: 151.2, color: 0x10B981 },
    { name: 'Singapore', lat: 1.35, lon: 103.8, color: 0x06B6D4 },
    { name: 'Tokyo', lat: 35.6, lon: 139.6, color: 0xFF9900 },
    { name: 'Mumbai', lat: 19.0, lon: 72.8, color: 0xEC4899 }
  ];

  const arcCurves = [];
  const photons = [];

  origins.forEach(origin => {
    const originPos = latLonToVector3(origin.lat, origin.lon, R);

    // City Marker Dot
    const dotGeo = new THREE.SphereGeometry(0.1, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: origin.color });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.position.copy(originPos);
    globeGroup.add(dotMesh);

    // 3D Elevated Curve Arc
    const midPoint = new THREE.Vector3().addVectors(originPos, baliPos).multiplyScalar(0.5);
    const distance = originPos.distanceTo(baliPos);
    midPoint.setLength(R + distance * 0.35); // Elevate midpoint above globe

    const curve = new THREE.QuadraticBezierCurve3(originPos, midPoint, baliPos);
    arcCurves.push(curve);

    const points = curve.getPoints(40);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({
      color: origin.color,
      transparent: true,
      opacity: 0.45,
      linewidth: 1
    });
    const arcLine = new THREE.Line(lineGeo, lineMat);
    globeGroup.add(arcLine);

    // Animated Photon Particle on Arc
    const photonGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const photon = new THREE.Mesh(photonGeo, photonMat);
    globeGroup.add(photon);
    photons.push({ mesh: photon, curve: curve, progress: Math.random() });
  });

  // 5. Floating 3D Star Particle Field
  const particleCount = 450;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  const colorPalette = [
    new THREE.Color(0xFF5E62),
    new THREE.Color(0x8B5CF6),
    new THREE.Color(0x06B6D4),
    new THREE.Color(0xFF9900)
  ];

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 45;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 25;

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    particleColors[i * 3] = chosenColor.r;
    particleColors[i * 3 + 1] = chosenColor.g;
    particleColors[i * 3 + 2] = chosenColor.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.65
  });
  const starField = new THREE.Points(particleGeo, particleMat);
  scene.add(starField);

  // 6. Dynamic Point Lights (Multi-Color Aurora Orbit)
  const lightCoral = new THREE.PointLight(0xFF5E62, 2.5, 30);
  const lightViolet = new THREE.PointLight(0x8B5CF6, 3, 30);
  const lightCyan = new THREE.PointLight(0x06B6D4, 2.5, 30);
  scene.add(lightCoral);
  scene.add(lightViolet);
  scene.add(lightCyan);

  // Mouse Parallax & Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Responsive Resize
  function onWindowResize() {
    const newW = container.clientWidth || window.innerWidth;
    const newH = container.clientHeight || window.innerHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);

    // Reposition on smaller screens
    if (newW < 992) {
      globeGroup.position.set(0, -1.5, -4);
    } else {
      globeGroup.position.set(4.5, -0.5, 0);
    }
  }
  window.addEventListener('resize', onWindowResize);
  onWindowResize();

  // Visibility Optimization with IntersectionObserver
  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  observer.observe(container);

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const time = clock.getElapsedTime();

    // Rotate Globe gently
    globeGroup.rotation.y = time * 0.12;

    // Mouse smooth parallax damping
    targetX += (mouseX * 0.4 - targetX) * 0.05;
    targetY += (mouseY * 0.3 - targetY) * 0.05;
    camera.position.x = targetX;
    camera.position.y = targetY;
    camera.lookAt(scene.position);

    // Orbit dynamic multi-color point lights
    lightCoral.position.set(
      Math.sin(time * 0.8) * 12,
      Math.cos(time * 0.6) * 10,
      Math.sin(time * 0.4) * 8
    );
    lightViolet.position.set(
      Math.cos(time * 0.7) * 14,
      Math.sin(time * 0.9) * 8,
      Math.cos(time * 0.5) * 10
    );
    lightCyan.position.set(
      Math.sin(time * 0.5) * 10,
      Math.cos(time * 0.8) * 12,
      Math.sin(time * 0.7) * 12
    );

    // Pulse Bali Ripple
    const scale = 1 + (time * 1.5) % 2;
    baliRing.scale.set(scale, scale, 1);
    baliRing.material.opacity = Math.max(0, 0.8 - (scale - 1) * 0.4);

    // Animate Flight Photons along curves
    photons.forEach(p => {
      p.progress += 0.006;
      if (p.progress > 1) p.progress = 0;
      const pt = p.curve.getPoint(p.progress);
      p.mesh.position.copy(pt);
    });

    // Drift star particles slowly
    starField.rotation.y = time * 0.015;

    renderer.render(scene, camera);
  }
  animate();
}

/* ==========================================================================
   2. REGIONAL 3D ISLAND TOPOGRAPHY MAP WITH CLICKABLE BEACONS
   ========================================================================== */
function initRegionalMap3DScene() {
  const container = document.getElementById('regionalMap3dContainer');
  if (!container) return;

  const width = container.clientWidth || 800;
  const height = container.clientHeight || 480;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 18, 22);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 3D Topography Group
  const islandGroup = new THREE.Group();
  scene.add(islandGroup);

  // 1. Undulating Ocean Base Water Plane
  const waterGeo = new THREE.PlaneGeometry(36, 36, 32, 32);
  const waterMat = new THREE.MeshPhongMaterial({
    color: 0x06B6D4,
    shininess: 90,
    transparent: true,
    opacity: 0.35,
    wireframe: false
  });
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.position.y = -0.3;
  islandGroup.add(waterMesh);

  // 2. Procedural Low-Poly Island Terrain Mesh (Bali Shape)
  const terrainGeo = new THREE.PlaneGeometry(24, 16, 48, 32);
  terrainGeo.rotateX(-Math.PI / 2);

  const posAttr = terrainGeo.attributes.position;
  const colors = [];

  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);

    // Bali contour approximation: central ridge with volcanic cones
    const distFromCenter = Math.sqrt((x * 0.8) * (x * 0.8) + (z * 1.3) * (z * 1.3));
    let height = 0;

    if (distFromCenter < 8.5) {
      // Base island elevation
      height = Math.max(0, (8.5 - distFromCenter) * 0.55);

      // Volcano Peaks (Mount Agung on east, Mount Batur on north center)
      const distAgung = Math.sqrt((x - 4) * (x - 4) + (z + 1) * (z + 1));
      const distBatur = Math.sqrt((x - 1.5) * (x - 1.5) + (z + 2.5) * (z + 2.5));

      if (distAgung < 3.2) height += (3.2 - distAgung) * 1.6;
      if (distBatur < 2.5) height += (2.5 - distBatur) * 1.2;
    } else {
      height = -0.5; // Water depth
    }

    posAttr.setY(i, height);

    // Color based on elevation (Sand, Rainforest, Volcanic peak)
    if (height <= 0.1) {
      colors.push(0.06, 0.71, 0.83); // Coastal Lagoon
    } else if (height < 1.2) {
      colors.push(0.06, 0.72, 0.50); // Lush Jungle Emerald
    } else if (height < 2.8) {
      colors.push(0.55, 0.36, 0.96); // Highland Purple
    } else {
      colors.push(1.0, 0.6, 0.0);    // Volcanic Amber Sunburst
    }
  }

  terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  terrainGeo.computeVertexNormals();

  const terrainMat = new THREE.MeshLambertMaterial({
    vertexColors: true,
    flatShading: true
  });
  const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
  islandGroup.add(terrainMesh);

  // 3. Lighting in Island Scene
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xFFFAED, 1.2);
  sunLight.position.set(10, 20, 15);
  scene.add(sunLight);
  window.regionalMapLighting = { sunLight, ambientLight, scene, waterMesh };

  // High-Precision Bali GIS Projection: Converts Real-World GPS (lat, lng) to 3D Topography Coordinates
  function latLngTo3D(lat, lng) {
    const centerLat = -8.50; // Central Bali latitude reference
    const centerLng = 115.22; // Central Bali longitude reference
    const scaleX = 16.5;
    const scaleZ = -16.5;
    return {
      x: parseFloat(((lng - centerLng) * scaleX).toFixed(2)),
      z: parseFloat(((lat - centerLat) * scaleZ).toFixed(2))
    };
  }
  window.latLngTo3D = latLngTo3D;

  // 4. Calibrated 3D Hotspot Beacon Pins (Derived directly from Verified GPS Coordinates)
  const beaconHotspots = [
    { id: 'airport', name: 'I Gusti Ngurah Rai Airport (DPS)', lat: -8.748166, lng: 115.167156, ...latLngTo3D(-8.748166, 115.167156), y: 0.55, color: 0x3B82F6 },
    { id: 'uluwatu', name: 'Uluwatu Temple (Pura Luhur Uluwatu)', lat: -8.829141, lng: 115.084915, ...latLngTo3D(-8.829141, 115.084915), y: 0.85, color: 0xFF5E62 },
    { id: 'tanah-lot', name: 'Tanah Lot Temple (Pura Tanah Lot)', lat: -8.621213, lng: 115.086782, ...latLngTo3D(-8.621213, 115.086782), y: 0.45, color: 0xEC4899 },
    { id: 'ubud', name: 'Sacred Monkey Forest (Mandala Suci)', lat: -8.518972, lng: 115.258389, ...latLngTo3D(-8.518972, 115.258389), y: 1.45, color: 0x8B5CF6 },
    { id: 'kintamani', name: 'Mount Batur (Gunung Batur)', lat: -8.242188, lng: 115.375278, ...latLngTo3D(-8.242188, 115.375278), y: 3.35, color: 0xFF9900 },
    { id: 'munduk', name: 'Sekumpul Waterfall (Air Terjun Sekumpul)', lat: -8.175122, lng: 115.183422, ...latLngTo3D(-8.175122, 115.183422), y: 1.80, color: 0x10B981 },
    { id: 'penida', name: 'Kelingking Beach (Pantai Kelingking)', lat: -8.750711, lng: 115.474438, ...latLngTo3D(-8.750711, 115.474438), y: 0.75, color: 0x06B6D4 }
  ];

  const clickableObjects = [];
  const beaconMeshes = [];

  beaconHotspots.forEach(spot => {
    const beaconGroup = new THREE.Group();
    beaconGroup.position.set(spot.x, spot.y, spot.z);
    beaconGroup.userData = { id: spot.id, name: spot.name };

    // Vertical Light Column
    const colGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 12);
    const colMat = new THREE.MeshBasicMaterial({ color: spot.color, transparent: true, opacity: 0.75 });
    const colMesh = new THREE.Mesh(colGeo, colMat);
    colMesh.position.y = 0.9;
    beaconGroup.add(colMesh);

    // Glowing Sphere Cap
    const capGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const capMat = new THREE.MeshBasicMaterial({ color: spot.color });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 1.8;
    capMesh.userData = { id: spot.id };
    beaconGroup.add(capMesh);

    // Clickable target
    clickableObjects.push(capMesh);
    clickableObjects.push(colMesh);

    // Pulsating Floor Ring
    const ringGeo = new THREE.RingGeometry(0.3, 0.55, 24);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: spot.color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.05;
    beaconGroup.add(ringMesh);

    islandGroup.add(beaconGroup);
    beaconMeshes.push({ group: beaconGroup, ring: ringMesh, spot: spot });
  });

  // 5. Orbit & Drag Interaction (Mouse & Touch)
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let targetRotY = 0;
  let targetRotX = 0.2;

  const canvas = renderer.domElement;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;

    targetRotY += deltaX * 0.008;
    targetRotX += deltaY * 0.006;
    targetRotX = Math.max(-0.2, Math.min(1.0, targetRotX)); // Clamp pitch

    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  // Mobile Touch Support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevMouseX;
    const deltaY = e.touches[0].clientY - prevMouseY;

    targetRotY += deltaX * 0.008;
    targetRotX += deltaY * 0.006;
    targetRotX = Math.max(-0.2, Math.min(1.0, targetRotX));

    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
  }, { passive: true });

  // 6. Raycasting Click Detection on 3D Beacons
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableObjects);

    if (intersects.length > 0) {
      const zoneId = intersects[0].object.userData.id || intersects[0].object.parent.userData.id;
      if (zoneId) {
        // Direct call to unified map zone selector
        if (typeof window.selectMapZone === 'function') {
          window.selectMapZone(zoneId);
        } else {
          const existingPin = document.querySelector(`.map-pin[data-zone="${zoneId}"]`);
          if (existingPin) existingPin.click();
        }

        // Show feedback toast
        const matched = beaconHotspots.find(b => b.id === zoneId);
        if (matched && window.showToast) {
          window.showToast('3D Hotspot Inspected', `Focused on ${matched.name} in the 3D terrain viewer.`);
        }
      }
    }
  });

  // Reset 3D View Button
  const resetBtn = document.getElementById('reset3dMapBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      targetRotX = 0.2;
      targetRotY = 0;
    });
  }

  // Visibility Optimization with IntersectionObserver
  let isMapVisible = true;
  const mapObserver = new IntersectionObserver((entries) => {
    isMapVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  mapObserver.observe(container);

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    if (!isMapVisible) return;

    const time = clock.getElapsedTime();

    // Auto rotate if not dragging
    if (!isDragging) {
      targetRotY += 0.0015;
    }

    islandGroup.rotation.y += (targetRotY - islandGroup.rotation.y) * 0.1;
    islandGroup.rotation.x += (targetRotX - islandGroup.rotation.x) * 0.1;

    // Animate beacon rings pulsation
    beaconMeshes.forEach(b => {
      const s = 1 + Math.sin(time * 3 + b.spot.x) * 0.25;
      b.ring.scale.set(s, s, s);
    });

    renderer.render(scene, camera);
  }
  animate();

  // Resize listener
  window.addEventListener('resize', () => {
    const newW = container.clientWidth || 800;
    const newH = container.clientHeight || 480;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

/* ==========================================================================
   3. 360° VIRTUAL PANORAMIC VIEWPOINT EXPLORER (EQUIRECTANGULAR SPHERICAL VR)
   ========================================================================== */

const PANORAMA_LOCATIONS = {
  'kelingking': {
    id: 'kelingking',
    name: 'Kelingking Beach (Pantai Kelingking)',
    location: 'Nusa Penida, Bali',
    description: 'Dramatic limestone cliff formation shaped like a Tyrannosaurus Rex plunging into roaring turquoise Indian Ocean breakers.',
    imageUrl: '/images/attractions/kelingking/main.jpg',
    defaultYaw: 0,
    defaultPitch: -0.05,
    skyTop: '#0B2D54',
    skyMid: '#0284C7',
    skyHorizon: '#38BDF8',
    seaColor: '#0284C7',
    seaDeep: '#0369A1',
    seaNadir: '#0891B2',
    ridgeColor: 'rgba(30, 41, 59, 0.42)'
  },
  'tanah-lot': {
    id: 'tanah-lot',
    name: 'Tanah Lot Temple (Pura Tanah Lot)',
    location: 'Tabanan, South-West Bali Coast',
    description: 'Ancient 16th-century ocean shrine perched on a wave-carved volcanic rock formation during golden-hour sunset.',
    imageUrl: '/images/attractions/tanah-lot/main.jpg',
    defaultYaw: 1.2,
    defaultPitch: 0.05,
    skyTop: '#1E1B4B',
    skyMid: '#7C2D12',
    skyHorizon: '#F97316',
    seaColor: '#C2410C',
    seaDeep: '#9A3412',
    seaNadir: '#EA580C',
    ridgeColor: 'rgba(67, 20, 7, 0.45)'
  },
  'mount-batur': {
    id: 'mount-batur',
    name: 'Mount Batur (Gunung Batur)',
    location: 'Kintamani Volcanic Highlands',
    description: 'Breathtaking 360° dawn vantage standing above the cloud inversion ocean overlooking Lake Batur and Mount Agung.',
    imageUrl: '/images/attractions/batur/main.jpg',
    defaultYaw: -0.8,
    defaultPitch: 0.08,
    skyTop: '#311042',
    skyMid: '#581C87',
    skyHorizon: '#FB923C',
    seaColor: '#0D9488',
    seaDeep: '#115E59',
    seaNadir: '#047857',
    ridgeColor: 'rgba(49, 16, 66, 0.50)'
  },
  'tegallalang': {
    id: 'tegallalang',
    name: 'Tegallalang Rice Terrace (Ceking Rice Terrace)',
    location: 'Ubud Highlands, Bali',
    description: 'Sculptured emerald-green valley amphitheater cultivated using the UNESCO-protected Balinese Subak irrigation system.',
    imageUrl: '/images/attractions/tegallalang/main.jpg',
    defaultYaw: 0.4,
    defaultPitch: -0.1,
    skyTop: '#064E3B',
    skyMid: '#047857',
    skyHorizon: '#34D399',
    seaColor: '#059669',
    seaDeep: '#065F46',
    seaNadir: '#10B981',
    ridgeColor: 'rgba(6, 78, 59, 0.45)'
  },
  'uluwatu': {
    id: 'uluwatu',
    name: 'Uluwatu Temple (Pura Luhur Uluwatu)',
    location: 'Bukit Peninsula, South Bali',
    description: 'Sheer 70-meter limestone sea cliffs dropping straight into azure swells, site of the sunset Kecak Fire Dance.',
    imageUrl: '/images/attractions/uluwatu-temple/main.jpg',
    defaultYaw: 2.1,
    defaultPitch: -0.05,
    skyTop: '#1E293B',
    skyMid: '#0369A1',
    skyHorizon: '#38BDF8',
    seaColor: '#0284C7',
    seaDeep: '#075985',
    seaNadir: '#0891B2',
    ridgeColor: 'rgba(30, 41, 59, 0.45)'
  },
  'monkey-forest': {
    id: 'monkey-forest',
    name: 'Sacred Monkey Forest Sanctuary (Mandala Suci Wenara Wana)',
    location: 'Padangtegal, Ubud',
    description: 'Ancient moss-covered 14th-century temple complex nestled within deep nutmeg rainforest inhabited by Balinese macaques.',
    imageUrl: '/images/attractions/ubud/main.jpg',
    defaultYaw: 0.2,
    defaultPitch: 0.02,
    skyTop: '#064E3B',
    skyMid: '#047857',
    skyHorizon: '#10B981',
    seaColor: '#059669',
    seaDeep: '#064E3B',
    seaNadir: '#34D399',
    ridgeColor: 'rgba(6, 78, 59, 0.45)'
  },
  'sekumpul': {
    id: 'sekumpul',
    name: 'Sekumpul Waterfall (Air Terjun Sekumpul)',
    location: 'Sawan, Buleleng, North Bali',
    description: 'Towering 80-meter twin waterfall cascades thundering into a mist-shrouded rainforest canyon surrounded by volcanic cliffs.',
    imageUrl: '/images/attractions/sekumpul/main.jpg',
    defaultYaw: -1.4,
    defaultPitch: 0.05,
    skyTop: '#0F172A',
    skyMid: '#0F766E',
    skyHorizon: '#2DD4BF',
    seaColor: '#0D9488',
    seaDeep: '#115E59',
    seaNadir: '#14B8A6',
    ridgeColor: 'rgba(15, 23, 42, 0.45)'
  },
  'tirta-empul': {
    id: 'tirta-empul',
    name: 'Tirta Empul Temple (Pura Tirta Empul)',
    location: 'Manukaya, Tampaksiring',
    description: 'Sacred water purification temple featuring natural crystalline volcanic bubbling springs and sculpted stone spout pools.',
    imageUrl: '/images/attractions/tirta-empul/main.jpg',
    defaultYaw: 1.6,
    defaultPitch: 0.0,
    skyTop: '#1E1B4B',
    skyMid: '#1D4ED8',
    skyHorizon: '#FBBF24',
    seaColor: '#0284C7',
    seaDeep: '#0369A1',
    seaNadir: '#06B6D4',
    ridgeColor: 'rgba(30, 27, 75, 0.45)'
  }
};

// Aliases for seamless bidirectional mapping from attraction cards and 3D scene
PANORAMA_LOCATIONS['batur'] = PANORAMA_LOCATIONS['mount-batur'];
PANORAMA_LOCATIONS['uluwatu-temple'] = PANORAMA_LOCATIONS['uluwatu'];
PANORAMA_LOCATIONS['ubud'] = PANORAMA_LOCATIONS['monkey-forest'];

let panoramaScene, panoramaCamera, panoramaRenderer, panoramaSphereMesh;
let panoLon = 0, panoLat = 0;
let panoTargetLon = 0, panoTargetLat = 0;
let panoIsUserInteracting = false;
let panoOnMouseDownMouseX = 0, panoOnMouseDownMouseY = 0;
let panoOnMouseDownLon = 0, panoOnMouseDownLat = 0;
let panoFov = 75;
let panoAutoRotate = true;
let panoAnimationId = null;
let activePanoramaId = 'kelingking';
let panoTextureLoader = null;
let panoResizeObserver = null;

// Procedural Equirectangular 360 Texture Generator (Guarantees vibrant, seamless 360° vista with zero disappearing colors)
function createProceduralPanoramaTexture(loc) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const w = canvas.width;
  const h = canvas.height;

  // 1. Seamless Equirectangular Full-Sphere Gradient: Zenith (+90°) to Nadir (-90°)
  // Ensures upper and lower hemispheres are both illuminated with vibrant, saturated tones
  const fullGrad = ctx.createLinearGradient(0, 0, 0, h);
  fullGrad.addColorStop(0.00, loc.skyTop || '#0B2D54');       // Zenith (+90° altitude top)
  fullGrad.addColorStop(0.22, loc.skyMid || '#0284C7');       // High Sky (+50°)
  fullGrad.addColorStop(0.44, loc.skyHorizon || '#38BDF8');   // Atmospheric glow (+11°)
  fullGrad.addColorStop(0.50, '#FFFFFF');                     // Radiant horizon line (0°)
  fullGrad.addColorStop(0.54, loc.skyHorizon || '#38BDF8');   // Shore surf line (-7°)
  fullGrad.addColorStop(0.70, loc.seaColor || '#0284C7');     // Tropical sea / lush valley (-36°)
  fullGrad.addColorStop(0.86, loc.seaDeep || '#0369A1');      // Deep ocean waters (-65°)
  fullGrad.addColorStop(1.00, loc.seaNadir || '#0891B2');     // Nadir floor (-90° altitude bottom)
  ctx.fillStyle = fullGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Solar Flare & Atmospheric Bloom (Centered at defaultYaw vista)
  const sunX = (((loc.defaultYaw || 0) + Math.PI) / (Math.PI * 2) * w) % w;
  const sunY = h * 0.46;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 380);
  sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
  sunGrad.addColorStop(0.18, 'rgba(254, 240, 138, 0.75)');
  sunGrad.addColorStop(0.45, 'rgba(251, 146, 60, 0.35)');
  sunGrad.addColorStop(0.80, 'rgba(56, 189, 248, 0.15)');
  sunGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 380, 0, Math.PI * 2);
  ctx.fill();

  // Wrap sun flare around canvas boundary for seamless 360° continuity
  if (sunX - 380 < 0) {
    ctx.save();
    ctx.translate(w, 0);
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 380, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else if (sunX + 380 > w) {
    ctx.save();
    ctx.translate(-w, 0);
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 380, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 3. Seamless 360° Cloud Bands (Periodic Fourier series ensures x=0 matches x=w exactly)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  for (let c = 0; c < 3; c++) {
    const cloudY = h * (0.16 + c * 0.11);
    const cloudH = 36 + c * 14;
    ctx.beginPath();
    ctx.moveTo(0, cloudY);
    for (let x = 0; x <= w; x += 32) {
      const angle = (x / w) * Math.PI * 2;
      const wave = Math.sin(angle * (2 + c)) * 14 + Math.cos(angle * (4 + c) + 1) * 8;
      ctx.lineTo(x, cloudY + wave);
    }
    for (let x = w; x >= 0; x -= 32) {
      const angle = (x / w) * Math.PI * 2;
      const wave = Math.sin(angle * (2 + c)) * 14 + Math.cos(angle * (4 + c) + 1) * 8;
      ctx.lineTo(x, cloudY + wave + cloudH);
    }
    ctx.closePath();
    ctx.fill();
  }

  // 4. Distant Volcanic Headlands & Ridges (Mount Agung profile on horizon)
  // Perfectly periodic across 360° so x=0 meets x=w smoothly with no seam
  ctx.fillStyle = loc.ridgeColor || 'rgba(30, 41, 59, 0.42)';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.50);
  for (let x = 0; x <= w; x += 32) {
    const angle = (x / w) * Math.PI * 2;
    const peak1 = Math.sin(angle * 2) * 24;
    const peak2 = Math.sin(angle * 5 + 0.8) * 15;
    const peak3 = Math.cos(angle * 8) * 8;
    const volcano1 = Math.exp(-Math.pow(((x - w * 0.62) / (w * 0.08)), 2)) * 85;
    const volcano2 = Math.exp(-Math.pow(((x - w * 0.18) / (w * 0.06)), 2)) * 55;
    const ridgeY = h * 0.50 - peak1 - peak2 - peak3 - volcano1 - volcano2;
    ctx.lineTo(x, ridgeY);
  }
  ctx.lineTo(w, h * 0.50);
  ctx.lineTo(0, h * 0.50);
  ctx.closePath();
  ctx.fill();

  // 5. Luminous Tropical Ocean Caustics & Water Ripples (Lower Hemisphere)
  // High-vibrancy turquoise & white wave highlights that loop seamlessly across 360°
  for (let row = h * 0.53; row < h * 0.96; row += 24) {
    const depthFactor = (row - h * 0.53) / (h * 0.43);
    const alpha = 0.18 + depthFactor * 0.14;
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
    ctx.lineWidth = 1.4 + depthFactor * 1.8;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 40) {
      const angle = (x / w) * Math.PI * 2;
      const wave = Math.sin(angle * 6 + row * 0.08) * (3 + depthFactor * 6) +
                   Math.cos(angle * 12 + row * 0.12) * (2 + depthFactor * 3);
      if (x === 0) ctx.moveTo(x, row + wave);
      else ctx.lineTo(x, row + wave);
    }
    ctx.stroke();
  }

  // 6. Deep Ocean Water Caustic Specular Grid (Nadir / Bottom Pole View)
  const nadirGrad = ctx.createRadialGradient(w * 0.5, h * 0.95, 20, w * 0.5, h * 0.95, w * 0.45);
  nadirGrad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
  nadirGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.15)');
  nadirGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = nadirGrad;
  ctx.fillRect(0, h * 0.70, w, h * 0.30);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

// Seamless 360° Equirectangular Compositor: Blends authentic photo into 360 canvas
function composite360Panorama(loc, img) {
  if (!img || !img.width || !img.height) return null;

  const canvas = document.createElement('canvas');
  canvas.width = 4096;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const w = canvas.width;
  const h = canvas.height;

  // 1. Draw 360 Base Atmospheric Environment (Sky + Horizon + Ocean Caustics)
  const fullGrad = ctx.createLinearGradient(0, 0, 0, h);
  fullGrad.addColorStop(0.00, loc.skyTop || '#0B2D54');
  fullGrad.addColorStop(0.22, loc.skyMid || '#0284C7');
  fullGrad.addColorStop(0.44, loc.skyHorizon || '#38BDF8');
  fullGrad.addColorStop(0.50, '#FFFFFF');
  fullGrad.addColorStop(0.54, loc.skyHorizon || '#38BDF8');
  fullGrad.addColorStop(0.70, loc.seaColor || '#0284C7');
  fullGrad.addColorStop(0.86, loc.seaDeep || '#0369A1');
  fullGrad.addColorStop(1.00, loc.seaNadir || '#0891B2');
  ctx.fillStyle = fullGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Solar Flare
  const sunX = (((loc.defaultYaw || 0) + Math.PI) / (Math.PI * 2) * w) % w;
  const sunY = h * 0.46;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 30, sunX, sunY, 720);
  sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
  sunGrad.addColorStop(0.18, 'rgba(254, 240, 138, 0.75)');
  sunGrad.addColorStop(0.45, 'rgba(251, 146, 60, 0.35)');
  sunGrad.addColorStop(0.80, 'rgba(56, 189, 248, 0.15)');
  sunGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 720, 0, Math.PI * 2);
  ctx.fill();

  // 3. Volcanic silhouettes across 360°
  ctx.fillStyle = loc.ridgeColor || 'rgba(30, 41, 59, 0.38)';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.50);
  for (let x = 0; x <= w; x += 32) {
    const angle = (x / w) * Math.PI * 2;
    const peak1 = Math.sin(angle * 2) * 35;
    const peak2 = Math.sin(angle * 5 + 0.8) * 22;
    const volcano1 = Math.exp(-Math.pow(((x - w * 0.62) / (w * 0.08)), 2)) * 140;
    const volcano2 = Math.exp(-Math.pow(((x - w * 0.18) / (w * 0.06)), 2)) * 90;
    ctx.lineTo(x, h * 0.50 - peak1 - peak2 - volcano1 - volcano2);
  }
  ctx.lineTo(w, h * 0.50);
  ctx.lineTo(0, h * 0.50);
  ctx.closePath();
  ctx.fill();

  // 4. Luminous Ocean Caustics across Lower Hemisphere
  for (let row = h * 0.52; row < h * 0.98; row += 36) {
    const depthFactor = (row - h * 0.52) / (h * 0.46);
    ctx.strokeStyle = `rgba(255, 255, 255, ${(0.18 + depthFactor * 0.16).toFixed(2)})`;
    ctx.lineWidth = 2.0 + depthFactor * 2.5;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 48) {
      const angle = (x / w) * Math.PI * 2;
      const wave = Math.sin(angle * 6 + row * 0.06) * (5 + depthFactor * 8) +
                   Math.cos(angle * 12 + row * 0.09) * (3 + depthFactor * 4);
      if (x === 0) ctx.moveTo(x, row + wave);
      else ctx.lineTo(x, row + wave);
    }
    ctx.stroke();
  }

  // 5. Composite the Authentic Location Photograph with Soft Feathered Edge Blending
  try {
    const targetW = Math.round(w * 0.62); // ~223° horizontal coverage
    const targetH = Math.round(targetW * (img.height / img.width));
    const centerX = (((loc.defaultYaw || 0) + Math.PI) / (Math.PI * 2) * w) % w;
    const startX = Math.round(centerX - targetW / 2);
    const startY = Math.round(h * 0.50 - targetH * 0.44);

    const photoBuffer = document.createElement('canvas');
    photoBuffer.width = targetW;
    photoBuffer.height = targetH;
    const pCtx = photoBuffer.getContext('2d');
    if (pCtx) {
      pCtx.drawImage(img, 0, 0, targetW, targetH);

      // Feather edges with alpha mask so photo blends smoothly into 360 sky and sea
      pCtx.globalCompositeOperation = 'destination-in';

      // Horizontal feather gradient (left & right borders)
      const hMask = pCtx.createLinearGradient(0, 0, targetW, 0);
      hMask.addColorStop(0.00, 'rgba(0, 0, 0, 0)');
      hMask.addColorStop(0.10, 'rgba(0, 0, 0, 0.95)');
      hMask.addColorStop(0.90, 'rgba(0, 0, 0, 0.95)');
      hMask.addColorStop(1.00, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = hMask;
      pCtx.fillRect(0, 0, targetW, targetH);

      // Vertical feather gradient (top sky & bottom ocean borders)
      const vMask = pCtx.createLinearGradient(0, 0, 0, targetH);
      vMask.addColorStop(0.00, 'rgba(0, 0, 0, 0)');
      vMask.addColorStop(0.08, 'rgba(0, 0, 0, 1)');
      vMask.addColorStop(0.88, 'rgba(0, 0, 0, 1)');
      vMask.addColorStop(1.00, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = vMask;
      pCtx.fillRect(0, 0, targetW, targetH);

      // Stamp feathered photo onto main 360 canvas
      ctx.drawImage(photoBuffer, startX, startY);
      if (startX < 0) {
        ctx.drawImage(photoBuffer, startX + w, startY);
      } else if (startX + targetW > w) {
        ctx.drawImage(photoBuffer, startX - w, startY);
      }

      // 6. Complementary Rear Atmospheric Vista (Behind Viewer)
      const rearCenterX = (centerX + w * 0.5) % w;
      const rearTargetW = Math.round(w * 0.42);
      const rearTargetH = Math.round(rearTargetW * (img.height / img.width));
      const rearStartX = Math.round(rearCenterX - rearTargetW / 2);
      const rearStartY = Math.round(h * 0.50 - rearTargetH * 0.44);

      ctx.save();
      ctx.globalAlpha = 0.55;
      const rearBuffer = document.createElement('canvas');
      rearBuffer.width = rearTargetW;
      rearBuffer.height = rearTargetH;
      const rCtx = rearBuffer.getContext('2d');
      if (rCtx) {
        rCtx.translate(rearTargetW, 0);
        rCtx.scale(-1, 1);
        rCtx.drawImage(photoBuffer, 0, 0, rearTargetW, rearTargetH);
        ctx.drawImage(rearBuffer, rearStartX, rearStartY);
        if (rearStartX < 0) ctx.drawImage(rearBuffer, rearStartX + w, rearStartY);
        else if (rearStartX + rearTargetW > w) ctx.drawImage(rearBuffer, rearStartX - w, rearStartY);
      }
      ctx.restore();
    }
  } catch (err) {
    console.warn('Feathered photo compositor note:', err);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

function initPanoramaEngine() {
  const canvas = document.getElementById('panoramaCanvas');
  if (!canvas) return;

  const container = document.getElementById('panoramaViewportContainer') || canvas.parentElement || document.body;
  const width = container.clientWidth || Math.min(window.innerWidth * 0.95, 1200);
  const height = container.clientHeight || Math.min(window.innerHeight * 0.85, 750);

  if (!panoramaScene) {
    panoramaScene = new THREE.Scene();
    panoramaCamera = new THREE.PerspectiveCamera(panoFov, width / height, 1, 1100);
    panoramaCamera.target = new THREE.Vector3(0, 0, 0);

    panoramaRenderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    panoramaRenderer.setClearColor(0x060912, 1.0);
    panoramaRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    panoramaRenderer.setSize(width, height);

    panoTextureLoader = new THREE.TextureLoader();
    panoTextureLoader.setCrossOrigin('anonymous');

    // Invert sphere geometry to view from inside
    const sphereGeo = new THREE.SphereGeometry(500, 64, 48);
    sphereGeo.scale(-1, 1, 1);

    // Pure white material with DoubleSide so no faces are ever culled
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      side: THREE.DoubleSide
    });
    panoramaSphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    panoramaScene.add(panoramaSphereMesh);

    // Event Listeners for Drag Navigation
    canvas.addEventListener('mousedown', onPanoMouseDown, false);
    window.addEventListener('mousemove', onPanoMouseMove, false);
    window.addEventListener('mouseup', onPanoMouseUp, false);
    canvas.addEventListener('wheel', onPanoMouseWheel, { passive: true });

    // Touch Drag & Pinch Zoom Support
    canvas.addEventListener('touchstart', onPanoTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onPanoTouchMove, { passive: true });
    canvas.addEventListener('touchend', onPanoTouchEnd, { passive: true });

    window.addEventListener('resize', onPanoWindowResize, false);

    // Observe viewport container resize
    if (window.ResizeObserver && !panoResizeObserver) {
      panoResizeObserver = new ResizeObserver(() => {
        onPanoWindowResize();
      });
      panoResizeObserver.observe(container);
    }
  } else {
    onPanoWindowResize();
  }
}

function onPanoMouseDown(event) {
  if (event.button !== 0) return;
  event.preventDefault();
  panoIsUserInteracting = true;
  panoOnMouseDownMouseX = event.clientX;
  panoOnMouseDownMouseY = event.clientY;
  panoOnMouseDownLon = panoLon;
  panoOnMouseDownLat = panoLat;
  const container = document.getElementById('panoramaViewportContainer');
  if (container) container.classList.add('grabbing');
}

function onPanoMouseMove(event) {
  if (!panoIsUserInteracting) return;
  // Natural dragging: dragging right rotates view right, dragging up tilts view up
  panoTargetLon = (event.clientX - panoOnMouseDownMouseX) * 0.16 + panoOnMouseDownLon;
  panoTargetLat = (event.clientY - panoOnMouseDownMouseY) * 0.16 + panoOnMouseDownLat;
}

function onPanoMouseUp() {
  panoIsUserInteracting = false;
  const container = document.getElementById('panoramaViewportContainer');
  if (container) container.classList.remove('grabbing');
}

function onPanoMouseWheel(event) {
  panoFov += event.deltaY * 0.05;
  panoFov = Math.max(35, Math.min(95, panoFov));
  if (panoramaCamera) {
    panoramaCamera.fov = panoFov;
    panoramaCamera.updateProjectionMatrix();
  }
}

let panoTouchStartDist = 0;
function onPanoTouchStart(event) {
  if (event.touches.length === 1) {
    panoIsUserInteracting = true;
    panoOnMouseDownMouseX = event.touches[0].clientX;
    panoOnMouseDownMouseY = event.touches[0].clientY;
    panoOnMouseDownLon = panoLon;
    panoOnMouseDownLat = panoLat;
  } else if (event.touches.length === 2) {
    panoIsUserInteracting = false;
    panoTouchStartDist = Math.hypot(
      event.touches[0].clientX - event.touches[1].clientX,
      event.touches[0].clientY - event.touches[1].clientY
    );
  }
}

function onPanoTouchMove(event) {
  if (event.touches.length === 1 && panoIsUserInteracting) {
    panoTargetLon = (event.touches[0].clientX - panoOnMouseDownMouseX) * 0.2 + panoOnMouseDownLon;
    panoTargetLat = (event.touches[0].clientY - panoOnMouseDownMouseY) * 0.2 + panoOnMouseDownLat;
  } else if (event.touches.length === 2) {
    const dist = Math.hypot(
      event.touches[0].clientX - event.touches[1].clientX,
      event.touches[0].clientY - event.touches[1].clientY
    );
    const factor = (panoTouchStartDist - dist) * 0.1;
    panoFov = Math.max(35, Math.min(95, panoFov + factor));
    if (panoramaCamera) {
      panoramaCamera.fov = panoFov;
      panoramaCamera.updateProjectionMatrix();
    }
    panoTouchStartDist = dist;
  }
}

function onPanoTouchEnd() {
  panoIsUserInteracting = false;
}

function onPanoWindowResize() {
  const canvas = document.getElementById('panoramaCanvas');
  if (!canvas || !panoramaRenderer || !panoramaCamera) return;
  const container = document.getElementById('panoramaViewportContainer') || canvas.parentElement;
  if (!container) return;

  const w = container.clientWidth || Math.min(window.innerWidth * 0.95, 1200);
  const h = container.clientHeight || Math.min(window.innerHeight * 0.85, 750);

  if (w <= 0 || h <= 0) return;

  panoramaCamera.aspect = w / h;
  panoramaCamera.updateProjectionMatrix();
  panoramaRenderer.setSize(w, h);
  panoramaRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function animatePanorama() {
  panoAnimationId = requestAnimationFrame(animatePanorama);

  if (panoAutoRotate && !panoIsUserInteracting) {
    panoTargetLon += 0.08;
  }

  // Damping / Inertia Smoothing
  panoLon += (panoTargetLon - panoLon) * 0.12;
  panoLat += (panoTargetLat - panoLat) * 0.12;
  panoLat = Math.max(-85, Math.min(85, panoLat));

  const phi = THREE.MathUtils.degToRad(90 - panoLat);
  const theta = THREE.MathUtils.degToRad(panoLon);

  const target = new THREE.Vector3(
    500 * Math.sin(phi) * Math.cos(theta),
    500 * Math.cos(phi),
    500 * Math.sin(phi) * Math.sin(theta)
  );

  panoramaCamera.lookAt(target);
  panoramaRenderer.render(panoramaScene, panoramaCamera);

  // Update Compass Indicator
  updatePanoCompass();
}

function updatePanoCompass() {
  const headingEl = document.getElementById('panoramaCompassHeading');
  if (!headingEl) return;
  let deg = Math.round(((panoLon % 360) + 360) % 360);
  const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  const idx = Math.round(deg / 45) % 8;
  headingEl.textContent = `${deg}° ${cardinals[idx]}`;
}

window.open360Panorama = function(locationKey = 'kelingking') {
  const modal = document.getElementById('panoramaModal');
  if (!modal) return;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  initPanoramaEngine();

  // Multi-frame resize trigger to guarantee perfect canvas sizing as modal finishes CSS transition
  onPanoWindowResize();
  requestAnimationFrame(onPanoWindowResize);
  setTimeout(onPanoWindowResize, 60);
  setTimeout(onPanoWindowResize, 200);
  setTimeout(onPanoWindowResize, 450);

  window.switchPanoramaLocation(locationKey);

  if (!panoAnimationId) {
    animatePanorama();
  }
};

window.close360Panorama = function() {
  const modal = document.getElementById('panoramaModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (panoAnimationId) {
    cancelAnimationFrame(panoAnimationId);
    panoAnimationId = null;
  }
};

window.switchPanoramaLocation = function(key) {
  const loc = PANORAMA_LOCATIONS[key] || PANORAMA_LOCATIONS['kelingking'];
  activePanoramaId = loc.id;

  // Update HUD text
  const titleEl = document.getElementById('panoramaLocationTitle');
  const locEl = document.getElementById('panoramaLocationSubtitle');
  const descEl = document.getElementById('panoramaLocationDesc');
  if (titleEl) titleEl.textContent = loc.name;
  if (locEl) locEl.textContent = loc.location;
  if (descEl) descEl.textContent = loc.description;

  // Update Active Tab Button in HUD
  document.querySelectorAll('.panorama-loc-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.loc === loc.id);
  });

  if (panoramaSphereMesh) {
    // 1. Instant Procedural Texture: Always bright, immediate and responsive across all 360°
    const instantTexture = createProceduralPanoramaTexture(loc);
    if (instantTexture) {
      panoramaSphereMesh.material.map = instantTexture;
      panoramaSphereMesh.material.color.setHex(0xFFFFFF);
      panoramaSphereMesh.material.needsUpdate = true;
    }

    // 2. Load High-Resolution Authentic Equirectangular Photograph
    const loadingBadge = document.getElementById('panoramaLoadingBadge');
    if (loadingBadge) loadingBadge.style.display = 'inline-flex';

    if (!panoTextureLoader) {
      panoTextureLoader = new THREE.TextureLoader();
      panoTextureLoader.setCrossOrigin('anonymous');
    }

    panoTextureLoader.load(
      loc.imageUrl,
      (texture) => {
        try {
          const composited = composite360Panorama(loc, texture.image);
          if (composited) {
            panoramaSphereMesh.material.map = composited;
          } else {
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            panoramaSphereMesh.material.map = texture;
          }
        } catch (e) {
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          panoramaSphereMesh.material.map = texture;
        }
        panoramaSphereMesh.material.color.setHex(0xFFFFFF);
        panoramaSphereMesh.material.needsUpdate = true;
        if (loadingBadge) loadingBadge.style.display = 'none';
      },
      undefined,
      (err) => {
        console.warn('Using procedural vista for location:', loc.id, err);
        if (loadingBadge) loadingBadge.style.display = 'none';
      }
    );
  }

  // Smoothly set yaw and pitch
  panoTargetLon = (loc.defaultYaw || 0) * (180 / Math.PI);
  panoTargetLat = (loc.defaultPitch || 0) * (180 / Math.PI);
  panoLon = panoTargetLon;
  panoLat = panoTargetLat;
};

window.togglePanoramaAutoRotate = function() {
  panoAutoRotate = !panoAutoRotate;
  const btn = document.getElementById('panoAutoRotateBtn');
  if (btn) {
    btn.classList.toggle('active', panoAutoRotate);
    btn.setAttribute('aria-pressed', String(panoAutoRotate));
    btn.innerHTML = panoAutoRotate ? '🔄' : '⏸';
  }
};

window.zoomPanorama = function(delta) {
  panoFov = Math.max(35, Math.min(95, panoFov + delta));
  if (panoramaCamera) {
    panoramaCamera.fov = panoFov;
    panoramaCamera.updateProjectionMatrix();
  }
};

window.resetPanoramaView = function() {
  panoFov = 75;
  if (panoramaCamera) {
    panoramaCamera.fov = panoFov;
    panoramaCamera.updateProjectionMatrix();
  }
  const loc = PANORAMA_LOCATIONS[activePanoramaId] || PANORAMA_LOCATIONS['kelingking'];
  panoTargetLon = (loc.defaultYaw || 0) * (180 / Math.PI);
  panoTargetLat = (loc.defaultPitch || 0) * (180 / Math.PI);
};

window.togglePanoramaFullscreen = function() {
  const container = document.getElementById('panoramaViewportContainer');
  if (!container) return;
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => console.warn(err));
  } else {
    document.exitFullscreen().catch(err => console.warn(err));
  }
};

/* ==========================================================================
   4. REAL-TIME BALI SKY & ATMOSPHERE TELEMETRY SIMULATOR
   ========================================================================== */
window.updateAtmosphericSky = function(hourFloat) {
  const hour = (hourFloat !== undefined) ? hourFloat : (new Date().getUTCHours() + 8) % 24;

  let skyCondition = 'Midday Tropical Sun';
  let sunColor = 0xFFFFFF;
  let sunIntensity = 1.3;
  let ambientColor = 0xE0F2FE;
  let ambientIntensity = 0.75;
  let haloGlowColor = 0x06B6D4;

  if (hour >= 5 && hour < 8) {
    // 🌅 Dawn / Sunrise (05:00 - 08:00)
    skyCondition = 'Tropical Dawn & Amber Sunrise';
    sunColor = 0xFFA07A;
    sunIntensity = 1.1;
    ambientColor = 0xFFD1BA;
    ambientIntensity = 0.65;
    haloGlowColor = 0xFF5E62;
  } else if (hour >= 8 && hour < 16.5) {
    // ☀️ Tropical Midday (08:00 - 16:30)
    skyCondition = 'Brilliant Tropical Sun';
    sunColor = 0xFFFFFF;
    sunIntensity = 1.4;
    ambientColor = 0xE0F2FE;
    ambientIntensity = 0.8;
    haloGlowColor = 0x06B6D4;
  } else if (hour >= 16.5 && hour < 19) {
    // 🌇 Sunset / Golden Hour (16:30 - 19:00)
    skyCondition = 'Fiery Sunset & Golden Hour';
    sunColor = 0xFF5E62;
    sunIntensity = 1.3;
    ambientColor = 0xFF9900;
    ambientIntensity = 0.7;
    haloGlowColor = 0xEC4899;
  } else {
    // 🌙 Starry Night / Moonlight (19:00 - 05:00)
    skyCondition = 'Starry Night & Silvery Moonlight';
    sunColor = 0x93C5FD;
    sunIntensity = 0.55;
    ambientColor = 0x1E1B4B;
    ambientIntensity = 0.35;
    haloGlowColor = 0x8B5CF6;
  }

  // Update Regional 3D Map Lights
  if (window.regionalMapLighting) {
    const { sunLight, ambientLight } = window.regionalMapLighting;
    if (sunLight) {
      sunLight.color.setHex(sunColor);
      sunLight.intensity = sunIntensity;
      const sunAngle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
      sunLight.position.set(Math.cos(sunAngle) * 20, Math.max(4, Math.sin(sunAngle) * 20), 15);
    }
    if (ambientLight) {
      ambientLight.color.setHex(ambientColor);
      ambientLight.intensity = ambientIntensity;
    }
  }

  // Update Hero Celestial Atmosphere Halo
  if (window.heroAtmosphere && window.heroAtmosphere.haloMesh) {
    const haloMat = window.heroAtmosphere.haloMesh.material;
    if (haloMat.uniforms && haloMat.uniforms.glowColor) {
      haloMat.uniforms.glowColor.value.setHex(haloGlowColor);
    }
  }

  // Update UI Telemetry text
  const conditionEl = document.getElementById('skyConditionText');
  const elevationEl = document.getElementById('skySunElevationText');
  const sliderEl = document.getElementById('skyHourSlider');
  const sliderDisplay = document.getElementById('skyHourDisplay');

  const formattedHour = Math.floor(hour);
  const formattedMin = Math.round((hour - formattedHour) * 60);
  const time12 = `${formattedHour % 12 || 12}:${formattedMin < 10 ? '0' : ''}${formattedMin} ${formattedHour >= 12 ? 'PM' : 'AM'} WITA`;

  if (conditionEl) conditionEl.textContent = skyCondition;
  if (sliderDisplay) sliderDisplay.textContent = time12;
  if (elevationEl) {
    const elevationDeg = Math.round(Math.sin((hour / 24) * Math.PI * 2 - Math.PI / 2) * 75);
    elevationEl.textContent = `${elevationDeg > 0 ? '+' : ''}${elevationDeg}° Elevation`;
  }
  if (sliderEl && Math.abs(parseFloat(sliderEl.value) - hour) > 0.5) {
    sliderEl.value = hour;
  }
};

