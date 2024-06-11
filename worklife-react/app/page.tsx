import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ItemsList from "@/_components/items/itemsList";

import getItems from "@/app/api/getItems";
import styles from "./page.module.css";

const search = "";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["items", search],
    queryFn: ({ pageParam }) => getItems({ pageParam, search }),
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
