psql -f install.sql -U postgres
PGPASSWORD=marcus psql -d example -f ./messenger/structure.sql -U marcus
PGPASSWORD=marcus psql -d example -f ./messenger/data.sql -U marcus
PGPASSWORD=marcus psql -d example -f ./football-players-search/structure.sql -U marcus
PGPASSWORD=marcus psql -d example -f ./football-players-search/data.sql -U marcus
