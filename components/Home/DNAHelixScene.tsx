import { OrbitControls, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════════════════
//  B-DNA DOUBLE HELIX — Helical AI–inspired Point Cloud
//
//  Replaces solid tubes with dense collections of distinct, sharply rendered spheres.
//  The bindings (H-bonds) are scattered trails of variable-sized dots.
// ═══════════════════════════════════════════════════════════════════════════════

const S = 0.045;
const RISE = 3.4 * S;
const TWIST = (36.0 * Math.PI) / 180;
const R_BACKBONE = 9.0 * S;
const R_BASE = 8.0 * S;
const GROOVE_OFFSET = (168.0 * Math.PI) / 180;

const BP_COUNT = 100; // Dense turns
const VIS_SCALE = 3.2;

const RP = R_BACKBONE * VIS_SCALE;
const RC = R_BASE * VIS_SCALE;
const RISE_S = RISE * VIS_SCALE;

const COMPLEMENT: Record<string, string> = { A: 'T', T: 'A', C: 'G', G: 'C' };
const SEQ = 'CGCGAATTCGCGCGCGAATTCGCGCGCGAATTCGCGCGCGAATTCGCGCGCGAATTCGCGCGCGAATTCGCGCGCGAATTCGCGCGCGAATTCGCGCGCG';
const IS_PURINE: Record<string, boolean> = { A: true, G: true, C: false, T: false };
const BASES = ['A', 'T', 'C', 'G'];

// ── Droplets System (DNA-to-Bits Glitch Transformation) ─────────────────────
function Droplets({ isLight }: { isLight: boolean }) {
  const count = 20;
  const textRefs = useRef<any[]>([]);

  const dropletsData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
        const isBit = Math.random() > 0.4;
        const char = isBit ? (Math.random() > 0.5 ? '0' : '1') : BASES[Math.floor(Math.random() * 4)];
        
        const d: any = {
            char,
            isBit,
            glitchX: 0,
            glitchY: 0,
            glitchZ: 0,
        };
        
        const bpIndex = Math.floor(Math.random() * BP_COUNT);
        d.y = (bpIndex - BP_COUNT / 2) * RISE_S;
        
        const baseAngle = bpIndex * TWIST;
        d.angle = baseAngle + (Math.random() > 0.5 ? GROOVE_OFFSET : 0);
        d.radius = d.isBit ? RP : RC;
        
        d.vy = -(0.004 + Math.random() * 0.01);
        d.vr = 0.002 + Math.random() * 0.006;
        d.va = (Math.random() - 0.5) * 0.005;
        
        d.age = Math.random() * 200;
        d.maxAge = 180 + Math.random() * 100;
        
        data.push(d);
    }
    return data;
  }, []);

  useFrame(() => {
    dropletsData.forEach((d, i) => {
        d.age += 1;
        
        if (d.age > d.maxAge) {
            const bpIndex = Math.floor(Math.random() * BP_COUNT);
            d.y = (bpIndex - BP_COUNT / 2) * RISE_S;
            d.angle = bpIndex * TWIST + (Math.random() > 0.5 ? GROOVE_OFFSET : 0);
            d.radius = d.isBit ? RP : RC;
            
            d.vy = -(0.004 + Math.random() * 0.01);
            d.vr = 0.002 + Math.random() * 0.006;
            d.va = (Math.random() - 0.5) * 0.005;
            
            d.age = 0;
            d.maxAge = 180 + Math.random() * 100;
            d.glitchX = 0; d.glitchY = 0; d.glitchZ = 0;
        }

        d.y += d.vy;
        d.radius += d.vr;
        d.angle += d.va;
        
        const baseX = Math.cos(d.angle) * d.radius;
        const baseZ = Math.sin(d.angle) * d.radius;
        
        if (Math.random() < 0.015) {
            d.glitchX = (Math.random() - 0.5) * 0.8;
            d.glitchY = (Math.random() - 0.5) * 0.8;
            d.glitchZ = (Math.random() - 0.5) * 0.8;
        } else if (Math.random() < 0.15) {
            d.glitchX = 0;
            d.glitchY = 0;
            d.glitchZ = 0;
        }

        let op = 1.0;
        if (d.age < 20) op = d.age / 20.0; 
        else if (d.age > d.maxAge - 30) op = Math.max(0, (d.maxAge - d.age) / 30.0);
        
        if (d.glitchX !== 0) op *= 0.4;

        const mesh = textRefs.current[i];
        if (mesh) {
            mesh.position.set(baseX + d.glitchX, d.y + d.glitchY, baseZ + d.glitchZ);
            
            const finalOp = op * (isLight ? 0.7 : 0.9);
            mesh.fillOpacity = finalOp;
            
            if (mesh.material) {
                mesh.material.opacity = finalOp;
                mesh.material.transparent = true;
                mesh.material.depthWrite = false;
                mesh.material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
            }
        }
    });
  });

  return (
    <group>
      {dropletsData.map((d, i) => (
        <Text
          key={i}
          ref={(el) => { textRefs.current[i] = el; }}
          fontSize={d.isBit ? 0.22 : 0.16}
          anchorX="center"
          anchorY="middle"
          color={d.isBit ? (isLight ? '#006660' : '#88ffdd') : (isLight ? '#008f8c' : '#00ffee')}
        >
          {d.char}
        </Text>
      ))}
    </group>
  );
}

