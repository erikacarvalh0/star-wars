import { Dispatch, ReactElement, ReactPortal, SetStateAction } from "react";
type ReactText = string | number;
export type ReactChild = ReactElement | ReactText | ReactElement[];

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;

type val = string | number | boolean

export type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

export interface iFunction {
    (value: val): void
}

export interface iObject {
    [key: string | number]: string | number | boolean | iObject | undefined | iFunction | ReactNode
}


export type iState = [ any, Dispatch<SetStateAction<any>> ]

export interface iMainContext {
	filtersState: iState,
	allPeopleState: iState,
	listedPeopleState: iState,
	isListLoadingState: iState,
	currPageState: iState,
	searchState: iState,
}
