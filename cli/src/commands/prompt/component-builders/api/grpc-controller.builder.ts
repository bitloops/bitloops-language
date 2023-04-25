/**
 * This receives the openAI responses and process them in order to create the final file result.
 */
export class GrpcControllerBuilder {
  static IMPORTS_METHODS_SEPARATOR = '---';
  static assemble(inputs: string[]): string {
    // TODO
    // remove   '''typescript and ''' wrappers
    const [imports, methods] = inputs.reduce(
      (acc, input) => {
        const [imports, methods] = input.split(GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR);
        acc[0] += imports;
        acc[1] += methods;
        return acc;
      },
      ['', ''],
    );
    return `
      ${imports}
      ${methods}
        `;
  }
}
