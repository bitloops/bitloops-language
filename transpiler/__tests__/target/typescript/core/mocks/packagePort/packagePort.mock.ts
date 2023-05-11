export interface GherkinPackagePort {
  encode(value: string): Promise<Uint8Array>;
}
