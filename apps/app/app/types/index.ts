export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  captchaToken?: string;
  botField?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}