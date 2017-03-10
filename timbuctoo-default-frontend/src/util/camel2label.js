const labelList = {
                  "birthDate":"Date of birth", 
                  "deathDate":"Date of Death",
                  "forename":"Given name(s) or initial(s)", 
                  "surname":"Family name(s)", 
                  "nameLink":"Family name prefix(es) (e.g. ‘de’, ‘van der’, certain noble titles)", 
                  "genName":"Name suffix(es) (e.g. ‘jr.’, ‘sr.’, ‘Ph.D’)", 
                  "roleName":"Name prefix(es) (e.g. ‘dr.’, ‘prof.’, royal and certain noble titles)"
                }

export default (camelCase) => 

  Object.keys(labelList).indexOf(camelCase)>-1 ? camelCase = labelList[camelCase] :
 
  camelCase
  .replace(/([A-Z0-9])/g, (match) => ` ${match.toLowerCase()}`)
  .trim()
  .replace(/^./, (match) => match.toUpperCase())
  .replace(/_/g, " ");
