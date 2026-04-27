export interface AgendaItem {
  time: string;
  title: string;
}

export const agenda: AgendaItem[] = [
  { time: "08:00 AM", title: "Prelim Stage 1" },
  { time: "09:00 AM", title: "Knockout Stage 2" },
  { time: "10:00 AM", title: "Quarter-Final" },
  { time: "12:00 PM", title: "Semi-Final 4-A & 4-B" },
  { time: "02:00 PM", title: "Final Stage 5-A" },
  { time: "04:00 PM", title: "Final Stage 5-B" },
];