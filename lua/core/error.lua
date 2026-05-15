-- AntiPhishingDetection SDK error

local AntiPhishingDetectionError = {}
AntiPhishingDetectionError.__index = AntiPhishingDetectionError


function AntiPhishingDetectionError.new(code, msg, ctx)
  local self = setmetatable({}, AntiPhishingDetectionError)
  self.is_sdk_error = true
  self.sdk = "AntiPhishingDetection"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AntiPhishingDetectionError:error()
  return self.msg
end


function AntiPhishingDetectionError:__tostring()
  return self.msg
end


return AntiPhishingDetectionError
