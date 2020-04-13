function getCelcius(kelvin: number, decimals: number = 1) {
  return Number((kelvin - 273.1).toFixed(decimals));
}

export { getCelcius };
