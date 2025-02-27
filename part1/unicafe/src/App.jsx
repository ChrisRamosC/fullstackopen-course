import { useState } from 'react';
import Title from './components/Title';
import Button from './components/Button';

import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />

      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
