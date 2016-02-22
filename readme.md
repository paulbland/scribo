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

