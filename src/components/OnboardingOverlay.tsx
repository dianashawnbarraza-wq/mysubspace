import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'

export function OnboardingOverlay({ app }: { app: AppState }) {
  return (
    <div className={`overlay${app.showOnboarding ? ' show' : ''}`} id="onboarding">
      <div className="modal">
        <div className="step-dots">
          {[0, 1, 2, 3].map((d) => (
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
          <button className="btn btn-primary center-flex" disabled={!app.ageOk} onClick={() => app.obStep(1)}>Accept invite</button>
        </div>

        <div className={`modal-step${app.onboardingStep === 1 ? ' on' : ''}`}>
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
            You can add a photo and your dynamic(s) (later).
          </p>
          <button className="btn btn-primary center-flex" onClick={() => app.obStep(2)}>Continue</button>
        </div>

        <div className={`modal-step${app.onboardingStep === 2 ? ' on' : ''}`}>
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
          <button className="btn btn-primary center-flex" onClick={() => app.obStep(3)}>Got it</button>
        </div>

        <div className={`modal-step${app.onboardingStep === 3 ? ' on' : ''}`}>
          <h2 style={{ fontSize: 26 }}>You&apos;re in ✨</h2>
          <p className="sub">Welcome to Cruise LA. Explore other groups, add who you vibe with, and set your own boundaries as you go.</p>
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
