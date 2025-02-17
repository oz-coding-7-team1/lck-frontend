"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { AxiosError } from "axios";

interface SearchResult {
  id: number;
  nickname: string;
  realname: string;
  profileImageUrl?: string;
}

interface Tag {
  name: string;
  slug: string;
}

const DEFAULT_PROFILE_IMAGE = "/images/default-avatar.svg";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const tag = searchParams.get("tag");

  const [results, setResults] = useState<SearchResult[]>([]);
  const [relatedTags, setRelatedTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let endpoint = "http://43.200.180.205/api/v1/search/";
        const searchParam = tag ? tag : query;

        if (searchParam) {
          endpoint += `?search=${encodeURIComponent(searchParam)}`;
        }

        const response = await axios.get(endpoint);

        if (response.data.error) {
          setError(response.data.error);
          setResults([]);
          setRelatedTags([]);
        } else {
          setResults(response.data.results || []);
          setRelatedTags(response.data.related_tags || []);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Search error:", error);
          if (error.response?.status === 404) {
            setError("검색 결과가 없습니다");
          } else {
            setError(
              error.response?.data?.message ||
                "검색 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
          }
        } else {
          setError("검색 중 오류가 발생했습니다");
        }
        setResults([]);
        setRelatedTags([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (query || tag) {
      fetchResults();
    } else {
      setIsLoading(false);
      setError(null);
      setResults([]);
      setRelatedTags([]);
    }
  }, [query, tag]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">검색 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {tag ? `#${tag} 검색 결과` : `'${query}' 검색 결과`}
          </h1>
          <p className="mt-2 text-gray-600">
            {results.length}개의 결과를 찾았습니다
          </p>
        </div>

        {/* Related Tags */}
        {relatedTags.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              관련 태그
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map((relatedTag) => (
                <Link
                  key={relatedTag.slug}
                  href={`/search?tag=${encodeURIComponent(relatedTag.slug)}`}
                  className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  #{relatedTag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="space-y-6">
          {results.length > 0 ? (
            results.map((result) => (
              <Link
                key={result.id}
                href={`/player/${result.nickname.toLowerCase()}`}
                className="flex items-center gap-4 p-4 transition-colors bg-white rounded-lg shadow hover:bg-gray-50"
              >
                <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-full">
                  <Image
                    src={result.profileImageUrl || DEFAULT_PROFILE_IMAGE}
                    alt={result.nickname}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {result.nickname}
                  </h3>
                  <p className="text-gray-600">{result.realname}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow">
              검색 결과가 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
