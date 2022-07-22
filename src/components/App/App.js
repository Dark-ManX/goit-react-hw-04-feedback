import { useState } from 'react';
import shortid from 'shortid';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import Section from '../Section/Section';
import styles from './App.module.css';

const App = () => {
  // state = {
  //   good: 0,
  //   neutral: 0,
  //   bad: 0,
  // };

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const obj = { good, neutral, bad };
  const keys = Object.keys(obj);

  const handleButtonClick = e => {
    const key = e.currentTarget.textContent;
    console.log(e.currentTarget);

    switch (key) {
      case 'good':
        return setGood(good + 1);

      case 'neutral':
        return setNeutral(neutral + 1);

      case 'bad':
        return setBad(bad + 1);

      default:
        return;
    }
  };

  const totalFeedbacks = () => {
    console.log(good, neutral, bad);
    return Object.values(obj).reduce((acc, item) => (acc += item), 0);
  };

  const positiveFeedbacks = () => {
    return Math.round((good / totalFeedbacks()) * 100);
  };

  // const keys = Object.keys(this.state);
  const total = totalFeedbacks();
  const positive = positiveFeedbacks();

  return (
    <div className={styles.main}>
      <Section
        title="Please leave feedback"
        children={Object.keys(obj).map(el => (
          <FeedbackOptions key={shortid.generate()} name={el} onClick={handleButtonClick} />
        ))}
      />

      <Section
        title="Statistics"
        children={
          <Statistics keys={keys} value={obj} total={total} positivePercentage={positive} />
        }
      />
    </div>
  );
};

export default App;
