const pluralize = (
  count: number,
  singular: string,
  plural = `${singular}s`,
  append = true
) => {
  const word = Math.abs(count) === 1 ? singular : plural;
  return append ? `${count} ${word}` : word;
};

export default pluralize;
