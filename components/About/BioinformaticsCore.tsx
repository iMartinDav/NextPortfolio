'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { Float, Html, OrbitControls, Text } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════════════════
//  BIOINFORMATICS MORPHING CORE
//
//  Shader-based point cloud matching DNAHelixScene aesthetic.
//  Morphs between 4 shapes telling the bioinformatics pipeline:
//    1. Petri Dish  — Wet Lab / Biology
//    2. Plasmid     — Supercoiled circular DNA vector
//    3. Bitstream   — Binary cascade / Informatics
//    4. Dashboard   — Bioinformatics insight visualization
// ═══════════════════════════════════════════════════════════════════════════════

const TOTAL = 3500;

// ── Particle shader (soft microscopic dots) ──────────────────────────────────

const VERT = `
  attribute float aSize;
  attribute float aBright;
  attribute float aPhase;
  attribute vec3  aColor;
  varying   float vBright;
  varying   vec3  vColor;
  uniform   float uTime;
  void main() {
    vColor  = aColor;
    vBright = aBright;
    float vib  = 0.006 * sin(uTime * 1.5 + aPhase * 6.283);
    float vibY = 0.004 * cos(uTime * 1.2 + aPhase * 4.712);
    vec3  pos  = position + vec3(vib, vibY, vib * 0.5);
    vec4  mv   = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (900.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`;

const FRAG = `
  varying float vBright;
  varying vec3  vColor;
  uniform float uIsLight;
  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, d);
    float core  = smoothstep(0.15, 0.0, d);
    vec3  col   = mix(vColor, vec3(0.8, 1.0, 0.95), core * 0.35);
    float edgeDarken = mix(1.0, smoothstep(0.5, 0.1, d), uIsLight * 0.5);
    gl_FragColor = vec4(col * edgeDarken, alpha * vBright * mix(0.75, 0.9, uIsLight));
  }
`;

// ── Buffer arrays type ──────────────────────────────────────────────────────

interface Buffers {
  P: number[];
  CO: number[];
  SZ: number[];
  BR: number[];
  PH: number[];
}

interface ShapeData {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  brights: Float32Array;
  phases: Float32Array;
}

function createBuffers(): Buffers {
  return { P: [], CO: [], SZ: [], BR: [], PH: [] };
}

// ── cloud() — spherical scatter (same as DNAHelixScene) ─────────────────────

function cloud(
  cx: number, cy: number, cz: number,
  col: THREE.Color, n: number, spread: number,
  sMin: number, sMax: number, bMin: number, bMax: number,
  buf: Buffers, centered = false
): void {
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2.0 * Math.random() - 1.0);
    const rFrac = centered ? Math.random() ** 2 : Math.cbrt(Math.random());
    const r = rFrac * spread;

    buf.P.push(
      cx + r * Math.sin(phi) * Math.cos(theta),
      cy + r * Math.sin(phi) * Math.sin(theta),
      cz + r * Math.cos(phi)
    );

    const f = 0.8 + Math.random() * 0.4;
    buf.CO.push(col.r * f, col.g * f, col.b * f);
    buf.SZ.push(sMin + Math.random() ** 3 * (sMax - sMin));
    buf.BR.push(bMin + Math.random() * (bMax - bMin));
    buf.PH.push(Math.random());
  }
}

// ── Pad/truncate arrays to exactly TOTAL particles ──────────────────────────

function finalize(buf: Buffers): ShapeData {
  while (buf.P.length / 3 < TOTAL) {
    const idx = Math.floor(Math.random() * (buf.P.length / 3)) * 3;
    buf.P.push(
      buf.P[idx] + (Math.random() - 0.5) * 0.1,
      buf.P[idx + 1] + (Math.random() - 0.5) * 0.1,
      buf.P[idx + 2] + (Math.random() - 0.5) * 0.1
    );
    buf.CO.push(buf.CO[idx], buf.CO[idx + 1], buf.CO[idx + 2]);
    buf.SZ.push(buf.SZ[idx / 3 | 0]);
    buf.BR.push(buf.BR[idx / 3 | 0]);
    buf.PH.push(Math.random());
  }
  return {
    positions: new Float32Array(buf.P.slice(0, TOTAL * 3)),
    colors: new Float32Array(buf.CO.slice(0, TOTAL * 3)),
    sizes: new Float32Array(buf.SZ.slice(0, TOTAL)),
    brights: new Float32Array(buf.BR.slice(0, TOTAL)),
    phases: new Float32Array(buf.PH.slice(0, TOTAL)),
  };
}

