
import { Formate } from './formate';
export class Video {
    id: string;
    title: string;
    type: string;
    ageMin: number;
    ageMax: number;
    duration: number;
    compilation: boolean;
    premium: boolean;
    formats: Formate[];
}