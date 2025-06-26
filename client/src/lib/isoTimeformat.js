const isoTimeFormat = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // or false for 24-hour format
  });
};

export default isoTimeFormat;


