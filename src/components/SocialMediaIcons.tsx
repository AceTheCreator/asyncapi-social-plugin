import React, { useState } from "react";
import { PluginContext } from "@asyncapi/react-component";
import { WebIcon } from "../icons";
import { SOCIAL_ICONS } from "../config/socialIcons";

const resolveSocialUrl = (extensionName: string, rawValue: string): string => {
  const value = String(rawValue || "").trim();
  if (!value) return "";

  // If already a full URL, return as-is
  if (/^https?:\/\//i.test(value)) return value;

  // Helper: strip domain if the user pasted "domain.tld/path" without protocol
  const stripDomain = (slug: string): string => {
    if (/^[^\/]+\.[^\/]+\/.+/.test(slug)) {
      const idx = slug.indexOf("/");
      return slug.slice(idx + 1);
    }
    return slug;
  };

  // Helper: ensure leading https:// for "domain.tld/path" without protocol
  const ensureHttpsForDomain = (slug: string, domain: string): string | null => {
    if (slug.toLowerCase().startsWith(`${domain.toLowerCase()}/`)) {
      return `https://${slug}`;
    }
    return null;
  };

  // HANDLE ALL THE CASES FOR THE SOCIAL MEDIA ICONS
  switch (extensionName) {
    case "x-x": {
      const httpsCandidate = ensureHttpsForDomain(value, "x.com");
      if (httpsCandidate) return httpsCandidate;
      const slug = stripDomain(value.replace(/^@/, "")).replace(/^\/+/, "");
      return `https://x.com/${slug}`;
    }
    case "x-instagram": {
      const httpsCandidate = ensureHttpsForDomain(value, "instagram.com");
      if (httpsCandidate) return httpsCandidate.endsWith("/") ? httpsCandidate : `${httpsCandidate}/`;
      let slug = stripDomain(value.replace(/^@/, "")).replace(/^\/+/, "");
      const url = `https://www.instagram.com/${slug}`;
      return url.endsWith("/") ? url : `${url}/`;
    }
    case "x-linkedin": {
      // For LinkedIn, we cannot guess between individual (/in/...), company (/company/...),
      // or other paths. Hence Require the user to provide the full URL.
      // Accept bare domain without protocol and normalize by prefixing https://
      const httpsCandidate =
        ensureHttpsForDomain(value, "www.linkedin.com") ||
        ensureHttpsForDomain(value, "linkedin.com");
      if (httpsCandidate) return httpsCandidate; // preserve as-is (no trailing slash enforcement)
      // Otherwise, return empty string to indicate unresolved URL
      return "";
    }
    case "x-mastodon": {
      const httpsCandidate = ensureHttpsForDomain(value, "mastodon.social");
      if (httpsCandidate) return httpsCandidate;
      let slug = stripDomain(value).replace(/^\/+/, "");
      if (!slug.startsWith("@")) slug = `@${slug}`;
      return `https://mastodon.social/${slug}`;
    }
    default:
      return value;
  }
};

const SocialMediaIcons: React.FC<{ context: PluginContext }> = ({
  context,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const schema = context.schema;

  if (!schema || typeof schema === "string" || !("extensions" in schema)) {
    return null;
  }

  const extensions = schema.extensions();
  const extensionsArray = extensions ? Array.from(extensions) : [];

  const socialLinks = extensionsArray.filter((ext: any) => {
    const extName = ext?._meta?.id;
    return extName && extName in SOCIAL_ICONS;
  });

  if (socialLinks.length === 0) return null;

  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    position: "relative",
  };

  const webIconContainerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: isExpanded ? 0.9 : 1,
    transition: "all 0.3s ease",
    transform: isExpanded ? "scale(1.08)" : "scale(1)",
    border: "2px solid #cbd5e1",
    borderRadius: "50%",
    padding: "5px",
    backgroundColor: isExpanded ? "#f1f5f9" : "transparent",
    boxShadow: isExpanded
      ? "0 4px 8px rgba(0, 0, 0, 0.12)"
      : "0 2px 4px rgba(0, 0, 0, 0.08)",
  };

  const socialLinksContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "10px",
    height: "100px",
    alignItems: "center",
    marginLeft: isExpanded ? "20px" : "0",
    maxWidth: isExpanded ? `${socialLinks.length * 50}px` : "0",
    opacity: isExpanded ? 1 : 0,
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div style={webIconContainerStyle}>
        <WebIcon />
      </div>
      <div style={socialLinksContainerStyle}>
        {socialLinks.map((ext: any) => {
          const extName = ext._meta.id;
          const config = SOCIAL_ICONS[extName];
          const raw = ext._json;
          const url = resolveSocialUrl(extName, typeof raw === "string" ? raw : String(raw));

          if (!url) return null;
          return (
            <SocialLink
              key={extName}
              href={url}
              Icon={config.icon}
              colors={config.colors}
            />
          );
        })}
      </div>
    </div>
  );
};

interface SocialLinkColors {
  default: string;
  hover: string;
  border: string;
}

const SocialLink: React.FC<{
  href: string;
  Icon: React.FC;
  colors: SocialLinkColors;
}> = ({ href, Icon, colors }) => {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: isHovered ? 1 : 0.85,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textDecoration: "none",
    transform: isHovered
      ? "translateY(-2px) scale(1.08)"
      : "translateY(0) scale(1)",
    border: `2px solid ${isHovered ? colors.border : "#e2e8f0"}`,
    borderRadius: "50%",
    padding: "12px",
    backgroundColor: isHovered ? "#f8fafc" : "transparent",
    boxShadow: isHovered
      ? "0 4px 8px rgba(0, 0, 0, 0.12)"
      : "0 1px 3px rgba(0, 0, 0, 0.06)",
  };

  const iconStyle: React.CSSProperties = {
    display: "flex",
    color: isHovered ? colors.hover : colors.default,
    transition: "color 0.3s ease",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={linkStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={iconStyle}>
        <Icon />
      </div>
    </a>
  );
};

export default SocialMediaIcons;
