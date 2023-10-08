import { useEffect, useState } from "react";
import { useLocation, Location, useNavigate } from "react-router-dom";

interface ReturnType {
  query: string;
  setQuery(value: string): void;
  submitQuery(): boolean;
  urlValue: string;
}

const extractSearchQuery = (location: Location) => {
  if (location.pathname !== "/search" || !location.search) {
    return "";
  }

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  if (!query) {
    return "";
  }

  return decodeURIComponent(query.trim());
};

export default function useSearch(): ReturnType {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState(extractSearchQuery(location));
  const [urlValue, setUrlValue] = useState<string | null>(
    extractSearchQuery(location) || null
  );

  useEffect(() => {
    setQuery(extractSearchQuery(location));
    setUrlValue(extractSearchQuery(location));
  }, [location]);

  const submitQuery = (): boolean => {
    if (!query.trim()) {
      return false;
    }

    navigate(`/search?query=${encodeURIComponent(query.trim())}`);

    return true;
  };

  return {
    query,
    setQuery,
    submitQuery,
    urlValue,
  };
}
