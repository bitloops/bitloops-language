export class CodeSnippets {
  static openTypescript(): string {
    return "'''typescript";
  }

  static closeTypescript(): string {
    return "'''";
  }

  static openProto(): string {
    return "'''proto";
  }

  static closeProto(): string {
    return "'''";
  }

  static sanitizeTypescript(promptResponse: string): string {
    let code = promptResponse;
    const tsOpen = CodeSnippets.openTypescript();
    if (promptResponse.includes(tsOpen)) {
      const tsClose = CodeSnippets.closeTypescript();
      code = promptResponse.substring(
        promptResponse.indexOf(tsOpen) + tsOpen.length,
        promptResponse.lastIndexOf(tsClose),
      );
    }

    const backticksCount = (code.match(/```/g) || []).length;
    if (backticksCount === 2) {
      const backtickStart = '```typescript';
      const backtickEnd = '```';
      return code.substring(
        code.indexOf(backtickStart) + backtickStart.length,
        code.lastIndexOf(backtickEnd),
      );
    }

    return code;
  }

  static sanitizeProto(promptResponse: string): string {
    const protoOpen = CodeSnippets.openProto();
    if (!promptResponse.includes(protoOpen)) {
      return promptResponse;
    }
    const protoClose = CodeSnippets.closeProto();

    // Return code between tsOpen and tsClose
    const code = promptResponse.substring(
      promptResponse.indexOf(protoOpen) + protoOpen.length,
      promptResponse.lastIndexOf(protoClose),
    );

    return code;
  }

  static sanitizeTypescriptImports(code: string): string {
    // Remove every line(or multiple lines) that starts with 'import' and ends with ';' and newLine

    const regex = /import.+;(\r?\n|\r)/g;
    const sanitizedCode = code.replace(regex, '');

    return sanitizedCode;
  }

  static removeLicenseCode(code: string): string {
    // Remove multi line comments, starting with /**  */, including new lines
    return code.replace(/\/\*[\s\S]*?\*\//g, '');
  }
}
