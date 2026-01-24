import type { ComponentLookupSpec } from "@plasmicapp/loader-react";
import {
  PlasmicRootProvider as CommonPlasmicRootProvider,
  FetchComponentDataOpts as InternalFetchComponentDataOpts,
  InternalPlasmicComponentLoader,
  PlasmicComponentLoader,
  extractPlasmicQueryData as internalExtractPlasmicQueryData,
} from "@plasmicapp/loader-react";
import * as React from "react";

// Re-export commonly used components and utilities from loader-react
export {
  DataCtxReader,
  DataProvider,
  GlobalActionsContext,
  GlobalActionsProvider,
  PageParamsProvider,
  PlasmicCanvasContext,
  PlasmicCanvasHost,
  PlasmicComponent,
  PlasmicTranslatorContext,
  plasmicPrepass,
  repeatedElement,
  useDataEnv,
  usePlasmicCanvasComponentInfo,
  usePlasmicCanvasContext,
  usePlasmicComponent,
  usePlasmicQueryData,
  useSelector,
  useSelectors,
} from "@plasmicapp/loader-react";

export type {
  CodeComponentMeta,
  CustomFunctionMeta,
  GlobalContextMeta,
  PlasmicTranslator,
  PropType,
  TokenRegistration,
} from "@plasmicapp/loader-react";

export * from "./shared-exports";
export type { ComponentRenderData, AstroInitOptions } from "./shared-exports";

const reactMajorVersion = +React.version.split(".")[0];

function filterCodeFromRenderData(data: any) {
  if (reactMajorVersion >= 18 && !!data.bundle.bundleKey) {
    // Keep the entrypoints
    const entrypoints = new Set([
      ...data.entryCompMetas.map((compMeta: any) => compMeta.entry),
      "root-provider.js",
      ...data.bundle.projects
        .map((x: any) => x.globalContextsProviderFileName)
        .filter((x: any) => !!x),
      ...data.bundle.components
        .filter((c: any) => c.isGlobalContextProvider)
        .map((c: any) => c.entry),
      ...data.bundle.globalGroups.map((g: any) => g.contextFile),
    ]);

    data.bundle.modules.browser = data.bundle.modules.browser.map(
      (module: any) => {
        if (module.type !== "code" || entrypoints.has(module.fileName)) {
          return module;
        }
        return { ...module, code: "" };
      }
    );
  }
}

export interface FetchComponentDataOpts extends InternalFetchComponentDataOpts {
  /**
   * Defer loading code chunks to script tags, reducing initial payload size.
   */
  deferChunks?: boolean;
}

/**
 * Extended PlasmicComponentLoader for Astro
 */
export class AstroJsPlasmicComponentLoader extends PlasmicComponentLoader {
  constructor(internal: InternalPlasmicComponentLoader) {
    super(internal);
  }

  maybeFetchComponentData(
    specs: ComponentLookupSpec[],
    opts?: FetchComponentDataOpts
  ): Promise<any | null>;
  maybeFetchComponentData(...specs: ComponentLookupSpec[]): Promise<any | null>;
  async maybeFetchComponentData(...args: any[]): Promise<any | null> {
    const data = await super.maybeFetchComponentData(...args);
    const { opts } = parseFetchComponentDataArgs(...args);
    if (
      data &&
      (opts?.deferChunks ||
        (opts?.deferChunks === undefined && data.bundle.deferChunksByDefault))
    ) {
      filterCodeFromRenderData(data);
    }
    return data;
  }

  fetchComponentData(...specs: ComponentLookupSpec[]): Promise<any>;
  fetchComponentData(
    specs: ComponentLookupSpec[],
    opts?: FetchComponentDataOpts
  ): Promise<any>;
  async fetchComponentData(...args: any[]): Promise<any> {
    const data = await super.fetchComponentData(...args);
    const { opts } = parseFetchComponentDataArgs(...args);
    if (
      opts?.deferChunks ||
      (opts?.deferChunks === undefined && data.bundle.deferChunksByDefault)
    ) {
      filterCodeFromRenderData(data);
    }
    return data;
  }
}

function parseFetchComponentDataArgs(
  specs: ComponentLookupSpec[],
  opts?: FetchComponentDataOpts
): { specs: ComponentLookupSpec[]; opts?: FetchComponentDataOpts };
function parseFetchComponentDataArgs(...specs: ComponentLookupSpec[]): {
  specs: ComponentLookupSpec[];
  opts?: FetchComponentDataOpts;
};
function parseFetchComponentDataArgs(...args: any[]) {
  let specs: ComponentLookupSpec[];
  let opts: FetchComponentDataOpts | undefined;
  if (Array.isArray(args[0])) {
    specs = args[0];
    opts = args[1];
  } else {
    specs = args;
    opts = undefined;
  }
  return { specs, opts };
}

/**
 * Initialize the Plasmic loader for Astro
 * @param opts - Configuration options
 * @returns Configured PlasmicComponentLoader instance
 */
export function initPlasmicLoader(
  opts: import("./shared-exports").AstroInitOptions
) {
  const loader = new AstroJsPlasmicComponentLoader(
    new InternalPlasmicComponentLoader({
      ...opts,
      platform: "astro",
    })
  );

  return loader;
}

/**
 * Performs a prepass over Plasmic content, kicking off the necessary
 * data fetches, and populating the fetched data into a cache. This
 * cache can be passed as prefetchedQueryData into PlasmicRootProvider.
 *
 * @param element a React element containing instances of PlasmicComponent.
 * @returns an object mapping query key to fetched data
 */
export async function extractPlasmicQueryData(element: React.ReactElement) {
  return internalExtractPlasmicQueryData(element);
}

/**
 * PlasmicRootProvider wrapper for Astro
 * This component wraps the common PlasmicRootProvider with Astro-specific configurations
 */
export function PlasmicRootProvider(
  props: React.ComponentProps<typeof CommonPlasmicRootProvider>
) {
  return <CommonPlasmicRootProvider {...props} />;
}
