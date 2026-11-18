'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { EVENT_TYPES } from '@/lib/events';

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toLocaleDateString('en-CA');
};

function validate(v) {
  const e = {};
  if (v.title.trim().length < 5) e.title = 'Title must be at least 5 characters';
  if (!EVENT_TYPES.includes(v.type)) e.type = 'Please choose an event type';
  if (!/^https?:\/\/.+/i.test(v.thumbnail.trim())) e.thumbnail = 'Enter a valid image URL starting with http or https';
  if (v.location.trim().length < 3) e.location = 'Location is required';
  if (!v.eventDate) e.eventDate = 'Please pick a date';
  else if (v.eventDate < tomorrow()) e.eventDate = 'Event date must be in the future';
  if (v.description.trim().length < 20) e.description = 'Description must be at least 20 characters';
  return e;
}

export default function EventForm({ initial, onSubmit, submitLabel }) {
  const [values, setValues] = useState({
    title: initial?.title || '',
    type: initial?.type || '',
    thumbnail: initial?.thumbnail || '',
    location: initial?.location || '',
    eventDate: initial?.eventDate || '',
    description: initial?.description || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const change = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = Object.values(errs)[0];
    if (first) return toast.error(first);

    setLoading(true);
    try {
      await onSubmit({
        ...values,
        title: values.title.trim(),
        thumbnail: values.thumbnail.trim(),
        location: values.location.trim(),
        description: values.description.trim(),
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const Field = ({ label, name, children }) => (
    <label className="form-control w-full">
      <span className="label-text font-semibold mb-1 block">{label}</span>
      {children}
      {errors[name] && <span className="text-error text-sm mt-1 block">{errors[name]}</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <Field label="Event title" name="title">
          <input name="title" value={values.title} onChange={change} placeholder="Winter Clothes Distribution" className="input input-bordered w-full" />
        </Field>
      </div>

      <Field label="Event type" name="type">
        <select name="type" value={values.type} onChange={change} className="select select-bordered w-full">
          <option value="">Select a type</option>
          {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>

      <Field label="Event date" name="eventDate">
        <input type="date" name="eventDate" min={tomorrow()} value={values.eventDate} onChange={change} className="input input-bordered w-full" />
      </Field>

      <Field label="Thumbnail image URL" name="thumbnail">
        <input name="thumbnail" value={values.thumbnail} onChange={change} placeholder="https://example.com/photo.jpg" className="input input-bordered w-full" />
      </Field>

      <Field label="Location" name="location">
        <input name="location" value={values.location} onChange={change} placeholder="Mirpur 10, Dhaka" className="input input-bordered w-full" />
      </Field>

      <div className="md:col-span-2">
        <Field label="Description" name="description">
          <textarea name="description" value={values.description} onChange={change} rows={5} placeholder="Tell volunteers what the event is about, what to bring and where to meet." className="textarea textarea-bordered w-full" />
        </Field>
      </div>

      <div className="md:col-span-2">
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner"></span> : submitLabel}
        </button>
      </div>
    </form>
  );
}