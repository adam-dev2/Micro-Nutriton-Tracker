document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('foodForm');
  const foodNameInput = document.getElementById('foodName');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const foodName = foodNameInput.value;

      try {
          const response = await fetch(`http://localhost:5000/api/fooditems/${foodName}`);
          const data = await response.json();

          if (response.ok) {
              resultDiv.innerHTML = `
                  <h2>${data.name}</h2>
                  <p><strong>Protein:</strong> ${data.nutrients.Protein}</p>
                  <p><strong>Vitamin D:</strong> ${data.nutrients["Vitamin D"]}</p>
                  <p><strong>Calcium:</strong> ${data.nutrients.Calcium}</p>
                  <p><strong>Iron:</strong> ${data.nutrients.Iron}</p>
                  <p><strong>Potassium:</strong> ${data.nutrients.Potassium}</p>
                  <p><strong>Vitamin A:</strong> ${data.nutrients["Vitamin A"]}</p>
                  <p><strong>Vitamin C:</strong> ${data.nutrients["Vitamin C"]}</p>
              `;
          } else {
              resultDiv.innerHTML = `<p>${data.message}</p>`;
          }
      } catch (error) {
          resultDiv.innerHTML = `<p>Error fetching nutrition info</p>`;
      }
  });
});
