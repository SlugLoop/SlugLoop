import {database} from '../firebase';
import {collection, getDocs} from 'firebase/firestore';

export default async function getAllBusses() {
  const busRef = collection(database, 'busses');
  const snapshot = await getDocs(busRef);
  const busses = [];
  snapshot.forEach((doc) => {
    busses.push(doc.data());
  });
  return busses;
}
