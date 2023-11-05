import SessionItem from '@/components/SessionItem';
import { type Session } from '@/contexts/sessions-context';

export interface SessionListProps {
  sessions: Session[];
}

function SessionList({ sessions = [] }: SessionListProps) {
  return (
    <div id='sessions-list'>
      {sessions.map((_session) => (
        <SessionItem key={_session.id} {..._session} />
      ))}
    </div>
  );
}

export default SessionList;
