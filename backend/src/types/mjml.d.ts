declare module 'mjml' {
  interface MJMLParseOptions {
    minify?: boolean;
    validationLevel?: 'strict' | 'soft' | 'skip';
    filePath?: string;
  }

  interface MJMLParseError {
    line: number;
    message: string;
    tagName: string;
    formattedMessage: string;
  }

  interface MJMLParseResults {
    html: string;
    errors: MJMLParseError[];
  }

  export default function mjml2html(
    mjml: string,
    options?: MJMLParseOptions
  ): MJMLParseResults;
}