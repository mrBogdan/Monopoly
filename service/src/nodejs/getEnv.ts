export const isProduction = () => process.env.NODE_ENV === 'production';
export const isDevelopment = () => (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
export const isTest = () => process.env.NODE_ENV === 'test';

export const getEnv = (): string => {
  if (isDevelopment()) {
    return 'development';
  }

  if (isTest()) {
    return 'test';
  }

  if(isProduction()) {
    return 'production';
  }

  return 'development';
}
