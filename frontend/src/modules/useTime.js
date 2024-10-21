import moment from "moment";

// Function to format the date based on the timestamp and timezone
export const formatWeatherDate = (timestamp, timezone) => {
  return moment
    .utc(new Date().setTime(timestamp * 1000))  // Convert the timestamp to UTC and adjust it
    .add(timezone, "seconds")  // Add the timezone offset in seconds
    .format("dddd, MMMM Do YYYY");  // Format the date in a readable format (e.g., Monday, October 21st 2024)
};
