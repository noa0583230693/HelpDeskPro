import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Ticket } from "../interface/interfaces";
import { serviceGetTickets, serviceGetTicketById } from "../services/ticketService";
import { useAuth } from "./AuthContext";

export type TicketContextType = {
    tickets: Ticket[];
    currentTicket: Ticket | null;
    loading: boolean;
    error: string | null;
    fetchTickets: () => Promise<void>;
    fetchTicketById: (id: number) => Promise<void>;
    addTicket: (ticket: Ticket) => void;
    updateTicket: (ticket: Ticket) => void;
    deleteTicket: (ticketId: number) => void;
    clearError: () => void;
    refreshTickets: () => Promise<void>;
    clearTickets: () => void;
};

export const TicketContext = createContext<TicketContextType | null>(null);

export const TicketProvider = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all tickets
    const fetchTickets = useCallback(async () => {
        if (!token) {
            setError("אתה חייב להיות מחובר כדי לראות טיקטים");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await serviceGetTickets(token);
            setTickets(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "שגיאה בטעינת טיקטים");
            console.error("Error fetching tickets:", err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Fetch single ticket by ID
    const fetchTicketById = useCallback(async (id: number) => {
        if (!token) {
            setError("אתה חייב להיות מחובר כדי לראות טיקט");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await serviceGetTicketById(token, id);
            setCurrentTicket(data);
            
            // Update in tickets array if exists
            setTickets(prev => 
                prev.map(ticket => ticket.id === id ? data : ticket)
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : "שגיאה בטעינת טיקט");
            console.error("Error fetching ticket:", err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Add new ticket to state
    const addTicket = useCallback((ticket: Ticket) => {
        setTickets(prev => [ticket, ...prev]);
    }, []);

    // Update existing ticket in state
    const updateTicket = useCallback((updatedTicket: Ticket) => {
        setTickets(prev => 
            prev.map(ticket => 
                ticket.id === updatedTicket.id ? updatedTicket : ticket
            )
        );
        
        // Update current ticket if it's the same
        setCurrentTicket(prev => 
            prev?.id === updatedTicket.id ? updatedTicket : prev
        );
    }, []);

    // Delete ticket from state
    const deleteTicket = useCallback((ticketId: number) => {
        setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
        
        // Clear current ticket if it's the deleted one
        setCurrentTicket(prev => 
            prev?.id === ticketId ? null : prev
        );
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Refresh tickets (alias for fetchTickets)
    const refreshTickets = useCallback(async () => {
        await fetchTickets();
    }, [fetchTickets]);

    // Clear all tickets (for logout)
    const clearTickets = useCallback(() => {
        setTickets([]);
        setCurrentTicket(null);
        setError(null);
        setLoading(false);
    }, []);

    // Auto-fetch tickets on mount if user is logged in
    useEffect(() => {
        if (token) {
            fetchTickets();
        } else {
            clearTickets();
        }
    }, [token, fetchTickets, clearTickets]);

    const value: TicketContextType = {
        tickets,
        currentTicket,
        loading,
        error,
        fetchTickets,
        fetchTicketById,
        addTicket,
        updateTicket,
        deleteTicket,
        clearError,
        refreshTickets,
        clearTickets
    };

    return (
        <TicketContext.Provider value={value}>
            {children}
        </TicketContext.Provider>
    );
};

export const useTickets = () => {
    const context = useContext(TicketContext);
    if (!context) {
        throw new Error("useTickets must be used within TicketProvider");
    }
    return context;
};

export const useTicketsList = () => {
    const { tickets, loading, error } = useTickets();
    return { tickets, loading, error };
};

export const useCurrentTicket = () => {
    const { currentTicket, loading, error } = useTickets();
    return { currentTicket, loading, error };
};