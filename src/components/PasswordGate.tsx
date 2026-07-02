import { useState, type FormEvent } from 'react'

const STORAGE_KEY = 'mysubspace-auth'
const PASSWORD = import.meta.env.VITE_APP_PASSWORD

function isAuthed() {
  return sessionStorage.getItem(STORAGE_KEY) === '1'
}

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(() => !PASSWORD || isAuthed())
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  if (!PASSWORD || authed) return children

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div className="gate">
      <form className="gate-card" onSubmit={submit}>
        <div className="logo gate-logo">
          my<span>subspace</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: 10 }}>Preview access</p>
        <h1 className="gate-title">Enter password to continue</h1>
        <p className="gate-sub">This prototype is shared privately for feedback.</p>
        <input
          type="password"
          className={`gate-input${error ? ' err' : ''}`}
          placeholder="Password"
          value={value}
          autoFocus
          onChange={(e) => { setValue(e.target.value); setError(false) }}
        />
        {error && <p className="gate-err">Wrong password. Try again.</p>}
        <button type="submit" className="btn btn-primary gate-btn">Enter</button>
      </form>
    </div>
  )
}
