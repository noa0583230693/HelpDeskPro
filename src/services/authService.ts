import axios from 'axios';
import type { User } from '../interface/interfaces';
import type { LoginPageProps } from '../components/Auth/LoginPage/loginPage';
import type { RegisterPageProps } from '../components/Auth/RegisterPage/registerPage';
import { handleApiError, logError } from '../utils/errorHandler';

const API_URL = 'http://localhost:4000';

/**
 * Login service - authenticates user and returns user data with token
 */
export const serviceLogin = async (data: LoginPageProps): Promise<[User, string]> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, data);
        const responseData = response.data;
        const token = responseData["token"];
        
        const userResponse = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return [userResponse.data, token];
    } catch (error) {
        logError(error, 'serviceLogin');
        throw handleApiError(error);
    }
};

/**
 * Register service - creates a new user account
 */
export const serviceRegister = async (data: RegisterPageProps) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, data);
        return response.data;
    } catch (error) {
        logError(error, 'serviceRegister');
        throw handleApiError(error);
    }
};
