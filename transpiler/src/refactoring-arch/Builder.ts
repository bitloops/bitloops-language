export type IBuilder<T, B = Record<string, unknown>> = {
  [k in keyof T]-?: ((arg: T[k]) => IBuilder<T, B & Record<k, T[k]>>) & (() => T[k]);
} & {
  build: B extends T ? () => T : never;
};

/**
 * Create a Builder for an interface. Returned objects will be untyped.
 *
 * e.g. let obj: Interface = Builder<Interface>().setA(5).setB("str").build();
 *
 */
export function Builder<T>(): IBuilder<T> {
  const built: Record<string, unknown> = {};

  const builder = new Proxy(
    {},
    {
      get(target, prop) {
        if ('build' === prop) {
          return () => built;
        }

        return (...args: unknown[]): unknown => {
          // If no arguments passed return current value.
          if (0 === args.length) {
            return built[prop.toString()];
          }

          built[prop.toString()] = args[0];
          return builder as IBuilder<T>;
        };
      },
    },
  );

  return builder as IBuilder<T>;
}
