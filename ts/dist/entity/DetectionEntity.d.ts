import { AntiPhishingDetectionEntityBase } from '../AntiPhishingDetectionEntityBase';
import type { AntiPhishingDetectionSDK } from '../AntiPhishingDetectionSDK';
import type { Control } from '../types';
import type { Detection, DetectionListMatch, DetectionCreateData } from '../AntiPhishingDetectionTypes';
declare class DetectionEntity extends AntiPhishingDetectionEntityBase<Detection> {
    constructor(client: AntiPhishingDetectionSDK, entopts: any);
    make(this: DetectionEntity): DetectionEntity;
    list(this: any, reqmatch?: DetectionListMatch, ctrl?: Control): Promise<DetectionEntity[]>;
    create(this: any, reqdata?: DetectionCreateData, ctrl?: Control): Promise<DetectionEntity>;
}
export { DetectionEntity };
