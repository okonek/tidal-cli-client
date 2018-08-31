const Activity = require("../abstract/Activity");
const blessed = require("blessed");
const actions = require("../../actions");
const List = require("../uiComponents/basicUI/List");
const ApiInterface = require("../../backend/api/ApiInterface");
const listTypes = require("../uiComponents/specializedUI/List/listTypes");
const errors = require("./userInputActions/errors");

module.exports = class extends Activity {
	constructor(parent, store, options) {
		super(parent, blessed.box({
			width: "shrink",
			height: "shrink",
		}));
		this.store = store;

		this.searchValue = options.searchValue;
		this.searchTypesList = this.getSearchTypesList();
		this.children = [this.searchTypesList];
	}

	get tidalApi() {
		return this.store.getState().basic.tidalApi;
	}

	getSearchTypesList() {
		let searchTypesList = new List(this, {
			width: "100%",
			height: "95%"
		}, Object.values(ApiInterface.SEARCH_TYPES), Object.keys(ApiInterface.SEARCH_TYPES));

		searchTypesList.bindOnItemSelect(this.searchTypesListElementSelected.bind(this));

		return searchTypesList;
	}

	getResultsList(type, elements) {
		let listType = listTypes(type);

		return new listType(this, {
			width: "100%",
			height: "95%"
		}, this.store, elements);
	}

	async searchTypesListElementSelected(element) {
		let resultsList = this.getResultsList(element);
		await this.showElements([resultsList]);
		let searchResults = [];
		try {
			searchResults = await this.tidalApi.search(this.searchValue, element);
		}
		catch (e) {
			this.store.dispatch(actions.ui.showError(errors.tidalError.message));
		}
		resultsList.setElements(searchResults);
	}

	async run() {
		await this.showElements(this.children);
	}
};