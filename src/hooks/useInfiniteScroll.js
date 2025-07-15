import { useState, useEffect, useRef, useCallback } from "react";

export const useInfiniteScroll = (url, limit = 10) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const res = await fetch(`${url}?_page=${page}&_limit=${limit}`);
      const newData = await res.json();

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...newData]);
        setPage((p) => p + 1);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, url, limit]);

  useEffect(() => {
    fetchData();
  }, []);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchData();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchData]
  );

  return { data, loading, hasMore, lastElementRef };
};
