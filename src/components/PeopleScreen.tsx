import type { AppState } from '../hooks/useAppState'
import {
  INTEREST_FILTERS,
  LOCAL_PEOPLE,
  LOOKING_FILTERS,
  PREFERENCE_FILTERS,
  filterLocalPeople,
} from '../constants/people'

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="people-filter">
      <span className="people-filter-label">{label}</span>
      <div className="people-chips">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`people-chip${value === opt ? ' on' : ''}`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export function PeopleScreen({ app }: { app: AppState }) {
  const results = filterLocalPeople(
    LOCAL_PEOPLE,
    app.peopleInterest,
    app.peopleLooking,
    app.peoplePreference,
  )

  return (
    <section className={`screen${app.screen === 'people' ? ' active' : ''}`} id="people">
      <div className="hero">
        <p className="eyebrow">Connect locally</p>
        <h1>
          People in <em>{app.locationCity}</em>
        </h1>
        <p className="hero-sub">Search by interests, what they&apos;re looking for, and sexual preference.</p>
      </div>

      <div className="card people-panel">
        <FilterRow
          label="Interests"
          options={INTEREST_FILTERS}
          value={app.peopleInterest}
          onChange={(v) => app.setPeopleInterest(v as typeof app.peopleInterest)}
        />
        <FilterRow
          label="Looking for"
          options={LOOKING_FILTERS}
          value={app.peopleLooking}
          onChange={(v) => app.setPeopleLooking(v as typeof app.peopleLooking)}
        />
        <FilterRow
          label="Sexual preference"
          options={PREFERENCE_FILTERS}
          value={app.peoplePreference}
          onChange={(v) => app.setPeoplePreference(v as typeof app.peoplePreference)}
        />

        <div className="people-results-head">
          <span>{results.length} profile{results.length === 1 ? '' : 's'} nearby</span>
        </div>

        {results.length === 0 ? (
          <p className="people-empty">No matches with those filters. Try broadening your search.</p>
        ) : (
          results.map((person) => (
            <div key={person.name} className="people-row">
              <div
                className="people-av"
                style={{ background: `linear-gradient(${person.grad})` }}
                onClick={() => app.openMember(person)}
              >
                {person.initial}
              </div>
              <div className="people-info" onClick={() => app.openMember(person)}>
                <div className="people-name">{person.name}</div>
                <div className="people-sub">
                  {person.dyn} · {person.loc}
                  {person.sexuality && ` · ${person.sexuality}`}
                </div>
                <div className="people-tags">
                  {person.interests?.slice(0, 3).map((tag) => (
                    <span key={tag} className="pill">{tag}</span>
                  ))}
                </div>
              </div>
              <button type="button" className="btn btn-aqua people-btn" onClick={() => app.openMember(person)}>
                View
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
