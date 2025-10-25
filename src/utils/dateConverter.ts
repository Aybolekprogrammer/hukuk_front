export function getFormattedDateTime() {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = now.toLocaleDateString("en-US", options);
  const formattedTime = now
    .toTimeString()
    .split(" ")[0]
    .replace(/:/g, ".");

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
