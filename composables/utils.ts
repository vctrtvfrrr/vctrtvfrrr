export function formatDate(string: string) {
  const options: Object = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(string).toLocaleDateString("pt-BR", options);
  return date;
}

export function replaceHyphen(slug: string) {
  return String(slug).replaceAll("-", " ");
}
