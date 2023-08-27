export function dateInSeconds(jsDateGiven = new Date()) {
  const milliseconds = 1000;
  const someDate = new Date(jsDateGiven);
  const seconds = Math.floor(someDate.getTime() / milliseconds);
  return seconds;
}
