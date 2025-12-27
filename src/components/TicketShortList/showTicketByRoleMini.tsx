import { useUser } from "../../context/AuthContext";
import { ShowTicketsMiniAgAd } from "./showTicketsMiniAgAd";
import { ShowTicketsCMini } from "./showTicketCMini";

export const ShowTicketsMiniByRole=()=>
{
    // הצגת טיקטים לפי תפקיד משתמש
    // קריאה לקומפוננטת הצגת טיקטים ShowTickets
    const { user } = useUser();    
    switch(user?.role)
    {
        case 'admin': return <ShowTicketsMiniAgAd  />;
        case 'agent': return <ShowTicketsMiniAgAd  />;
        case 'customer':return <ShowTicketsCMini />;
        default:
            return <div>תפקיד משתמש לא מוכר</div>;
    }
}