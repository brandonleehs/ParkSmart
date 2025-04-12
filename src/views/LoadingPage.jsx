import "../styles/LoadingPage.css";

export default function LoadingPage() {
  return (
    <main className="loading grid min-h-screen min-w-screen place-items-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-5">
        <div className="loader dark:loader-dark"></div>
        <p className="text-gray-800 dark:text-gray-200">Checking sign-in status...</p>
      </div>
    </main>
  );
}
