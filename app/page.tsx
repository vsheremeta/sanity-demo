import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-sans dark:from-gray-900 dark:to-gray-800">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-32 px-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Sanity CMS Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A news blog built with Next.js and Sanity CMS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <Link
            href="/news"
            className="group flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-5xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              View News
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Browse all published articles
            </p>
          </Link>

          <Link
            href="/studio"
            className="group flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-5xl mb-4">⚙️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Sanity Studio
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Manage your content
            </p>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with Next.js 16 + Sanity CMS v4 + TypeScript
          </p>
        </div>
      </main>
    </div>
  );
}
