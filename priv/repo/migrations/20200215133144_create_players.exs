defmodule Hello.Repo.Migrations.CreatePlayers do
  use Ecto.Migration

  def change do
    create table(:players) do
      add :name, :string
      add :email, :string
      add :password, :string

      timestamps()
    end

  end
end
