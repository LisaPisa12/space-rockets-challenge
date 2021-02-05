import { DateTime } from "luxon";

export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(timestamp));
}

export function launcLocalTime(timestamp) {
  let timeDate = DateTime.fromISO(timestamp, { setZone: true });

  return `${timeDate.monthLong} ${timeDate.day}, ${timeDate.year} ${timeDate.hour}:${timeDate.minute} ${timeDate.zoneName}`;
}

export function formatDragonLaunchDate(date) {
  let dateFormated = new Date(date);
  return dateFormated.toDateString();
}
