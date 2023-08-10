export function autosize(event) {
  const minHeight = 56; // Minimum height for the input
  const maxHeight = 200; // Maximum height for the input

  const inputValue = event.currentTarget.value.length;

  // Linear interpolation for height
  const newHeight =
    56 + ((inputValue - minHeight) / (maxHeight - minHeight)) * (200 - 56);
  event.currentTarget.style.height = `${newHeight}px`;
}
