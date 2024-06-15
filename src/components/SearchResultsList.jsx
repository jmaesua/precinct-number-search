import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, handleResultClick }) => {
  return (
    <div className="results-list">
      {results.map((result, index) => (
        <SearchResult key={index} result={result} handleResultClick={handleResultClick} />
      ))}
    </div>
  );
};
