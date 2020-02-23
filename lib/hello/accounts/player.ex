defmodule Hello.Accounts.Player do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false
  alias Hello.Repo

  schema "players" do
    has_many :auth_tokens, Hello.AuthToken
    field :email, :string
    field :name, :string
    field :password, :string

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:name, :email, :password])
    |> validate_required([:name, :email, :password])
  end

  alias Hello.Services.Authenticator
  
  def sign_in(nick, _password) do
    player = Hello.Accounts.get_player_by_nick!(nick)
    token = Authenticator.generate_token(player.id)
    Repo.insert(Ecto.build_assoc(player, :auth_tokens, %{token: token}))
  end
  
  def sign_out(conn) do
    case Authenticator.get_auth_token(conn) do
      {:ok, token} ->
        case Repo.get_by(AuthToken, %{token: token}) do
          nil -> {:error, :not_found}
          auth_token -> Repo.delete(auth_token)
        end
      error -> error
    end
  end
end
