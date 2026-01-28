import React from "react";
import { TwitterIcon, LinkedInIcon, GitHubIcon, Mastodon, InstagramIcon } from "../icons";

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
  baseUrl: string;
  /** Optional static path segment before the slug, e.g. 'in/' for LinkedIn */
  pathPrefix?: string;
  /** If true, ensure the final URL ends with a slash */
  appendTrailingSlash?: boolean;
  /** If true (default), remove a leading '@' from provided values */
  stripLeadingAt?: boolean;
  /** Optional prefix to add before the slug (after pathPrefix), e.g. '@' for Mastodon */
  slugPrefix?: string;
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
    baseUrl: "https://x.com/",
    colors: {
      default: "#64748b",
      hover: "#000000",
      border: "#000000",
    },
  },
  "x-linkedin": {
    icon: LinkedInIcon,
    baseUrl: "https://www.linkedin.com/",
    pathPrefix: "in/",
    appendTrailingSlash: true,
    colors: {
      default: "#64748b",
      hover: "#0A66C2",
      border: "#0A66C2",
    },
  },
  "x-github": {
    icon: GitHubIcon,
    baseUrl: "https://github.com/",
    colors: {
      default: "#64748b",
      hover: "#24292e",
      border: "#24292e",
    },
  },
  "x-instagram": {
    icon: InstagramIcon,
    baseUrl: "https://www.instagram.com/",
    appendTrailingSlash: true,
    colors: {
      default: "#64748b",
      hover: "#E1306C",
      border: "#E1306C",
    },
  },
  "x-mastodon": {
    icon: Mastodon,
    baseUrl: "https://mastodon.social/",
    // Preserve '@' in path like /@username
    stripLeadingAt: false,
    slugPrefix: "@",
    colors: {
      default: "#64748b",
      hover: "#6364FF",
      border: "#6364FF",
    },
  },
};
