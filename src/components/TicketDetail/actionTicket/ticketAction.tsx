import type { Ticket } from "../../../interface/interfaces";
import { TicketActionAd } from "./ticketActionAd";
import { TicketActionAg } from "./ticketActionAg";
import { TicketActionC } from "./ticketActionC";

export interface TicketActionProps {
    role: string;
    ticket: Ticket;
    onClose?: () => void;
}
export const TicketAction = ({ role, ticket, onClose }: TicketActionProps) => {

    return <>
        {role === "admin" && <TicketActionAd ticket={ticket} onClose={onClose} />}
        {role === "agent" && <TicketActionAg ticket={ticket} onClose={onClose} />}
        {role === "customer" && <TicketActionC ticket={ticket} onClose={onClose} />}
    </>
}