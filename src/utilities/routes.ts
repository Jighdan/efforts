/* eslint-disable security/detect-object-injection,@typescript-eslint/no-explicit-any */
// Recursive helper for finding path parameters in the absence of wildcards
type _PathParam<Path extends string> =
  // split path into individual path segments
  Path extends `${infer L}/${infer R}`
    ? _PathParam<L> | _PathParam<R>
    : // find params after `:`
    Path extends `:${infer Param}`
    ? Param extends `${infer Optional}?`
      ? Optional
      : Param
    : // otherwise, there aren't any params present
      never;

/**
 * Examples:
 * "/a/b/*" -> "*"
 * ":a" -> "a"
 * "/a/:b" -> "b"
 * "/a/blahblahblah:b" -> "b"
 * "/:a/:b" -> "a" | "b"
 * "/:a/b/:c/*" -> "a" | "c" | "*"
 */
type PathParam<Path extends string> =
  // check if path is just a wildcard
  Path extends "*"
    ? "*"
    : // look for wildcard at the end of the path
    Path extends `${infer Rest}/*`
    ? "*" | _PathParam<Rest>
    : // look for params in the absence of wildcards
      _PathParam<Path>;

export function generatePath<Path extends string>(
  originalPath: Path,
  params: {
    [key in PathParam<Path>]: string | null;
  } = {} as any
): string {
  let path = originalPath;

  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    path = path.replace(/\*$/, "/*") as Path;
  }

  return (
    path
      .replace(/^:(\w+)(\??)/g, (_, key, optional: string | undefined) => {
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        /* @ts-ignore */
        const param = params[key];

        if (optional === "?") {
          return param == null ? "" : param;
        }

        return param;
      })
      .replace(
        /\/:(\w+)(\??)/g,
        (_, key: PathParam<Path>, optional: string | undefined) => {
          const param = params[key];

          if (optional === "?") {
            return param == null ? "" : `/${param}`;
          }

          return `/${param}`;
        }
      )
      // Remove any optional markers from optional static segments
      .replace(/\?/g, "")
      .replace(/(\/?)\*/, (_, prefix, __, str) => {
        const star = "*" as PathParam<Path>;

        if (params[star] == null) {
          // If no splat was provided, trim the trailing slash _unless_ it's
          // the entire path
          return str === "/*" ? "/" : "";
        }

        // Apply the splat
        return `${prefix}${params[star]}`;
      })
  );
}
