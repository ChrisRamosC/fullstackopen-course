const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return <p>total of {total} exercises</p>;
};

export default Total;