// ── Shape 1: Petri Dish ─────────────────────────────────────────────────────

function generatePetriDish(): ShapeData {
  const buf = createBuffers();
  const rim = new THREE.Color('#34d399');
  const agar = new THREE.Color('#065f46');
  const culture = new THREE.Color('#10b981');
  const colony = new THREE.Color('#a7f3d0');

  const DISH_R = 3.5;

  // Agar medium (flat disc base)
  for (let i = 0; i < 2000; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * DISH_R;
    cloud(Math.cos(a) * r, (Math.random() - 0.5) * 0.12, Math.sin(a) * r,
      agar, 1, 0.04, 0.02, 0.1, 0.3, 0.7, buf);
  }

  // Rim wall (raised glass edge — thick ring)
  for (let i = 0; i < 900; i++) {
    const a = (i / 900) * Math.PI * 2;
    const rOuter = DISH_R + (Math.random() - 0.5) * 0.15;
    cloud(
      Math.cos(a) * rOuter, 0.15 + Math.random() * 0.7, Math.sin(a) * rOuter,
      rim, 1, 0.1, 0.03, 0.16, 0.5, 1.0, buf, true
    );
  }

  // Rim bottom edge (completes the dish shape)
  for (let i = 0; i < 400; i++) {
    const a = (i / 400) * Math.PI * 2;
    const rOuter = DISH_R + (Math.random() - 0.5) * 0.1;
    cloud(
      Math.cos(a) * rOuter, -0.05 + Math.random() * 0.15, Math.sin(a) * rOuter,
      new THREE.Color('#059669'), 1, 0.08, 0.02, 0.12, 0.4, 0.9, buf, true
    );
  }

  // Bacterial colonies (8 clustered bright spots at varied positions)
  const centers = [
    { x: -1.5, z: 1.0, s: 0.6 }, { x: 1.8, z: -0.7, s: 0.5 },
    { x: 0.2, z: 2.0, s: 0.4 }, { x: -0.6, z: -1.8, s: 0.7 },
    { x: 2.2, z: 1.3, s: 0.35 }, { x: -2.0, z: -0.5, s: 0.55 },
    { x: 0.8, z: -2.2, s: 0.4 }, { x: -1.0, z: 0.0, s: 0.3 },
  ];
  centers.forEach(({ x, z, s }) => {
    for (let j = 0; j < 80; j++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * s;
      cloud(
        x + Math.cos(a) * r, 0.06 + Math.random() * 0.2, z + Math.sin(a) * r,
        Math.random() > 0.4 ? colony : culture,
        1, 0.05, 0.04, 0.22, 0.6, 1.0, buf, true
      );
    }
  });

  return finalize(buf);
}

// ── Shape 2: Supercoiled Plasmid ────────────────────────────────────────────

