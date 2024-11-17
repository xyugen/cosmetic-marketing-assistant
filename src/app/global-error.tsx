"use client";

const GlobalError = ({
  _error,
  reset,
}: {
  _error: Error;
  reset: () => void;
}) => {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
