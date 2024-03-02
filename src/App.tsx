import { useState } from 'react';
import axios from 'axios';

type ApiResponse = {
    id: number;
    name: string;
    status: string;
    species: string;
};

export default function App() {
    const [exampleData, setExampleData] = useState<ApiResponse[]>([]);

    function fetchData() {
        axios.get("https://rickandmortyapi.com/api/character")
            .then((response) => {
                if (response.data && Array.isArray(response.data.results)) {
                    setExampleData(response.data.results);
                } else {
                    throw new Error('Invalid response format');
                }
            })
            .catch((error) => console.error(error.message));
    }

    return (
        <>
            <button onClick={fetchData}>Fetch Data</button>
            <h3>Response</h3>
            {exampleData.map((character) => (
                <div key={character.id}>
                    <p>{character.id}</p>
                    <p>{character.name}</p>
                    <p>{character.status}</p>
                    <p>{character.species}</p>
                </div>
            ))}
        </>
    );
}