const CardsContainer = ({ children }) => {
  return (
    <div className="grid sm:grid-cols-1 gap-y-4 md:grid-cols-4 gap-x-5">
      {children}
    </div>
  );
};

export default CardsContainer;
