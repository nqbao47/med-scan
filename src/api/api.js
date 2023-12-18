import axios from 'axios';

const backendURL = 'http://localhost:5000'; // Địa chỉ BackEnd

export const getMedicineDetails = async (id) => {
    try {
        const response = await axios.get(`${backendURL}/api/medicine_details/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchMedicine = async (query) => {
    try {
        const response = await axios.get(`${backendURL}/api/search_medicine`, {
            params: {
                query: query,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const extractMedicines = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(`${backendURL}/api/extract_medicines`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', //Content-Type là 'multipart/form-data' để xác định rằng dữ liệu gửi lên là dạng form data
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

// export const uploadImage = async (imageFile) => {
//     try {
//         const formData = new FormData();
//         formData.append('image', imageFile);

//         const response = await axios.post(`${backendURL}/api/upload_image`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data', //Content-Type là 'multipart/form-data' để xác định rằng dữ liệu gửi lên là dạng form data
//             },
//         });

//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

export const fetchGuidedLine = async () => {
    try {
        const response = await axios.get(`${backendURL}/api/guideline`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
