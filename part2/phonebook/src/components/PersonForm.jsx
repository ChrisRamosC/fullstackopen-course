export const PersonForm = ({
  onSubmit,
  nameValue,
  handleNameChange,
  phoneValue,
  handlePhoneChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={phoneValue} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
