import { VirtualFS } from './VirtualFS.js';
import { commandRegistry, type CommandResult } from './commands/index.js';

export class CommandHandler {
  constructor(private fs: VirtualFS) {}

  execute(input: string): CommandResult {
    const trimmed = input.trim();
    if (trimmed === '') {
      return { output: '' };
    }

    // Check for pipe: split on unquoted '|'
    const pipeSegments = this.splitOnPipe(trimmed);

    if (pipeSegments.length > 1) {
      return this.executePipeline(pipeSegments);
    }

    return this.executeSingle(trimmed);
  }

  private executePipeline(segments: string[]): CommandResult {
    let previousOutput = '';

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i].trim();
      if (segment === '') {
        return { output: '', error: 'syntax error near unexpected token `|`' };
      }

      // For piped commands, pass previous output as stdin via args if applicable
      const result = this.executeSingle(segment, previousOutput);
      if (result.error) {
        return result;
      }
      previousOutput = result.output;
      // Real Unix commands output trailing newline; ensure intermediate pipe
      // output ends with \n so wc -l and other line-based tools count correctly
      if (previousOutput && !previousOutput.endsWith('\n') && i < segments.length - 1) {
        previousOutput += '\n';
      }
    }

    return { output: previousOutput };
  }

  private executeSingle(input: string, stdin?: string): CommandResult {
    // Parse redirect operators from the input before tokenizing fully
    const { command: commandPart, redirect } = this.extractRedirect(input);

    const tokens = this.tokenize(commandPart);
    if (tokens.length === 0) {
      return { output: '' };
    }

    const commandName = tokens[0];
    const args = tokens.slice(1);

    const commandFn = commandRegistry[commandName];
    if (!commandFn) {
      return { output: '', error: `${commandName}: command not found` };
    }

    // Pass stdin via special arg marker for pipe support
    const finalArgs = stdin != null && stdin !== ''
      ? [...args, `__stdin__:${stdin}`]
      : args;

    let result: CommandResult;
    try {
      result = commandFn(this.fs, finalArgs);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { output: '', error: `${commandName}: ${msg}` };
    }

    // Handle redirect
    if (redirect && !result.error) {
      try {
        if (redirect.mode === 'overwrite') {
          this.fs.writeFile(redirect.target, result.output);
        } else {
          this.fs.appendFile(redirect.target, result.output);
        }
        return { output: '' };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { output: '', error: msg };
      }
    }

    return result;
  }

  private extractRedirect(input: string): {
    command: string;
    redirect: { mode: 'overwrite' | 'append'; target: string } | null;
  } {
    // Look for >> or > outside of quotes
    let inSingle = false;
    let inDouble = false;
    let redirectIndex = -1;
    let isAppend = false;

    for (let i = 0; i < input.length; i++) {
      const ch = input[i];

      if (ch === "'" && !inDouble) {
        inSingle = !inSingle;
      } else if (ch === '"' && !inSingle) {
        inDouble = !inDouble;
      } else if (!inSingle && !inDouble) {
        if (ch === '>' && i + 1 < input.length && input[i + 1] === '>') {
          redirectIndex = i;
          isAppend = true;
          break;
        } else if (ch === '>') {
          redirectIndex = i;
          isAppend = false;
          break;
        }
      }
    }

    if (redirectIndex === -1) {
      return { command: input, redirect: null };
    }

    const commandPart = input.slice(0, redirectIndex).trim();
    const targetPart = input.slice(redirectIndex + (isAppend ? 2 : 1)).trim();

    // Tokenize the target to handle potential quotes
    const targetTokens = this.tokenize(targetPart);
    if (targetTokens.length === 0) {
      return { command: input, redirect: null };
    }

    return {
      command: commandPart,
      redirect: {
        mode: isAppend ? 'append' : 'overwrite',
        target: targetTokens[0],
      },
    };
  }

  splitOnPipe(input: string): string[] {
    const segments: string[] = [];
    let current = '';
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < input.length; i++) {
      const ch = input[i];

      if (ch === "'" && !inDouble) {
        inSingle = !inSingle;
        current += ch;
      } else if (ch === '"' && !inSingle) {
        inDouble = !inDouble;
        current += ch;
      } else if (ch === '|' && !inSingle && !inDouble) {
        segments.push(current);
        current = '';
      } else {
        current += ch;
      }
    }

    segments.push(current);
    return segments;
  }

  /**
   * Tokenize input string, handling single and double quotes.
   * Quoted strings preserve internal spaces. Quotes are removed from the result.
   */
  tokenize(input: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < input.length; i++) {
      const ch = input[i];

      if (ch === "'" && !inDouble) {
        inSingle = !inSingle;
        // Don't add the quote character to the token
      } else if (ch === '"' && !inSingle) {
        inDouble = !inDouble;
        // Don't add the quote character to the token
      } else if (ch === ' ' && !inSingle && !inDouble) {
        if (current.length > 0) {
          tokens.push(current);
          current = '';
        }
      } else {
        current += ch;
      }
    }

    if (current.length > 0) {
      tokens.push(current);
    }

    return tokens;
  }
}
