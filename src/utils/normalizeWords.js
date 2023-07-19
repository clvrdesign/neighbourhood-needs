export function normalizeWords(badWord) {
  const lookalike = {
    $: "s",
    "@": "a",
    "<": "c",
    "!": "i",
    "+": "t",
    0: "o",
    1: "i",
    2: "z",
    3: "z",
    5: "s",
    8: "b",
  };
  const lookalikeWord = badWord
    .split("") // Convert the word into an array of characters
    .map((char) => lookalike[char] || char) // Map each character to its lookalike if available, or keep the original character
    .join(""); // Convert the array of characters back to a string
  return lookalikeWord;
}
