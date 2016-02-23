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



card model
card collection

settings/project model?

user model


ofr just prjecrts


how do model contain otehr models? or do i not do that




TO DO
different card/text sizes for browser width 
sortagbe cards on touch devices]
two views
-classic
-modern
colro sets
-absic
-extended

-text area height calcualted as mutipel of lineheihgt.

save every 5 seconds - if chages occured

-settigns file "save every 5000 ms"

layout
	-freestyle/grid 


nav opens adds overlay to main area - clicking main area clses nav

hot to remove those little marks from a textarea

"single clickt drag --- double click to edit"

size select "sm md lg" for cards (in panel nav)


settings (witout opening)

-zoom (sm  md lg)
-new card
-delete card


settings (open)
-color scheme?
-style (modern/classic)
-auto save


-- undo???
-make card size animate

-make moving around animate


body
	-workspace
	-settings (doesnt overlay - pushes?)



opening
	- click a card to edit
	- drag from the top to re-order
	- click the plus to add a enw card, and the trash to remove
	- flip the the card for more options
	- cahgen size from the right. open the nav for more options
	- have fun
	- your project is automatically saved, and will be here next time
	- "log in with facebook" or "i just want play" (this means your proejcts cant be saved. log in to save proejcts.)



log in
user id 456
-get all cards with user = 456 
cards {
	id = "1"
	user_id = "1"
	project_id "1"
}
user {
	id "1"
	email "pbland"
}

projects {
	id "1"
	user id "1"
	name "my project"
	layout "classic"
}



maybe "aved 14 seconds ago"
"save 3 minutes ago" "saved now"
"autosaved"

how does good do it
"saving" -> "saved" every 5 seconds
-->




	does fielset wrap one or both?
 

	

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

chagne - update model
model --- updates view (new class?) 



google that. how to update class from model atribute in backbone


-choose style from dots on back




------

 createa account
 	PUT users (email password)

 error - email already exists
 password - not strong enough


 authenticate
 	-sent email and password
 	-hash password and match results

 if yes. login. 
 set auth cookie. a long string "dfgsdfgd"
 that also in user

 for every api call - set user id ad auth string

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




nEXT

-grunt 
structue with grunt/back/frone/herkou

public and app?

src and dist??


src -> dist (front)
app (backend)



	
