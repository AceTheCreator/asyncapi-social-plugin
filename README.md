# AsyncAPI Social Media Plugin

A plugin for [@asyncapi/react-component](https://github.com/asyncapi/asyncapi-react) that displays social media icons from `x-` extensions in your AsyncAPI documentation.

## Features

- Displays social media links from AsyncAPI `x-` extensions
- Expandable icon menu with smooth animations
- Brand colors on hover (X/Twitter, LinkedIn, GitHub, Mastodon)
- Fully styled with no external CSS required

## Installation

```bash
npm install asyncapi-social-plugin
```

## Usage

### 1. Add the plugin to your AsyncAPI React component

```tsx
import AsyncApiComponent from "@asyncapi/react-component";
import SocialMediaPlugin from "asyncapi-social-plugin";

function App() {
  return (
    <AsyncApiComponent
      schema={yourAsyncApiSchema}
      plugins={[SocialMediaPlugin]}
    />
  );
}
```

### 2. Add social media extensions to your AsyncAPI spec

Add `x-` extensions to your AsyncAPI document's `info` section:

```yaml
asyncapi: 3.0.0
info:
  title: My API
  version: 1.0.0
  x-x: https://x.com/yourusername
  x-linkedin: https://linkedin.com/in/yourusername
  x-github: https://github.com/yourusername
  x-mastodon: https://mastodon.social/@yourusername
```

## Supported Social Media Platforms

| Extension      | Platform   | Brand Color |
|----------------|------------|-------------|
| `x-x`          | X (Twitter)| Black       |
| `x-linkedin`   | LinkedIn   | #0A66C2     |
| `x-github`     | GitHub     | #24292e     |
| `x-mastodon`   | Mastodon   | #6364FF     |

## How It Works

The plugin renders a globe icon that expands on hover to reveal social media icons. Each icon links to the URL specified in the corresponding `x-` extension.

- Icons start in a subtle gray color
- On hover, icons animate with brand colors
- Circular borders highlight each icon
- Smooth expand/collapse animation

## Peer Dependencies

This plugin requires the following peer dependencies:

```json
{
  "@asyncapi/react-component": "^3.0.0",
  "react": ">=18.0.0"
}
```

## License

MIT

## Author

Azeez Elegbede

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/acethecreator/asyncapi-social-plugin).
