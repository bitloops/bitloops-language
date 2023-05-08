export type BoundedContextModulesInfo<Info> = {
  [boundedContext: string]: {
    [module: string]: Info;
  };
};
/**
 * Generator that iterates over the modules of each bounded context in a {@link BoundedContextModulesInfo} object.
 * @typeParam Info The type of the module info object.

 * @param input A `BoundedContextModulesInfo` object.
 * @returns A generator that yields an object with the module info, module name, and bounded context name.
 *
 * @example
 *
 * const modulesInfo: BoundedContextModulesInfo<MyModuleInfo> = {
 *   users: {
 *     auth: { ... },
 *     profile: { ... },
 *   },
 *   products: {
 *     catalog: { ... },
 *     orders: { ... },
 *   },
 * };
 *
 * for (const { moduleInfo, moduleName, boundedContextName } of yieldModuleInfo(modulesInfo)) {
 *   console.log(`${moduleName} in ${boundedContextName} has info:`, moduleInfo);
 * }
 * @see BoundedContextModulesInfo
 */
export function* yieldModuleInfo<Info>(
  input: BoundedContextModulesInfo<Info>,
): Generator<{ moduleInfo: Info; moduleName: string; boundedContextName: string }, void, unknown> {
  for (const [boundedContextName, boundedContext] of Object.entries(input)) {
    for (const [moduleName, moduleInfo] of Object.entries(boundedContext)) {
      yield { moduleInfo, moduleName, boundedContextName };
    }
  }
}

// Define the iterable
export const moduleInfoIterator = {
  [Symbol.iterator]: function* <MyModuleInfo>(input: BoundedContextModulesInfo<MyModuleInfo>) {
    yield* yieldModuleInfo(input);
  },
};
