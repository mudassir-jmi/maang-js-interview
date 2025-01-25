function fetchWithAutoRetry(fetcher, count) {
    return new Promise((resolve, reject) => {
      let attempts = 0;
  
      function attemptFetch() {
        attempts++;
        fetcher()
          .then(resolve) // Resolve the promise if the fetch is successful
          .catch((error) => {
            if (attempts < count) {
              attemptFetch(); // Retry fetching
            } else {
              reject(error); // Reject the promise after max retries
            }
          });
      }
  
      attemptFetch();
    });
  }
  
  // Example usage:
  const mockFetch = () => {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.7) {
        resolve("Success!");
      } else {
        reject("Error!");
      }
    });
  };
  
  fetchWithAutoRetry(mockFetch, 5)
    .then((data) => console.log("Fetch succeeded:", data))
    .catch((error) => console.error("Fetch failed after retries:", error));
  