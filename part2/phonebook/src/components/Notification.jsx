const Notification = ({ message }) => {
  if (message === null || message.text === undefined) {
    return null;
  }

  const className = `notification ${message.type === 'error' ? 'error' : ''}`;

  return <div className={className}>{message.text}</div>;
};

export default Notification;
