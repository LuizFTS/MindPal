export interface ListCardType {
  category: string,
  createdAt: string,
  updatedAt: string,
  userid: string,
  __v: number
  _id: string
} 

export interface CardType {
  category: string,
  createdAt?: string,
  difficulty: string,
  question: string,
  answer: string,
  reviewAt?: string,
  updatedAt?: string,
  userid?: string,
  __v?: number,
  _id?: string,
  review?: boolean,
}

export interface DBContextType {
  lists: ListCardType[];
  setLists: React.Dispatch<React.SetStateAction<ListCardType[]>>;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  refreshData: () => Promise<any>
}

export interface ReviewContextType {
  category: ReviewContextCategoryObject | null,
  setCategory: React.Dispatch<React.SetStateAction<ReviewContextCategoryObject | null>>,
  cards: CardType[],
  setCards: React.Dispatch<React.SetStateAction<CardType[] | null>>
}

export interface ReviewContextCategoryObject {
  name: string,
  id: string
}