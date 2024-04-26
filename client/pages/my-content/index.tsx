import { useRouter } from 'next/router';

export default function MyContent() {
  const router = useRouter();

  const redirectToDialogueGeneratorPage = () => {
    router.push('/dialogue-generator');
  };

  return (
    <button onClick={redirectToDialogueGeneratorPage}>Diyalog Üreteci Sayfasına Git</button>
  );
}
