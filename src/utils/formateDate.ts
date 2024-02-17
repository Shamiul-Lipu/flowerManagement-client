export function formatDate(timestamp: string) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(timestamp);

  // Get the day of the week (0-6)
  const dayOfWeek = days[date.getUTCDay()];

  // Get the date
  const dateOfMonth = date.getUTCDate();

  // Get the month (0-11)
  const month = date.getUTCMonth() + 1; // Adding 1 because months are zero-based

  // Get the year
  const year = date.getUTCFullYear();

  // Construct the date string in the desired format
  const formattedDate = `${dayOfWeek}, ${dateOfMonth}-${month}-${year}`;

  return formattedDate;
}
