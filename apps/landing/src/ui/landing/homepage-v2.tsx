import type { ReactElement } from "react";
import type { HomepageContent } from "@/content-schema/schemas";
import {
  ApproachSection,
  HomeHero,
  LoopSection,
  ProblemSection,
  ToolsSection,
} from "./homepage-v2-sections";
import { LandingFrame } from "./homepage-v2-shell";

export function LandingHomepage({
  content,
  currentPath,
}: {
  content: HomepageContent;
  currentPath: string;
}): ReactElement {
  return (
    <LandingFrame
      brandName={content.brandName}
      currentPath={currentPath}
      footer={content.footer}
      githubLabel={content.githubLabel}
      githubUrl={content.githubUrl}
      navLinks={content.navLinks}
    >
      <HomeHero hero={content.hero} />
      <ProblemSection content={content.problem} />
      <ApproachSection content={content.approach} />
      <LoopSection content={content.loop} />
      <ToolsSection content={content.tools} />
    </LandingFrame>
  );
}
