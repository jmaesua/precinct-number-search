import "./SearchResult.css";

export const SearchResult = ({ result, handleResultClick }) => {
  
  return (
    <div className="search-result" onClick={() => handleResultClick(result)}>
      {result.NAME}
    </div>
  );
};
