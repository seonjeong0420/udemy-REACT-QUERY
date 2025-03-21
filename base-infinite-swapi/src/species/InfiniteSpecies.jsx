import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ["species-infinite"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  if (isLoading) return <div className="loading">Loading..</div>;

  return (
    <>
      {isFetching && <div className="loading">Data Fetching...</div>}
      <InfiniteScroll
        initialLoad={false}
        loadMore={() => {
          if (!isFetching) return fetchNextPage();
        }}
        hasMore={hasNextPage}
      >
        {data.pages.map((page) => {
          return page.results.map((param, idx) => <Species key={`${param.name}${idx}`} name={param.name} language={param.language} averageLifespan={param.average_lifespan} />);
        })}
      </InfiniteScroll>
    </>
  );
}
