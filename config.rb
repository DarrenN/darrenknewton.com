require "bundler"
require "kramdown"
require "sanitize"
require "rack/codehighlighter"
require "lib/coderwall_helpers"
require "lib/uuid"

activate :directory_indexes

# Blog
activate :blog do |blog|
  blog.layout        = "article"
  blog.taglink       = "metadata/:tag.html"
  blog.tag_template  = "tag.html"
  blog.year_template = "calendar.html"
end

# Create an RFC4122 UUID http://www.ietf.org/rfc/rfc4122.txt
set :uuid, UUID.create_sha1('darrenknewton.com', UUID::NameSpace_URL)

# Assemble resources to generate archive pages, Atom & JSON feeds
ready do
  archive_resources = []
  blog.articles.group_by {|a| a.date.year }.each do |year, year_articles|
    archive_resources << {:year => year, :articles => year_articles}
  end
  page "/archive.html", :layout => :generic do
    @archives = archive_resources
  end
  blog.articles.each do |a|
    page "#{a.url}atom.xml", :proxy => "/atom_single.xml", :layout => false, :ignore => true do
      @atom_article = a
    end
    page "#{a.url}atom.json", :proxy => "/json_single.json", :layout => false, :ignore => true do
      @atom_article = a
    end
  end
end

### 
# Compass
###

# Change Compass configuration
# compass_config do |config|

#   config.output_style    = :compact
#   config.sass_dir        = "sass"
#   config.css_dir         = "css"
#   config.images_dir      = "img"
#   config.javascripts_dir = "js"
# end

###
# Haml
###

# CodeRay syntax highlighting in Haml
# First: gem install haml-coderay
# require 'haml-coderay'

# CoffeeScript filters in Haml
# First: gem install coffee-filter
# require 'coffee-filter'

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

###
# Page command
###

# Per-page layout changes:
# 
# With no layout
# page "/path/to/file.html", :layout => false
# 
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
# 
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

set :markdown_engine, :kramdown
set :markdown, :layout_engine => :erb, :tables => true, :autolink => true

page "/index.html", :layout => false
page "404.html", :layout => false
page "/biography/index.html", :layout => "generic"
page "/articles/index.html", :layout => false
page "/sitemap.xml", :layout => "sitemap.xml"
page "/feed.rss", :layout => "feed.rss"
page "/atom.xml", :layout => "atom.xml"
page "/atom.json", :proxy => "/json_articles.json", :layout => false, :ignore => true do
  @atom_article = ''
end


# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

use Rack::Codehighlighter, 
  :pygments_api,
  :element => "pre>code",
  :pattern => /\A:::([-_+\w]+)\s*\n/,
  :markdown => true

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  # Properly format a content_entry_asset
  def entry_asset(img, url = nil)
    img_tag = image_tag img[:url], :itemprop => "image", :alt => img[:alt], :title => img[:title]
    unless url.nil?
      img_tag = link_to img_tag, url
    end
    '<div class="entry-content-asset photo-full">' + img_tag + '</div>'
  end

  # Strip all HTML tags from string
  def strip_tags(html)
    Sanitize.clean(html.strip).strip
  end
end
helpers CoderWallHelpers
set :achievements, CoderWallHelpers.achievements_of("darrenn")

# Change the CSS directory
set :css_dir, "css"

# Change the JS directory
set :js_dir, "js"

# Change the images directory
set :images_dir, "img"

# Build-specific configuration
configure :build do
  activate :minify_css
  #activate :gzip
  #activate :cache_buster
  activate :asset_hash
  
  # Minify Javascript on build
  # activate :minify_javascript
  
  # Enable cache buster
  # activate :cache_buster
  
  # Use relative URLs
  # activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  # set :http_path, "/Content/images/"
end
