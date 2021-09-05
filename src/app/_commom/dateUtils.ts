import { isNullOrUndefined } from "./util";

/**
 * Converte Date para dd/MM/yyyy às HH:mm no timezone local
 */
 /* export function convertDataToLocaleString(date: Date | string, seconds = false) {
  if (isNullOrUndefined(date)) {
    return '';
  }

  const data = moment(date).format('DD/MM/YYYY');
  const hora = moment(date).format('HH:mm' + (seconds ? `:ss` : ``));
  return `${data} às ${hora}`;
} */