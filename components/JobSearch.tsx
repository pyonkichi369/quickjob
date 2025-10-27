'use client';

import { useState, useEffect } from 'react';

// 日本の主要求人サイト定義
const JOB_SITES = [
  {
    name: 'Indeed',
    emoji: '🔵',
    url: (keyword: string, location: string) => {
      const params = new URLSearchParams();
      params.append('q', keyword);
      if (location) params.append('l', location);
      return `https://jp.indeed.com/jobs?${params.toString()}`;
    }
  },
  {
    name: '求人ボックス',
    emoji: '📦',
    url: (keyword: string, location: string) => {
      const params = new URLSearchParams();
      if (keyword) params.append('q', keyword);
      if (location) params.append('l', location);
      return `https://xn--pckua2a7gp15o89zb.com/?${params.toString()}`;
    }
  },
  {
    name: 'スタンバイ',
    emoji: '⭐',
    url: (keyword: string, location: string) => {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (location) params.append('location', location);
      return `https://jp.stanby.com/ksrh/?${params.toString()}`;
    }
  },
  {
    name: 'リクナビNEXT',
    emoji: '🟢',
    url: (keyword: string, location: string) => {
      const params = new URLSearchParams();
      if (keyword) params.append('freeword', keyword);
      if (location) params.append('pref', location);
      return `https://next.rikunabi.com/rnc/docs/cp_s01800.jsp?${params.toString()}`;
    }
  },
  {
    name: 'doda',
    emoji: '🔴',
    url: (keyword: string, location: string) => {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (location) params.append('area', location);
      return `https://doda.jp/DodaFront/View/JobSearchList.action?${params.toString()}`;
    }
  },
  {
    name: 'マイナビ転職',
    emoji: '🟡',
    url: (keyword: string, location: string) => {
      const params = new URLSearchParams();
      if (keyword) params.append('searchWord', keyword);
      if (location) params.append('areaCd', location);
      return `https://tenshoku.mynavi.jp/list/?${params.toString()}`;
    }
  },
  {
    name: 'エン転職',
    emoji: '🟣',
    url: (keyword: string, location: string) => {
      const params = new URLSearchParams();
      if (keyword) params.append('freeWord', keyword);
      if (location) params.append('area', location);
      return `https://employment.en-japan.com/search/?${params.toString()}`;
    }
  },
  {
    name: 'ビズリーチ',
    emoji: '💼',
    url: (keyword: string, location: string) => {
      const params = new URLSearchParams();
      if (keyword) params.append('q', keyword);
      if (location) params.append('location', location);
      return `https://www.bizreach.jp/job-feed/search/?${params.toString()}`;
    }
  },
  {
    name: 'キャリアインデックス',
    emoji: '📊',
    url: (keyword: string, location: string) => {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (location) params.append('pref', location);
      return `https://careerindex.jp/search/?${params.toString()}`;
    }
  },
  {
    name: 'Green',
    emoji: '🌿',
    url: (keyword: string, location: string) => {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (location) params.append('pref', location);
      return `https://www.green-japan.com/search/?${params.toString()}`;
    }
  }
];

export default function JobSearch() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // localStorageから設定を読み込み
  useEffect(() => {
    const savedKeyword = localStorage.getItem('quickjob_keyword');
    const savedLocation = localStorage.getItem('quickjob_location');
    if (savedKeyword) setKeyword(savedKeyword);
    if (savedLocation) setLocation(savedLocation);
  }, []);

  // 設定を保存
  useEffect(() => {
    localStorage.setItem('quickjob_keyword', keyword);
    localStorage.setItem('quickjob_location', location);
  }, [keyword, location]);

  const handleSearch = () => {
    console.log('handleSearch called', { keyword, location });

    if (!keyword.trim()) {
      alert('キーワードを入力してください');
      return;
    }

    setIsSearching(true);
    console.log('Opening sites...');

    // 各求人サイトを同時に開く（ポップアップブロック回避のため同期実行）
    let successCount = 0;
    JOB_SITES.forEach((site) => {
      const url = site.url(keyword.trim(), location.trim());
      console.log(`Opening ${site.name}:`, url);

      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (opened) {
        successCount++;
        console.log(`✓ ${site.name} opened successfully`);
      } else {
        console.warn(`✗ ${site.name} - popup blocked`);
      }
    });

    console.log(`Search completed: ${successCount}/${JOB_SITES.length} sites opened`);

    // ポップアップがブロックされた場合の警告
    if (successCount === 0) {
      alert('ポップアップがブロックされました。ブラウザの設定でこのサイトのポップアップを許可してください。');
    } else if (successCount < JOB_SITES.length) {
      alert(`${successCount}/${JOB_SITES.length}個のサイトを開きました。すべて開くには、ブラウザのポップアップブロックを解除してください。`);
    }

    // 少し遅延してからボタンを再度有効化
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      {/* Indeed-style Search Bar */}
      <div className="bg-white rounded-lg shadow-lg p-2 mb-8">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Keyword Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="職種、キーワード、企業名"
              className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Location Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="勤務地"
              className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            style={{
              backgroundColor: '#2164f3',
              ':hover': { backgroundColor: '#1557da' }
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1557da'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2164f3'}
          >
            {isSearching ? '検索中...' : '求人を検索'}
          </button>
        </div>
      </div>

      {/* Job Sites Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          以下のサイトを同時検索します
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {JOB_SITES.map((site) => (
            <div
              key={site.name}
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
            >
              <span className="text-2xl mb-2">{site.emoji}</span>
              <span className="text-xs text-gray-700 font-medium text-center">{site.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 space-y-3">
        <p className="text-sm text-gray-600 text-center">
          キーワードを入力して検索ボタンを押すと、{JOB_SITES.length}つの求人サイトが新しいタブで開きます
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-800 font-semibold mb-1">
            💡 初回利用時の設定
          </p>
          <p className="text-xs text-blue-700">
            ブラウザのポップアップブロックが有効の場合、初回は「ポップアップを許可」を選択してください。
            アドレスバーの右側にポップアップアイコンが表示されます。
          </p>
        </div>
      </div>
    </div>
  );
}
