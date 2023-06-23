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
  updatedAt?: string,
  userid?: string,
  __v?: number
  _id?: string
}

export interface DBContextType {
  lists: ListCardType[];
  setLists: React.Dispatch<React.SetStateAction<ListCardType[]>>;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

export interface ReviewContextType {
  category: string | null,
  setCategory: React.Dispatch<React.SetStateAction<string | null>>
}