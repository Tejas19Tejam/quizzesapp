export function formatDate(dateString) {
  const date = new Date(dateString);

  // Define options for toLocaleDateString
  const options = { day: "2-digit", month: "short", year: "numeric" };

  // Use toLocaleDateString with the options to format the date
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}
