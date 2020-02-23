defmodule Hello.AuthToken do
  use Ecto.Schema
  import Ecto.Changeset
  alias Hello.AuthToken
  alias Hello.Accounts.Player

  schema "auth_tokens" do
    belongs_to :player, Player , foreign_key: :player_id
    field :revoked, :boolean, default: false
    field :revoked_at, :utc_datetime
    field :token, :string
    #field :player_id, :id

    timestamps()
  end

  @doc false
  def changeset(auth_token, attrs) do
    auth_token
    |> cast(attrs, [:token, :revoked, :revoked_at])
    |> validate_required([:token, :revoked, :revoked_at])
    |> unique_constraint(:token)
  end
end
