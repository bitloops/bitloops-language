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
    const tsOpen = CodeSnippets.openTypescript();
    if (!promptResponse.includes(tsOpen)) {
      return promptResponse;
    }
    const tsClose = CodeSnippets.closeTypescript();

    // Return code between tsOpen and tsClose
    const code = promptResponse.substring(
      promptResponse.indexOf(tsOpen) + tsOpen.length,
      promptResponse.lastIndexOf(tsClose),
    );

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
}
