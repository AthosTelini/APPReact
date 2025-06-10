// src/config/apigemini.jsx

import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;

const getApiData = async (query) => {
    try {
        const response = await axios.post("https://chatbotbackend-hqffepf5fqfqg8fb.eastus-01.azurewebsites.net/api", {
            consulta: query
        },
        {
            headers: {
                'Authorization': apiKey
            }
        });
        return response.data.mensagem;
    } catch (error) {
        console.error("Erro ao chamar a API:", error);
        // ALTERAÇÃO AQUI: Retorna string vazia em caso de erro
        return ""; 
    }
};

export default getApiData;