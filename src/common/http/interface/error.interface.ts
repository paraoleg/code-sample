export interface IError {
  message: string;
  stack?: string;
  additionalData?: Record<string, any>;
}
