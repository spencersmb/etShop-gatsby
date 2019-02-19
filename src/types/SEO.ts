export interface IMeta {
	name: string,
	content: string,
}

export interface IOGType {
	property: string,
	content: string,
}

export type IMetas = IOGType | IMeta

export interface ISeo {
	description?: string
	lang?: string
	meta?: IMetas[],
	keywords?: string[],
	title: string,
	children?: any
}