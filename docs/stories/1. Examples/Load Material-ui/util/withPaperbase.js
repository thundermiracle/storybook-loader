import React from 'react';
import Paperbase from './paperbase';

export default (Component) => {
  const WithPaperbase = (props) => (
    <Paperbase>
      <Component {...props} />
    </Paperbase>
  );

  return WithPaperbase;
}
