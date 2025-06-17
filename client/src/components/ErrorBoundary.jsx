import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-4 bg-red-100 rounded-lg">
      <p className="font-bold  text-center text-red-800">Something went wrong:</p>
      <pre className="text-red-600">{error.message}</pre>
      <button 
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded items-center"
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorFallback;