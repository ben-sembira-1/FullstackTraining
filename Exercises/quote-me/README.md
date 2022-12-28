# Quote Me / Iconic!

This is a web-app for uploading and browsing through iconic quotes that has been uploaded by others.

## The User

The users of this app are people that work together in the same organization.
The website is supposed to be maintained by the organization.

## About

In the app main screen a user can:
- browse the quotes available for him
	- Sorting will be available by *recent* or by *best*
- see the most iconic persons
- upload a new quote

On each quote a user can react with:
- like
- superb
- comments
A user can see anytime quotes that he liked or comented on.

The *iconicity* of a person in this social network will be calculated by the amount of quotes he has in the system, and the amount of likes/superbs his quotes got.
Other then the *iconicity*, a user can have a badge of *rocking*, *rising star*, etc.. which will be determined by the iconicity gained over the recent time.
In the global feed

Each quote that is being uploaded will be public to all the users that are in the same group as the quoted person.

## Specification

- There is a [specification](specification/specification.md) for this website. It is recomended to read it before going in to details.

## Steps

### Frontend
1. Frontend - mock server with delay [internals]
1. Frontend - Login screen (mock data) [independent screen]
1. Frontend - Feed screen (mock data) [independent screen]
1. Frontend - Upload button (mock data) [pop-up on the feed screen]
1. Frontend - User profile screen (mock data) [pop-up on the feed screen]
### Backend
1. Backend - login
1. Backend - users [DB]
1. Backend - groups [DB]
1. Backend - quotes [DB]

## Future

The app will give each user an option to choose its own privacy options:
- everyone
- specific groups
- specific people
- private
Acording to those options, every time someone will upload a quote of a user, the people that will see it will be the people that the quoted user set in its privacey options.
