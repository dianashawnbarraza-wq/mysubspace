import { PasswordGate } from './components/PasswordGate'
import { useAppState } from './hooks/useAppState'
import { FeedScreen } from './components/FeedScreen'
import { GroupsScreen } from './components/GroupsScreen'
import { ProfileScreen } from './components/ProfileScreen'
import { MarketScreen } from './components/MarketScreen'
import { InviteStrip } from './components/InviteStrip'
import { Nav } from './components/Nav'
import { Toast } from './components/Toast'
import { Reactor } from './components/Reactor'
import { OnboardingOverlay } from './components/OnboardingOverlay'
import { MemberProfileOverlay } from './components/MemberProfileOverlay'
import { NotifPanel } from './components/NotifPanel'
import { SettingsPanel } from './components/SettingsPanel'
import { GroupSettingsOverlay } from './components/GroupSettingsOverlay'

export default function App() {
  const app = useAppState()

  return (
    <PasswordGate>
      <InviteStrip app={app} />
      <Nav app={app} />

      <main>
        <FeedScreen app={app} />
        <GroupsScreen app={app} />
        <ProfileScreen app={app} />
        <MarketScreen app={app} />
      </main>

      <OnboardingOverlay app={app} />
      <MemberProfileOverlay app={app} />
      <NotifPanel app={app} />
      <SettingsPanel app={app} />
      <GroupSettingsOverlay app={app} />
      <Reactor app={app} />
      <Toast message={app.toastMsg} />
    </PasswordGate>
  )
}
