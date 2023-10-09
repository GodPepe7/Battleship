const Ship = (len) => {
  let hits = 0;
  const length = len;
  const getHits = () => hits;
  const hit = () => {
    hits += 1;
  };
  const isSunk = () => length - hits <= 0;
  return { length, hit, isSunk, getHits };
};

export default Ship;
