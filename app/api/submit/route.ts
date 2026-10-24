import { supabaseRest } from '@/lib/supabase-rest';

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const payload = {
    title: clean(input.title),
    address: clean(input.address) || null,
    city: clean(input.city),
    state: clean(input.state),
    country: clean(input.country) || 'United States',
    location_type: clean(input.location_type),
    haunting_story: clean(input.haunting_story),
    source_url_1: clean(input.source_url_1) || null,
    source_url_2: clean(input.source_url_2) || null,
    source_url_3: clean(input.source_url_3) || null,
    submitter_name: clean(input.submitter_name) || null,
    submitter_email: clean(input.submitter_email) || null,
    permission_confirmed: input.permission_confirmed === true,
    status: 'Pending',
  };

  if (!payload.title || !payload.city || !payload.state || !payload.country || !payload.location_type) {
    return Response.json({ error: 'Please complete all required location fields.' }, { status: 400 });
  }
  if (payload.haunting_story.length < 20) {
    return Response.json({ error: 'Please provide a little more detail about the haunting.' }, { status: 400 });
  }
  if (!payload.permission_confirmed) {
    return Response.json({ error: 'You must confirm that Ghost Atlas may review this submission.' }, { status: 400 });
  }

  const response = await supabaseRest('haunted_location_submissions', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    return Response.json({ error: 'We could not submit this location right now.' }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
