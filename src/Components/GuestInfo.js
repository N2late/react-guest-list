import './guests.css';
import { useEffect, useState } from 'react';
import { baseUrl } from '../App';

function GuestInfo({ guest, allGuests, setAllGuests }) {
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [firstName, setFirstName] = useState(guest.firstName);
  const [lastName, setLastName] = useState(guest.lastName);
  const [edit, setEdit] = useState(false);

  useEffect(() => setCheckBoxValue(guest.attending), [guest.attending]);

  useEffect(() => {
    setFirstName(guest.firstName);
    setLastName(guest.lastName);
  }, [guest.firstName, guest.lastName]);

  async function deleteGuest(id) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const newList = allGuests.filter((item) => item.id !== id);
    setAllGuests(newList);
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
    const newState = allGuests.map((obj) => {
      if (obj.id === id) {
        return { ...obj, attending: status };
      }
      return obj;
    });
    setAllGuests(newState);
  }

  async function updateName(id, first, last) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: first, lastName: last }),
    });
    const newState = allGuests.map((obj) => {
      if (obj.id === id) {
        return { ...obj, firstName: first, lastName: last };
      }
      return obj;
    });
    setAllGuests(newState);
  }

  return (
    <div className="guestContainer" data-test-id="guest">
      <input
        checked={checkBoxValue}
        type="checkbox"
        aria-label="attending status"
        className="checkbox"
        onChange={(e) => {
          updateGuestStatus(e.currentTarget.checked, guest.id).catch(() => {});
        }}
      />
      {edit ? (
        <form
          className="names-container"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="input-first"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.currentTarget.value);
            }}
          />
          <input
            className="input-last"
            value={lastName}
            onChange={(e) => {
              setLastName(e.currentTarget.value);
            }}
          />
          <button
            className="edit-btn"
            onClick={async () => {
              await updateName(guest.id, firstName, lastName);
              setEdit(false);
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <div className="names-container">
            <p className="input-first">{guest.firstName}</p>{' '}
            <p className="input-last">{guest.lastName}</p>
          </div>
          <button className="edit-btn" onClick={() => setEdit(true)}>
            Edit
          </button>
        </>
      )}
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
