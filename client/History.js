import {withFirebase} from './firebase';
import React, {useState, useEffect} from 'react';

// const [error, setError] = useState(null);
//   console.log(error);
//   setError('new error');

//   useEffect(() => {
//     fetchSignInMethods();
//   }, []);

const History = props => {
  const [msgs, setMsgs] = useState([]);
  useEffect(() => {
    props.firebase.db
      .collection('items')
      .get()
      .then(rsl => {
        let msgs = [];
        rsl.forEach(e => {
          msgs.push(e.data());
        });
        setMsgs(msgs);
      });
  }, []);
  console.log(msgs);

  return 'hi';
};

export default withFirebase(History);
