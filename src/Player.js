import Ship from "./Ship";
import Gameboard from "./gameboard";

const Player = () => {
  const ships = [];
  const gameboard = Gameboard();
  ships.push(Ship(5));
  ships.push(Ship(4));
  ships.push(Ship(3));
  ships.push(Ship(3));
  ships.push(Ship(2));
  return { ships, gameboard };
};

export default Player;
