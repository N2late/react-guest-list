import './guests.css';
import { useEffect, useState } from 'react';
import GuestInfo from './GuestInfo';

function updateGuestList(status, allGuests) {
  const filtered = allGuests.filter((guest) => guest.attending === status);
  return filtered;
}

function Guests({ allGuests, setAllGuests }) {
  const [buttonType, setButtonType] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (buttonType === 'Attending') {
      const list = updateGuestList(true, allGuests);
      setFilteredList(list);
    } else if (buttonType === 'Not Attending') {
      const list = updateGuestList(false, allGuests);
      setFilteredList(list);
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
            allGuests={allGuests}
            setAllGuests={setAllGuests}
          />
        ))}
      {buttonType === 'Not Attending' &&
        filteredList.map((guest) => (
          <GuestInfo
            guest={guest}
            key={guest.id}
            allGuests={allGuests}
            setAllGuests={setAllGuests}
          />
        ))}
      {!buttonType &&
        allGuests.map((guest) => (
          <GuestInfo
            guest={guest}
            key={guest.id}
            allGuests={allGuests}
            setAllGuests={setAllGuests}
          />
        ))}
    </>
  );
}

export default Guests;
