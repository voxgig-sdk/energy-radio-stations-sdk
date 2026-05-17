package utility

import "github.com/voxgig-sdk/energy-radio-stations-sdk/go/core"

func featureAddUtil(ctx *core.Context, f core.Feature) {
	client := ctx.Client
	features := client.Features

	client.Features = append(features, f)
}
