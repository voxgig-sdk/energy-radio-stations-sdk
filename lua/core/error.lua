-- EnergyRadioStations SDK error

local EnergyRadioStationsError = {}
EnergyRadioStationsError.__index = EnergyRadioStationsError


function EnergyRadioStationsError.new(code, msg, ctx)
  local self = setmetatable({}, EnergyRadioStationsError)
  self.is_sdk_error = true
  self.sdk = "EnergyRadioStations"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function EnergyRadioStationsError:error()
  return self.msg
end


function EnergyRadioStationsError:__tostring()
  return self.msg
end


return EnergyRadioStationsError
