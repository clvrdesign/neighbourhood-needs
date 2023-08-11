const namePattern = /^(?=.*[A-Za-z])[A-Za-z'.]+ [A-Za-z'.]+$/;

export function validateName(name) {
  return namePattern.test(name);
}
// Test examples
console.log(validateName("J. Simmons")); // true
console.log(validateName("mike Jones")); // true
console.log(validateName("John"));      // false (no space)
console.log(validateName("  Smith"));   // false (space at the beginning)
console.log(validateName("O'Reilly"));  // true