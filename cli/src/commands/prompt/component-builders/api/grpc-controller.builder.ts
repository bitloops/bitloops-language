import { CodeSnippets } from '../../data-sets/common/code-snippets.js';

/**
 * This receives the openAI responses and process them in order to create the final file result.
 */
export class GrpcControllerBuilder {
  static IMPORTS_METHODS_SEPARATOR = '---';
  static assemble(inputs: string[], packageName: string): string {
    // TODO
    // remove   '''typescript and ''' wrappers
    const [imports, methods] = inputs.reduce(
      (acc, input) => {
        const sanitizedInput = CodeSnippets.sanitizeTypescript(input);
        const [imports, methods] = sanitizedInput.split(
          GrpcControllerBuilder.IMPORTS_METHODS_SEPARATOR,
        );
        acc[0] += imports;
        acc[1] += methods;
        return acc;
      },
      ['', ''],
    );
    return `
      ${this.createImports(imports, packageName)}
      ${methods}
        `;
  }

  private static createImports(imports: string, packageName: string): string {
    return `
  import { ${packageName} } from '../proto/generated/${packageName}';
  ${imports}
    `;
  }
}
