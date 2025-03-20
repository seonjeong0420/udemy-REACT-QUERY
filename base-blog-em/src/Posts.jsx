import { useState, useEffect } from "react";
import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MaxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const updateMutation = useMutation({
    mutationFn: (postId) => updatePost(postId),
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  /* 
  ** '다음 페이지' 클릭 시 Loading... 을 보여주지 않고 데이터 보여주는 방법
   - 데이터 prefetching 처리
   - useQueryClient를 사용해 캐시에 데이터를 보여준 뒤 fetch 된 데이터를 화면에 show
  */
  const queryClient = useQueryClient();
  useEffect(() => {
    if (currentPage < MaxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage, queryClient]);

  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", currentPage], // 쿼리 캐시 내의 데이터 정의 (항상 배열)
    queryFn: () => fetchPosts(currentPage), // 데이터를 가져오기 위해 실행할 함수
    staleTime: 2000, // 2초
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError)
    return (
      <>
        <h2>Oops, something went wrong</h2>
        <p>{error.toString()}</p>
      </>
    );
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {
              updateMutation.reset();
              deleteMutation.reset();
              setSelectedPost(post);
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => --prev);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= MaxPostPage} onClick={() => setCurrentPage((prev) => ++prev)}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} deleteMutation={deleteMutation} updateMutation={updateMutation} />}
    </>
  );
}
