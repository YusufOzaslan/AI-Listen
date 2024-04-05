import { useAuth } from '@/hooks';
import { FC, ReactNode, useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

interface IProps {
  children: ReactNode;
}

const PersistLogin: FC<IProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, refresh } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <BarLoader color="#36D7B7" loading={isLoading} /> : children}</>;
};

export { PersistLogin };
