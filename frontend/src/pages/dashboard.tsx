import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard(): JSX.Element | null {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>
    </div>
  );
}
