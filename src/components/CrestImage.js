import React from 'react';
import BlankCrest from '../images/BlankCrest.jpg';

function handleImage404(event) {
  event.target.src = BlankCrest;
}

function CrestImage(props) {
  const crestImageUrl = props.src || BlankCrest;
  return (
    <img
      className="club-crest"
      src={crestImageUrl}
      alt="Club Crest"
      onError={handleImage404}
    />
  );
}

export default CrestImage;
