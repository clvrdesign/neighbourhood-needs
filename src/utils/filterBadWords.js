import { badwords as badwordslist } from "./badwords.js";

export async function filterBadWords(entry) {
  // Split the input string into individual words
  const words = entry.trim().split(/\s+/);

  // Use .some() to check each word against the array

  // Check if any match is found (i.e., if any value in matches is true)
  return words.some((word) => badwordslist.includes(word));
}
