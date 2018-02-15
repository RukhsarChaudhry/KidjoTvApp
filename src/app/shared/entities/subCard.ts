import { Formate } from './formate';
export class SubCard {
    id: string;
    title: string;
    type: string;
    premium: boolean;
    duration: number;
    compilation: boolean;
    ageMin: number;
    ageMax: number;
    formats: Formate[];
}