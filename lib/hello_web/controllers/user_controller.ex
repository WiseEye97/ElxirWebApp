defmodule HelloWeb.UserController do
    use HelloWeb, :controller

    alias Hello.Accounts
    alias Encryption.PasswordField

    require Logger
  
    def login(conn, params) do
        {:ok,loginValue} = Map.fetch(params,"login")
        Logger.info(loginValue)
        {user_token,conn} = put_user_token(conn)
        json(conn,%{status: "ok",token: user_token})
    end

    def register(conn,params) do
        %{"nick" => nick,"email" => email,"password" => password} = params

        case Accounts.is_nick_or_email_exists?(nick,email) do
            nil -> 
                json(conn,%{status: "Error"})
            _ ->
                hashed = PasswordField.hash_password(password)
                case Accounts.create_player(%{name: nick, email: email, password: hashed}) do
                    {:ok, _struct} -> json(conn,%{status: "Success"})
                    _ -> json(conn,%{status: "Error"})
                end
        end
        
    end

    defp put_user_token(conn) do
        token = Phoenix.Token.sign(conn, "user socket", 69)
        #assign(conn, :user_token, token)
        {token,conn}
    end
  end