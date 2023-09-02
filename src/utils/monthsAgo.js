export function isMonthsAgo(targetDateToCheck, monthsAgo) {
  const currentDate = new Date();
  const referenceDate = new Date(currentDate);
  referenceDate.setMonth(currentDate.getMonth() - monthsAgo);
  return (
    targetDateToCheck.getFullYear() === referenceDate.getFullYear() &&
    targetDateToCheck.getMonth() <= referenceDate.getMonth()
  );
}

// const targetDateToCheck = new Date("2023-05-27");
// const monthsAgo = 3;

// const result = isMonthsAgo(targetDateToCheck, monthsAgo);
// console.log(result);

//tests
// const targetDateToCheck = new Date("2023-05-27"); // The target date to check
// const monthsAgo = 3; // Number of months ago

// const result = isMonthsAgo(targetDateToCheck, monthsAgo);
// console.log(result); // This will output either true or false
