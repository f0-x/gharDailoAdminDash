export interface User {
    id?: string;
    name: string;
    email: string;
    role: string;
    status?: boolean; 
    balance: number; //Money in store.
}
