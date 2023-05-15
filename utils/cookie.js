import { fetchApi } from "./fetch";

export const setCookie = (name, token) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  const cookieOptions = {
    expires: expirationDate.toUTCString(),
    path: "/",
  };

  const encodedCookieValue = encodeURIComponent(token);
  const cookieString = `${name}=${encodedCookieValue}; ${Object.entries(
    cookieOptions
  )
    .map(([key, value]) => `${key}=${value}`)
    .join("; ")}`;

  document.cookie = cookieString;
};

export const getCookie = (name) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (cookieValue) {
    return cookieValue.split("=")[1];
  }

  return null;
};

export const getLoginCookie = async (name) => {
  try {
    const myCookie = getCookie(name);
    if (!myCookie) {
      return null;
    }
    const [newToken] = await Promise.all([
      fetchApi.post("/auth/refresh/token", {
        refreshToken: myCookie,
      }),
    ]);
    setCookie(name, newToken.data.data.refreshToken);
    return newToken.data.data.accessToken;
  } catch (error) {
    deleteCookie(name);
    console.error(error);
    return null;
  }
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