function generatePlasmid(): ShapeData {
  const buf = createBuffers();
  const backbone = new THREE.Color('#06b6d4');
  const bases = new THREE.Color('#22d3ee');
  const ori = new THREE.Color('#00f0ff');
  const ampR = new THREE.Color('#c084fc');

  const R = 3.0; // Major radius
  const COILS = 5; // Supercoil turns
  const TUBE = 0.45; // Tube thickness
  const SEGS = 400; // Resolution

  // Dense backbone ring
  for (let i = 0; i < SEGS; i++) {
    const t = (i / SEGS) * Math.PI * 2;
    const cx = (R + TUBE * Math.cos(COILS * t)) * Math.cos(t);
    const cy = TUBE * Math.sin(COILS * t);
    const cz = (R + TUBE * Math.cos(COILS * t)) * Math.sin(t);
    cloud(cx, cy, cz, backbone, 6, 0.22, 0.02, 0.18, 0.5, 1.0, buf, true);
  }

  // Connective inter-segment particles (smooth backbone)
  for (let i = 0; i < SEGS - 1; i++) {
    const t1 = (i / SEGS) * Math.PI * 2;
    const t2 = ((i + 1) / SEGS) * Math.PI * 2;
    for (let s = 1; s < 3; s++) {
      const frac = s / 3;
      const t = t1 + (t2 - t1) * frac;
      const cx = (R + TUBE * Math.cos(COILS * t)) * Math.cos(t);
      const cy = TUBE * Math.sin(COILS * t);
      const cz = (R + TUBE * Math.cos(COILS * t)) * Math.sin(t);
      cloud(cx, cy, cz, backbone, 2, 0.18, 0.02, 0.14, 0.4, 0.9, buf, true);
    }
  }

  // Nucleotide spokes radiating inward
  for (let i = 0; i < 250; i++) {
    const t = (i / 250) * Math.PI * 2;
    const bx = (R + TUBE * Math.cos(COILS * t)) * Math.cos(t);
    const by = TUBE * Math.sin(COILS * t);
    const bz = (R + TUBE * Math.cos(COILS * t)) * Math.sin(t);
    const inX = Math.cos(t) * R * 0.55;
    const inZ = Math.sin(t) * R * 0.55;

    for (let s = 0; s < 5; s++) {
      const f = s / 5;
      cloud(
        bx + (inX - bx) * f, by * (1 - f), bz + (inZ - bz) * f,
        bases, 1, 0.06, 0.02, 0.12, 0.4, 0.85, buf
      );
    }
  }

  // Origin of replication (ORI) — bright hot spot
  const oriX = (R + TUBE) * Math.cos(0);
  const oriZ = (R + TUBE) * Math.sin(0);
  cloud(oriX, 0, oriZ, ori, 50, 0.45, 0.06, 0.3, 0.7, 1.0, buf, true);

  // Antibiotic resistance gene (AmpR) — purple marker
  const abX = (R + TUBE) * Math.cos(Math.PI);
  const abZ = (R + TUBE) * Math.sin(Math.PI);
  cloud(abX, 0, abZ, ampR, 40, 0.4, 0.05, 0.28, 0.6, 1.0, buf, true);

  // Promoter region — subtle marker at 90°
  const prX = (R + TUBE) * Math.cos(Math.PI / 2);
  const prZ = (R + TUBE) * Math.sin(Math.PI / 2);
  cloud(prX, 0, prZ, new THREE.Color('#fbbf24'), 25, 0.3, 0.04, 0.2, 0.5, 0.9, buf, true);

  return finalize(buf);
}

// ── Shape 3: Bitstream Cascade ──────────────────────────────────────────────

function generateBitstream(): ShapeData {
  const buf = createBuffers();
  const colors = [
    new THREE.Color('#00f0ff'),
    new THREE.Color('#8b5cf6'),
    new THREE.Color('#38bdf8'),
  ];

  const COLS = 28;
  const perCol = Math.floor(TOTAL / COLS);

  for (let col = 0; col < COLS; col++) {
    const x = (col / COLS) * 8.5 - 4.25;
    const colColor = colors[col % 3];
    // Vary column density for a natural "data rain" look
    const density = 0.7 + Math.sin(col * 1.2) * 0.3;

    for (let row = 0; row < perCol * density; row++) {
      const y = (row / perCol) * 10 - 5;
      const z = Math.sin(col * 0.6 + row * 0.08) * 0.6;
      cloud(
        x + (Math.random() - 0.5) * 0.12, y, z,
        colColor, 1, 0.03, 0.02, 0.14, 0.4, 1.0, buf
      );
    }
  }

  return finalize(buf);
}

// ── Shape 4: Bioinformatics Dashboard ───────────────────────────────────────

