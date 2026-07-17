const SearchFilterContainer = ({ children }) => {
  return (
    <div className="flex flex-wrap gap-y-4 justify-between py-5 h-full">
      {children}
    </div>
  );
};

export default SearchFilterContainer;
