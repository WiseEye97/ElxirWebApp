defmodule HelloWeb.Router do
  use HelloWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", HelloWeb do
    pipe_through :api

    post "/login", UserController, :login
    post "/register", UserController, :register
  end

  scope "/", HelloWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

end
