export interface thirdParamOptions {
  loader: Function;
  formatter: Function;
}

/**
 * @default
 * thirdParamOptions: {
 *   loader: mdLoader,
 *   formatter: formatWithNotesObject,
 * }
 */
export default function createMDThirdParamMaker(
  thirdParamOptions?: thirdParamOptions,
): Function;
