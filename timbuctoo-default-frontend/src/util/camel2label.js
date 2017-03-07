export default (camelCase) => 
  // camelCase ==='birthDate' ? camelCase = "Date of birth":
  // camelCase ==='deathDate' ? camelCase = "Date of death":
  

  camelCase
  .replace(/([A-Z0-9])/g, (match) => ` ${match.toLowerCase()}`)
  .trim()
  .replace(/^./, (match) => match.toUpperCase())
  .replace(/_/g, " ");