// ── Color palettes ──────────────────────────────────────────────────────────
const DARK = {
  phosphate: new THREE.Color(0x006660),
  sugar: new THREE.Color(0x005550),
  purine: new THREE.Color(0x00d4b8),
  pyrimidine: new THREE.Color(0x00bba0),
  hbond: new THREE.Color(0x22ffd4),
  ambient: 0x001a14,
  key: 0x009990,
  rim: 0x004d3d,
  top: 0x00a89d,
};

const LIGHT = {
  phosphate: new THREE.Color(0x008f8c),
  sugar: new THREE.Color(0x006655),
  purine: new THREE.Color(0x008080),
  pyrimidine: new THREE.Color(0x005c80),
  hbond: new THREE.Color(0x336666),
  ambient: 0xffffff,
  key: 0x008f8c,
  rim: 0x005c80,
  top: 0x008f8c,
};

// ── Particle shader (Soft microscopic dust, no cartoon shading) ───────────────
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
    
    float vib  = 0.005 * sin(uTime * 1.5 + aPhase * 6.283);
    float vibY = 0.003 * cos(uTime * 1.2 + aPhase * 4.712);
    vec3  pos  = position + vec3(vib, vibY, vib * 0.5);
    
    vec4  mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (1000.0 / -mv.z);
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
    float core = smoothstep(0.15, 0.0, d);
    
    vec3 col = vColor;
    if (uIsLight < 0.5) {
      col = mix(col, vec3(0.8, 1.0, 0.95), core * 0.4);
    }
    
    gl_FragColor = vec4(col, alpha * vBright * 0.65);
  }
