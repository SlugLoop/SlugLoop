import {database} from '../firebase';
import {collection, getDocs} from 'firebase/firestore';

// Gets all busses from the database
export default async function getAllBusses() {
  const busRef = collection(database, 'busses');
  const snapshot = await getDocs(busRef);
  const busses = [];
  snapshot.forEach((doc) => {
    busses.push(doc.data());
  });
  return busses;
}
