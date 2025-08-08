let fixturesData = [];

fetch('mock/fixtures.json')
  .then(response => response.json())
  .then(data => {
    fixturesData = data;
    renderFixtures(data);
  });

function renderFixtures(fixtures) {
  const container = document.getElementById('fixtures');
  fixtures.forEach((fixture, index) => {
    const div = document.createElement('div');
    div.className = 'fixture';
    div.innerHTML = `
      <strong>${fixture.home} vs ${fixture.away}</strong><br/>
      <label>
        <input type="radio" name="tip-${index}" value="${fixture.home}" /> ${fixture.home}
      </label>
      <label>
        <input type="radio" name="tip-${index}" value="${fixture.away}" /> ${fixture.away}
      </label>
    `;
    container.appendChild(div);
  });
}

function submitTips() {
  const tips = [];
  fixturesData.forEach((fixture, index) => {
    const selected = document.querySelector(`input[name="tip-${index}"]:checked`);
    tips.push({
      match: `${fixture.home} vs ${fixture.away}`,
      tip: selected ? selected.value : 'No tip'
    });
  });

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<h2>Your Tips</h2>';
  tips.forEach(tip => {
    resultsDiv.innerHTML += `<p>${tip.match}: <strong>${tip.tip}</strong></p>`;
  });
}