import './guests.css';
import { useState } from 'react';
import GuestInfo from './GuestInfo';

function Guests({ allGuests, getAllGuests }) {
  const [buttonType, setButtonType] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  async function updateGuestList(status) {
    const tempGuestArr = await getAllGuests().catch(() => {});
    const filtered = tempGuestArr.filter((guest) => guest.attending === status);
    console.log(filtered);
    setFilteredList(filtered);
  }

  if (buttonType === 'Attending') {
    updateGuestList(true).catch(() => {});
  } else if (buttonType === 'Not Attending') {
    updateGuestList(false).catch(() => {});
  }

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
          <GuestInfo guest={guest} key={guest.id} getAllGuests={getAllGuests} />
        ))}
      {buttonType === 'Not Attending' &&
        filteredList.map((guest) => (
          <GuestInfo guest={guest} key={guest.id} getAllGuests={getAllGuests} />
        ))}
      {!buttonType &&
        allGuests.map((guest) => (
          <GuestInfo guest={guest} key={guest.id} getAllGuests={getAllGuests} />
        ))}
    </>
  );
}

export default Guests;
