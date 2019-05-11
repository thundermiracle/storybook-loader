import { loaderOptions } from '../core/loader';

/**
 * @default
 * loaderOptions: {
 *   includeRegExp: /\.jsx?$/i,
 *   excludeRegExp: /\.stories.js$/i,
 * }
 */
export default function jsLoader(
  requireContext: any,
  loaderOptions?: loaderOptions,
): void;
