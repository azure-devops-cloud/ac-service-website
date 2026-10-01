import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const service = String(body.service ?? '').trim();
    const area = String(body.area ?? '').trim();
    const issue = String(body.issue ?? '').trim();

    if (name.length < 2 || name.length > 100 || phone.length < 7 || phone.length > 20 || service.length < 2 || service.length > 100 || area.length < 2 || area.length > 100) {
      return NextResponse.json({ error: 'Please provide valid booking details.' }, { status: 400 });
    }
    if (issue.length > 1000) {
      return NextResponse.json({ error: 'The issue description is too long.' }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from('service_bookings').insert({
      customer_name: name,
      phone,
      service,
      address: area,
      notes: issue || null,
    });

    if (error) {
      console.error('Booking insert failed:', error);
      return NextResponse.json({ error: 'We could not save your request. Please call or WhatsApp us.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking request failed:', error);
    return NextResponse.json({ error: 'Invalid request. Please try again.' }, { status: 400 });
  }
}
