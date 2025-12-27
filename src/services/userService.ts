import axios from 'axios';
import type { User } from '../interface/interfaces';
import { handleApiError, logError } from '../utils/errorHandler';

const API_URL = 'http://localhost:4000';

/**
 * Get all users
 */
export const serviceGetUsers = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        logError(error, 'serviceGetUsers');
        throw handleApiError(error);
    }
};

/**
 * Get user by ID
 */
export const serviceGetUserById = async (token: string, userId: number) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        logError(error, 'serviceGetUserById');
        throw handleApiError(error);
    }
};

/**
 * Create a new user
 */
export const serviceCreateUser = async (token: string, userData: User) => {
    try {
        const response = await axios.post(`${API_URL}/users`, 
            userData, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        logError(error, 'serviceCreateUser');
        throw handleApiError(error);
    }
};
