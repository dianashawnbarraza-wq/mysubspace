import { useState } from 'react'
import type { AppState } from '../hooks/useAppState'
import {
  DISTANCE_FILTERS,
  INTEREST_FILTERS,
  LOCAL_PEOPLE,
  LOOKING_FILTERS,
  PREFERENCE_FILTERS,
  filterLocalPeople,
} from '../constants/people'

function FilterSection({
  title,
  options,
  selected,
  onToggle,
  open,
  onOpen,
}: {
  title: string
  options: readonly string[]
  selected: string[]
  onToggle: (value: string) => void
  open: boolean
  onOpen: () => void
}) {
  return (
    <div className={`pf-section${open ? ' open' : ''}`}>
      <button type="button" className="pf-section-head" onClick={onOpen}>
        <span>{title}</span>
        {selected.length > 0 && <span className="pf-count">{selected.length}</span>}
        <span className="pf-chevron">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="pf-options">
          {options.map((opt) => (
            <label key={opt} className={`pf-option${selected.includes(opt) ? ' on' : ''}`}>
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function DistanceFilterSection({
  value,
  onChange,
  open,
  onOpen,
}: {
  value: number | null
  onChange: (miles: number | null) => void
  open: boolean
  onOpen: () => void
}) {
  return (
    <div className={`pf-section${open ? ' open' : ''}`}>
      <button type="button" className="pf-section-head" onClick={onOpen}>
        <span>Distance</span>
        {value != null && <span className="pf-count">1</span>}
        <span className="pf-chevron">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="pf-options">
          {DISTANCE_FILTERS.map(({ label, miles }) => (
            <label key={miles} className={`pf-option${value === miles ? ' on' : ''}`}>
              <input
                type="radio"
                name="people-distance"
                checked={value === miles}
                onChange={() => onChange(value === miles ? null : miles)}
              />
              <span>Within {label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export function PeopleScreen({ app }: { app: AppState }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)

  const results = filterLocalPeople(LOCAL_PEOPLE, {
    query: app.peopleSearch,
    maxDistanceMiles: app.peopleMaxDistance,
    interests: app.peopleInterests,
    lookingFor: app.peopleLooking,
    preferences: app.peoplePreferences,
  })

  const filterCount =
    (app.peopleMaxDistance != null ? 1 : 0) +
    app.peopleInterests.length +
    app.peopleLooking.length +
    app.peoplePreferences.length

  const hasFilters = filterCount > 0

  const presetInterestSet = new Set<string>(INTEREST_FILTERS)
  const presetInterestsSelected = app.peopleInterests.filter((i) => presetInterestSet.has(i))

  const distanceLabel =
    app.peopleMaxDistance != null
      ? `Within ${DISTANCE_FILTERS.find((d) => d.miles === app.peopleMaxDistance)?.label ?? `${app.peopleMaxDistance} mi`}`
      : null

  const activeTags = [
    ...(distanceLabel ? [{ kind: 'distance' as const, value: distanceLabel }] : []),
    ...app.peopleLooking.map((v) => ({ kind: 'looking' as const, value: v })),
    ...app.peopleInterests.map((v) => ({ kind: 'interest' as const, value: v })),
    ...app.peoplePreferences.map((v) => ({ kind: 'pref' as const, value: v })),
  ]

  const removeTag = (kind: string, value: string) => {
    if (kind === 'distance') app.setPeopleDistance(null)
    else if (kind === 'looking') app.togglePeopleLooking(value)
    else if (kind === 'interest') app.togglePeopleInterest(value)
    else app.togglePeoplePreference(value)
  }

  return (
    <section className={`screen${app.screen === 'people' ? ' active' : ''}`} id="people">
      <div className="hero">
        <p className="eyebrow">Connect locally</p>
        <h1>
          People in <em>{app.locationCity}</em>
        </h1>
        <p className="hero-sub">Search usernames and refine with filters when you need to.</p>
      </div>

      <div className="card people-panel">
        <div className="people-search">
          <span className="people-search-at">@</span>
          <input
            type="search"
            className="people-search-input"
            placeholder="Search usernames"
            value={app.peopleSearch}
            onChange={(e) => app.setPeopleSearch(e.target.value)}
          />
          {app.peopleSearch && (
            <button type="button" className="people-search-clear" onClick={() => app.setPeopleSearch('')}>
              ✕
            </button>
          )}
        </div>

        {app.peopleRecentSearches.length > 0 && (
          <div className="people-recent">
            <div className="people-recent-head">
              <span>Recently searched</span>
            </div>
            <div className="people-recent-list">
              {app.peopleRecentSearches.map((person) => (
                <div key={person.name} className="people-recent-chip">
                  <button type="button" onClick={() => app.openMemberFromPeople(person)}>
                    @{person.name}
                  </button>
                  <button
                    type="button"
                    className="people-recent-dismiss"
                    aria-label={`Remove @${person.name} from recent searches`}
                    onClick={() => app.dismissRecentPeopleSearch(person.name)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pf-toolbar">
          <button
            type="button"
            className={`btn btn-ghost pf-toggle${filtersOpen ? ' on' : ''}`}
            onClick={() => setFiltersOpen((v) => !v)}
          >
            Filters{filterCount > 0 ? ` (${filterCount})` : ''}
            <span className="pf-toggle-chevron">{filtersOpen ? '▴' : '▾'}</span>
          </button>
          {hasFilters && (
            <button type="button" className="people-clear-filters" onClick={app.clearPeopleFilters}>
              Clear all
            </button>
          )}
        </div>

        {hasFilters && !filtersOpen && (
          <div className="pf-active">
            {activeTags.map(({ kind, value }) => (
              <button
                key={`${kind}-${value}`}
                type="button"
                className="pf-active-chip"
                onClick={() => removeTag(kind, value)}
              >
                {value} ✕
              </button>
            ))}
          </div>
        )}

        {filtersOpen && (
          <div className="pf-panel">
            <DistanceFilterSection
              value={app.peopleMaxDistance}
              onChange={app.setPeopleDistance}
              open={openSection === 'distance'}
              onOpen={() => setOpenSection((s) => (s === 'distance' ? null : 'distance'))}
            />
            <FilterSection
              title="Looking for"
              options={LOOKING_FILTERS}
              selected={app.peopleLooking}
              onToggle={app.togglePeopleLooking}
              open={openSection === 'looking'}
              onOpen={() => setOpenSection((s) => (s === 'looking' ? null : 'looking'))}
            />
            <FilterSection
              title="Interests"
              options={INTEREST_FILTERS}
              selected={presetInterestsSelected}
              onToggle={app.togglePeopleInterest}
              open={openSection === 'interests'}
              onOpen={() => setOpenSection((s) => (s === 'interests' ? null : 'interests'))}
            />
            <FilterSection
              title="Sexual preference"
              options={PREFERENCE_FILTERS}
              selected={app.peoplePreferences}
              onToggle={app.togglePeoplePreference}
              open={openSection === 'preference'}
              onOpen={() => setOpenSection((s) => (s === 'preference' ? null : 'preference'))}
            />
            <div className="pf-custom">
              <label className="pf-custom-label" htmlFor="custom-interest">Custom interest</label>
              <div className="pf-custom-row">
                <input
                  id="custom-interest"
                  type="text"
                  placeholder="e.g. bratting, protocol…"
                  value={app.customPeopleInterest}
                  onChange={(e) => app.setCustomPeopleInterest(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && app.addCustomPeopleInterest()}
                />
                <button type="button" className="btn btn-aqua" onClick={app.addCustomPeopleInterest}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="people-results-head">
          <span>
            {results.length} profile{results.length === 1 ? '' : 's'}
            {hasFilters || app.peopleSearch ? ' matching' : ' nearby'}
          </span>
        </div>

        {results.length === 0 ? (
          <p className="people-empty">No matches with those filters. Try broadening your search.</p>
        ) : (
          <div className="people-results">
            {results.map((person) => (
              <div key={person.name} className="people-row">
                <div
                  className="people-av"
                  style={{ background: `linear-gradient(${person.grad})` }}
                  onClick={() => app.openMemberFromPeople(person)}
                >
                  {person.initial}
                </div>
                <div className="people-info" onClick={() => app.openMemberFromPeople(person)}>
                  <div className="people-name">@{person.name}</div>
                  <div className="people-sub">
                    {person.distanceMiles != null ? `${person.distanceMiles} mi · ` : ''}
                    {person.dyn} · {person.loc}
                    {person.sexuality && ` · ${person.sexuality}`}
                  </div>
                  <div className="people-tags">
                    {person.interests?.slice(0, 3).map((tag) => (
                      <span key={tag} className="pill">{tag}</span>
                    ))}
                  </div>
                </div>
                <button type="button" className="btn btn-aqua people-btn" onClick={() => app.openMemberFromPeople(person)}>
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
