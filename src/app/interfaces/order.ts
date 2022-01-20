export interface Order {
    id?: string;
    client: string;
    address: string;
    date: string;
    name: string; // Name of the order not the client
}
