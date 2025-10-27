import JobSearch from '@/components/JobSearch';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold" style={{ color: '#2164f3' }}>
              QuickJob
            </h1>
            <div className="text-sm text-gray-600">
              {10}サイト同時検索
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              日本の主要求人サイトを一度に検索
            </h2>
            <p className="text-lg text-gray-600">
              キーワードを入力するだけで、Indeed、リクナビ、dodaなど10サイトを同時に開きます
            </p>
          </div>

          {/* Search Component */}
          <div className="max-w-4xl mx-auto">
            <JobSearch />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 mt-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2025 QuickJob. すべての求人情報は各求人サイトに帰属します。
          </p>
        </div>
      </footer>
    </div>
  );
}
