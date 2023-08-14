export function showCharLimit(message) {
    let maxChars = 200;
    const input = message?.length??0;
    return maxChars - input;
}