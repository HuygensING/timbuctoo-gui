const encode = (str: string) => encodeURI(str);
const decode = (uri: string) => decodeURI(uri);

export { encode, decode };