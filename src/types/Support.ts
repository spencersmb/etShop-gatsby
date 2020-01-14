export interface ISupportQuestion {
	title: string
	slug: string
	excerpt: string
	content: string
	acfSupportQuestions: {
		popularity: number
	}
}

export interface ICategory {
	count: number
	name: string
	slug: string
	supportQuestions: {
		nodes: ISupportQuestion[]
	}
}

export interface ISupportCategory {
	count: number,
	name: string
	slug: string
	supportQuestions: {
		nodes: ISupportQuestion[]
	}
}

export interface ISupportCatQuery {
	wpgraphql: {
		categories: {
			nodes: ISupportCategory[]
		}
	}
}

export interface ISupportQuestionQuery {
	pageContext: {
		content: string
	}
	wpgraphql: {
		supportQuestion: ISupportQuestion
	}
}
