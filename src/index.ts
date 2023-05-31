/**
 * Options for `findPart() or containsPart()
 */
export interface Options {
    /** The term to find for a containing part */
    term: string;
    /** The string that might contains a term part */
    needle: string;
    /** How many consecultives equivalent characters are considered a match */
    thresold: number;
    /** Ignore case or not */
    caseInsensitive: boolean;
}

/** The `findPart()` result */
export interface Result {
    /** The part found */
    found: string;
    /** Where it was found in the term */
    termIndex: number;
    /** Where it was found in the needle */
    needleIndex: number;
}

/**
 * Search for a string inside another string, no matter where, returning `true` or `false`.
 * 
 * It works different from a RegEx. You pass a searching string (aka needle) and a base string (aka term). This function will
 * look up for the needle in every position of term, even if the needle is not a subset of term.
 * 
 * Example: Imagine you want to determine if the needle "Foo@1234!Password" contains any part of the term "username@foo.bar". It may be difficult
 * to achive this using RegEx, but not using the findSubstring() function. Just set the threshold (how many characters are considered a match) and
 * run the function.
 * So, you run this like:
 * ```typescript
 * const result = findSubstring({
 *  term: 'username@foo.bar',
 *  needle: 'Foo@1234!Password',
 *  caseInsensitive: true,
 *  threshold: 3
 * });
 * 
 * // Will print true
 * console.table(result);
 * ```
 * @param opts the options, as described in the `Options` interface
 * @returns `true` if the thresold needle was found in term
 */
export function containsPart(opts: Options): boolean {
    const result = findPart(opts);
    return result !== null;
}

/**
 * Search for a string inside another string, no matter where.
 * 
 * It works different from a RegEx. You pass a searching string (aka needle) and a base string (aka term). This function will
 * look up for the needle in every position of term, even if the needle is not a subset of term.
 * 
 * Example: Imagine you want to determine if the needle "Foo@1234!Password" contains any part of the term "username@foo.bar". It may be difficult
 * to achive this using RegEx, but not using the findSubstring() function. Just set the threshold (how many characters are considered a match) and
 * run the function.
 * So, you run this like:
 * ```typescript
 * const result = findSubstring({
 *  term: 'username@foo.bar',
 *  needle: 'Foo@1234!Password',
 *  caseInsensitive: true,
 *  threshold: 3
 * });
 * 
 * // Will print { found: foo, termIndex: 9, needleIndex: 0}
 * console.table(result);
 * ```
 * @param opts the options, as described in the `Options` interface
 * @returns A `Result` that contains the found string and the index where it was found, or `null` otherwise.
 */
export function findPart(opts: Options): Result | null {
    if (opts.caseInsensitive) {
        opts.term = opts.term.toLowerCase();
        opts.needle = opts.needle.toLowerCase();
    }

    for (let i = 0; i < opts.needle.length; i++) {
        const nChar = opts.needle[i];
        let idx = opts.term.indexOf(nChar);

        if (idx === -1) {
            continue;
        }

        do {
            let matchedCharacters = 1;
            let foundNeedle = nChar;
            for (let tIdx = idx + 1, nIdx = i + 1; tIdx < opts.term.length, nIdx < opts.needle.length; tIdx++, nIdx++) {
                if (opts.term[tIdx] !== opts.needle[nIdx]) {
                    break;
                }
                foundNeedle += opts.term[tIdx];
                matchedCharacters++;
            }

            if (matchedCharacters >= opts.thresold) {
                return {
                    termIndex: idx,
                    needleIndex: i,
                    found: foundNeedle
                };
            }

            idx = opts.term.indexOf(nChar, idx + 1);
        } while (idx !== -1);
    }

    return null;
}