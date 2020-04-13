//
const months: string[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const daysOfTheWeek: string[] = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
];

const parseDate = (date: string) => {
  const dateArray = date.split("/");
  const currentDay = new Date().getDay() === 0 ? 1 : new Date().getDay();
  const retDate = `${daysOfTheWeek[currentDay - 1]} ${dateArray[0]} de ${
    months[Number(dateArray[1])]
  }`;
  return retDate;
};

export { parseDate };
