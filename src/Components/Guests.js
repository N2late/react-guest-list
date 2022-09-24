import './guests.css';
import { useEffect, useState } from 'react';
import GuestInfo from './GuestInfo';

function Guests({ allGuests, getAllGuests }) {
  const [buttonType, setButtonType] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  async function updateGuestList(status) {
    const tempGuestArr = await getAllGuests().catch(() => {});
    const filtered = tempGuestArr.filter((guest) => guest.attending === status);
    setFilteredList(filtered);
  }

  useEffect(() => {
    if (buttonType === 'Attending') {
      updateGuestList(true).catch(() => {});
      getAllGuests().catch(() => console.error);
    } else if (buttonType === 'Not Attending') {
      updateGuestList(false).catch(() => {});
    }
  }, [buttonType, allGuests]);
  return (
    <>
      <div className="filtersContainer">
        <button
          className="button-filter"
          onClick={() => {
            setButtonType('Attending');
          }}
        >
          Attending
        </button>
        <button
          className="button-filter"
          onClick={() => {
            setButtonType('Not Attending');
          }}
        >
          Not Attending
        </button>
        <button
          className="button-filter"
          onClick={() => {
            setButtonType('');
          }}
        >
          All Guests
        </button>
      </div>
      {buttonType === 'Attending' &&
        filteredList.map((guest) => (
          <GuestInfo
            guest={guest}
            key={guest.id}
            getAllGuests={getAllGuests}
            allGuests={allGuests}
          />
        ))}
      {buttonType === 'Not Attending' &&
        filteredList.map((guest) => (
          <GuestInfo
            guest={guest}
            key={guest.id}
            getAllGuests={getAllGuests}
            allGuests={allGuests}
          />
        ))}
      {!buttonType &&
        allGuests.map((guest) => (
          <GuestInfo
            guest={guest}
            key={guest.id}
            getAllGuests={getAllGuests}
            allGuests={allGuests}
          />
        ))}
    </>
  );
}

export default Guests;
