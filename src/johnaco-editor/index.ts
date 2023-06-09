export type ThemeTokenClass =
  | "Keyword"
  | "String"
  | "Numeric"
  | "Punctuation"
  | "Invalid"
  | "Ext1"
  | "Ext2"
  | "Ext3"
  | "Ext4";

type TokenColors = {
  [key in ThemeTokenClass]: string;
};

export interface Theme {
  defaultTextColor: string;
  backgroundColor: string;
  overlayBackgroundColor: string;
  activeItemTextColor: string;
  activeItemBackgroundColor: string;
  caretColor: string;
  lineNumberColor: string;
  highlightColor: string;
  tokenColors: TokenColors;
}

export interface Suggestion {
  label: string;
  value: string;
}

export interface LanguageDefinition {
  displayName: string;
  tokenMap: TokenMap;
  prettify?: (value: string) => string;
  getSuggestions?: (
    value: string,
    tokens: Token[],
    currentTokenIndex: number,
    position: number
  ) => Suggestion[];
  getHovercards?: (
    value: string,
    tokens: Token[],
    currentTokenIndex: number,
    position: number
  ) => Record<string, string>;
  getErrors?: (
    value: string,
    tokens: Token[],
    currentTokenIndex: number,
    position: number
  ) => string[];
}

export type Token = {
  type: string;
  value: string;
  line: number;
  position: number;
  column: number;
};

export type TokenDef = { pattern: RegExp; tokenClass?: ThemeTokenClass };

export type TokenMap = { [key: string]: TokenDef };

export { default as JohnacoEditor } from "./lib/components/Editor";

