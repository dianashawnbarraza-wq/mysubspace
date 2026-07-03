import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'
import { formatPhoneDisplay, locationFromZip } from '../constants/location'

const STEPS = [0, 1, 2, 3, 4, 5, 6] as const

function ObInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
  maxLength?: number
}) {
  return (
    <label className="ob-field">
      <span className="ob-field-label">{label}</span>
      <input
        className="ob-field-input"
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

export function OnboardingOverlay({ app }: { app: AppState }) {
  const zipPreview = locationFromZip(app.zipCode)
  const phoneDigits = app.phone.replace(/\D/g, '')
  const zipOk = /^\d{5}$/.test(app.zipCode.replace(/\D/g, ''))
  const phoneOk = phoneDigits.length >= 10
  const codeOk = app.phoneCode.replace(/\D/g, '').length >= 4
  const handleOk = app.handle.trim().length >= 2

  return (
    <div className={`overlay${app.showOnboarding ? ' show' : ''}`} id="onboarding">
      <button type="button" className="ob-skip-demo" onClick={app.skipOnboardingDemo}>
        Skip this demo login →
      </button>
      <div className="modal">
        <div className="step-dots">
          {STEPS.map((d) => (
            <i key={d} className={app.onboardingStep >= d ? 'on' : ''} />
          ))}
        </div>

        <div className={`modal-step${app.onboardingStep === 0 ? ' on' : ''}`}>
          <h2>You&apos;ve been invited</h2>
          <p className="sub">Someone in the scene thinks you belong here.</p>
          <div className="invite-card">
            <div className="ic-av">I</div>
            <div>
              <div className="ic-name">Cruise LA</div>
              <div className="ic-sub">invited by @nocturne · 412 members</div>
            </div>
          </div>
          <div className="age-gate">
            <div className="ag-title">🔞 Adults only</div>
            <p>mysubspace is an 18+ community. You must confirm you are of legal age to continue. This is required.</p>
            <div className={`check-row${app.ageOk ? ' checked' : ''}`} onClick={app.toggleAge}>
              <div className="check-box">✓</div>
              <div className="ct">I confirm I am 18 years of age or older.</div>
            </div>
          </div>
          <button className="btn btn-primary center-flex" disabled={!app.ageOk} onClick={() => app.obStep(1)}>
            Accept invite
          </button>
        </div>

        <div className={`modal-step${app.onboardingStep === 1 ? ' on' : ''}`}>
          <h2>Where are you?</h2>
          <p className="sub">Your zip code helps us show what&apos;s happening near you.</p>
          <ObInput
            label="Zip code"
            value={app.zipCode}
            onChange={app.setZipCode}
            placeholder="90031"
            maxLength={5}
          />
          {zipOk && zipPreview.city !== 'your area' && (
            <p className="ob-loc-preview">Showing activity in <strong>{zipPreview.city}</strong></p>
          )}
          {zipPreview.idVerificationRequired && (
            <p className="ob-id-note">ID verification is required in your state. This prototype skips that step.</p>
          )}
          <button
            className="btn btn-primary center-flex"
            disabled={!zipOk}
            onClick={app.submitZip}
          >
            Continue
          </button>
        </div>

        <div className={`modal-step${app.onboardingStep === 2 ? ' on' : ''}`}>
          <h2>Your phone</h2>
          <p className="sub">We use this to keep bots out. No real verification in this prototype.</p>
          <ObInput
            label="Phone number"
            value={app.phone}
            onChange={app.setPhone}
            placeholder="(323) 555-0142"
            type="tel"
          />
          <button className="btn btn-primary center-flex" disabled={!phoneOk} onClick={() => app.obStep(3)}>
            Send code
          </button>
        </div>

        <div className={`modal-step${app.onboardingStep === 3 ? ' on' : ''}`}>
          <h2>Confirm your number</h2>
          <p className="sub">
            Enter the code we sent to {formatPhoneDisplay(app.phone)}. Any 4 digits work here.
          </p>
          <ObInput
            label="Verification code"
            value={app.phoneCode}
            onChange={app.setPhoneCode}
            placeholder="0000"
            maxLength={6}
          />
          <button className="btn btn-primary center-flex" disabled={!codeOk} onClick={() => app.obStep(4)}>
            Verify
          </button>
        </div>

        <div className={`modal-step${app.onboardingStep === 4 ? ' on' : ''}`}>
          <h2>Choose your name</h2>
          <div className="handle-input">
            <span>@</span>
            <input
              type="text"
              placeholder="yourname"
              value={app.handle}
              maxLength={20}
              onChange={(e) => app.setHandle(e.target.value)}
            />
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginBottom: 16 }}>
            You can add a photo and your dynamic(s) later.
          </p>
          <button className="btn btn-primary center-flex" disabled={!handleOk} onClick={() => app.obStep(5)}>
            Continue
          </button>
        </div>

        <div className={`modal-step${app.onboardingStep === 5 ? ' on' : ''}`}>
          <h2>Consent comes first</h2>
          <p className="sub">
            mysubspace is a consent-driven experience. You choose who can flirt with you, message you,
            and send photos — and you can revoke that access anytime. Nothing happens without your yes.
          </p>
          <div className="ob-consent-list">
            <div className="ob-consent-row"><span>👋</span> Flirt on your terms</div>
            <div className="ob-consent-row"><span>💬</span> Message who you allow</div>
            <div className="ob-consent-row"><span>📷</span> Photos only when you say so</div>
          </div>
          <p className="ob-tagline">Keep it hot. Stay in control.</p>
          <button className="btn btn-primary center-flex" onClick={() => app.obStep(6)}>Got it</button>
        </div>

        <div className={`modal-step${app.onboardingStep === 6 ? ' on' : ''}`}>
          <h2 style={{ fontSize: 26 }}>You&apos;re in ✨</h2>
          <p className="sub">
            Welcome to the scene in {app.locationCity}. Explore groups, connect with locals, and set your boundaries as you go.
          </p>
          <div className="invite-card" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', gap: 6 }}>
            <div className="ic-av" style={{ width: 56, height: 56, fontSize: 24 }}>{ME.initial}</div>
            <div className="ic-name">@{app.handle}</div>
            <div className="ic-sub"><span className="online" /> you control who can reach you</div>
          </div>
          <button className="btn btn-primary center-flex" onClick={app.finishOnboarding}>Start exploring</button>
        </div>
      </div>
    </div>
  )
}
