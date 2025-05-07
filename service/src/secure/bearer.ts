export const bearer = (token: string) => {
  return `Bearer ${token}`;
};

export const getBearer = (token?: string) => {
  if (token?.startsWith('Bearer ')) {
    return token.slice(7);
  }
  return token;
}
