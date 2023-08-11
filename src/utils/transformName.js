const namePattern = /^([A-Za-z])[A-Za-z'.]* ([A-Za-z'.]+)$/;

export function transformName(name) {
  const matches = name.match(namePattern);
  if (matches) {
    const firstInitial = matches[1];
    const lastName = matches[2];
    return `${firstInitial}. ${lastName}`;
  }
  return name;
}

// Test examples
console.log(transformName("Mike Jones")); // "M. Jones"
console.log(transformName("Lisa Smith")); // "L. Smith"
console.log(transformName("John")); // "John" (no space)
console.log(transformName("O'Reilly")); // "O'Reilly" (apostrophe)
