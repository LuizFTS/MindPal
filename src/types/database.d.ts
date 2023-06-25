
export interface DataCategory {
  id: number,
  name: string,
}

export interface Database {
  category: Array<DataCategory>
}

export interface card {
  cardId: number,
  categoryId: number,
  question: string,
  answer: string,
  status: string, 
}

export interface cards {
  cards: Array<card>,
}

