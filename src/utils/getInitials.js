export function getInitials(name) {
  const words = name.split(" ");
  if (words.length >= 2) {
    const firstNameInitial = words[0][0];
    const lastNameInitial = words[words.length - 1][0];
    return `${firstNameInitial.toUpperCase()}${lastNameInitial.toUpperCase()}`;
  }
  return name;
}

// Test examples
console.log(getInitials("Mike Smith")); // "MS"
console.log(getInitials("Lisa Smart")); // "LS"
console.log(getInitials("John")); // "John" (no last name)
