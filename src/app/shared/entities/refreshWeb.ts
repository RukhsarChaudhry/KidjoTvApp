import { user } from './user';
import { kid } from './kid';
import { language } from './language';
export class Refresh {
    deviceId: string;
    Date: Date;
    videoUrl: string;
    videoImageUrl: string;
    folderImageUrl: string;
    User: user[];
    kids: kid[];
    lang: language[];

}