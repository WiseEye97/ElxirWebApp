defmodule HelloWeb.SessionsView do
    use HelloWeb, :view
    use HelloWeb, :controller

    def render(conn,"show.json", auth_token) do
      json(conn,%{status: "ok",token: auth_token})
    end
end