"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface SearchResult {
  id: number;
  nickname: string;
  realname: string;
}

interface SearchResponse {
  error?: string;
  results?: SearchResult[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setError("검색어를 입력하세요");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get<SearchResponse>(
          `http://43.200.180.205/api/v1/search/?search=${encodeURIComponent(
            query
          )}`
        );

        if (response.data.error) {
          setError(response.data.error);
          setResults([]);
        } else {
          setResults(response.data.results || []);
          setError("");
        }
      } catch (error) {
        console.error("Search error:", error);
        setError("검색 중 오류가 발생했습니다");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center text-gray-600">검색 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">
        &quot;{query}&quot;에 대한 검색 결과
      </h1>

      {results.length === 0 ? (
        <div className="text-center text-gray-600">검색 결과가 없습니다</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <Link
              key={result.id}
              href={`/player/${result.nickname.toLowerCase()}`}
              className="block"
            >
              <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 overflow-hidden bg-gray-200 rounded-full">
                      <Image
                        src="/images/default-avatar.svg"
                        alt={result.nickname}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {result.nickname}
                      </h2>
                      <p className="text-gray-600">{result.realname}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
