import type { NextPage } from 'next';
import useSWR, { SWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';
import Card from '../components/card';
import CardList from '../components/cardList';
import PopularMakeList from '../components/popularMakeList';
import styles from '../styles/Home.module.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 24;
const API = `https://api.staging.myautochek.com/v1/inventory/car/search`;

export async function getServerSideProps() {
  const api = await fetcher(API);
  return {
    props: {
      fallback: {
        [API]: api,
      },
    },
  };
}
const CarList = () => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `https://api.staging.myautochek.com/v1/inventory/car/search?per_page=${PAGE_SIZE}&page=${
        index + 1
      }`,
    fetcher
  );

  const cars =
    data && data[0].result ? [].concat(data && data[0 && data[0]].result) : [];
  const isLoadingInitialData = data && !data[0].result && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data && data[0].result?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data[0].length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data[0].length === size;

  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        <CardList cards={cars} cols={3} />
        <p>
          showing {size} page(s) of{' '}
          {isLoadingMore ? '...' : data && data[0].result.length} car(s){' '}
          <button
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}>
            {isLoadingMore
              ? 'loading...'
              : isReachingEnd
              ? 'no more cars'
              : 'load more'}
          </button>
        </p>
        {isEmpty ? <p>Yay, no cars found.</p> : null}
      </main>
      <aside className={styles.aside}>
        <PopularMakeList />
      </aside>
    </div>
  );
};

export default function Home({ fallback }: any) {
  return (
    <SWRConfig value={{ fallback }}>
      <CarList />
    </SWRConfig>
  );
}
