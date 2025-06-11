export const calcTotalPrice = (cart) => {
  cart.totalCartPrice = cart.games.reduce(
    (acc, game) => acc + game.quantity * game.price,
    0
  );
};
