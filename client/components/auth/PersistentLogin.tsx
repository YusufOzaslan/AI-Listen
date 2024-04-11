import { useAuth } from '@/hooks';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

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

  return (
    <>
      {isLoading ? (
        <Center h="100vh">
          <Spinner size="xl" color="blue.400" />
        </Center>
      ) : (
        children
      )}
    </>
  );
};

export { PersistLogin };
