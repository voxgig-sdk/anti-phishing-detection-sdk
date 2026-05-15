package = "voxgig-sdk-anti-phishing-detection"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/anti-phishing-detection-sdk.git"
}
description = {
  summary = "AntiPhishingDetection SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["anti-phishing-detection_sdk"] = "anti-phishing-detection_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
