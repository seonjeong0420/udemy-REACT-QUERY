import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["postdetail", post.id],
    queryFn: () => fetchComments(post.id),
    staleTime: 2000,
  });

  if (isLoading) return <h3>post detail loading..</h3>;
  if (isError) return <h3>post detail error!!</h3>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
