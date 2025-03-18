export const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.name, person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};
