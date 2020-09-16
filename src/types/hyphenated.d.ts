declare module 'hyphenated' {
  export interface LanguageParam {
    id: string;
    patterns: string[];
    exceptions: string[];
  }

  interface OptionParams {
    language?: LanguageParam;
  }
  export function hyphenated(text: string, options?: OptionParams): string;
}
