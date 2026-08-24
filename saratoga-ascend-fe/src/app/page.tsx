import { HomeTemplate } from '@/components/templates';
import { getHomePage } from '@/lib/services';

export default async function Home() {
  const result = await getHomePage();
  const homeData = result.data ?? undefined;

  return <HomeTemplate homeData={homeData} />;
}
