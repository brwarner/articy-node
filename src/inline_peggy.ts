
// Generated by peggy v. 1.2.0 (ts-pegjs plugin v. 1.1.1 )
//
// https://peggyjs.org/   https://github.com/metadevpro/ts-pegjs

"use strict";


import { processEmbed, SequenceType, IEmbedScriptParseOptions, ExprEmbedType, SequenceEmbedType, Argument } from "./inline_util";


export interface IFilePosition {
  offset: number;
  line: number;
  column: number;
}

export interface IFileRange {
  start: IFilePosition;
  end: IFilePosition;
}

export interface ILiteralExpectation {
  type: "literal";
  text: string;
  ignoreCase: boolean;
}

export interface IClassParts extends Array<string | IClassParts> {}

export interface IClassExpectation {
  type: "class";
  parts: IClassParts;
  inverted: boolean;
  ignoreCase: boolean;
}

export interface IAnyExpectation {
  type: "any";
}

export interface IEndExpectation {
  type: "end";
}

export interface IOtherExpectation {
  type: "other";
  description: string;
}

export type Expectation = ILiteralExpectation | IClassExpectation | IAnyExpectation | IEndExpectation | IOtherExpectation;

export class SyntaxError extends Error {
  public static buildMessage(expected: Expectation[], found: string | null) {
    function hex(ch: string): string {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s: string): string {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/"/g,  "\\\"")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,            (ch) => "\\x0" + hex(ch) )
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x"  + hex(ch) );
    }

    function classEscape(s: string): string {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/\]/g, "\\]")
        .replace(/\^/g, "\\^")
        .replace(/-/g,  "\\-")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,            (ch) => "\\x0" + hex(ch) )
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x"  + hex(ch) );
    }

    function describeExpectation(expectation: Expectation) {
      switch (expectation.type) {
        case "literal":
          return "\"" + literalEscape(expectation.text) + "\"";
        case "class":
          const escapedParts = expectation.parts.map((part) => {
            return Array.isArray(part)
              ? classEscape(part[0] as string) + "-" + classEscape(part[1] as string)
              : classEscape(part);
          });

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        case "any":
          return "any character";
        case "end":
          return "end of input";
        case "other":
          return expectation.description;
      }
    }

    function describeExpected(expected1: Expectation[]) {
      const descriptions = expected1.map(describeExpectation);
      let i: number;
      let j: number;

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found1: string | null) {
      return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  }

  public message: string;
  public expected: Expectation[];
  public found: string | null;
  public location: IFileRange;
  public name: string;

  constructor(message: string, expected: Expectation[], found: string | null, location: IFileRange) {
    super();
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";

    if (typeof (Object as any).setPrototypeOf === "function") {
      (Object as any).setPrototypeOf(this, SyntaxError.prototype);
    } else {
      (this as any).__proto__ = SyntaxError.prototype;
    }
    if (typeof (Error as any).captureStackTrace === "function") {
      (Error as any).captureStackTrace(this, SyntaxError);
    }
  }
}

