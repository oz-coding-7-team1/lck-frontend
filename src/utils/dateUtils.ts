import moment from "moment";

export function formatDate(date: string, format: string = "YYYY-MM-DD") {
  return moment(date).format(format);
}

export function getRelativeTime(date: string) {
  return moment(date).fromNow();
}
