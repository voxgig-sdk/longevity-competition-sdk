package = "voxgig-sdk-longevity-competition"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/longevity-competition-sdk.git",
  tag = "lua/v0.0.1",
  dir = "longevity-competition-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Longevity Competition public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/longevity-competition-sdk",
  issues_url = "https://github.com/voxgig-sdk/longevity-competition-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "longevity-competition" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["longevity-competition_sdk"] = "longevity-competition_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
