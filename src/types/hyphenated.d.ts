declare function hyphenated(text: string): string;
declare module 'hyphenated' {
  interface OptionParams {
    language: string;
  }
  export function hyphenated(text: string, options?: OptionParams): string;
}
