defmodule HelloWeb.SessionsController do
    use HelloWeb, :controller
    alias Hello.Accounts.Player
    
    def create(conn, %{"login" => nick, "password" => password}) do
      case Player.sign_in(nick, password) do
        {:ok, auth_token} ->
          conn
          |> put_status(:ok)
          |> json(%{status: "ok",token: auth_token.token})
        {:error, reason} ->
          conn
          |> send_resp(401, reason)
      end
    end

    def delete(conn, _) do
      case Player.sign_out(conn) do
        {:error, reason} -> conn |> send_resp(400, reason)
        {:ok, _} -> conn |> send_resp(204, "")
      end
    end

end