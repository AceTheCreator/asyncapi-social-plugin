import React from "react";
import { TwitterIcon, LinkedInIcon, GitHubIcon, Mastodon } from "../icons";

/**
 * Social media icon configuration
 *
 * To add a new social media platform:
 * 1. Create the icon component in src/icons/index.tsx
 * 2. Add an entry to SOCIAL_ICONS below with the extension name, icon, and colors
 *
 * Extension names should match the AsyncAPI x- extension (e.g., "x-twitter" for x-twitter: https://...)
 */

export interface SocialIconConfig {
  icon: React.FC;
  colors: {
    default: string;
    hover: string;
    /** Border color when hovered */
    border: string;
  };
}

/**
 * Map of AsyncAPI x- extension names to their icon configuration
 *
 * Example AsyncAPI spec:
 * ```yaml
 * info:
 *   x-x: https://x.com/username
 *   x-linkedin: https://linkedin.com/in/username
 * ```
 */
export const SOCIAL_ICONS: Record<string, SocialIconConfig> = {
  "x-x": {
    icon: TwitterIcon,
    colors: {
      default: "#64748b",
      hover: "#000000",
      border: "#000000",
    },
  },
  "x-linkedin": {
    icon: LinkedInIcon,
    colors: {
      default: "#64748b",
      hover: "#0A66C2",
      border: "#0A66C2",
    },
  },
  "x-github": {
    icon: GitHubIcon,
    colors: {
      default: "#64748b",
      hover: "#24292e",
      border: "#24292e",
    },
  },
  "x-mastodon": {
    icon: Mastodon,
    colors: {
      default: "#64748b",
      hover: "#6364FF",
      border: "#6364FF",
    },
  },
};
