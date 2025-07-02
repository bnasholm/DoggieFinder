export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const cleanParams = (rawParams: Record<string, unknown>) =>
  Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(rawParams).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0 && value.some(Boolean);
      return value !== "" && value !== null && value !== undefined;
    })
  );
