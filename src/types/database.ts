
interface DataCategory {
  id: number,
  name: string,
}

export interface Database {
  category: Array<DataCategory>
}

interface card {
  cardId: number,
  categoryId: number,
  question: string,
  answer: string,
  status: string, 
}

export interface cards {
  cards: Array<card>,
}

