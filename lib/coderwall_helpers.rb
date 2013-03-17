require "open-uri"
require "json"

module CoderWallHelpers
  class Achievement
    attr_reader :name, :badge, :description, :created

    def initialize(hashed_badge)
      @name, @description, @created, @badge = hashed_badge.values
    end
  end

  module_function

  def achievements_of(username)
    raise(ArgumentError, "Invalid username") if username.empty?
    url = URI.escape("https://coderwall.com/#{username}.json")
    begin
      response = JSON.load(open(url))
    rescue OpenURI::HTTPError
      raise(ArgumentError, "Invalid username")
    end

    response["badges"].map { |badge| Achievement.new(badge) }
  end
end