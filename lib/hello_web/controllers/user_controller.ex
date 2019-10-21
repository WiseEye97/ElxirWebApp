defmodule HelloWeb.UserController do
    use HelloWeb, :controller
    require Logger
  
    def login(conn, params) do
        {:ok,loginValue} = Map.fetch(params,"login")
        Logger.info(loginValue)
        {user_token,conn} = put_user_token(conn)
        text(conn,"Hello #{user_token}")
    end

    defp put_user_token(conn) do
        token = Phoenix.Token.sign(conn, "user socket", 69)
        #assign(conn, :user_token, token)
        {token,conn}
    end
  end