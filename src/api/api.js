import axios from 'axios';

const backendURL = 'http://localhost:5000'; // Địa chỉ BackEnd của bạn

export const fetchExtracted = async () => {
    try {
        const response = await axios.get(`${backendURL}/api/process_invoice`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchGuidedLine = async () => {
    try {
        const response = await axios.get(`${backendURL}/api/guideline`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
