export type FormError = {
  message?: string;
  errors: {
    [key: string]: string;
  };
};
