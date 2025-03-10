// app/api/send/route.ts
import { NextResponse } from 'next/server';
import { EmailTemplate } from '@/app/_components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log('API called');

    const body = await request.json();

    if (!body.emailToSend || !body.userName || !body.fileName || !body.fileSize || !body.fileType || !body.shortUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Acme <narendra@resend.dev>',
      to: [body.emailToSend],
      subject: `File Shared: ${body.fileName}`,
      react: EmailTemplate({
        firstName: body.userName,
        fileName: body.fileName,
        fileSize: body.fileSize,
        fileType: body.fileType,
        shortUrl: body.shortUrl,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
