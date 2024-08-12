
import axios from 'axios';

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA9GD2nntjh89yOQl_oMDhhtr5Z2lng1dU';

export const ChatBotService = async (input) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        "contents": [
          {
            "parts": [
              {
                "text": input
              }
            ]
          }
        ]
      }
    );
    const botResponse = response.data.candidates[0].content.parts[0].text;
    return botResponse;
  } catch (error) {
    console.error('Error sending message:', error);
    return 'Error: Could not get response from AI';
  }
};
