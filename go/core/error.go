package core

type LongevityCompetitionError struct {
	IsLongevityCompetitionError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLongevityCompetitionError(code string, msg string, ctx *Context) *LongevityCompetitionError {
	return &LongevityCompetitionError{
		IsLongevityCompetitionError: true,
		Sdk:              "LongevityCompetition",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LongevityCompetitionError) Error() string {
	return e.Msg
}
