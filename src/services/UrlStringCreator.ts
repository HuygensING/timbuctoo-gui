// TODO: enhance this to make strings in url more readable
const encode = (str: string) => encodeURIComponent(str);
const decode = (uri: string) => decodeURIComponent(uri);

export { encode, decode };
