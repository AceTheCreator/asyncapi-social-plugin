import React from "react";
import { PluginContext } from "@asyncapi/react-component";
import { TwitterIcon, LinkedInIcon, GitHubIcon } from "../icons";

export const SocialMediaIcons: React.FC<{ context: PluginContext }> = ({
  context,
}) => {
  const schema = context.schema;
  if (!schema) return null;

  const extensions = schema.extensions();

  // Map of extension names to icon components
  const iconMap = {
    "x-twitter": TwitterIcon,
    "x-linkedin": LinkedInIcon,
    "x-github": GitHubIcon,
  };

  const socialLinks = extensions.filter(
    (ext) => ext.extension.name() in iconMap
  );

  if (socialLinks.length === 0) return null;

  return (
    <div className="social-media-icons">
      {socialLinks.map((ext) => {
        const Icon = iconMap[ext.extension.name()];
        const url = ext.extension.value();

        return (
          <a
            key={ext.extension.name()}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};
