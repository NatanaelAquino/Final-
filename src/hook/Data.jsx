import { useState } from 'react';
import { firestore } from '../config/index';

// Exemplo de uso
const fetchData = async () => {

    const [value, setValue] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await firestore.collection('yourCollectionName').get();
                const data = snapshot.docs.map(doc => doc.data());
                setValue(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

    fetchData();
}, []);
    return value; 

};
export default useFetchData;
