"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntiPhishingDetectionError = void 0;
class AntiPhishingDetectionError extends Error {
    isAntiPhishingDetectionError = true;
    sdk = 'AntiPhishingDetection';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.AntiPhishingDetectionError = AntiPhishingDetectionError;
//# sourceMappingURL=AntiPhishingDetectionError.js.map