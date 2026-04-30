// these were internal functions for Timer.svelte
// they are external for the unit tests

// rounds to the lower number when positive.
// used for every 
export function floor(number) {
  return number - (number % 1)
}

export function msToSec(ms){
  if (ms < 0) {return `00`}
  const ms_per_sec = 1000
  const ms_per_min = 60000
  const sec = floor((ms % ms_per_min) / ms_per_sec);
  return sec < 10 ? `0${sec}` : sec; // '0{}' is to keep 2 digit formatting
}


export function msToMin(ms){
  if (ms < 0) {return `00`}
  const ms_per_min = 60000
  const ms_per_hr = 3600000
  const min = floor((ms % ms_per_hr) / ms_per_min);
  return min < 10 ? `0${min}` : min; // '0{}' is to keep 2 digit formatting
}

export function msToHr(ms) {
  if (ms < 0) {return `00`}
  const ms_per_hr = 3600000
  const ms_per_day = 86400000
  const hr = floor((ms % ms_per_day) / ms_per_hr);
  return hr < 10 ? `0${hr}` : hr; // '0{}' is to keep 2 digit formatting
}

// don't expect these to get used, but good to have for limit testing

// days is the base for rest of these units.
// days are also only 1 unit because 7 days is a week, and only a single unit is necessary
export function msToDays(ms) {
  if (ms < 0) {return `0`}
  const ms_per_day = 86400000
  const ms_per_week = 604800000
  return floor((ms % ms_per_week) / ms_per_day);
}

export function msToWeeks(ms) {
  if (ms < 0) {return `00`}
  const ms_per_week = 604800000
  const ms_per_year = 31449600000
  const weeks = floor((ms % ms_per_year) / ms_per_week);
  return weeks < 10 ? `0${weeks}` : weeks; // '0{}' is to keep 2 digit formatting
}

// if anyone needs a unit past years, they need to make their own app
// we are a general use timer, we use the colloquial norm of discrete numbered days in a year
export function msToYears(ms) {
  if (ms < 0) {return `0`}
  const ms_per_year = 31449600000
  return floor(ms / ms_per_year);
}
