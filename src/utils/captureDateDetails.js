/**
 * @function captureDateDetails
 * @param  {type} dateGiven {date to format:uses current date if no date is provided}
 * @return {Object} {An Object with all attributes of date/time}
 */
export function captureDateDetails(dateGiven = new Date()) {
  const milliseconds = 1000;
  const dateTimeParts = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "full",
  }).formatToParts(dateGiven);

  const basic = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "full",
  }).format(dateGiven);
  const dayOfWeek = dateTimeParts[0].value.toLowerCase();
  const MonthOfTheYear = dateTimeParts[2].value;
  const day = parseInt(dateTimeParts[4].value);
  const year = parseInt(dateTimeParts[6].value);
  const time = `${dateTimeParts[8].value}:${dateTimeParts[10].value}:${dateTimeParts[12].value}`;
  const timeOfDay = dateTimeParts[14].value.toLowerCase();

  const hr24 = new Intl.DateTimeFormat("en-US", {
    timeStyle: "full",
    hourCycle: "h23",
  })
    .format(dateGiven)
    .split(" ")[0];

  const seconds = Math.floor(dateGiven.getTime() / milliseconds);

  return {
    basic,
    dayOfWeek,
    MonthOfTheYear,
    day,
    year,
    time,
    timeOfDay,
    hr24,
    seconds,
  };
}
