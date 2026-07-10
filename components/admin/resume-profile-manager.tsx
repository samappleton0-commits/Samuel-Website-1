'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

import { createClient } from '@/lib/supabase-browser'

type ResumeProfile = {
  id: string
  full_name: string
  professional_title: string
  address: string
  email: string
  phone_one: string
  phone_two: string
  objective: string
}

type Props = {
  initialProfile: ResumeProfile
}

export default function ResumeProfileManager({
  initialProfile,
}: Props) {
  const supabase = createClient()

  const [profile, setProfile] = useState(initialProfile)

  const [saving, setSaving] = useState(false)

  const [message, setMessage] = useState('')

  function updateField(
    field: keyof ResumeProfile,
    value: string
  ) {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  async function saveProfile() {
    try {
      setSaving(true)
      setMessage('')

      const { error } = await supabase
        .from('resume_profile')
        .update({
          full_name: profile.full_name,
          professional_title: profile.professional_title,
          address: profile.address,
          email: profile.email,
          phone_one: profile.phone_one,
          phone_two: profile.phone_two,
          objective: profile.objective,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id)

      if (error) throw error

      setMessage('Resume updated successfully.')
    } catch (error) {
      console.error(error)
      setMessage('Unable to save changes.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 space-y-6">

      <Field
        label="Full Name"
        value={profile.full_name}
        onChange={(v) => updateField('full_name', v)}
      />

      <Field
        label="Professional Title"
        value={profile.professional_title}
        onChange={(v) => updateField('professional_title', v)}
      />

      <Field
        label="Address"
        value={profile.address}
        onChange={(v) => updateField('address', v)}
      />

      <Field
        label="Email"
        value={profile.email}
        onChange={(v) => updateField('email', v)}
      />

      <Field
        label="Phone Number"
        value={profile.phone_one}
        onChange={(v) => updateField('phone_one', v)}
      />

      <Field
        label="Second Phone Number"
        value={profile.phone_two}
        onChange={(v) => updateField('phone_two', v)}
      />

      <div>

        <label className="block text-sm font-medium">
          Career Objective
        </label>

        <textarea
          rows={6}
          value={profile.objective}
          onChange={(e) =>
            updateField('objective', e.target.value)
          }
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-border
            bg-background
            px-4
            py-3
            resize-none
          "
        />

      </div>

      <button
        onClick={saveProfile}
        disabled={saving}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-accent
          px-5
          py-3
          text-white
        "
      >
        <Save size={18} />

        {saving ? 'Saving...' : 'Save Changes'}
      </button>

      {message && (
        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      )}

    </div>
  )
}

type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

function Field({
  label,
  value,
  onChange,
}: FieldProps) {
  return (
    <div>

      <label className="block text-sm font-medium">
        {label}
      </label>

      <input
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="
          mt-2
          w-full
          rounded-xl
          border
          border-border
          bg-background
          px-4
          py-3
        "
      />

    </div>
  )
}