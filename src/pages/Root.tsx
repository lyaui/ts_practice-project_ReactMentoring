import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import SessionsProvider from '@/contexts/sessions-context';

export default function Root() {
  return (
    <SessionsProvider>
      <Header />
      <Outlet />
    </SessionsProvider>
  );
}
