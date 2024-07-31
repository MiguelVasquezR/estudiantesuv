import { getFirestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, query, where } from 'firebase/firestore';
import app from '../hooks/AppFirebase';
const bd = getFirestore(app);

export const getTexts = async () => {
    const querySnapshot = await getDocs(collection(bd, 'texts'));
    const textsArray = [];
    querySnapshot.forEach((doc) => {
        const text = {
            id: doc.id,
            ...doc.data()
        }
        textsArray.push(text);
    });
    return textsArray;
}

export const getTextByID = async (id) => {
    try {
        const docRef = doc(bd, "texts", id);
        const docSnap = await getDoc(docRef);
        let data = null;
        if (docSnap.exists()) {
            data = {
                id: docSnap.id,
                ...docSnap.data()
            }
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Error getting document:", error);
        return null;
    }
}