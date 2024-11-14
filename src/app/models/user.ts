import { Country } from "./country";

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    image: string;
    description: string;
    countryId: number;
}
