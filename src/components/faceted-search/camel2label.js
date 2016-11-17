export default (camelCase) => camelCase
  .replace(/([A-Z0-9])/g, (match) => ` ${match.toLowerCase()}`)
  .trim()
  .replace(/^./, (match) => match.toUpperCase());
