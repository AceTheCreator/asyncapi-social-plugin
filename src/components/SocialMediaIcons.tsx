import React, { useState } from "react";
import { PluginContext } from "@asyncapi/react-component";
import { TwitterIcon, LinkedInIcon, GitHubIcon, Mastodon } from "../icons";

const SocialMediaIcons: React.FC<{ context: PluginContext }> = ({
  context,
}) => {
  const schema = context.schema;
  if (!schema) return null;

  const extensions = schema.extensions();

  const iconMap: Record<string, React.FC> = {
    "x-x": TwitterIcon,
    "x-linkedin": LinkedInIcon,
    "x-github": GitHubIcon,
    "x-mastodon": Mastodon,
  };

  const extensionsArray = extensions?.collections || [];

  const socialLinks = extensionsArray.filter((ext: any) => {
    const extName = ext?._meta?.id;
    return extName && extName in iconMap;
  });

  console.log(socialLinks);

  if (socialLinks.length === 0) return null;

  const containerStyle: React.CSSProperties = {
    display: "flex",
    gap: "26px",
    alignItems: "center",
    marginTop: "16px",
  };

  return (
    <div style={containerStyle}>
      {socialLinks.map((ext: any) => {
        const extName = ext._meta.id;
        const Icon = iconMap[extName];
        const url = ext._json;

        return <SocialLink key={extName} href={url} Icon={Icon} />;
      })}
    </div>
  );
};

const SocialLink: React.FC<{ href: string; Icon: React.FC }> = ({
  href,
  Icon,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: isHovered ? 0.7 : 1,
    transition: "opacity 0.2s ease-in-out",
    textDecoration: "none",
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
      <Icon />
    </a>
  );
};

export default SocialMediaIcons;
