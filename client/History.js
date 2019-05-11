import {withFirebase} from './firebase';

const History = props => {
  props.firebase.db
    .collection('items')
    .get()
    .then(rsl =>
      rsl.forEach(e => {
        console.log(e.data());
      })
    );
  return 'hi';
};

export default withFirebase(History);