function generateDashboard(): ShapeData {
  const buf = createBuffers();
  const purple = new THREE.Color('#8b5cf6');
  const teal = new THREE.Color('#2dd4bf');
  const cyan = new THREE.Color('#06b6d4');
  const muted = new THREE.Color('#a78bfa');
  const border = new THREE.Color('#475569');

  // Window border (thick outline frame)
  const W = 4.5, H = 3.8;
  for (let i = 0; i < 500; i++) {
    const t = i / 500;
    let x: number, y: number;
    if (t < 0.25)      { x = -W + t * 4 * (2 * W); y = H; }
    else if (t < 0.5)  { x = W;  y = H - (t - 0.25) * 4 * (2 * H); }
    else if (t < 0.75) { x = W - (t - 0.5) * 4 * (2 * W); y = -H; }
    else               { x = -W; y = -H + (t - 0.75) * 4 * (2 * H); }
    cloud(x, y, 0, border, 3, 0.1, 0.02, 0.12, 0.5, 0.9, buf, true);
  }

  // Header (top bar)
  for (let i = 0; i < 350; i++) {
    cloud(
      (Math.random()) * 9 - 4.5, 3.0 + Math.random() * 0.5, 0.08,
      muted, 1, 0.05, 0.02, 0.1, 0.4, 0.8, buf
    );
  }

  // Sidebar (left)
  for (let i = 0; i < 400; i++) {
    cloud(
      -4.2 + Math.random() * 1.2, -3.2 + Math.random() * 5.8, 0.12,
      purple, 1, 0.04, 0.02, 0.1, 0.3, 0.7, buf
    );
  }

  // Bar chart (main area)
  const bars = [2.0, 2.8, 1.4, 3.2, 2.5, 1.7, 3.0, 1.2, 2.6];
  bars.forEach((h, i) => {
    const bx = -2.5 + i * 0.65;
    for (let j = 0; j < 70; j++) {
      cloud(
        bx + (Math.random() - 0.5) * 0.35, -2.8 + Math.random() * h, (Math.random() - 0.5) * 0.1,
        i % 2 === 0 ? teal : cyan, 1, 0.03, 0.03, 0.14, 0.5, 1.0, buf
      );
    }
  });

  // Scatter plot (right panel)
  for (let i = 0; i < 300; i++) {
    cloud(
      2.8 + Math.random() * 1.5, -2.8 + Math.random() * 5.0, 0.05,
      cyan, 1, 0.025, 0.04, 0.16, 0.5, 1.0, buf
    );
  }

  return finalize(buf);
}

// ── Floating text overlay ───────────────────────────────────────────────────

const CHAR_SETS = [
  ['●', '○', '◉', '◎', '⬤', '●', '○'],
  ['A', 'C', 'G', 'T', 'U', 'A', 'G'],
  ['0', '1', '0', '1', '1', '0', '1'],
  ['<', '/', '>', '{', '}', '<', '>'],
];

const LABEL_COLORS = ['#34d399', '#22d3ee', '#a78bfa', '#8b5cf6'];
const LABEL_COUNT = 12;

function FloatingLabels({ shapeIndex }: { shapeIndex: number }) {
  const textRefs = useRef<any[]>([]);

  const anchors = useMemo(() => {
    const list = [];
    for (let i = 0; i < LABEL_COUNT; i++) {
      list.push({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 4,
        speed: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        size: 0.15 + Math.random() * 0.15,
      });
    }
    return list;
  }, []);

  useFrame((state: any) => {
    const t = state.clock.elapsedTime;
    anchors.forEach((a, i) => {
      const mesh = textRefs.current[i];
      if (!mesh) return;
      mesh.position.set(
        a.x + Math.sin(t * a.speed + a.phase) * 0.4,
        a.y + Math.cos(t * a.speed * 0.7 + a.phase) * 0.4,
        a.z
      );
      const op = 0.22 + Math.sin(t * 1.5 + a.phase) * 0.1;
      mesh.fillOpacity = op;
      if (mesh.material) {
        mesh.material.opacity = op;
        mesh.material.transparent = true;
        mesh.material.depthWrite = false;
      }
    });
  });

  return (
    <group>
      {anchors.map((a, i) => (
        <Text
          key={`${shapeIndex}-${i}`}
          ref={(el: any) => { textRefs.current[i] = el; }}
          fontSize={a.size}
          anchorX="center"
          anchorY="middle"
          color={LABEL_COLORS[shapeIndex]}
        >
          {CHAR_SETS[shapeIndex][i % CHAR_SETS[shapeIndex].length]}
        </Text>
      ))}
    </group>
  );
}

// ── Phase labels ────────────────────────────────────────────────────────────

const SHAPE_LABELS = [
  'Wet Lab · Petri Dish Culture',
  'Plasmid Vector · Circular DNA',
  'Data Pipeline · Binary Stream',
  'Insights · Bioinformatics Dashboard',
];

// ── Main morphing scene ─────────────────────────────────────────────────────

