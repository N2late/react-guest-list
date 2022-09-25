import './App.css';
import { useEffect, useState } from 'react';
import Guests from './Components/Guests';

export const baseUrl = 'http://localhost:4000';

let id = 0;

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allGuests, setAllGuests] = useState('');

  async function getAllGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const guests = await response.json();
    setAllGuests(guests);
    return guests;
  }

  async function createGuest(first, last) {
    id += 1;
    await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id.toString(),
        firstName: first,
        lastName: last,
      }),
    });
    setAllGuests([
      ...allGuests,
      {
        firstName: first,
        lastName: last,
        attending: false,
        id: id.toString(),
      },
    ]);
    setFirstName('');
    setLastName('');
    setIsSubmitted(!isSubmitted);
  }

  async function deleteAllGuest() {
    await Promise.all(
      allGuests.map(async (guest) => {
        const response = await fetch(`${baseUrl}/guests/${guest.id}`, {
          method: 'DELETE',
        });
        await response.json();
      }),
    ).then(() => setAllGuests([]));
  }

  useEffect(() => {
    getAllGuests().catch(() => console.error);
  }, []);

  if (!allGuests) {
    return (
      <div className="App-header">
        <p className="isLoading">is Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guest List</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="firstInput" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="secondInput" htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button
            className="return-btn"
            onClick={() => {
              createGuest(firstName, lastName).catch(() => {});
            }}
          >
            Return
          </button>
        </form>

        <button
          className="delete-btn"
          onClick={() => {
            deleteAllGuest().catch(() => {});
          }}
        >
          Delete all
        </button>
        <Guests allGuests={allGuests} setAllGuests={setAllGuests} />
      </header>
    </div>
  );
}

export default App;
