import './guests.css';
import { useEffect, useState } from 'react';
import { baseUrl } from '../App';

function GuestInfo({ guest, getAllGuests }) {
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [firstName, setFirstName] = useState(guest.firstName);
  const [lastName, setLastName] = useState(guest.lastName);

  useEffect(() => setCheckBoxValue(guest.attending), [guest.attending]);

  useEffect(() => {
    setFirstName(guest.firstName);
    setLastName(guest.lastName);
  }, [guest.firstName, guest.lastName]);

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
