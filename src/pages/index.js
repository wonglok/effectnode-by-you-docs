import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures, {
  HomepageSubFeatures,
} from "../components/HomepageFeatures";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderCubeChrome } from "../shader/ShaderCubeChrome";
import { Color, Vector2 } from "three";
import { Plane } from "@react-three/drei";
let getStatus = (v) =>
  typeof window !== "undefined" &&
  document.documentElement.getAttribute("data-theme") === "dark";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  let [st, setST] = useState(getStatus());
  useEffect(() => {
    // getStatus();
    let ttt = setInterval(() => {
      //
      if (getStatus() !== st) {
        setST(getStatus());
      }
    }, 100);
    return () => {
      clearInterval(ttt);
    };
  });

  return (
    <header
      style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      className={clsx("", "", "relative", styles.heroBanner)}
    >
      <div className="container" style={{ paddingTop: "32px" }}>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={clsx("", styles.buttons)}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Quick Start ⏱️
          </Link>
        </div>
        <div style={{ marginTop: "32px" }}>
          {st ? (
            <img src="/img/continue-logo.svg"></img>
          ) : (
            <img src="/img/continue-logo-black.svg"></img>
          )}
        </div>
      </div>
    </header>
  );
}

function Content() {
  let { viewport, gl } = useThree();

  let { size } = useThree();

  let [uniforms] = useState(() => {
    return {
      flip: { value: 1 },
      time: { value: 1 },
      resolution: {
        value: new Vector2(window.innerWidth, window.innerHeight),
      },
    };
  });

  useFrame((st, dt) => {
    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;

    uniforms.time.value += 0.017;
    if (getStatus()) {
      uniforms.flip.value = -1.0;
    } else {
      uniforms.flip.value = 1.0;
    }
  });

  return (
    <group>
      {
        <Plane args={[viewport.width, viewport.height * 2, 2, 2]}>
          <shaderMaterial
            uniforms={uniforms}
            vertexShader={`

            varying vec2 vUv;


            void main (void) {
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              vUv = uv;
            }

            `}
            fragmentShader={`

          uniform float flip;
          uniform float time;
          uniform vec2 resolution;
          varying vec2 vUv;

          const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

          float noise( in vec2 p ) {
            return sin(p.x)*sin(p.y);
          }

          float fbm4( vec2 p ) {
              float f = 0.0;
              f += 0.5000 * noise( p ); p = m * p * 2.02;
              f += 0.2500 * noise( p ); p = m * p * 2.03;
              f += 0.1250 * noise( p ); p = m * p * 2.01;
              f += 0.0625 * noise( p );
              return f / 0.9375;
          }

          float fbm6( vec2 p ) {
              float f = 0.0;
              f += 0.500000*(0.5 + 0.5 * noise( p )); p = m*p*2.02;
              f += 0.250000*(0.5 + 0.5 * noise( p )); p = m*p*2.03;
              f += 0.125000*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
              f += 0.062500*(0.5 + 0.5 * noise( p )); p = m*p*2.04;
              f += 0.031250*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
              f += 0.015625*(0.5 + 0.5 * noise( p ));
              return f/0.96875;
          }

          float pattern (vec2 p) {
            float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
            return abs(vout);
          }
          void main (void) {
            vec3 diffuse = vec3(1.0, 1.0, 1.0);

            vec2 uv = vUv;

            uv.x = 1.0 - uv.x;

            float aspect = resolution.x / resolution.y;
            if (aspect >= 1.0) {
              uv.x *= (1.0 + aspect) / aspect;

              uv.xy *= 0.5;
            } else {
              // aspect = 1.0 / aspect;
              uv.y *= (1.0 + aspect) / aspect;
            }
            if (flip == -1.0) {
              gl_FragColor = vec4(vec3(
                -0.3 + 1.0 * pattern(uv * 5.0123 * aspect + -0.173333 * cos(time * 1.0 * 0.05)),
                -0.3 + 1.0 * pattern(uv * 5.0123 * aspect +  0.0 * cos(time * 1.0 * 0.05)),
                -0.3 + 1.0 * pattern(uv * 5.0123 * aspect +  0.173333 * cos(time * 1.0 * 0.05))
              ) * diffuse, 1.0);
            } else {
              gl_FragColor = vec4(vec3(
                1.0 - 0.7 * pattern(uv * 5.0123 * aspect + -0.173333 * cos(time * 1.0 * 0.05)),
                1.0 - 0.7 * pattern(uv * 5.0123 * aspect +  0.0 * cos(time * 1.0 * 0.05)),
                1.0 - 0.7 * pattern(uv * 5.0123 * aspect +  0.173333 * cos(time * 1.0 * 0.05))
              ) * diffuse, 1.0);
            }

          }
          `}
          ></shaderMaterial>
        </Plane>
      }
    </group>
  );
}

export default function Home() {
  // const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Effect Node For You - Documentation Site`}
      description="Description will go into a meta tag in <head />"
    >
      <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          zIndex: "-1",
        }}
      >
        <Canvas
          className="h-full w-full "
          dpr={0.5}
          // dpr={
          //   (typeof window !== "undefined" && window.devicePixelRatio) || 1.0
          // }
        >
          {typeof window !== "undefined" && <Content></Content>}
        </Canvas>
      </div>

      <HomepageHeader />

      <main>
        <HomepageFeatures />
      </main>
      <div style={{ textAlign: "center" }}>
        <img
          style={{ maxWidth: "2048px", width: "100%" }}
          src="/visual-programming/demo.png"
        ></img>
      </div>

      <main>
        <HomepageSubFeatures />
      </main>
    </Layout>
  );
}
