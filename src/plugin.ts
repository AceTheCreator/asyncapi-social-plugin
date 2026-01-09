import {
  AsyncApiPlugin,
  PluginAPI,
  PluginSlot,
} from "@asyncapi/react-component";
import { SocialMediaIcons } from "./components/SocialMediaIcons";

const SocialMediaPlugin: AsyncApiPlugin = {
  name: "asyncapi-social-media",
  version: "1.0.0",
  description: "Displays social media icons from x- extensions",

  install(api: PluginAPI) {
    api.registerComponent(PluginSlot.INFO, SocialMediaIcons);
  },
};

export default SocialMediaPlugin;
