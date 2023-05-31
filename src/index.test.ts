import { describe, expect, test } from '@jest/globals';
import { containsPart, findPart } from './index';

describe('Test findSubstring', () => {
    test('Find out if a password contain some username part', () => {
        const result = findPart({
            term: 'dfeprado@gmail.com', // the username
            needle: 'Pass!2988prad', // the password, note "prad" at the end of the string, remeting to "prado" in the username
            caseInsensitive: true,
            thresold: 4 // More than 4 characters match resolves to true
        });

        expect(result).not.toBeNull();
        expect(result?.found).toBe('prad');
        expect(result?.termIndex).toBe(3);
        expect(result?.needleIndex).toBe(9);
    });

    test('Find nothing', () => {
        const result = findPart({
            term: 'dfeprado@gmail.com',
            needle: 'Pass!2988Pass',
            caseInsensitive: true,
            thresold: 4
        });

        expect(result).toBeNull();
    });

    test('Just check if there is a substring', () => {
        const result = containsPart({
            term: 'dfeprado@gmail.com', // the username
            needle: 'Pass!2988prad', // the password, note "prad" at the end of the string, remeting to "prado" in the username
            caseInsensitive: true,
            thresold: 4 // More than 4 characters match resolves to true
        });

        expect(result).toBeTruthy();
    });

    test('Just check if there is not a substring', () => {
        const result = containsPart({
            term: 'dfeprado@gmail.com',
            needle: 'Pass!2988Pass',
            caseInsensitive: true,
            thresold: 4
        });

        expect(result).toBeFalsy();
    });
});