//option choosing functionality.
// Get the select element
const select = document.getElementById('problem-select');

// Listen for changes to the select element
select.addEventListener('change', function() {
  // Get the selected option value
  const selectedOption = select.value;

  // Disable the select element
  select.disabled = true;

  // Make the select element appear disabled by changing its background color
  select.style.backgroundColor = 'grey';

  // Disable all other form elements in the main element
  const main = document.querySelector('main');
  const formElements = main.querySelectorAll('input, textarea, button');
  formElements.forEach(function(element) {
    if (element.closest('.problem-container').id !== selectedOption + '-container') {
      element.disabled = true;
    }
  });
});
//Longest Comman SubSequence Functionality.
// Get the necessary elements from the DOM.
const lcsInputA = document.getElementById('lcs-input-a');
const lcsInputB = document.getElementById('lcs-input-b');
const lcsOutput = document.getElementById('lcs-output');
const lcsSolveBtn = document.getElementById('lcs-solve-btn');

// Add an event listener to the Solve button
lcsSolveBtn.addEventListener('click', () => {
  // Get the input values
  const inputA = lcsInputA.value;
  const inputB = lcsInputB.value;

  // Validate the input values
  if (typeof inputA !== 'string' || typeof inputB !== 'string') {
    lcsOutput.innerText = 'Invalid Input';
    return;
  }

  // Perform the longest common subsequence algorithm
  const n = inputA.length;
  const m = inputB.length;
  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => 0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (inputA[i - 1] === inputB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Get the longest common subsequence
  let i = n, j = m;
  const lcs = [];
  while (i > 0 && j > 0) {
    if (inputA[i - 1] === inputB[j - 1]) {
      lcs.unshift(inputA[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  // Output the result
  if (lcs.length > 0) {
    lcsOutput.innerText = `Longest Common Subsequence: ${lcs.join('')}`;
  } else {
    lcsOutput.innerText = 'No Common Subsequence';
  }
});
//Matrix Chain Multiplicaton Functionality.
// Get references to the necessary elements
const mcmContainer = document.getElementById("mcm-container");
const mcmInput = document.getElementById("mcm-input");
const mcmSolveBtn = document.getElementById("mcm-solve-btn");
const mcmOutput = document.getElementById("mcm-output");

// Add event listener for the "Solve" button
mcmSolveBtn.addEventListener("click", () => {
  // Parse the input string into an array of integers
  const dimensions = mcmInput.value.split(" ").map(Number);
  
  // Check if input is valid
  if (dimensions.length < 2) {
    mcmOutput.textContent = "Invalid input";
    return;
  }
  
  // Initialize a 2D array to store the minimum number of multiplications
  const minMultiplications = Array.from({ length: dimensions.length - 1 }, () => Array(dimensions.length - 1).fill(0));

  // Solve the problem using dynamic programming
  for (let chainLength = 2; chainLength <= dimensions.length - 1; chainLength++) {
    for (let i = 1; i <= dimensions.length - chainLength; i++) {
      const j = i + chainLength - 1;
      minMultiplications[i - 1][j - 1] = Number.MAX_SAFE_INTEGER;
      for (let k = i; k <= j - 1; k++) {
        const q = minMultiplications[i - 1][k - 1] + minMultiplications[k][j - 1] + dimensions[i - 1] * dimensions[k] * dimensions[j];
        if (q < minMultiplications[i - 1][j - 1]) {
          minMultiplications[i - 1][j - 1] = q;
        }
      }
    }
  }
  
  // Output the result
  mcmOutput.textContent = `Minimum number of multiplications: ${minMultiplications[0][dimensions.length - 2]}`;
});
//0/1 knapsnack functionality.
// get the elements
const capacityInput = document.getElementById("knapsack-capacity");
const itemsInput = document.getElementById("knapsack-items");
const solveButton = document.getElementById("knapsack-solve-btn");
const outputDiv = document.getElementById("knapsack-output");

// add event listener to solve button
solveButton.addEventListener("click", () => {
  // get capacity and items
  const capacity = parseInt(capacityInput.value);
  const items = itemsInput.value.split("\n");

  // parse items into weight-value pairs
  const parsedItems = items.map((item) => {
    const [weight, value] = item.split(" ");
    return { weight: parseInt(weight), value: parseInt(value) };
  });

  // initialize memoization table
  const memo = [];
  for (let i = 0; i <= parsedItems.length; i++) {
    memo[i] = [];
    for (let j = 0; j <= capacity; j++) {
      memo[i][j] = 0;
    }
  }

  // populate memoization table
  for (let i = 1; i <= parsedItems.length; i++) {
    for (let j = 1; j <= capacity; j++) {
      const currentItem = parsedItems[i - 1];
      if (currentItem.weight > j) {
        memo[i][j] = memo[i - 1][j];
      } else {
        memo[i][j] = Math.max(
          memo[i - 1][j],
          memo[i - 1][j - currentItem.weight] + currentItem.value
        );
      }
    }
  }

  // find the selected items
  const selectedItems = [];
  let i = parsedItems.length;
  let j = capacity;
  while (i > 0 && j > 0) {
    const currentItem = parsedItems[i - 1];
    if (memo[i][j] !== memo[i - 1][j]) {
      selectedItems.push(currentItem);
      i--;
      j -= currentItem.weight;
    } else {
      i--;
    }
  }

  // display the result
  const totalValue = memo[parsedItems.length][capacity];
  const selectedItemsString = selectedItems
    .map((item) => `(${item.weight}, ${item.value})`)
    .join(" + ");
  outputDiv.textContent = `Maximum value: ${totalValue} (selected items: ${selectedItemsString})`;
});

