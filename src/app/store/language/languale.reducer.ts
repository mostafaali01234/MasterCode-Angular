import { createReducer, on } from "@ngrx/store";
import { languageAction } from "./language.action";

const initialState=localStorage.getItem("lang")?localStorage.getItem("lang") : "ar";

export const languageReducer = createReducer(
    initialState,
    on(languageAction, (state,action) => action.lang)
)