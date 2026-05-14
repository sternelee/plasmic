/** Shared exports for Astro loader */

import type { InitOptions as LoaderReactInitOptions } from "@plasmicapp/loader-react";

export interface AstroInitOptions extends LoaderReactInitOptions {
  // Astro-specific options can be added here in the future
}

export type {
  ComponentMeta,
  ComponentRenderData,
  InitOptions,
  PageMeta,
  PageMetadata,
} from "@plasmicapp/loader-react";
