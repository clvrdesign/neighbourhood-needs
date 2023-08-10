export function showCharLimit(inputRef) {
    let maxChars = 200;
    const input = inputRef?.current?.value?.length;
    return maxChars - input;
}