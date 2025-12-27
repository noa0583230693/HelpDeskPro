import axios from 'axios';
import { handleApiError, logError } from '../utils/errorHandler';

const API_URL = 'http://localhost:4000';

/**
 * Get all priorities
 */
export const serviceGetPriorities = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/priorities`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        logError(error, 'serviceGetPriorities');
        throw handleApiError(error);
    }
};

/**
 * Create a new priority
 */
export const serviceCreatePriority = async (token: string, priorityName: string) => {
    try {
        const response = await axios.post(`${API_URL}/priorities`, 
            { name: priorityName }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        logError(error, 'serviceCreatePriority');
        throw handleApiError(error);
    }
};
