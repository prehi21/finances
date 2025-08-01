function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}
document.getElementById('cc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('cc-name').value;
  const balance = parseFloat(document.getElementById('cc-balance').value);
  const rate = parseFloat(document.getElementById('cc-rate').value);
  const minimum = parseFloat(document.getElementById('cc-minimum').value);
  const months = estimatePayoffMonths(balance, rate, minimum);
  const card = { name, balance, rate, minimum, months };
  addCardToList(card);
});
function estimatePayoffMonths(balance, rate, monthlyPayment) {
  const monthlyRate = rate / 100 / 12;
  if (monthlyPayment <= balance * monthlyRate) return Infinity;
  let months = Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate)) / Math.log(1 + monthlyRate);
  return Math.ceil(months);
}
function addCardToList(card) {
  const list = document.getElementById('cc-list');
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <strong>${card.name}</strong><br/>
    Balance: $${card.balance.toFixed(2)}<br/>
    Interest Rate: ${card.rate}%<br/>
    Min Payment: $${card.minimum.toFixed(2)}<br/>
    <strong>Estimated Payoff: ${card.months} months</strong>
  `;
  list.appendChild(div);
}
