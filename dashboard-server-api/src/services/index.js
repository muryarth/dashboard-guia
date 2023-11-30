const GetCurrentTimeObject = () => {
  const DateBR = new Date().toLocaleString();
  const DateUTC = new Date();
  return {
    FormatBR: DateBR,
    FormatUTC: DateUTC,
  };
};

export { GetCurrentTimeObject };
