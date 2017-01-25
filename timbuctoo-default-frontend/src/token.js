export default function() {
  let path = window.location.search.substr(1);
  let params = path.split('&');

  for(let i in params) {
    let [key, value] = params[i].split('=');
    if(key === 'hsid') {
      localStorage.setItem("token", value);
      location.href = window.location.href.replace("hsid=" + value, "");
      return undefined;
    }
  }
  return localStorage.getItem("token") || null;
}