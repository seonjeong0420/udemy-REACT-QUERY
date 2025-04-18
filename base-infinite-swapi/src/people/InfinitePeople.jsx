import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  if (isLoading) {
    return <div className="loading">Loading..</div>;
  }

  if (isError) {
    return <div>Error ! {error.toString()}</div>;
  }
  return (
    <>
      {isFetching && <div className="loading">data fetching...</div>}
      <InfiniteScroll
        initialLoad={false} // InfiniteScroll에 의한 초기 페이지 로드 제거 (2페이지가 2번 로드되는 현상 방지)
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
      >
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return <Person key={person.name} name={person.name} hairColor={person.hair_color} eyeColor={person.eye_color} />;
          });
        })}
      </InfiniteScroll>
    </>
  );
}
