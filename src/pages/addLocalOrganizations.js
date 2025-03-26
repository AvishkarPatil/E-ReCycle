import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const localOrganizations = [
  {
    name: "Waranagar E-Waste Initiative",
    address: "Near TKIET Main Gate, Warananagar",
    location: "Waranagar",
    phone: "+91 9876543210",
    email: "info@waranagarewaste.org"
  },
  {
    name: "Kolhapur Tech Recycling Hub",
    address: "5km from TKIET, towards Kolhapur City",
    location: "Kolhapur",
    phone: "+91 8765432109",
    email: "techrecycle.kolhapur@gmail.com"
  },
  {
    name: "Ganeshpur Green Solutions",
    address: "Near Ganeshpur Village, 3km from TKIET",
    location: "Ganeshpur",
    phone: "+91 7654321098",
    email: "ganeshpurgreen@email.com"
  },
  {
    name: "Kodoli E-Waste Collection",
    address: "Kodoli Market Area, 7km from TKIET",
    location: "Kodoli",
    phone: "+91 6543210987",
    email: "kodoliecollection@email.com"
  },
  {
    name: "Shivaji Nagar Recycling Point",
    address: "Shivaji Nagar, Kolhapur, 8km from TKIET",
    location: "Kolhapur",
    phone: "+91 5432109876",
    email: "shivajinagarrecycle@email.com"
  }
];

export const addLocalOrganizations = async () => {
  try {
    for (const org of localOrganizations) {
      await addDoc(collection(db, 'organizations'), org);
    }
    console.log("Local organizations added successfully");
  } catch (error) {
    console.error("Error adding local organizations:", error);
  }
};