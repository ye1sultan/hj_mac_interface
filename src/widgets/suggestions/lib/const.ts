interface ISuggestion {
  id: number;
  text: string;
  variant: "active" | "previous";
}

export const mockSuggestions: ISuggestion[] = [
  {
    id: 1,
    text: "Спросите клиента о его целях и мотивации.",
    variant: "previous",
  },
  {
    id: 2,
    text: "Уточните, почему он проявил интерес именно сейчас.",
    variant: "previous",
  },
  {
    id: 3,
    text: "Предложите бесплатную пробную тренировку для начала.",
    variant: "previous",
  },
  {
    id: 4,
    text: "Расскажите о преимуществах занятий в вашем клубе.",
    variant: "previous",
  },
  {
    id: 5,
    text: "Узнайте о предыдущем опыте клиента в спорте.",
    variant: "previous",
  },
  {
    id: 6,
    text: "Предложите несколько разных программ на выбор.",
    variant: "previous",
  },
  {
    id: 7,
    text: "Акцентируйте внимание на индивидуальном подходе.",
    variant: "active",
  },
  {
    id: 8,
    text: "Уточните предпочтительное время для тренировок.",
    variant: "active",
  },
  {
    id: 9,
    text: "Спросите, что важно для клиента при выборе клуба.",
    variant: "active",
  },
];
