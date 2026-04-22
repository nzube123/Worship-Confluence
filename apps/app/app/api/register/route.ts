import { NextRequest, NextResponse } from 'next/server';
import { RegisterFormData, ApiResponse } from '@/app/types';
import { validateName, validateEmail, validatePhone, isHoneypotEmpty } from '@/app/lib/validation';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body: RegisterFormData = await request.json();
    const { name, email, phone, botField, captchaToken } = body;

    // Basic required field validation
    const nameValidation = validateName(name ?? '');
    if (!nameValidation.valid) {
      return NextResponse.json({ success: false, message: nameValidation.message ?? 'Name is required.' }, { status: 400 });
    }

    const emailValidation = validateEmail(email ?? '');
    if (!emailValidation.valid) {
      return NextResponse.json({ success: false, message: emailValidation.message ?? 'Please provide a valid email address.' }, { status: 400 });
    }

    const phoneValidation = validatePhone(phone ?? '');
    if (!phoneValidation.valid) {
      return NextResponse.json({ success: false, message: phoneValidation.message ?? 'Please provide a valid phone number.' }, { status: 400 });
    }

    // Honeypot spam protection
    if (!isHoneypotEmpty(botField)) {
      return NextResponse.json({ success: false, message: 'Spam detected. Submission rejected.' }, { status: 400 });
    }

    // Optional CAPTCHA verification if server-side secret is configured
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      if (!captchaToken) {
        return NextResponse.json({ success: false, message: 'CAPTCHA verification missing.' }, { status: 400 });
      }

      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ secret: recaptchaSecret, response: captchaToken }),
      });

      const recaptchaJson = await recaptchaResponse.json();
      if (!recaptchaJson.success) {
        console.error('reCAPTCHA verification failed', recaptchaJson);
        return NextResponse.json({ success: false, message: 'CAPTCHA verification failed. Please try again.' }, { status: 400 });
      }
    }

    // Submit to Google Forms
    const GOOGLE_FORM_URL = process.env.GOOGLE_FORM_URL;
    const NAME_ENTRY_ID = process.env.GOOGLE_FORM_NAME_ENTRY_ID;
    const EMAIL_ENTRY_ID = process.env.GOOGLE_FORM_EMAIL_ENTRY_ID;
    const PHONE_ENTRY_ID = process.env.GOOGLE_FORM_PHONE_ENTRY_ID;

    if (!GOOGLE_FORM_URL || !NAME_ENTRY_ID || !EMAIL_ENTRY_ID || !PHONE_ENTRY_ID) {
      console.error('Google Forms configuration missing');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error. Please contact support.'
        },
        { status: 500 }
      );
    }

    const GOOGLE_FORM_DATA = new URLSearchParams({
      [`entry.${NAME_ENTRY_ID}`]: name,
      [`entry.${EMAIL_ENTRY_ID}`]: email,
      [`entry.${PHONE_ENTRY_ID}`]: phone,
    });

    try {
      const googleResponse = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: GOOGLE_FORM_DATA.toString(),
      });

      if (!googleResponse.ok) {
        throw new Error(`Google Forms submission failed: ${googleResponse.status}`);
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Registration submitted successfully!'
        },
        { status: 200 }
      );

    } catch (googleError) {
      console.error('Google Forms submission error:', googleError);
      return NextResponse.json(
        {
          success: false,
          message: 'Registration saved locally, but there was an issue with external storage. Please try again or contact support.'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your registration. Please try again.'
      },
      { status: 500 }
    );
  }
}