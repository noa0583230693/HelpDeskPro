

export interface User
{
    // isAdmin(): unknown;
    id:number;
    name:string;
    email:string;
    password:string;
    role: "admin" | "agent" | "customer";

    // token?:string;
    // is_active: boolean;
    // created_at: Date;
}
export interface Ticket
{
    id:number,
    subject: string,
    description: string,
    status_id: number ,
    priority_id: number ,
    assigned_to: number | null,
    comments: comment[] | null,
    created_at: string|null,
    updated_at: string | null
     created_by: number|null,
     status_name:string,
     priority_name:string,
        created_by_name:string,
        created_by_email:string,
        assigned_to_name:string | null,
        assigned_to_email:string | null

}



export interface comment
{
    id: number,
    ticket_id: number,
    author_id: number,
    content: string,
    created_at: string,
    author_name: string,
    author_email: string
}


export interface Status
{
    id: number,
    name: string
}
export interface Priority
{
    id: number,
    name: string
}