import { SubCard } from './subCard';
export class Card {
    id: number;
    type: string;;
    contentType: string;
    mediaType: string;
    subcards: SubCard[];
}