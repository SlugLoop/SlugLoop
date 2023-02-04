import {database} from '../firebase';

export default async function getAllBusses() {
  const busRef = database.collection('busses');
  const snapshot = await busRef.get();
  const busses = [];
  snapshot.forEach((doc) => {
    busses.push(doc.data());
  });
  return busses;
}
