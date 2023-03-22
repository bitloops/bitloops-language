export interface TestPackagePort {
  encode(value: string): Uint8Array;
  decode(value: string, value2: string): Uint8Array;
}
