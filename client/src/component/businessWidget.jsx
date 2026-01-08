import { useState } from 'react';

function BusinessWidget({ businessName }) {

  return (
    <div className="BusinessWidget">
      {{businessName}}
    </div>
  );
}

export default BusinessWidget;