import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from '@/components/email-template';
import { resend } from '@/lib/resend';
import { rateLimiter, getClientIp } from '@/lib/rate-limit';

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const IP_LIMIT = 3;
const EMAIL_LIMIT = 3;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Message is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // 2. Rate Limiting
    const ip = getClientIp(req);
    const ipKey = `ip:${ip}`;
    const emailKey = `email:${email.toLowerCase().trim()}`;

    // Check IP Rate Limit
    const ipCheck = rateLimiter.check(ipKey, IP_LIMIT, WINDOW_MS);
    if (!ipCheck.success) {
      const retryAfterSeconds = Math.ceil((ipCheck.reset - Date.now()) / 1000);
      const res = NextResponse.json(
        {
          success: false,
          message: `Too many requests. Please wait ${Math.ceil(retryAfterSeconds / 60)} minutes before trying again.`,
        },
        { status: 429 }
      );
      res.headers.set('Retry-After', String(retryAfterSeconds));
      res.headers.set('X-RateLimit-Limit', String(IP_LIMIT));
      res.headers.set('X-RateLimit-Remaining', '0');
      res.headers.set('X-RateLimit-Reset', String(ipCheck.reset));
      return res;
    }

    // Check Email Rate Limit
    const emailCheck = rateLimiter.check(emailKey, EMAIL_LIMIT, WINDOW_MS);
    if (!emailCheck.success) {
      const retryAfterSeconds = Math.ceil((emailCheck.reset - Date.now()) / 1000);
      const res = NextResponse.json(
        {
          success: false,
          message: `Too many messages sent from this email address. Please wait ${Math.ceil(retryAfterSeconds / 60)} minutes.`,
        },
        { status: 429 }
      );
      res.headers.set('Retry-After', String(retryAfterSeconds));
      res.headers.set('X-RateLimit-Limit', String(EMAIL_LIMIT));
      res.headers.set('X-RateLimit-Remaining', '0');
      res.headers.set('X-RateLimit-Reset', String(emailCheck.reset));
      return res;
    }

    // 3. Send Email via Resend
    const { error } = await resend.emails.send({
      from: 'Sam <onboarding@resend.dev>',
      to: ['samjoe55555@gmail.com'],
      subject: `Message from Your Portfolio by ${name}`,
      react: EmailTemplate({ Email: email, Message: message }) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: `Something went wrong while sending email : ${error}` },
        { status: 501 }
      );
    }

    // Prepare success response with rate-limit remaining details
    const remaining = Math.min(ipCheck.remaining, emailCheck.remaining);
    const res = NextResponse.json(
      { success: true, message: 'I will get in touch with you soon :)' },
      { status: 200 }
    );
    res.headers.set('X-RateLimit-Limit', String(IP_LIMIT));
    res.headers.set('X-RateLimit-Remaining', String(remaining));
    return res;

  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Server error occurred : ${error}` },
      { status: 501 }
    );
  }
}