`;

// ── Uniform sphere density cloud helper ──────────────────────────────────────
function cloud(
  cx: number, cy: number, cz: number, col: THREE.Color,
  n: number, spread: number, sMin: number, sMax: number, bMin: number, bMax: number,
  P: number[], CO: number[], SZ: number[], BR: number[], PH: number[],
  centerWeighted: boolean = false
) {
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    
    let rFrac = centerWeighted ? Math.pow(Math.random(), 2) : Math.cbrt(Math.random());
    const r = rFrac * spread;
    
    P.push(cx + r * Math.sin(phi) * Math.cos(theta), cy + r * Math.sin(phi) * Math.sin(theta), cz + r * Math.cos(phi));
    
    const f = 0.8 + Math.random() * 0.4;
    CO.push(col.r * f, col.g * f, col.b * f);
    
    const size = sMin + Math.pow(Math.random(), 3) * (sMax - sMin);
    SZ.push(size);
    BR.push(bMin + Math.random() * (bMax - bMin));
    PH.push(Math.random());
  }
}

interface Props {
  isLight: boolean;
}

export function DNAHelixScene({ isLight }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const C = isLight ? LIGHT : DARK;

  const data = useMemo(() => {
    const P: number[] = [], CO: number[] = [], SZ: number[] = [], BR: number[] = [], PH: number[] = [];
    const c1A: THREE.Vector3[] = [], c1B: THREE.Vector3[] = [];

    const bMinSize = isLight ? 0.04 : 0.02;
    const bMaxSize = isLight ? 0.28 : 0.22;

    for (let i = 0; i < BP_COUNT; i++) {
      const base = SEQ[i % SEQ.length] || BASES[i % 4];
      const comp = COMPLEMENT[base];
      const ang = i * TWIST;
      const y = (i - BP_COUNT / 2) * RISE_S;
      const angA = ang;
      const angB = ang + GROOVE_OFFSET;

      // ── Strand A ──────────────────────────────────────────
      const pxA = Math.cos(angA) * RP, pzA = Math.sin(angA) * RP;
      const pyA = y + RISE_S * 0.3;

      cloud(pxA, pyA, pzA, C.phosphate, 75, 0.32, bMinSize, bMaxSize, 0.6, 1.0, P, CO, SZ, BR, PH, true);

      const c1xA = Math.cos(angA) * RC, c1zA = Math.sin(angA) * RC;
      c1A.push(new THREE.Vector3(c1xA, y, c1zA));
      for (let s = 0; s <= 6; s++) {
        const t = s / 6;
        const sx = pxA + (c1xA - pxA) * t;
        const sy = pyA + (y - pyA) * t;
        const sz = pzA + (c1zA - pzA) * t;
        cloud(sx, sy, sz, C.sugar, 4, 0.08, 0.04, 0.15, 0.5, 0.9, P, CO, SZ, BR, PH, true);
      }

      const isPurA = IS_PURINE[base];
      const colA = isPurA ? C.purine : C.pyrimidine;
      const nA = isPurA ? 11 : 7;
      const lenA = (isPurA ? 7.5 : 5.0) * S * VIS_SCALE;
      for (let b = 0; b < nA; b++) {
        const bt = b / (nA - 1);
        const br = RC - lenA * bt;
        const ba = angA + (Math.random() - 0.5) * 0.12;
        const by = (Math.random() - 0.5) * RISE_S * 0.5;
        const bx = Math.cos(ba) * br, bz = Math.sin(ba) * br;
        
        const bSizeMax = b === 0 ? 0.25 : 0.18;
        cloud(bx, y + by, bz, colA, 3, 0.06, 0.04, bSizeMax, 0.5, 0.9, P, CO, SZ, BR, PH);
      }

      // ── Strand B (antiparallel) ───────────────────────────
      const pxB = Math.cos(angB) * RP, pzB = Math.sin(angB) * RP;
      const pyB = y - RISE_S * 0.3;

      cloud(pxB, pyB, pzB, C.phosphate, 75, 0.32, bMinSize, bMaxSize, 0.6, 1.0, P, CO, SZ, BR, PH, true);

      const c1xB = Math.cos(angB) * RC, c1zB = Math.sin(angB) * RC;
      c1B.push(new THREE.Vector3(c1xB, y, c1zB));
      for (let s = 0; s <= 6; s++) {
        const t = s / 6;
        const sx = pxB + (c1xB - pxB) * t;
        const sy = pyB + (y - pyB) * t;
        const sz = pzB + (c1zB - pzB) * t;
        cloud(sx, sy, sz, C.sugar, 4, 0.08, 0.04, 0.15, 0.5, 0.9, P, CO, SZ, BR, PH, true);
      }

      const isPurB = IS_PURINE[comp];
      const colB = isPurB ? C.purine : C.pyrimidine;
      const nB = isPurB ? 11 : 7;
      const lenB = (isPurB ? 7.5 : 5.0) * S * VIS_SCALE;
      for (let b = 0; b < nB; b++) {
        const bt = b / (nB - 1);
        const br = RC - lenB * bt;
        const ba = angB + (Math.random() - 0.5) * 0.12;
        const by = (Math.random() - 0.5) * RISE_S * 0.5;
        const bx = Math.cos(ba) * br, bz = Math.sin(ba) * br;
        
        const bSizeMax = b === 0 ? 0.25 : 0.18;
        cloud(bx, y + by, bz, colB, 3, 0.06, 0.04, bSizeMax, 0.5, 0.9, P, CO, SZ, BR, PH);
      }
    }

    // ── H-bond rungs (composed of variable sized dots) ────────────────────
    for (let i = 0; i < BP_COUNT; i++) {
      const start = new THREE.Vector3(c1A[i].x, c1A[i].y, c1A[i].z);
      const end = new THREE.Vector3(c1B[i].x, c1B[i].y, c1B[i].z);
      const dist = start.distanceTo(end);
      
      const dotCount = Math.floor(dist * 18);
      for (let d = 0; d < dotCount; d++) {
          const t = d / (dotCount - 1);
          const cx = start.x + (end.x - start.x) * t;
          const cy = start.y + (end.y - start.y) * t;
          const cz = start.z + (end.z - start.z) * t;
          
          const isMain = Math.random() > 0.7;
          const sMin = isMain ? 0.04 : 0.01;
          const sMax = isMain ? 0.14 : 0.04;
          const rOffset = isMain ? 0.015 : 0.06;
          
          cloud(cx, cy, cz, C.hbond, isMain ? 2 : 1, rOffset, sMin, sMax, 0.5, 1.0, P, CO, SZ, BR, PH);
      }
    }

    for (let i = 0; i < BP_COUNT - 1; i++) {
        const y1 = (i - BP_COUNT / 2) * RISE_S;
        const y2 = ((i + 1) - BP_COUNT / 2) * RISE_S;

        const a1 = i * TWIST;
        const a2 = (i + 1) * TWIST;
        
        const b1 = a1 + GROOVE_OFFSET;
        const b2 = a2 + GROOVE_OFFSET;

        const pA1 = new THREE.Vector3(Math.cos(a1) * RP, y1 + RISE_S * 0.3, Math.sin(a1) * RP);
        const pA2 = new THREE.Vector3(Math.cos(a2) * RP, y2 + RISE_S * 0.3, Math.sin(a2) * RP);

        const pB1 = new THREE.Vector3(Math.cos(b1) * RP, y1 - RISE_S * 0.3, Math.sin(b1) * RP);
        const pB2 = new THREE.Vector3(Math.cos(b2) * RP, y2 - RISE_S * 0.3, Math.sin(b2) * RP);

        // Scatter dense connection dots between backbone nodes
        for (let step = 1; step < 8; step++) {
            const t = step / 8;
            const curA = new THREE.Vector3().lerpVectors(pA1, pA2, t);
            const curB = new THREE.Vector3().lerpVectors(pB1, pB2, t);
            
            cloud(curA.x, curA.y, curA.z, C.phosphate, 16, 0.26, bMinSize, bMaxSize * 0.8, 0.5, 1.0, P, CO, SZ, BR, PH, true);
            cloud(curB.x, curB.y, curB.z, C.phosphate, 16, 0.26, bMinSize, bMaxSize * 0.8, 0.5, 1.0, P, CO, SZ, BR, PH, true);
        }
    }

    return {
      positions: new Float32Array(P),
      colors: new Float32Array(CO),
      sizes: new Float32Array(SZ),
      brights: new Float32Array(BR),
      phases: new Float32Array(PH)
    };
  }, [C, isLight]);

  useFrame((state) => {
    if (!groupRef.current || !matRef.current) return;
    const g = groupRef.current;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.4;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIsLight: { value: isLight ? 1.0 : 0.0 },
  }), [isLight]);

  return (
    <>
      <ambientLight color={C.ambient} intensity={isLight ? 1.2 : 3.0} />
      <pointLight color={C.key} intensity={isLight ? 8 : 15} distance={60} position={[-6, 8, 8]} />
      <pointLight color={C.rim} intensity={isLight ? 5 : 8} distance={50} position={[7, -6, -4]} />
      <pointLight color={C.top} intensity={isLight ? 4 : 5} distance={40} position={[0, 14, 5]} />

      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.6} 
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.05}
      />

      <group ref={groupRef} rotation={[(-12 * Math.PI) / 180, 0, (20 * Math.PI) / 180]}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
            <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
            <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
            <bufferAttribute attach="attributes-aBright" args={[data.brights, 1]} />
            <bufferAttribute attach="attributes-aPhase" args={[data.phases, 1]} />
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
        
        <Droplets isLight={isLight} />
      </group>
    </>
  );
}
