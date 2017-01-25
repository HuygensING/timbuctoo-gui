const uniq = (accum, cur) => accum.indexOf(cur) < 0 ? accum.concat(cur) : accum;

export { uniq };