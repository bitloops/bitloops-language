export interface TestPackagePort {
  encode(value: string): Promise<Uint8Array>;
  decode(value: string, value2: string): Promise<Uint8Array>;
}
