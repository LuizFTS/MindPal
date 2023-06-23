import { Database, cards as typecard } from "@/types/database"

export const data: Database = {
  category: [
  { id: 1, name: "german" },
  { id: 2, name: "spanish" },
  { id: 3, name: "mandarin" },
  { id: 4, name: "french" },
  ]
}

export const cards: typecard = {
  cards: [
    {cardId: 1, categoryId: 1, question: "Hallo", answer: "Olá", status: "easy" },
    {cardId: 2, categoryId: 1, question: "guten morgen", answer: "bom dia", status: "easy"},
    {cardId: 3, categoryId: 1, question: "guten tag", answer: "boa tarde", status: "medium"},
    {cardId: 4, categoryId: 1, question: "ja", answer: "sim", status: "veryeasy"},
    {cardId: 5, categoryId: 1, question: "nein", answer: "não", status: "veryeasy"},
    {cardId: 6, categoryId: 1, question: "bitte", answer: "por favor", status: "easy"},
    {cardId: 7, categoryId: 1, question: "Danke", answer: "obrigado", status: "easy"},
    {cardId: 8, categoryId: 1, question: "Sprechen Sie Portugiesisch?", answer: "você fala português?", status: "hard"},
    {cardId: 9, categoryId: 1, question: "Sprechen Sie Portugiesisch?", answer: "você fala português?", status: "hard"},
    {cardId: 10, categoryId: 1, question: "Sprechen Sie Portugiesisch?", answer: "você fala português?", status: "hard"},
    {cardId: 11, categoryId: 1, question: "Sprechen Sie Portugiesisch?", answer: "você fala português?", status: "hard"},
    {cardId: 12, categoryId: 1, question: "Sprechen Sie Portugiesisch?", answer: "você fala português?", status: "hard"},
    {cardId: 13, categoryId: 1, question: "Sprechen Sie Portugiesisch?", answer: "você fala português?", status: "hard"},
    {cardId: 14, categoryId: 1, question: "Sprechen Sie Portugiesisch?", answer: "você fala português?", status: "hard"},
    {cardId: 15, categoryId: 1, question: "Sprechen Sie Portugiesisch?", answer: "você fala português?", status: "hard"},
    {cardId: 16, categoryId: 1, question: "Sprechen Sie Portugiesisch?", answer: "você fala português?", status: "hard"},
    {cardId: 9, categoryId: 2, question: "Hola", answer: "Olá", status: "easy"},
    {cardId: 10, categoryId: 2, question: "buenos dias", answer: "bom dia", status: "easy"},
    {cardId: 11, categoryId: 2, question: "buenas tardes", answer: "boa tarde", status: "easy"},
    {cardId: 12, categoryId: 3, question: "你好 (nǐ hǎo)", answer: "Olá", status: "easy"},
    {cardId: 13, categoryId: 3, question: "早上好 (zǎo shàng hǎo)", answer: "bom dia", status: "easy"},
    {cardId: 14, categoryId: 3, question: "下午好 (xià wǔ hǎo)", answer: "boa tarde", status: "easy"},
    {cardId: 15, categoryId: 4, question: "Salut", answer: "Olá", status: "easy"},
    {cardId: 16, categoryId: 4, question: "Bonjour", answer: "bom dia", status: "easy"},
    {cardId: 17, categoryId: 4, question: "bonsoir", answer: "boa tarde", status: "easy"},
  ]
}