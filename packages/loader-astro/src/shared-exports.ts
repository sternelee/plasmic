/** Shared exports for Astro loader */

import type { InitOptions as LoaderReactInitOptions } from "@plasmicapp/loader-react";

export interface AstroInitOptions extends LoaderReactInitOptions {
  /**
   * Optional configuration for Astro-specific features
   */
  astroConfig?: {
    /**
     * Whether to enable server-side rendering support
     */
    ssr?: boolean;
  };
}

export type {
  ComponentMeta,
  ComponentRenderData,
  InitOptions,
  PageMeta,
  PageMetadata,
} from "@plasmicapp/loader-react";
