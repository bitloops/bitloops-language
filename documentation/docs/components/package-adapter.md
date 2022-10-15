# PackageAdapter

The PackageAdapter component is a concrete implementation of the corresponding [PackagePort](https://bitloops.com/docs/bitloops-language/components/package-port). Its name is inspired by the Hexagonal Architecture (or Ports and Adapters architecture).

When you create a PackagePort component, an interface to the target language will be created in order to use it and implement it to your adapter. Then you can implement your concrete class in the target language you have selected and use the library you want.

## Example

In typescript:

The created interface generated from port:

#### **`GherkinPackagePort.ts`**

```typescript
export interface GherkinPackagePort {
  encode(value: string): Uint8Array;
}
```

The concretion of the adapter(**It must end with PackageAdapter in the file**):

#### **`GherkinPackageAdapter.ts`**

```typescript
import { e } from 'bitloops-gherkin';

import { GherkinPackagePort } from './GherkinPackagePort';

export default class BitloopsGherkinPackageAdapter implements GherkinPackagePort {
  encode(value: string): Uint8Array {
    return e(value);
  }
}
```
