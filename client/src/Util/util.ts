export const refreashTokenToCookies = (token: string) => {
  const date = new Date();
  date.setTime(date.getTime() + 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();

  document.cookie = `jwt=${token}${expires}; path=/`;
};

export const getTokenFromCookies = () => {
  const name = "jwt=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};
