package core

type EnergyRadioStationsError struct {
	IsEnergyRadioStationsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewEnergyRadioStationsError(code string, msg string, ctx *Context) *EnergyRadioStationsError {
	return &EnergyRadioStationsError{
		IsEnergyRadioStationsError: true,
		Sdk:              "EnergyRadioStations",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *EnergyRadioStationsError) Error() string {
	return e.Msg
}
