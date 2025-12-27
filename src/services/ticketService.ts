import axios from 'axios';
import type { AddTicketProps } from '../components/NewTicket/addTicket';
import { handleApiError, logError } from '../utils/errorHandler';

const API_URL = 'http://localhost:4000';

/**
 * Get all tickets
 */
export const serviceGetTickets = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/tickets`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        logError(error, 'serviceGetTickets');
        throw handleApiError(error);
    }
};

/**
 * Get ticket by ID
 */
export const serviceGetTicketById = async (token: string, id: number) => {
    try {
        const response = await axios.get(`${API_URL}/tickets/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        logError(error, 'serviceGetTicketById');
        throw handleApiError(error);
    }
};

/**
 * Create a new ticket
 */
export const serviceCreateTicket = async (token: string, ticketData: AddTicketProps) => {
    try {
        const response = await axios.post(`${API_URL}/tickets`, ticketData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        logError(error, 'serviceCreateTicket');
        throw handleApiError(error);
    }
};

/**
 * Delete a ticket
 */
export const serviceDeleteTicket = async (token: string, ticketId: number) => {
    try {
        const response = await axios.delete(`${API_URL}/tickets/${ticketId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        logError(error, 'serviceDeleteTicket');
        throw handleApiError(error);
    }
};

/**
 * Update ticket status
 */
export const patchTicketStatus = async (token: string, status: number, ticketId: number) => {
    try {
        const response = await axios.patch(`${API_URL}/tickets/${ticketId}`, 
            { status_id: status }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        logError(error, 'patchTicketStatus');
        throw handleApiError(error);
    }
};

/**
 * Update ticket priority
 */
export const patchTicketPriority = async (token: string, priority: number, ticketId: number) => {
    try {
        const response = await axios.patch(`${API_URL}/tickets/${ticketId}`, 
            { priority_id: priority }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        logError(error, 'patchTicketPriority');
        throw handleApiError(error);
    }
};

/**
 * Update ticket assigned agent
 */
export const patchTicketAsignTo = async (token: string, assignedTo: number, ticketId: number) => {
    try {
        const response = await axios.patch(`${API_URL}/tickets/${ticketId}`, 
            { assigned_to: assignedTo }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        logError(error, 'patchTicketAsignTo');
        throw handleApiError(error);
    }
};

/**
 * Add a comment to a ticket
 */
export const serviceAddComment = async (token: string, ticketId: number, commentData: {content: string}) => {
    try {
        const response = await axios.post(`${API_URL}/tickets/${ticketId}/comments`, 
            commentData, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        logError(error, 'serviceAddComment');
        throw handleApiError(error);
    }
};
