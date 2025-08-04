function createRandomPromise(promiseNumber) {
            return new Promise((resolve) => {
                // Generate random integer delay between 1 and 3 seconds
                const delayInSeconds = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
                const delay = delayInSeconds * 1000; // Convert to milliseconds
                
                setTimeout(() => {
                    resolve({
                        name: `Promise ${promiseNumber}`,
                        time: delayInSeconds
                    });
                }, delay);
            });
        }

        // Function to populate the table with results
        function populateTable(results, totalTime) {
            const tbody = document.getElementById('output');
            
            // Clear the loading row
            tbody.innerHTML = '';
            
            // Add rows for each promise result
            results.forEach((result) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${result.name}</td>
                    <td>${result.time.toFixed(3)}</td>
                `;
                tbody.appendChild(row);
            });
            
            // Add total row - find the maximum time from individual promises
            const maxTime = Math.max(...results.map(r => r.time));
            const totalRow = document.createElement('tr');
            totalRow.className = 'total-row';
            totalRow.innerHTML = `
                <td>Total</td>
                <td>${maxTime.toFixed(3)}</td>
            `;
            tbody.appendChild(totalRow);
        }

        // Main function to run the promise resolution demo
        async function runPromiseDemo() {
            // Record start time for total calculation
            const startTime = performance.now();
            
            // Create 3 promises
            const promise1 = createRandomPromise(1);
            const promise2 = createRandomPromise(2);
            const promise3 = createRandomPromise(3);
            
            try {
                // Use Promise.all() to wait for all promises to resolve
                const results = await Promise.all([promise1, promise2, promise3]);
                
                // Calculate total time (time for all promises to complete)
                const endTime = performance.now();
                const totalTime = (endTime - startTime) / 1000;
                
                // Populate the table with results
                populateTable(results, totalTime);
                
            } catch (error) {
                console.error('Error resolving promises:', error);
                const tbody = document.getElementById('output');
                tbody.innerHTML = '<tr><td colspan="2" class="text-danger">Error occurred while resolving promises</td></tr>';
            }
        }

        // Function to restart the demo
        function restartDemo() {
            const tbody = document.getElementById('output');
            tbody.innerHTML = '<tr id="loading" class="loading-row"><td colspan="2">Loading...</td></tr>';
            runPromiseDemo();
        }

        // Start the demo when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            runPromiseDemo();
        });