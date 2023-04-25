export type BoundedContextModulesInfo<Info> = {
  [boundedContext: string]: {
    [module: string]: Info;
  };
};
/*
type WhatYouYield="foo"
type WhatYouReturn="bar"
type WhatYouAccept="baz"

function* myfun(): Generator<
  WhatYouYield,
  WhatYouReturn,
  WhatYouAccept
> {
const myYield = "foo" //type of myYield is WhatYouYield
const myAccepted = yield myYield; //type of myAccepted is WhatYouAccept
return "baz" //type of this value is WhatYouReturn 
}
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
