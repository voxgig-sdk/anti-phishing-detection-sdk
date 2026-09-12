export interface Detection {
    details?: string;
    indicators?: any[];
    isPhishing?: boolean;
    recommendation?: string;
    resource?: string;
    scanId?: string;
    score?: number;
    threatLevel?: string;
    timestamp?: string;
    url?: string;
}
export interface DetectionListMatch {
    domain?: string;
    scan_id?: string;
    url?: string;
}
export interface DetectionCreateData {
    details?: string;
    indicators?: any[];
    isPhishing?: boolean;
    recommendation?: string;
    resource?: string;
    scanId?: string;
    score?: number;
    threatLevel?: string;
    timestamp?: string;
    url?: string;
}
