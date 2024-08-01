import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url, abortCont.signal)
          if (!response.ok) {
            throw new Error("Could not fetch the data for that resource");
          }
          console.log("RESPONSE:\n", response)

          const data_res = await response.json();
          console.log("DATA:\n", data_res)

          setData(data_res);
          setIsPending(false);
          setError(null);
        } catch (error) {
          // console.error("Error fetching data:", error)
          setError(error.message)
          setIsPending(false);
        }
      };
      fetchData();
    }, 0);

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error }
}

export default useFetch;