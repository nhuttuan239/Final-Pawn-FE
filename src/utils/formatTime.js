import { format, formatDistanceToNow, getTime } from "date-fns";

export const fDate = (date) => {
  return format(new Date(date), "dd MMMM yyyy");
};

export const fDateTime = (date) => {
  return format(new Date(date), "dd MMMM yyyy HH:mm");
};

export const fTimestamp = (date) => {
  return getTime(new Date(date));
};

export const fDateTimeSuffix = (date) => {
  return format(new Date(date), "dd/MMMM/yyyy hh:mm p");
};

export const fToNow = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
