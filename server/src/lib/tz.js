import { config } from '../config.js';

/**
 * Returns SQL expression to convert start_at to local date string.
 * Example: (a.start_at AT TIME ZONE 'America/Recife')::date
 */
export const localDate = (col = 'a.start_at') =>
  `(${col} AT TIME ZONE '${config.appTz}')::date`;

export const localTime = (col = 'a.start_at') =>
  `to_char(${col} AT TIME ZONE '${config.appTz}', 'HH24:MI')`;

/** Today in app timezone as SQL expression */
export const todayExpr = () =>
  `(now() AT TIME ZONE '${config.appTz}')::date`;

/** Format a JS Date to YYYY-MM-DD in app timezone */
export const formatDate = (d) => {
  const dt = new Date(d);
  return dt.toLocaleDateString('sv-SE', { timeZone: config.appTz });
};
