export const toggleMenu = () => {
  return { type: "TOGGLE_MENU" };
};

export const auth = token => {
  return { type: "AUTH", token };
};

export const logout = () => {
  return { type: "LOG_OUT" };
};
