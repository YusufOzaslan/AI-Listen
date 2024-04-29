import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getContent, getQuestion } from '@/store/thunks';
import { useApi } from '@/hooks';
import { useAppDispatch, useAppSelector, } from '@/store';
import { resetQuestion } from '@/store/slices';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const appApi = useApi();

  const redirectToDialogueGeneratorPage = () => {
    router.push('/dialogue-generator');
  };

  useEffect(() => {
    const id = router.query.id as any;
    if (id) {
      dispatch(getContent({ axios: appApi, contentId: id }));
      dispatch(getQuestion({ axios: appApi, contentId: id }));
    }
    return () => {
      dispatch(resetQuestion());
    };
  }, []);

  return (
    <button onClick={redirectToDialogueGeneratorPage}>TEST</button>
  );
}
