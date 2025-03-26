// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../lib/firebase';
//
// const vendors = [
//   { name: "EcoRecycle", services: ["batteries", "computers"], rating: 4.5, hasPickup: true },
//   { name: "GreenDisposal", services: ["appliances", "electronics"], rating: 4.2, hasPickup: false },
//   { name: "TechWaste Solutions", services: ["computers", "phones"], rating: 4.8, hasPickup: true },
// ];
//
// export const addVendors = async () => {
//   const vendorsCollection = collection(db, 'vendors');
//
//   for (const vendor of vendors) {
//     try {
//       await addDoc(vendorsCollection, vendor);
//       console.log(`Added vendor: ${vendor.name}`);
//     } catch (error) {
//       console.error(`Error adding vendor ${vendor.name}:`, error);
//     }
//   }
// };