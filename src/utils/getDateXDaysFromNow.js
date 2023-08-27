export function getDateXDaysFromNow(x) {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + x);
  return futureDate;
}