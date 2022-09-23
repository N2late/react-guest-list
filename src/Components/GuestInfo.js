import './guests.css';
import { useEffect, useState } from 'react';

const baseUrl =
  'http://express-guest-list-api-memory-data-store.n2late.repl.co';

function GuestInfo({ guest, getAllGuests }) {
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [firstName, setFirstName] = useState(guest.firstName);
  const [lastName, setLastName] = useState(guest.lastName);

  useEffect(() => setCheckBoxValue(guest.attending), [guest.attending]);

  async function deleteGuest(id) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    getAllGuests().catch(() => console.error);
  }

  async function updateGuestStatus(status, id) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: status }),
    });
    setCheckBoxValue(status);
  }

  async function updateName(id, first, last) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: first, lastName: last }),
    });
    getAllGuests().catch(() => console.error);
  }

  return (
    <div className="guestContainer" data-test-id="guest">
      <input
        checked={checkBoxValue}
        type="checkbox"
        aria-label="attending status"
        onChange={(e) => {
          updateGuestStatus(e.currentTarget.checked, guest.id).catch(() => {});
        }}
      />
      <input
        className="input-first"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.currentTarget.value);
        }}
        onKeyUp={(e) =>
          updateName(guest.id, e.currentTarget.value, guest.lastName).catch(
            () => {},
          )
        }
      />
      <input
        className="input-last"
        value={lastName}
        onChange={(e) => {
          setLastName(e.currentTarget.value);
        }}
        onKeyUp={(e) =>
          updateName(guest.id, guest.firstName, e.currentTarget.value).catch(
            () => {},
          )
        }
      />
      <button
        className="remove-btn"
        onClick={() => {
          deleteGuest(guest.id).catch(() => console.error);
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default GuestInfo;
