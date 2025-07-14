import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from '@/components/email-template';
import { resend } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address format.' },
        { status: 400 }
      );
    }

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

    return NextResponse.json(
      { success: true, message: 'I will get in touch with you soon :)' },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Server error occurred : ${error}` },
      { status: 501 }
    );
  }
}
