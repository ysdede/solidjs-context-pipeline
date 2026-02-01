/**
 * Core primitives list and domain mappings
 */

/**
 * List of required core SolidJS primitives
 * Used for validation to ensure 100% coverage
 */
export const CORE_PRIMITIVES = [
  'createSignal',
  'createEffect',
  'createMemo',
  'createResource',
  'createStore',
  'createContext',
  'createRoot',
  'createRenderEffect',
  'createComputed',
  'createDeferred',
  'createSelector',
  'createReaction',
  'onMount',
  'onCleanup',
  'untrack',
  'batch',
  'splitProps',
  'mergeProps',
  'Show',
  'Switch',
  'Match',
  'For',
  'Index',
  'ErrorBoundary',
  'Suspense',
  'Dynamic',
  'Portal'
];

/**
 * Domain mappings for classification
 * Maps patterns to domain names
 */
export const DOMAIN_PATTERNS = {
  'core-reactivity': [
    /reactivity/i,
    /signal/i,
    /effect/i,
    /memo/i,
    /resource/i,
    /store/i,
    /batch/i,
    /untrack/i
  ],
  'routing': [
    /router/i,
    /route/i,
    /navigation/i,
    /link/i
  ],
  'ssr': [
    /ssr/i,
    /server/i,
    /render/i,
    /hydrate/i
  ],
  'primitives': [
    /primitive/i,
    /utility/i,
    /helper/i
  ]
};

/**
 * Domain names
 */
export const DOMAINS = [
  'core-reactivity',
  'routing',
  'ssr',
  'primitives'
];

/**
 * Default domain for unclassified content
 */
export const DEFAULT_DOMAIN = 'primitives';

/**
 * Priority repositories for cloning
 * Ordered by importance for documentation extraction
 */
export const PRIORITY_REPOS = [
  'solid',           // Main library - core primitives and API
  'solid-docs',      // Official documentation for the Solid ecosystem
  'solid-start',     // SolidStart framework
  'solid-router',    // Routing library
  'signals',         // Signals package
  'solid-site',      // SolidJS.com platform code (may contain docs)
  'templates',       // Vite + solid templates (examples)
  'vite-plugin-solid' // Vite integration (may have docs)
];
