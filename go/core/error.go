package core

import "encoding/json"

type AntiPhishingDetectionError struct {
	IsAntiPhishingDetectionError bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
	// The HTTP status, -1 when there was no response.
	Status int
}

func NewAntiPhishingDetectionError(code string, msg string, ctx *Context) *AntiPhishingDetectionError {
	return &AntiPhishingDetectionError{
		IsAntiPhishingDetectionError: true,
		Sdk:                "AntiPhishingDetection",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
		Status:             -1,
	}
}

func (e *AntiPhishingDetectionError) NotFound() bool {
	return 404 == e.Status
}

func (e *AntiPhishingDetectionError) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *AntiPhishingDetectionError) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"status":  e.Status,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *AntiPhishingDetectionError) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
