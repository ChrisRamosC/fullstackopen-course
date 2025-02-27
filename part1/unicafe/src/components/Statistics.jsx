import StatisticsLine from './StatisticsLine';

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) return <p>No feedback given</p>;
  const getAverage = () =>
    (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad);

  const getPositivePercent = () => (good / (good + neutral + bad)) * 100;

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good + neutral + bad} />
        <StatisticsLine text="average" value={getAverage()} />
        <StatisticsLine text="positive" value={`${getPositivePercent()}%`} />
      </tbody>
    </table>
  );
};

export default Statistics;
