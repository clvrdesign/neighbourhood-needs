export function transformName(...name) {
  if (name.length === 0) {
    return "";
  }
  const parts = name[0].split(" ");

  const oneName = parts[0].charAt(0)?.toUpperCase() + parts[0].slice(1);
  if (parts.length === 1) {
    return oneName;
  }
  const firstNameInitial = parts[0][0]?.toUpperCase();
  const lastName =
    parts[parts.length - 1].charAt(0)?.toUpperCase() +
    parts[parts.length - 1].slice(1);

  const signature = `${firstNameInitial}. ${lastName}`;
  if (signature.length <= 3) {
    return oneName;
  }
  return signature;
}
// Test examples
// console.log(transformName("Mike Jones")); // "M. Jones"
// console.log(transformName("Lisa Smith")); // "L. Smith"
// console.log(transformName("John")); // "John" (no space)
// console.log(transformName("O'Reilly")); // "O'Reilly" (apostrophe)
