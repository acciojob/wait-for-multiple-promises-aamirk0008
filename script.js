//your JS code here. If required.
function createRandomPromise(promiseNumber) {
	return new Promise((resolve) => {
		const delay = Math.random() * 2000 + 1000
		const delaySeconds = delay / 1000

		setTimeout(() => {
			resolve({
				name: `Promise ${promiseNumber}`,
				time: delaySeconds,
			})
		}, delay)
	})
}

function populateTable(results, totalTime) {
	const tbody = document.getElementById("output")
	tbody.innerHTML = ""

	results.forEach((result) => {
		const row = document.createElement("tr")
		row.innerHTML = `
				<td>${result.name}</td>
				<td>${result.time.toFixed(3)}</td>
			`
		tbody.appendChild(row)
	})

	const totalRow = document.createElement("tr");
	totalRow.className = "total-row"
	totalRow.innerHTML = `
			<td>Total</td>
            <td>${totalTime.toFixed(3)}</td>
		`
	tbody.appendChild(totalRow)
}

async function runPromiseDemo() {
        const startTime = performance.now();

        const promise1 = createRandomPromise(1);
        const promise2 = createRandomPromise(2);
        const promise3 = createRandomPromise(3);

        try {
          const results = await Promise.all([promise1, promise2, promise3]);

          const endTime = performance.now();
          const totalTime = (endTime - startTime) / 1000;

          populateTable(results, totalTime);
        } catch (error) {
          console.error("Error resolving promises:", error);
          const tbody = document.getElementById("output");
          tbody.innerHTML =
            '<tr><td colspan="2" class="text-danger">Error occurred while resolving promises</td></tr>';
        }
      }

      function restartDemo() {
        const tbody = document.getElementById("output");
        tbody.innerHTML =
          '<tr class="loading-row"><td colspan="2">Loading...</td></tr>';
        runPromiseDemo();
      }

      document.addEventListener("DOMContentLoaded", () => {
        runPromiseDemo();
      });
