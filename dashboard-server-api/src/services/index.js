const GetCurrentTimeObject = () => {
  const DateBR = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const DateUTC = new Date();
  return {
    FormatBR: DateBR,
    FormatUTC: DateUTC,
  };
};

export { GetCurrentTimeObject };
