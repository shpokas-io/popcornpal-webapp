export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("token");
};
