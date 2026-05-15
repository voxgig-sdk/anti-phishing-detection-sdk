package utility

import "github.com/voxgig-sdk/anti-phishing-detection-sdk/core"

func makeContextUtil(ctxmap map[string]any, basectx *core.Context) *core.Context {
	return core.NewContext(ctxmap, basectx)
}
