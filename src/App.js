import './App.css';
import { useEffect, useState } from 'react';
import Guests from './Components/Guests';

const baseUrl =
  'https://express-guest-list-api-memory-data-store.n2late.repl.co';
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
    await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: first, lastName: last }),
    });
    setFirstName('');
    setLastName('');
    setIsSubmitted(!isSubmitted);
  }

  async function deleteAllGuest() {
    await allGuests.forEach(async (guest) => {
      const response = await fetch(`${baseUrl}/guests/${guest.id}`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
      console.log(deletedGuest);
    });
    setIsSubmitted(!isSubmitted);
  }

  useEffect(() => {
    getAllGuests().catch(() => console.error);
  }, [isSubmitted, allGuests]);

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
        <Guests allGuests={allGuests} getAllGuests={getAllGuests} />
      </header>
    </div>
  );
}

export default App;
