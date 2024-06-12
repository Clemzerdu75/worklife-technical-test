import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ItemsList from "@/_components/items/itemsList";

import getItems from "@/app/api/getItems";
import styles from "./page.module.css";

export default async function Home() {
  const queryClient = new QueryClient();

  // Prefetch data on server side
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["items", ""],
    queryFn: ({ pageParam }) => getItems({ pageParam }),
    initialPageParam: 1,
  });

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ItemsList />
      </HydrationBoundary>
    </main>
  );
}
