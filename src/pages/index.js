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
import { Color } from "three";
import { Plane } from "@react-three/drei";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  let getStatus = (v) =>
    typeof window !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "dark";
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
  let rainbow = useMemo(() => {
    let rainbow = new ShaderCubeChrome({
      renderer: gl,
      res: 1024,
      color: new Color("#ffffff"),
    });
    return rainbow;
  });

  useFrame((st, dt) => {
    rainbow.compute({ time: st.clock.getElapsedTime() });
  });

  return (
    <group>
      {rainbow && (
        <Plane args={[viewport.width, viewport.height * 2, 2, 2]}>
          <meshBasicMaterial envMap={rainbow.out.envMap}></meshBasicMaterial>
        </Plane>
      )}
    </group>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Docs for ${siteConfig.title}`}
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
          dpr={
            (typeof window !== "undefined" && window.devicePixelRatio) || 1.0
          }
        >
          <Content></Content>
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
