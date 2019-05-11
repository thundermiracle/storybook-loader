export interface loaderOptions {
  sort?: boolean;
  sortFunc?: Function;
  noExt?: boolean;
  noExtRegExp?: string;
  includeRegExp?: string;
  excludeRegExp?: string;
  groupByFolder?: boolean;
  ignoreDotFolder?: boolean;
}

/**
 * @default
 * loaderOptions: {
 *   sort: true,
 *   sortFunc: (a, b) => a.localeCompare(b),
 *   noExt: true,
 *   groupByFolder: false,
 *   ignoreDotFolder: true,
 * }
 */
export default function loader(requireContext: any, loaderOptions: loaderOptions): void;
