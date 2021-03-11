
Auth0 add on - heroku
 Status model


# big things

- user/project/card structure

- figure out set/save/deboucned logic for all saevs

- status model (unsaved/saving/saved)

- loading status for wen loading all cards

- maybe that modal plugin for confirms?

- cant click card on safari/ff arrow looks weird

- add/test twitter login

- work out if im iusing the correct used id  in cards ?

- check out if security is even close to being correct... (can users access things they shoudlnt?)



----


user logs in

we get email, send to db and get user id

then we get all projects for this user

they pick a project and we get all card for this project


---how to make srue someone doenst fake user id? 


eg GET /api/users {user_id = 456}
???


user {
	_id : 1,
	email : "paul.bland@gmail.com",
	theme : "classic"
}

project {
	_id : 1,
	user_id : 1,
	name : "my project name",
}

card {
	_id : 1,
	project_id : 2,
	text : "hi there",
	color: 3,
	order: 1
}



settings/project model?

user model

ofr just prjecrts


how do model contain otehr models? or do i not do that




TO DO
different card/text sizes for browser width 
sortagbe cards on touch devices]

colro sets
-basic
-extended

-text area height calcualted as mutipel of lineheihgt.


nav opens adds overlay to main area - clicking main area clses nav


size select "sm md lg" for cards (in panel nav)



-- undo???
-make card size animate



opening
	- click a card to edit
	- drag from the top to re-order
	- click the plus to add a enw card, and the trash to remove
	- flip the the card for more options
	- cahgen size from the right. open the nav for more options
	- have fun
	- your project is automatically saved, and will be here next time
	- "log in with facebook" or "i just want play" (this means your proejcts cant be saved. log in to save proejcts.)






maybe "aved 14 seconds ago"
"save 3 minutes ago" "saved now"
"autosaved"

how does good do it
"saving" -> "saved" every 5 seconds
-->



	

	project model
	project settings view
		-theme (addds class
		-size

	load new project settings?
		your projects
		-my projcet
		-my other proejct 

		alwas visivble


		does model control radi aor radio control modle?
		model updates view on sync
		but view updates model too.. i guess




		user_id = 1
		project = 1
		/api/cards/ - get all cards where user_id=1,project_id=1

		is this how we do it?

		is it just user -> proejcts -> card all together?





or jsut clikc "classic" and it updates model?
no use inout

chagne --- update model
model --- updates view (new class?) 



google that. how to update class from model atribute in backbone





------

 

 make sure user id and auth string match


PUT /api/user {email/pass}

get projects
get cards
set current project

load new project --- all new cards.
card collection IS a project.

no
project and cards and separete

GET /api/project/1  (plus user detials? how to set user detials with get req?


how to do auth with GET requests?//
GET /api/project/?userId=1&token=fsgfsd ?

GET /api/cards?userID=1 ..... ?get a all user id cards?






http://backbone.undojs.com/



-undo?
	-for every change, save the cards json as revison
	-undo steps back one
	
	
	
TO DO
---loading state for cards (takes too long)


NEXT
----
if the app hasnt got the reponse back from POST --- it doesnt know id, so it sends another post when the user hits the ketys



maybe everything runs "set" then "debouced save"

-color
-sort
-update text

?? n


---


should i be using cards viwe that gets collection?

is there a btter eay to updte all modesl from view 


----what is the pattern to get FB logina nd auth my own app?

--- do i store userid in cards?
-and project id?
-and user id in projects?

user
	-id
projects
	-id
	-userid
cards
	-id
	-userid
	-projectid


	




NEW TO DO

----

chage so mongo db doesnt allow access from any ip 
https://cloud.mongodb.com/v2/604979ee8375d37d6e93bcd0#security/network/accessList