function MorphingScene({ isLight }: { isLight: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [shapeIndex, setShapeIndex] = useState(0);

  const shapes = useMemo(
    () => [generatePetriDish(), generatePlasmid(), generateBitstream(), generateDashboard()],
    []
  );

  const currentPos = useRef(new Float32Array(shapes[0].positions));
  const currentCol = useRef(new Float32Array(shapes[0].colors));

  const attrs = useMemo(() => ({
    sizes: shapes[0].sizes,
    brights: shapes[0].brights,
    phases: shapes[0].phases,
  }), [shapes]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIsLight: { value: 0.0 },
  }), []);

  useEffect(() => {
    if (matRef.current) {
      matRef.current.uniforms.uIsLight.value = isLight ? 1.0 : 0.0;
    }
  }, [isLight]);

  useEffect(() => {
    const id = setInterval(() => {
      setShapeIndex((p: number) => (p + 1) % 4);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  useFrame((state: any) => {
    if (!pointsRef.current || !matRef.current) return;

    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    const target = shapes[shapeIndex];
    const posArr = (pointsRef.current.geometry.attributes.position.array) as Float32Array;
    const colArr = (pointsRef.current.geometry.attributes.aColor.array) as Float32Array;
    const lerp = 0.035;

    for (let i = 0; i < TOTAL * 3; i++) {
      currentPos.current[i] += (target.positions[i] - currentPos.current[i]) * lerp;
      posArr[i] = currentPos.current[i];
      currentCol.current[i] += (target.colors[i] - currentCol.current[i]) * lerp;
      colArr[i] = currentCol.current[i];
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.aColor.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.15;

      if (shapeIndex === 3) {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.1, 0.02);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.02);
      } else if (shapeIndex === 2) {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.15, 0.02);
        groupRef.current.rotation.y += 0.001;
      } else {
        groupRef.current.rotation.y += 0.003;
      }
    }
  });

  return (
    <>
      <ambientLight
        color={isLight ? 0x336655 : 0x001a14}
        intensity={isLight ? 5.0 : 3.0}
      />
      <pointLight
        color={isLight ? 0x00b8a9 : 0x009990}
        intensity={isLight ? 18 : 12}
        distance={60}
        position={[-6, 8, 8]}
      />
      <pointLight
        color={isLight ? 0x008070 : 0x004d3d}
        intensity={isLight ? 10 : 6}
        distance={50}
        position={[7, -6, -4]}
      />
      <pointLight
        color={isLight ? 0x00c8b8 : 0x00a89d}
        intensity={isLight ? 8 : 4}
        distance={40}
        position={[0, 14, 5]}
      />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.4}
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.05}
      />

      <group ref={groupRef}>
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(currentPos.current), 3]} />
            <bufferAttribute attach="attributes-aColor" args={[new Float32Array(currentCol.current), 3]} />
            <bufferAttribute attach="attributes-aSize" args={[attrs.sizes, 1]} />
            <bufferAttribute attach="attributes-aBright" args={[attrs.brights, 1]} />
            <bufferAttribute attach="attributes-aPhase" args={[attrs.phases, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={matRef}
            uniforms={uniforms}
            vertexShader={VERT}
            fragmentShader={FRAG}
            transparent
            depthWrite={false}
            blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
          />
        </points>

        <FloatingLabels shapeIndex={shapeIndex} />
      </group>

      <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
        <Html position={[0, -4.5, 0]} center>
          <div className={`flex flex-col items-center whitespace-nowrap backdrop-blur-md px-5 py-2 rounded-full shadow-lg transition-all duration-700 border ${
            isLight
              ? 'bg-white/70 border-teal-300/50'
              : 'bg-gray-900/60 border-gray-700/50'
          }`}>
            <span className={`font-mono text-xs md:text-sm tracking-widest uppercase font-bold ${
              isLight ? 'text-teal-700' : 'text-teal-400'
            }`}>
              {'>'} {SHAPE_LABELS[shapeIndex]}
            </span>
          </div>
        </Html>
      </Float>
    </>
  );
}

export default function BioinformaticsCore() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';

  return (
    <div className="w-full h-[450px] md:h-[520px] lg:h-[600px] relative overflow-visible">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.04)_0%,transparent_60%)] pointer-events-none" />
      <Canvas camera={{ position: [0, 0, 11], fov: 50 }} gl={{ alpha: true }}>
        <MorphingScene isLight={isLight} />
      </Canvas>
    </div>
  );
}
