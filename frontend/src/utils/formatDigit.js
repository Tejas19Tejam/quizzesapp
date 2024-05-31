export function FormatDigit(digit) {
  if (digit < 10) {
    return `0${digit.toString()}`;
  }

  if (digit >= 1000) {
    const divisions = [1000, 1000000];
    const abbreviations = ["K", "M"];

    for (let i = 0; i < divisions.length; i++) {
      const division = divisions[i];
      const abbreviation = abbreviations[i];

      if (digit >= division) {
        const formattedDigit = (digit / division).toFixed(1);
        return formattedDigit + abbreviation;
      }
    }
  }

  return digit.toString();
}
