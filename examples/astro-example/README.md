# Astro Plasmic Example

This is an example Astro project that demonstrates how to use Plasmic with Astro using the `@plasmicapp/loader-astro` package.

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Update `src/plasmic-init.ts` with your Plasmic project ID and API token.

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## Project Structure

- `src/plasmic-init.ts` - Plasmic loader configuration
- `src/pages/index.astro` - Example homepage using Plasmic
- `src/pages/[...path].astro` - Catch-all route for dynamic Plasmic pages
- `astro.config.mjs` - Astro configuration with React integration

## Learn More

- [Plasmic Documentation](https://docs.plasmic.app/)
- [Astro Documentation](https://docs.astro.build/)
- [@plasmicapp/loader-astro](https://github.com/plasmicapp/plasmic/tree/master/packages/loader-astro)
