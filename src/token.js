export default function() {
  let path = window.location.search.substr(1);
  let params = path.split('&');

  for(let i in params) {
    let [key, value] = params[i].split('=');
    if(key === 'hsid') {
      return value;
    }
  }
  return null;
}
