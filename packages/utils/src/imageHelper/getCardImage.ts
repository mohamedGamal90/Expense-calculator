export function getCardImage(cardProductNumber: string) {
  switch (cardProductNumber) {
    case "70000473":
      return require(`./images/world-elite.png`);
    case "70000475":
      return require(`./images/platinum-debit.png`);
    case "70000476":
      return require(`./images/platinum-debit.png`);
    case "70000477":
      return require(`./images/platinum-debit.png`);
    case "70000478":
      return require(`./images/platinum-debit.png`);
    case "70000479":
      return require(`./images/business.png`);
    case "70000480":
      return require(`./images/corporate.png`);
    default:
      return require(`./images/platinum-debit.png`);
  }
}
