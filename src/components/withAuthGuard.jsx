import { AuthGuard } from '@/context/auth-guard';

export const withAuthGuard = (Component) => (props) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);