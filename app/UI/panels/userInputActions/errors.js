module.exports = {
	undefinedSearchValue: Error("Enter the search query"),
	unexistingCommand: Error("This command doesn't exist"),
	cannotInputWhenNotLoggedIn: Error("You have to login first"),
	"Username and password are required arguments of login()": Error("Enter login and password"),
	"Username or password is wrong": Error("The username or password is wrong"),
	tidalError: Error("Tidal error has occurred, please try again")
};