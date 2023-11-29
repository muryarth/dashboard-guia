const GetCurrentTimeObject = () => {
  const Local = new Date().toLocaleString();
  const UTC = new Date();
  return {
    Local: Local,
    UTC: UTC,
  };
};

export { GetCurrentTimeObject };
