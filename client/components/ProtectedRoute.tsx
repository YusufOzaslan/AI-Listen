import { FC, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import SignInPage from '@/pages/auth/sign-in';

interface IProps {
    children: ReactNode;
}

const ProtectedRoute: FC<IProps> = ({ children }) => {
    const auth = useAuth();

    if (!auth.isAuthenticated)
        return <SignInPage />;

    return <>{children}</>;
};

export { ProtectedRoute };
