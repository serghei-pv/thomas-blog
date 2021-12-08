export function formatDate(createdAt: any): string {
  createdAt = createdAt.substring(0, 10);

  let date: string = new Date(createdAt).toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return date;
}
