"use strict";

const List = require("./List");
const TidalApi = require("../TidalApi");
const Track = require("../Track");
const Artist = require("../Artist");

module.exports = class TidalList extends List{
    constructor(message, objects, type) {
        super(message, objects);
        let nameIndex;

        switch(type) {
            case TidalApi.searchTypes.TRACKS:
                nameIndex = "title";
                break;

            case TidalApi.searchTypes.ARTISTS:
                nameIndex = "name";
                break;
        }

        this.objects = objects.map(object => {
            switch(type) {
                case TidalApi.searchTypes.TRACKS:
                    object = new Track(object); 
                    break;

                case TidalApi.searchTypes.ARTISTS:
                    object = new Artist(object);
                    break;
            }
            return {
                name: object[nameIndex],
                value: object
            }
        });
    }
}