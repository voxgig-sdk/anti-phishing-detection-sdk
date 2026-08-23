package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AntiPhishingDetection",
			"slug": "anti-phishing-detection",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.fishfish.gg",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"detection": map[string]any{},
			},
		},
		"entity": map[string]any{
			"detection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "details",
						"short": "Additional information about the detection",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "indicators",
						"short": "List of phishing indicators detected",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "isPhishing",
						"short": "Whether the URL is identified as phishing",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "recommendation",
						"short": "Recommended action based on the scan results",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "resource",
						"short": "The scanned resource (URL or domain)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scanId",
						"short": "Unique identifier for the scan",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "score",
						"short": "Confidence score of the detection (0-100)",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "threatLevel",
						"short": "The severity level of the threat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timestamp",
						"short": "When the scan was performed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The analyzed URL",
						"type": "`$STRING`",
					},
				},
				"name": "detection",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/check",
								"parts": []any{
									"check",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "scan_id",
											"orig": "scan_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "url",
											"orig": "url",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/scan",
								"parts": []any{
									"scan",
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"scan_id",
										"url",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.indicators`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
