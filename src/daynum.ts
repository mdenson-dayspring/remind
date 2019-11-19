/** _The_Awk_Programming_Language_ by Aho, Kernighan and Weinberger
 *  daynum function from solution to Exercise 3.8
 *  only valid from 1970 to 2099; performs no validation
 */
export const daynum = (y: number, m: number, d: number): number => {
  // 1 == Jan 1, 1970
  const days: number[] = '31 28 31 30 31 30 31 31 30 31 30 31'.split(' ').map(dy => parseInt(dy, 10));
  // 365 days per year, plus one for each leap year
  let n = (y - 1970) * 365 + Math.trunc((y - 1969) / 4);
  if (y % 4 === 0) {
    days[1]++;
  }
  for (let i = 0; i < m - 1; i++) {
    n = n + days[i];
  }
  return n + d;
};

export const dateToDaynum = (d: Date): number => {
  return daynum(d.getFullYear(), d.getMonth()+1, d.getDate());
};

export const daynumToYear = (dn: number): number => {
  let guess = Math.trunc(dn / 365) + 1970;
  while (daynum(guess, 1, 1) > dn) {
    guess--;
  }

  return guess;
};
