import type { AppState } from '../hooks/useAppState'
import {
  INTEREST_FILTERS,
  LOCAL_PEOPLE,
  LOCATION_FILTERS,
  LOOKING_FILTERS,
  PREFERENCE_FILTERS,
  filterLocalPeople,
} from '../constants/people'

function MultiFilterRow({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: readonly string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="people-filter-row">
      <span className="people-filter-label">{label}</span>
      <div className="people-chips">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`people-chip${selected.includes(opt) ? ' on' : ''}`}
            onClick={() => onToggle(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export function PeopleScreen({ app }: { app: AppState }) {
  const results = filterLocalPeople(LOCAL_PEOPLE, {
    query: app.peopleSearch,
    locations: app.peopleLocations,
    interests: app.peopleInterests,
    lookingFor: app.peopleLooking,
    preferences: app.peoplePreferences,
  })

  const hasFilters =
    app.peopleLocations.length > 0 ||
    app.peopleInterests.length > 0 ||
    app.peopleLooking.length > 0 ||
    app.peoplePreferences.length > 0

  const presetInterests = new Set<string>(INTEREST_FILTERS)
  const customInterestTags = app.peopleInterests.filter((i) => !presetInterests.has(i))

  return (
    <section className={`screen${app.screen === 'people' ? ' active' : ''}`} id="people">
      <div className="hero">
        <p className="eyebrow">Connect locally</p>
        <h1>
          People in <em>{app.locationCity}</em>
        </h1>
        <p className="hero-sub">Search usernames and stack filters to find your people.</p>
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

        <div className="people-filter-strip">
          <MultiFilterRow
            label="Location"
            options={LOCATION_FILTERS}
            selected={app.peopleLocations}
            onToggle={app.togglePeopleLocation}
          />
          <MultiFilterRow
            label="Looking for"
            options={LOOKING_FILTERS}
            selected={app.peopleLooking}
            onToggle={app.togglePeopleLooking}
          />
          <MultiFilterRow
            label="Interests"
            options={INTEREST_FILTERS}
            selected={app.peopleInterests}
            onToggle={app.togglePeopleInterest}
          />
          <MultiFilterRow
            label="Preference"
            options={PREFERENCE_FILTERS}
            selected={app.peoplePreferences}
            onToggle={app.togglePeoplePreference}
          />
        </div>

        <div className="people-custom-interest">
          <input
            type="text"
            placeholder="Add your own interest filter"
            value={app.customPeopleInterest}
            onChange={(e) => app.setCustomPeopleInterest(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && app.addCustomPeopleInterest()}
          />
          <button type="button" className="btn btn-ghost" onClick={app.addCustomPeopleInterest}>
            Add
          </button>
        </div>

        {customInterestTags.length > 0 && (
          <div className="people-custom-chips">
            {customInterestTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="people-chip on"
                onClick={() => app.togglePeopleInterest(tag)}
              >
                {tag} ✕
              </button>
            ))}
          </div>
        )}

        <div className="people-results-head">
          <span>
            {results.length} profile{results.length === 1 ? '' : 's'}
            {hasFilters || app.peopleSearch ? ' matching' : ' nearby'}
          </span>
          {hasFilters && (
            <button type="button" className="people-clear-filters" onClick={app.clearPeopleFilters}>
              Clear filters
            </button>
          )}
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
                    {person.dyn} · {person.loc}
                    {person.sexuality && ` · ${person.sexuality}`}
                  </div>
                  <div className="people-tags">
                    {person.interests?.slice(0, 4).map((tag) => (
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
