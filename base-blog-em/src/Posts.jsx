import { useState } from "react";
import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
import { useQuery } from "@tanstack/react-query";

const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"], // 쿼리 캐시 내의 데이터 정의 (항상 배열)
    queryFn: fetchPosts, // 데이터를 가져오기 위해 실행할 함수
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
          <li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
