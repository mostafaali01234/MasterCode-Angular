import { Actions, createEffect, ofType } from "@ngrx/effects";
import { languageAction } from "./language.action";
import { tap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class LanguageEffect{

    saveLanguage$;

    constructor(private actions:Actions){
        this.saveLanguage$=createEffect(()=>this.actions.pipe(
            ofType(languageAction),
            tap((action)=>{
                localStorage.setItem("lang",action.lang)
            })
        ),{dispatch:false})
    }
}