export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export function validateName(name: string): ValidationResult {
  const cleaned = name.trim();
  if (!cleaned) {
    return { valid: false, message: 'Name is required.' };
  }

  if (cleaned.length < 2) {
    return { valid: false, message: 'Please enter a valid name.' };
  }

  return { valid: true };
}

export function validateEmail(email: string): ValidationResult {
  const cleaned = email.trim();
  if (!cleaned) {
    return { valid: false, message: 'Email is required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleaned)) {
    return { valid: false, message: 'Please provide a valid email address.' };
  }

  return { valid: true };
}

export function validatePhone(phone: string): ValidationResult {
  const normalized = phone.replace(/[^\d+]/g, '');
  if (!normalized) {
    return { valid: false, message: 'Phone number is required.' };
  }

  const digits = normalized.replace(/[^\d]/g, '');
  if (digits.length < 7 || digits.length > 15) {
    return { valid: false, message: 'Please provide a valid phone number.' };
  }

  return { valid: true };
}

export function isHoneypotEmpty(value?: string): boolean {
  return !value || value.trim().length === 0;
}
