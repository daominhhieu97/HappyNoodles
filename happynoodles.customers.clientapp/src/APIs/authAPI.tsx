import axios from 'axios';

const backendUrl = 'https://localhost:7232/api'; // Update with your backend URL

export async function login() {
  try {
    const response = await axios.get(`${backendUrl}/login/signin`);
    return response.data;
  } catch (error) {
    throw error; // Handle error in your component
  }
}