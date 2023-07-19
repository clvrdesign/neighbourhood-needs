export function captureDateDetails() {
  const dateTimeParts = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "full",
  }).formatToParts(new Date());

  const basic = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "full",
  }).format(new Date());
  const dayOfWeek = dateTimeParts[0].value.toLowerCase();
  const monthName = dateTimeParts[2].value;
  const day = parseInt(dateTimeParts[4].value);
  const year = parseInt(dateTimeParts[6].value);
  const time = `${dateTimeParts[8].value}:${dateTimeParts[10].value}:${dateTimeParts[12].value}`;
  const timeOfDay = dateTimeParts[14].value.toLowerCase();

  return {
    basic,
    dayOfWeek,
    monthName,
    day,
    year,
    time,
    timeOfDay,
  };
}
