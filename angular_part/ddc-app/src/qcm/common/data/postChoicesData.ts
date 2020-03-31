
import { ResponseChoices, Qcm , QcmPerformer, QcmGlobalResults } from './qcm';

export class PostChoicesRequest{
    qcmId :string;
    mode:string; //"training" or "eval" or ...
    qcmPerformer: QcmPerformer;
    choices : ResponseChoices[];
}

export class PostChoicesResponse{
    qcmResultsId :string;
    qcm: Qcm; //with solutions in mode=training or ...
    globalResults : QcmGlobalResults;
}