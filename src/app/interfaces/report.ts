import { User } from "./user";
export interface Report {
    id?: string;
    taskAndClient?: string;
    date: string;
    team: string;
    usersAssigned: string;
    description: string;
    taskId?: string;
    orderId?: string;
    userBalance?: User[];
    bill: boolean;
}
