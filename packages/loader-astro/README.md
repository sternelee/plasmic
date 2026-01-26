# @plasmicapp/loader-astro

This is the SDK for using the Plasmic visual builder with Astro.

Plasmic lets you build web applications visually - pages, components, entire apps - and use them seamlessly in your Astro codebase.

## Installation

```bash
npm install @plasmicapp/loader-astro
# or
yarn add @plasmicapp/loader-astro
# or
pnpm add @plasmicapp/loader-astro
```

## Getting Started

### 1. Initialize the Plasmic Loader

Create a `plasmic-init.ts` (or `.js`) file in your project to initialize the loader:

```typescript
// src/plasmic-init.ts
import { initPlasmicLoader } from "@plasmicapp/loader-astro";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "YOUR_PROJECT_ID",
      token: "YOUR_API_TOKEN",
    },
  ],
  // Configure preview mode
  preview: false,
});
```

You can find your project ID and API token in your Plasmic project settings.

### 2. Use Plasmic Components in Astro Pages

You can now use Plasmic components in your Astro pages:

```astro
---
// src/pages/index.astro
import { PLASMIC } from "../plasmic-init";
import { PlasmicRootProvider, PlasmicComponent } from "@plasmicapp/loader-astro";

// Fetch the Plasmic component data
const plasmicData = await PLASMIC.maybeFetchComponentData("HomePage");

if (!plasmicData) {
  throw new Error("Failed to load Plasmic component");
}
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My Astro Site</title>
  </head>
  <body>
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
      client:load
    >
      <PlasmicComponent component="HomePage" />
    </PlasmicRootProvider>
  </body>
</html>
```

### 3. Dynamic Routes with Catch-All Pages

You can create dynamic routes that catch all paths and render Plasmic pages:

```astro
---
// src/pages/[...path].astro
import { PLASMIC } from "../plasmic-init";
import { PlasmicRootProvider, PlasmicComponent } from "@plasmicapp/loader-astro";

const { path } = Astro.params;
const pagePath = path ? `/${path}` : "/";

// Try to fetch the page
const plasmicData = await PLASMIC.maybeFetchComponentData(pagePath);

// If no Plasmic page is found, return 404
if (!plasmicData) {
  return new Response(null, { status: 404 });
}

// Extract metadata for SEO
const pageMeta = plasmicData.entryCompMetas[0];
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{pageMeta.displayName || "Page"}</title>
  </head>
  <body>
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
      client:load
    >
      <PlasmicComponent component={pageMeta.displayName} />
    </PlasmicRootProvider>
  </body>
</html>
```

## API Reference

### `initPlasmicLoader(opts)`

Initializes a new Plasmic loader instance.

**Options:**

- `projects`: Array of project configurations with `id` and `token`
- `preview`: Enable/disable preview mode (default: `false`)
- `host`: Custom Plasmic host URL (optional)
- `cache`: Enable/disable caching (default: `true`)

### `PlasmicRootProvider`

The root provider component that must wrap all Plasmic components.

**Props:**

- `loader`: The initialized Plasmic loader
- `prefetchedData`: Data fetched via `loader.fetchComponentData()`
- `client:*`: Astro client directive (e.g., `client:load`, `client:idle`)

### `PlasmicComponent`

Component for rendering a specific Plasmic component.

**Props:**

- `component`: Name or path of the Plasmic component to render
- `componentProps`: Props to pass to the component (optional)

## Code Components

You can register custom React components to use in Plasmic:

```typescript
// src/plasmic-init.ts
import { initPlasmicLoader } from "@plasmicapp/loader-astro";
import MyButton from "./components/MyButton";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "YOUR_PROJECT_ID",
      token: "YOUR_API_TOKEN",
    },
  ],
});

// Register your code component
PLASMIC.registerComponent(MyButton, {
  name: "MyButton",
  props: {
    children: "slot",
    onClick: "eventHandler",
    variant: {
      type: "choice",
      options: ["primary", "secondary"],
      defaultValue: "primary",
    },
  },
});
```

## Features

- ✅ Server-side rendering (SSR) support
- ✅ Static site generation (SSG)
- ✅ Dynamic routing
- ✅ Code component registration
- ✅ Split testing and personalization
- ✅ Preview mode
- ✅ Full integration with Plasmic Studio

## Hydration

Since Astro uses partial hydration, you need to specify when your Plasmic components should hydrate on the client:

- `client:load` - Hydrate immediately on page load
- `client:idle` - Hydrate when the browser is idle
- `client:visible` - Hydrate when the component is visible
- `client:only="react"` - Only render on the client

Choose the appropriate directive based on your performance needs.

## Examples

Check out the [examples](https://github.com/plasmicapp/plasmic/tree/master/examples) directory for more usage examples.

## Learn More

- [Plasmic Documentation](https://docs.plasmic.app/)
- [Astro Documentation](https://docs.astro.build/)
- [Plasmic Community](https://forum.plasmic.app/)

## Support

For help and questions, please visit:
- [Plasmic Slack Community](https://plasmic.app/slack)
- [GitHub Issues](https://github.com/plasmicapp/plasmic/issues)

## License

MIT
