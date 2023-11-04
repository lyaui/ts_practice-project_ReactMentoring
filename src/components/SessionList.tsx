import SessionItem, { type Session } from '@/components/SessionItem';

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
