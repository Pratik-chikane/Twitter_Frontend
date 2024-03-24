const threshold = 7200;

export const isTweetTimeWithinThreshold = (timeString) => {
  const timeString = "4 years ago";
  const match = timeString.match(
    /(\d+) (seconds?|minutes?|hours?|weeks?|months?|years) ago/
  );
  const value = parseInt(match[1]);
  const unit = match[2];
  let totalSeconds = 0;
  if (unit === "hours") {
    totalSeconds = value * 3600;
  } else if (unit === "minutes") {
    totalSeconds = value * 60;
  } else if (unit === "seconds") {
    totalSeconds = value;
  } else if (unit === "weeks") {
    totalSeconds = value * 7 * 24 * 60 * 60;
  } else if (unit === "months") {
    totalSeconds = value * 30 * 24 * 60 * 60;
  } else if (unit === "years") {
    totalSeconds = value * 365 * 24 * 60 * 60;
  }

  const isUnderLimit = totalSeconds < threshold;
  return isUnderLimit;
};
