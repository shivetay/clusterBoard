export type TAppErrorSource = 'backend' | 'clerk' | 'cloudflare' | 'unknown';

export type TAppErrorDetail = {
  code?: string;
  message: string;
  longMessage?: string;
};

export type TParsedAppError = {
  source: TAppErrorSource;
  message: string;
  translationKey?: string;
  details?: TAppErrorDetail[];
  raw: unknown;
};

export class AppError extends Error implements TParsedAppError {
  source: TAppErrorSource;
  translationKey?: string;
  details?: TAppErrorDetail[];
  raw: unknown;

  constructor({
    source,
    message,
    translationKey,
    details,
    raw,
  }: TParsedAppError) {
    super(message);
    this.name = 'AppError';
    this.source = source;
    this.translationKey = translationKey;
    this.details = details;
    this.raw = raw;
  }
}
