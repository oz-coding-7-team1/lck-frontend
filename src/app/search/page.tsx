'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User, Users } from 'lucide-react';

const mockData = [
  { name: 'FAKER', koreanName: '이상혁', type: 'player' },
  { name: 'CHOVY', koreanName: '정지훈', type: 'player' },
  { name: 'GUMAYUSI', koreanName: '이민형', type: 'player' },
  { name: 'KERIA', koreanName: '류민석', type: 'player' },
  { name: 'T1', koreanName: 'T1', type: 'team' },
  { name: 'GEN.G', koreanName: '젠지', type: 'team' },
  { name: 'Hanwha Life Esports', koreanName: '한화생명 e스포츠', type: 'team' },
  { name: 'Dplus KIA', koreanName: '디플러스 기아', type: 'team' },
  { name: 'kt Rolster', koreanName: 'kt 롤스터', type: 'team' },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchResults, setSearchResults] = useState<
    { name: string; koreanName: string; type: string }[]
  >([]);

  useEffect(() => {
    if (query) {
      const results = mockData.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.koreanName.includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Search Results for &quot;{query}&quot;</h1>
      {searchResults.length > 0 ? (
        <ul className="space-y-4">
          {searchResults.map((result, index) => (
            <li key={index} className="flex items-center p-4 border rounded-lg shadow">
              {result.type === 'player' ? (
                <User className="w-6 h-6 mr-2 text-gray-600" />
              ) : (
                <Users className="w-6 h-6 mr-2 text-gray-600" />
              )}
              <Link href={`/${result.type}/${result.name}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {result.name} ({result.koreanName})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No results found for &quot;{query}&quot;.</p>
      )}
    </div>
  );
}
