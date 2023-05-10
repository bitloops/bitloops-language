/**
 * This receives the openAI responses and process them in order to create the final file result.
 */
export class GrpcPubSubHandlerBuilder {
  static FILENAME_FILECONTENT_SEPARATOR = '---';

  static analyze(input: string): { fileName: string; fileContent: string } {
    const [fileName, fileContent] = input.split(
      GrpcPubSubHandlerBuilder.FILENAME_FILECONTENT_SEPARATOR,
      2,
    );

    return { fileName: fileName.trim(), fileContent };
  }
}
