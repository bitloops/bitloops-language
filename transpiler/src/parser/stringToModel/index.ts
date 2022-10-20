import { TBoundedContexts } from '../../types.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (_bitloopsLanguageString: string): TBoundedContexts => {
  return {
    HelloWorld: {
      core: {
        DTOs: {
          HelloWorldRequestDTO: {
            fields: [
              {
                optional: true,
                type: 'string',
                name: 'name',
              },
            ],
          },
        },
      },
    },
  };
};
