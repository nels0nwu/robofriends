import { CHANGE_SEARCH_FIELD } from './constants.js'

export function setSearchField(text) {
    return { type: CHANGE_SEARCH_FIELD, payload: text }
}