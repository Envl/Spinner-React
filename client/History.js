import {withFirebase} from './firebase';

// const [error, setError] = useState(null);
//   console.log(error);
//   setError('new error');

//   useEffect(() => {
//     fetchSignInMethods();
//   }, []);

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
