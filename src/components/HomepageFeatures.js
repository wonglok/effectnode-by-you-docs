import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "VFX on Web",
    Svg: require("../../static/landing-page-illustrations/undraw_mobile_web_2g8b.svg")
      .default,
    description: (
      <>
        Our dream is to bring VFX to the web. <br />
        Why settle for less when we can dream more? <br />
        Comptuer Graphics & Visual Effects fascinates our inventor when he saws
        it running on iPad 2 in iOS8 in 2014. Ever since, he keeps working on
        this area.
      </>
    ),
  },
  {
    title: "Decentralised Ownership",
    Svg: require("../../static/landing-page-illustrations/undraw_asset_selection_ix3v.svg")
      .default,
    description: (
      <>
        Effect Node lets you store your own code in your code base and your json
        data on your own firebase. There's no centralsied storage of us keeping
        your code and visual programming json data. One firebase account can
        keep many many projects and canvases with multi-user colloration
        support.
      </>
    ),
  },
  {
    title: "Easy & Dreamy Code API",
    Svg: require("../../static/landing-page-illustrations/undraw_Goals_re_lu76.svg")
      .default,
    description: (
      <>
        We try our best to simplify the most frequnetly used things in visual
        prgoramming, which is simply input output and asynchronous module
        resolution, as well as Runtime data import and export.
      </>
    ),
  },
];

const SubFeatureList = [
  {
    title: "VFX Libray Share",
    Svg: require("../../static/landing-page-illustrations/undraw_dreamer_gxxi.svg")
      .default,
    description: (
      <>
        We love sharing VFX codes with people because it makes the web more
        beautiful. Our VFX node systme are designed to be compatible with
        developer made addons/plugins.
      </>
    ),
  },
  {
    title: "Quality & Recognition",
    Svg: require("../../static/landing-page-illustrations/undraw_awards_fieb.svg")
      .default,
    description: (
      <>
        Our invetor of EffectNode, Lok Lok, has focused on this software since
        2017. He won a $300K grand for shader node, a Webbys nomation in 2019 of
        effect node legacy, Webbys judgeship in 2020, and a Webbys honoree in
        2021 for desktop version of EffectNode.
      </>
    ),
  },
  {
    title: "Visual Prorgramming CMS",
    Svg: require("../../static/landing-page-illustrations/undraw_Mind_map_re_nlb6.svg")
      .default,
    description: (
      <>
        We include a Full-Featrued Visual Programming CMS for you in the
        boiplerplate code, fully customisable and production ready.
        <br />
        <br />
        We want to bring out the best for you guys instead of keeping it as a
        startup closed codebase for earnining moeny. We want the community to
        thrive together and grow more web vfx libraries and share VFX on web
        with one another.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomepageSubFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {SubFeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
