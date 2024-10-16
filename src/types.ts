// types.ts
type OpenTagFunction = (params?: string, content?: string) => string;
type CloseTagFunction = (params?: string, content?: string) => string;

export type Tags = {
  [key: string]: {
    validChildLookup?: { [key: string]: boolean };
    validParentLookup?: { [key: string]: boolean };
    openTag?: OpenTagFunction;
    closeTag?: CloseTagFunction;
    displayContent?: boolean;
    restrictChildrenTo?: string[];
    restrictParentsTo?: string[];
    noParse?: boolean;
  };
};
export type Config = {
  text: string;
  removeMisalignedTags?: boolean;
  addInLineBreaks?: boolean;
  escapeHtml?: boolean;
};
