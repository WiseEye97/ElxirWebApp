# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#Hello.Repo.insert!(Hello.Accounts.Player.changeset(%Hello.Accounts.Player{},%{email: "my_email@provider.com", password: "s3cr3t",name: "WiseEye"}))
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
#Hello.Repo.get_by(Hello.Accounts.Player,name: "WiseEye")