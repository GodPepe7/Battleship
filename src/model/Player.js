import Ship from "./Ship";
import GameBoard from "./GameBoard";

const Player = () => {
  const gameBoard = GameBoard();
  const ships = [];
  ships.push(Ship(5));
  ships.push(Ship(4));
  ships.push(Ship(3));
  ships.push(Ship(3));
  ships.push(Ship(2));

  const attackEnemy = (x, y, enemyGameBoard) => {
    enemyGameBoard.receiveAttack(x, y);
  };

  const computerAttackEnemy = (enemyGameBoard) => {
    const attackedFields = enemyGameBoard.getAttackedFields();
    const notAttacked = [];
    for (let i = 0; i < 100; i++) {
      if (!attackedFields.has(i)) notAttacked.push(i);
    }
    const randomIndex = Math.floor(Math.random() * notAttacked.length);
    const attackCoordinate = notAttacked[randomIndex];
    const attackY = Math.floor(attackCoordinate / 10);
    const attackX = attackCoordinate - attackY * 10;
    enemyGameBoard.receiveAttack(attackX, attackY);
  };

  return { gameBoard, ships, attackEnemy, computerAttackEnemy };
};

export default Player;
