export interface ISupportQuestion {
	title: string
	slug: string
	excerpt: string
	content: string
}

export interface ICategory {
	name: string
	slug: string
	excerpt: string
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
