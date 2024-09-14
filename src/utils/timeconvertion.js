export const convertTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours);

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour time to 12-hour format, handle 0 as 12

  return `${hours}:${minutes} ${period}`;
};
