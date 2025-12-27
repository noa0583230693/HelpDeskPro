import { serviceDeleteTicket } from "../../services/ticketService"

export const deletTicket = async (token:string,ticketId:number) => {

  try{
    await serviceDeleteTicket(token,ticketId);
    return true;
  }
    catch(error)
    {
        console.error("Error deleting ticket:", error);
    }
    // Function implementation goes here
}