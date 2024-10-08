import { useState } from 'react';
import { API_KEY } from '@env';

const useChatGPT = () => {
    const [responseText, setResponseText] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callChatGPT = async (solo, location, plantacao) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}` 
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: `Me ajude a determinar o melhor horário de irrigação para a plantação de ${plantacao} em solo ${solo} com as coordenadas de localização ${JSON.stringify(location)}.`
                        }
                    ],
                    max_tokens: 100,
                }),
            });


            const data = await response.json();
            setResponseText(data.choices[0].message.content);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { responseText, loading, error, callChatGPT };
};

export default useChatGPT;
