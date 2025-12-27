import axios from 'axios';
import { handleApiError, logError } from '../utils/errorHandler';

const API_URL = 'http://localhost:4000';

/**
 * Get all statuses
 */
export const serviceGetStatus = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/statuses`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        logError(error, 'serviceGetStatus');
        throw handleApiError(error);
    }
};

/**
 * Create a new status
 */
export const serviceCreateStatus = async (token: string, statusName: string) => {
    try {
        const response = await axios.post(`${API_URL}/statuses`, 
            { name: statusName }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        logError(error, 'serviceCreateStatus');
        throw handleApiError(error);
    }
};
