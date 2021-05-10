import { ValidationError } from 'yup';

interface intfErrors {
  /** Declarado dessa maneira para ser utilizado por qualquer formulário */
  [key: string]: string;
}

export function getValidationErros(
  arrErrors: ValidationError,
): intfErrors {
  const validationErrors: intfErrors = {};

  arrErrors.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
