export function voteCountFilter(votes) {
  const units = ["", "K", "M", "B", "T"];
  let i = 0;

  while (votes >= 1000) {
    votes /= 1000;
    i++;
  }

  return votes.toFixed(1).replace(/([^.]).0+$/, "$1") + units[i];
}
