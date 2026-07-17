const Container = ({children, className='' }) => {
  return (
    <div className={`mx-auto mv:w-[min(1300px,90%)]  dv:w-[min(1300px,90%)]  ${className}`}>
      {children}
    </div>
  );
};

export default Container;
