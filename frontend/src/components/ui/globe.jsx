"use client";
import React, { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "../../data/globe.json";

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

// Helper function to parse RGBA string to components
function parseRgba(rgbaStr) {
  const parts = rgbaStr.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (parts && parts.length === 5) {
    return {
      r: parseInt(parts[1]),
      g: parseInt(parts[2]),
      b: parseInt(parts[3]),
      a: parseFloat(parts[4]),
    };
  }
  return null;
}

export function Globe({ globeConfig, data }) {
  const [globeData, setGlobeData] = useState([]);
  const globeRef = useRef(null);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    if (globeRef.current) {
      _buildData();
      _buildMaterial();
    }
  }, [globeRef.current, data]);

  const _buildMaterial = () => {
    if (!globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial();
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  };

  const _buildData = () => {
    const arcs = data;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = hexToRgb(arc.color);
      if (!rgb) {
        console.warn("Invalid color for arc, skipping:", arc);
        continue;
      }
      if (
        !isFinite(arc.startLat) ||
        !isFinite(arc.startLng) ||
        !isFinite(arc.endLat) ||
        !isFinite(arc.endLng)
      ) {
        console.warn("Invalid arc coordinates, skipping:", arc);
        continue;
      }
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) => ["lat", "lng"].every((k) => v2[k] === v[k])) === i
    );

    setGlobeData(filteredPoints);
  };

  useEffect(() => {
    if (globeRef.current && globeData) {
      // Filter out invalid polygons
      const validFeatures = countries.features.filter((feature) => {
        if (!feature.geometry || !feature.geometry.coordinates) {
          console.warn("Invalid feature geometry:", feature);
          return false;
        }
        // Flatten all coordinates (handles Polygon and MultiPolygon)
        const coords =
          feature.geometry.type === "Polygon"
            ? feature.geometry.coordinates.flat(1)
            : feature.geometry.type === "MultiPolygon"
            ? feature.geometry.coordinates.flat(2)
            : [];
        const valid = coords.every(
          (point) =>
            Array.isArray(point) &&
            point.length === 2 &&
            point.every((v) => typeof v === "number" && isFinite(v))
        );
        if (!valid) console.warn("Invalid polygon coordinates:", feature);
        return valid;
      });

      globeRef.current
        .hexPolygonsData(validFeatures)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(() => defaultProps.polygonColor);

      // Configure ring properties here globally
      globeRef.current
        .ringColor((e) => {
          const rgba = parseRgba(e.color);
          if (rgba) {
            return (t) => `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${1 - t})`;
          }
          return "rgba(255,255,255,1)"; // Default if parsing fails
        })
        .ringMaxRadius(defaultProps.maxRings)
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringRepeatPeriod(
          (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
        );

      startAnimation();
    }
  }, [globeData, defaultProps]);

  const startAnimation = () => {
    if (!globeRef.current || !globeData) return;

    // Filter out invalid arcs and points
    const validArcs = data.filter((arc) => {
      const valid = [
        arc.startLat,
        arc.startLng,
        arc.endLat,
        arc.endLng,
        arc.arcAlt,
      ].every((v) => typeof v === "number" && isFinite(v));
      if (!valid) console.warn("Invalid arc:", arc);
      return valid;
    });
    const validPoints = globeData.filter((pt) => {
      const valid = [pt.lat, pt.lng].every(
        (v) => typeof v === "number" && isFinite(v)
      );
      if (!valid) console.warn("Invalid point:", pt);
      return valid;
    });

    globeRef.current
      .arcsData(validArcs)
      .arcStartLat((d) => d.startLat)
      .arcStartLng((d) => d.startLng)
      .arcEndLat((d) => d.endLat)
      .arcEndLng((d) => d.endLng)
      .arcColor((e) => e.color)
      .arcAltitude((e) => e.arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => e.order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData([])
      .pointColor((e) => e.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);
  };

  useEffect(() => {
    if (!globeRef.current || !globeData || globeData.length === 0) return;

    const interval = setInterval(() => {
      if (!globeRef.current || !globeData || globeData.length === 0) {
        clearInterval(interval);
        return;
      }
      const numbersOfRings = genRandomNumbers(
        0,
        globeData.length,
        Math.floor((globeData.length * 4) / 5)
      );

      const ringsDataFiltered = globeData
        .filter((d, i) => numbersOfRings.includes(i))
        .filter(
          (pt) =>
            typeof pt.lat === "number" &&
            isFinite(pt.lat) &&
            typeof pt.lng === "number" &&
            isFinite(pt.lng)
        );

      // console.log("Rings Data to be sent to globe:", ringsDataFiltered);

      globeRef.current.ringsData(ringsDataFiltered);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [globeRef.current, globeData]);

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  );
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, []);

  return null;
}

export function World(props) {
  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min, max, count) {
  const arr = [];
  if (max <= min || count <= 0) {
    return [];
  }
  while (arr.length < count) {
    if (arr.length >= max - min) {
      break;
    }
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