function peg$parse(input: string, options?: IParseOptions) {
  options = options !== undefined ? options : {};

  const peg$FAILED: Readonly<any> = {};

  const peg$startRuleFunctions: {[id: string]: any} = { Source: peg$parseSource };
  let peg$startRuleFunction: () => any = peg$parseSource;

  const peg$c0 = function(contents: any): any { return contents.join(''); };
  const peg$c1 = "{";
  const peg$c2 = peg$literalExpectation("{", false);
  const peg$c3 = "}";
  const peg$c4 = peg$literalExpectation("}", false);
  const peg$c5 = function(type: any, args: any): any { 
  		return processEmbed(type, args, false, options as IEmbedScriptParseOptions, expected);
      };
  const peg$c6 = /^[ \t\n\r]/;
  const peg$c7 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false);
  const peg$c8 = function(): any { return undefined; };
  const peg$c9 = "\r";
  const peg$c10 = peg$literalExpectation("\r", false);
  const peg$c11 = "\n";
  const peg$c12 = peg$literalExpectation("\n", false);
  const peg$c13 = function(type: any, args: any): any { 
  		return processEmbed(type, args, true, options as IEmbedScriptParseOptions, expected);
  	};
  const peg$c14 = "stopping:";
  const peg$c15 = peg$literalExpectation("stopping:", false);
  const peg$c16 = function(): any { return {type: SequenceType.Stopping}; };
  const peg$c17 = "~";
  const peg$c18 = peg$literalExpectation("~", false);
  const peg$c19 = "shuffle:";
  const peg$c20 = peg$literalExpectation("shuffle:", false);
  const peg$c21 = function(): any { return {type: SequenceType.Shuffle}; };
  const peg$c22 = "&";
  const peg$c23 = peg$literalExpectation("&", false);
  const peg$c24 = "cycle:";
  const peg$c25 = peg$literalExpectation("cycle:", false);
  const peg$c26 = function(): any { return {type: SequenceType.Cycle}; };
  const peg$c27 = "!";
  const peg$c28 = peg$literalExpectation("!", false);
  const peg$c29 = "once:";
  const peg$c30 = peg$literalExpectation("once:", false);
  const peg$c31 = function(): any { return {type: SequenceType.OnlyOnce}; };
  const peg$c32 = ":";
  const peg$c33 = peg$literalExpectation(":", false);
  const peg$c34 = function(expr: any): any { return {"expr": expr, "text": text()}; };
  const peg$c35 = /^[^\n|:{}]/;
  const peg$c36 = peg$classExpectation(["\n", "|", ":", "{", "}"], true, false);
  const peg$c37 = function(): any { return text(); };
  const peg$c38 = function(arg: any): any { return { full: arg ?? '', location: location() }; };
  const peg$c39 = "|";
  const peg$c40 = peg$literalExpectation("|", false);
  const peg$c41 = function(first: any, rest: any): any {
  		const result: Argument[] = [];
  		if(first) { result.push(first); }
  		for(let i = 0; i < rest.length; i++) { 
  			result.push(rest[i][1]);
  		}
      	return result;
  	};
  const peg$c42 = function(cond: any, value: any): any { 
  	if(cond !== null) { 
  		return {expr: cond.expr, value: value ?? '', full: cond.text + (value ?? ''), location: location() };
  	} else { 
  		return { full: value ?? '', location: location() };
  	}
  };
  const peg$c43 = "-";
  const peg$c44 = peg$literalExpectation("-", false);
  const peg$c45 = function(args: any): any { 
  	const result: Argument[] = [];
  	for(let i = 0; i < args.length; i++) { 
  		result.push(args[i][2]);
  	}
  	return result;
  };
  const peg$c46 = /^[^{}\-]/;
  const peg$c47 = peg$classExpectation(["{", "}", "-"], true, false);
  const peg$c48 = function(): any { return text().trim(); };
  const peg$c49 = /^[^{}|\r\n]/;
  const peg$c50 = peg$classExpectation(["{", "}", "|", "\r", "\n"], true, false);
  const peg$c51 = /^[^{}]/;
  const peg$c52 = peg$classExpectation(["{", "}"], true, false);

  let peg$currPos = 0;
  let peg$savedPos = 0;
  const peg$posDetailsCache = [{ line: 1, column: 1 }];
  let peg$maxFailPos = 0;
  let peg$maxFailExpected: Expectation[] = [];
  let peg$silentFails = 0;

  let peg$result;

  if (options.startRule !== undefined) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text(): string {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location(): IFileRange {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description: string, location1?: IFileRange) {
    location1 = location1 !== undefined
      ? location1
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location1
    );
  }

  function error(message: string, location1?: IFileRange) {
    location1 = location1 !== undefined
      ? location1
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location1);
  }

  function peg$literalExpectation(text1: string, ignoreCase: boolean): ILiteralExpectation {
    return { type: "literal", text: text1, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts: IClassParts, inverted: boolean, ignoreCase: boolean): IClassExpectation {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation(): IAnyExpectation {
    return { type: "any" };
  }

  function peg$endExpectation(): IEndExpectation {
    return { type: "end" };
  }

  function peg$otherExpectation(description: string): IOtherExpectation {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos: number) {
    let details = peg$posDetailsCache[pos];
    let p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos: number, endPos: number): IFileRange {
    const startPosDetails = peg$computePosDetails(startPos);
    const endPosDetails = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected1: Expectation) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected1);
  }

  function peg$buildSimpleError(message: string, location1: IFileRange) {
    return new SyntaxError(message, [], "", location1);
  }

  function peg$buildStructuredError(expected1: Expectation[], found: string | null, location1: IFileRange) {
    return new SyntaxError(
      SyntaxError.buildMessage(expected1, found),
      expected1,
      found,
      location1
    );
  }

  function peg$parseSource(): string {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseText();
    if (s2 as any === peg$FAILED) {
      s2 = peg$parseEmbed();
    }
    while (s2 as any !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseText();
      if (s2 as any === peg$FAILED) {
        s2 = peg$parseEmbed();
      }
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c0(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseInlineSource(): string {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseInlineText();
    if (s2 as any === peg$FAILED) {
      s2 = peg$parseEmbed();
    }
    if (s2 as any !== peg$FAILED) {
      while (s2 as any !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseInlineText();
        if (s2 as any === peg$FAILED) {
          s2 = peg$parseEmbed();
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c0(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseInlineMultilineSource(): string {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseInlineMultilineText();
    if (s2 as any === peg$FAILED) {
      s2 = peg$parseEmbed();
    }
    if (s2 as any !== peg$FAILED) {
      while (s2 as any !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseInlineMultilineText();
        if (s2 as any === peg$FAILED) {
          s2 = peg$parseEmbed();
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c0(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseEmbed(): string {
    let s0;

    s0 = peg$parseInlineEmbed();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseMutliLineEmbed();
    }

    return s0;
  }

  function peg$parseInlineEmbed(): string {
    let s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c1;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c2); }
    }
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parseCondition();
      if (s2 as any === peg$FAILED) {
        s2 = peg$parseType();
      }
      if (s2 as any === peg$FAILED) {
        s2 = null;
      }
      if (s2 as any !== peg$FAILED) {
        s3 = peg$parseArguments();
        if (s3 as any !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 125) {
            s4 = peg$c3;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c4); }
          }
          if (s4 as any !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c5(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseWhitespace(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c6.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c7); }
    }
    while (s2 as any !== peg$FAILED) {
      s1.push(s2);
      if (peg$c6.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c7); }
      }
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c8();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseNewline(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 13) {
      s1 = peg$c9;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c10); }
    }
    if (s1 as any === peg$FAILED) {
      s1 = null;
    }
    if (s1 as any !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 10) {
        s2 = peg$c11;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c8();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseMutliLineEmbed(): string {
    let s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c1;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c2); }
    }
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parseType();
      if (s2 as any === peg$FAILED) {
        s2 = null;
      }
      if (s2 as any !== peg$FAILED) {
        s3 = peg$parseNewline();
        if (s3 as any !== peg$FAILED) {
          s4 = peg$parseMultiLineArguments();
          if (s4 as any !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s5 = peg$c3;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c4); }
            }
            if (s5 as any !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c13(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseType(): SequenceEmbedType | ExprEmbedType {
    let s0;

    s0 = peg$parseStopping_Id();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parseShuffle_Id();
      if (s0 as any === peg$FAILED) {
        s0 = peg$parseCycle_Id();
        if (s0 as any === peg$FAILED) {
          s0 = peg$parseOnce_Only_Id();
        }
      }
    }

    return s0;
  }

  function peg$parseStopping_Id(): any {
    let s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 9) === peg$c14) {
      s1 = peg$c14;
      peg$currPos += 9;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c15); }
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c16();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseShuffle_Id(): any {
    let s0, s1;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 126) {
      s1 = peg$c17;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c18); }
    }
    if (s1 as any === peg$FAILED) {
      if (input.substr(peg$currPos, 8) === peg$c19) {
        s1 = peg$c19;
        peg$currPos += 8;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c21();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseCycle_Id(): any {
    let s0, s1;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 38) {
      s1 = peg$c22;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c23); }
    }
    if (s1 as any === peg$FAILED) {
      if (input.substr(peg$currPos, 6) === peg$c24) {
        s1 = peg$c24;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c26();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseOnce_Only_Id(): any {
    let s0, s1;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 33) {
      s1 = peg$c27;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c28); }
    }
    if (s1 as any === peg$FAILED) {
      if (input.substr(peg$currPos, 5) === peg$c29) {
        s1 = peg$c29;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c30); }
      }
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c31();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseCondition(): { expr: string; } {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseExpression();
    if (s1 as any !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 58) {
        s2 = peg$c32;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c33); }
      }
      if (s2 as any !== peg$FAILED) {
        s3 = peg$parseWhitespace();
        if (s3 as any !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c34(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseExpression(): string {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c35.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c36); }
    }
    if (s2 as any !== peg$FAILED) {
      while (s2 as any !== peg$FAILED) {
        s1.push(s2);
        if (peg$c35.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c36); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c37();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseArgument(): any {
    let s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseInlineSource();
    if (s1 as any === peg$FAILED) {
      s1 = null;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c38(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseArguments(): Argument[] {
    let s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseArgument();
    if (s1 as any !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 124) {
        s4 = peg$c39;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
      if (s4 as any !== peg$FAILED) {
        s5 = peg$parseArgument();
        if (s5 as any !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 as any !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 124) {
          s4 = peg$c39;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c40); }
        }
        if (s4 as any !== peg$FAILED) {
          s5 = peg$parseArgument();
          if (s5 as any !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c41(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseMultilineArgument(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseCondition();
    if (s1 as any === peg$FAILED) {
      s1 = null;
    }
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parseInlineMultilineSource();
      if (s2 as any === peg$FAILED) {
        s2 = null;
      }
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseMultiLineArguments(): Argument[] {
    let s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseWhitespace();
    if (s1 as any !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s4 = peg$c43;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c44); }
      }
      if (s4 as any !== peg$FAILED) {
        s5 = peg$parseWhitespace();
        if (s5 as any !== peg$FAILED) {
          s6 = peg$parseMultilineArgument();
          if (s6 as any !== peg$FAILED) {
            s7 = peg$parseWhitespace();
            if (s7 as any !== peg$FAILED) {
              s4 = [s4, s5, s6, s7];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      if (s3 as any !== peg$FAILED) {
        while (s3 as any !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 45) {
            s4 = peg$c43;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c44); }
          }
          if (s4 as any !== peg$FAILED) {
            s5 = peg$parseWhitespace();
            if (s5 as any !== peg$FAILED) {
              s6 = peg$parseMultilineArgument();
              if (s6 as any !== peg$FAILED) {
                s7 = peg$parseWhitespace();
                if (s7 as any !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c45(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseInlineMultilineText(): string {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c46.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c47); }
    }
    if (s2 as any !== peg$FAILED) {
      while (s2 as any !== peg$FAILED) {
        s1.push(s2);
        if (peg$c46.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c48();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseInlineText(): string {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c49.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c50); }
    }
    if (s2 as any !== peg$FAILED) {
      while (s2 as any !== peg$FAILED) {
        s1.push(s2);
        if (peg$c49.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c50); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c37();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseText(): string {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c51.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c52); }
    }
    if (s2 as any !== peg$FAILED) {
      while (s2 as any !== peg$FAILED) {
        s1.push(s2);
        if (peg$c51.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c52); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c37();
    }
    s0 = s1;

    return s0;
  }


  if(false) { 
  	location();
  	error("");
  	peg$anyExpectation();
  }


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

export interface IParseOptions {
  filename?: string;
  startRule?: string;
  tracer?: any;
  [key: string]: any;
}
export type ParseFunction = (input: string, options?: IParseOptions) => any;
export const parse: ParseFunction = peg$parse;

