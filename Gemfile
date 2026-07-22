source "https://rubygems.org"

# This Gemfile exists ONLY for local preview. GitHub Pages ignores it and builds
# with its own pinned versions — so we pin to the same `github-pages` gem here.
# Testing against plain `jekyll` instead would let a build pass locally and still
# fail on deploy, which defeats the point.
gem "github-pages", group: :jekyll_plugins

# Plugins declared in _config.yml. Both ship inside github-pages, but naming them
# keeps the local bundle honest about what the site actually uses.
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
end

# WEBrick left Ruby's stdlib in 3.0; `jekyll serve` needs it back.
gem "webrick", "~> 1.8"

# Windows: Ruby ships no timezone database.
# (wdm is deliberately absent — 0.1.1 has no working native build on Ruby 3.x.
# Jekyll falls back to polling for file changes, which is slower but works.)
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
