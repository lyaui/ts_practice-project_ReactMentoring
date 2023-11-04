import { SESSIONS } from '../dummy-sessions.ts'; // normally, we would probably load that from a server
import SessionList, { type SessionListProps } from '@/components/SessionList';

export default function SessionsPage() {
  const listProps: SessionListProps = { sessions: SESSIONS };
  return (
    <main id='sessions-page'>
      <header>
        <h2>Available mentoring sessions</h2>
        <p>
          From an one-on-one introduction to React's basics all the way up to a
          deep dive into state mechanics - we got just the right session for
          you!
        </p>
      </header>
      <SessionList {...listProps} />
    </main>
  );
}
