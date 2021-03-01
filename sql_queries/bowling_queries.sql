
use bowlingleagueexample;
SELECT b2.TeamName, b2.team_captain, concat(b1.BowlerFirstName, ' ', b1.BowlerLastName) AS bowler_full_name
FROM bowlers as b1
INNER JOIN (
SELECT teams.TeamName, concat(b.BowlerFirstName, ' ', b.BowlerLastName) AS team_captain, teams.TeamID, b.BowlerID
FROM teams INNER JOIN bowlers AS b ON teams.CaptainID = b.BowlerID
) AS b2 ON b1.TeamID = b2.TeamID;