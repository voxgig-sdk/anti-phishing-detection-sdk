package core

type AntiPhishingDetectionError struct {
	IsAntiPhishingDetectionError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAntiPhishingDetectionError(code string, msg string, ctx *Context) *AntiPhishingDetectionError {
	return &AntiPhishingDetectionError{
		IsAntiPhishingDetectionError: true,
		Sdk:              "AntiPhishingDetection",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AntiPhishingDetectionError) Error() string {
	return e.Msg
}
