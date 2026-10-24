'use client';

import { FormEvent, useState } from 'react';

const initial = {
  title: '', address: '', city: '', state: '', country: 'United States',
  location_type: '', haunting_story: '', source_url_1: '', source_url_2: '', source_url_3: '',
  submitter_name: '', submitter_email: '', permission_confirmed: false,
};

export default function SubmitPage() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function setField(name: string, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Submission failed.');
      setMessage('Thank you! Your location has been submitted to Ghost Atlas for review.');
      setForm(initial);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'We could not submit this location right now.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="app-page">
      <section className="page-hero compact-hero">
        <p className="eyebrow">HELP GROW THE ATLAS</p>
        <h1>Submit a Haunted Location</h1>
        <p>Know a place with a haunting story we should investigate? Send it our way.</p>
      </section>

      <section className="content-shell form-shell">
        <form className="panel submission-form" onSubmit={submit}>
          <div className="form-grid">
            <Field label="Location name" required value={form.title} onChange={(v) => setField('title', v)} />
            <Field label="Location type" required placeholder="Hotel, cemetery, house..." value={form.location_type} onChange={(v) => setField('location_type', v)} />
            <Field label="Address" value={form.address} onChange={(v) => setField('address', v)} />
            <Field label="City" required value={form.city} onChange={(v) => setField('city', v)} />
            <Field label="State / Region" required value={form.state} onChange={(v) => setField('state', v)} />
            <Field label="Country" required value={form.country} onChange={(v) => setField('country', v)} />
          </div>

          <label className="full-field">
            <span>Haunting story <b>*</b></span>
            <textarea required minLength={20} rows={8} value={form.haunting_story} onChange={(e) => setField('haunting_story', e.target.value)} placeholder="Tell us what is reported here, who or what is said to haunt it, and any useful history you know." />
          </label>

          <div className="form-grid">
            <Field type="url" label="Source link 1" value={form.source_url_1} onChange={(v) => setField('source_url_1', v)} />
            <Field type="url" label="Source link 2" value={form.source_url_2} onChange={(v) => setField('source_url_2', v)} />
            <Field type="url" label="Source link 3" value={form.source_url_3} onChange={(v) => setField('source_url_3', v)} />
            <Field label="Your name" value={form.submitter_name} onChange={(v) => setField('submitter_name', v)} />
            <Field type="email" label="Your email" value={form.submitter_email} onChange={(v) => setField('submitter_email', v)} />
          </div>

          <label className="checkbox-field">
            <input type="checkbox" required checked={form.permission_confirmed} onChange={(e) => setField('permission_confirmed', e.target.checked)} />
            <span>I confirm that Ghost Atlas may review this information and use it to create or update a location entry.</span>
          </label>

          <p className="form-disclaimer">Submissions are reviewed before publication. Please do not submit private personal information, instructions to trespass, or claims presented as proven fact when they are folklore or reported paranormal experiences.</p>

          <button className="primary-button submit-button" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit Location'}</button>
          {message && <div className="form-message" role="status">{message}</div>}
        </form>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, required = false, placeholder = '', type = 'text' }: {
  label: string; value: string; onChange: (value: string) => void; required?: boolean; placeholder?: string; type?: string;
}) {
  return (
    <label className="form-field">
      <span>{label} {required && <b>*</b>}</span>
      <input type={type} required={required} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
