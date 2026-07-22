-- LongevityCompetition SDK error

local LongevityCompetitionError = {}
LongevityCompetitionError.__index = LongevityCompetitionError


function LongevityCompetitionError.new(code, msg, ctx)
  local self = setmetatable({}, LongevityCompetitionError)
  self.is_sdk_error = true
  self.sdk = "LongevityCompetition"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LongevityCompetitionError:error()
  return self.msg
end


function LongevityCompetitionError:__tostring()
  return self.msg
end


return LongevityCompetitionError
