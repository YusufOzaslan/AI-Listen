import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const redirectToDialogueGeneratorPage = () => {
    router.push('/dialogue-generator');
  };

  return (
    <button onClick={redirectToDialogueGeneratorPage}>Go to dialogue generator page</button>
  );
}
