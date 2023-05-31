Search for a string inside another string, no matter where.

It works different from a RegEx. You pass a searching string (aka needle) and a base string (aka term). This function will
look up for the needle in every position of term, even if the needle is not a subset of term.

Example: Imagine you want to determine if the needle "Foo@1234!Password" contains any part of the term "username@foo.bar". It may be difficult
to achive this using RegEx, but not using the findSubstring() function. Just set the threshold (how many characters are considered a match) and
run the function.
So, you run this like:
```typescript
const result = findSubstring({
    term: 'username@foo.bar',
    needle: 'Foo@1234!Password',
    caseInsensitive: true,
    threshold: 3
});

// Will print { found: foo, termIndex: 9, needleIndex: 0}
console.table(result);
```