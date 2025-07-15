import React from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const InfiniteScroller = () => {
  const {
    data: posts,
    loading,
    hasMore,
    lastElementRef,
  } = useInfiniteScroll("https://jsonplaceholder.typicode.com/posts", 10);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Posts</h1>

      <div className="space-y-3 sm:space-y-4">
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={posts.length === index + 1 ? lastElementRef : null}
            className="border p-3 sm:p-4 rounded shadow bg-white"
          >
            <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">
              {post.title}
            </h2>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700">
              {post.body}
            </p>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center my-3 sm:my-4">
          <div className="animate-pulse text-center py-2 px-4 bg-gray-100 rounded">
            Loading more posts...
          </div>
        </div>
      )}

      {!hasMore && (
        <p className="text-center my-3 sm:my-4 text-gray-500 text-sm sm:text-base">
          No more posts to load
        </p>
      )}
    </div>
  );
};

export default InfiniteScroller;
