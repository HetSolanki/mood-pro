const Spinner = ({ color, size }) => {
  return (
    <div
      className={`animate-spin inline-block ${size} border-[2px] border-current border-t-transparent rounded-full ${color}`}
    ></div>
  );
};

export default Spinner;
