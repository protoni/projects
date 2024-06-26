document.addEventListener("DOMContentLoaded", function () {
    fetch('https://api.github.com/repos/protoni/projects/commits?per_page=10')
        .then(response => response.json())
        .then(commits => {
            //console.log('API response:', commits); // Log the API response to check its format

            // Check if the response is an array
            if (!Array.isArray(commits)) {
                throw new Error('API response is not an array');
            }

            const commitsContainer = document.createElement('div');
            commitsContainer.className = 'commits-container';

            commits.forEach(commit => {
                const commitElement = document.createElement('div');
                commitElement.className = 'commit';

                // Get date
                const dateElement = document.createElement('p');
                dateElement.className = 'commit-date';
                const commitDate = new Date(commit.commit.author.date);

                // Format date to yyy/mm/dd
                const formattedDate = commitDate.getFullYear() + '/' +
                    (commitDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
                    commitDate.getDate().toString().padStart(2, '0');

                // Format time to have zero padding
                const formattedTime = commitDate.getHours().toString().padStart(2, '0') + ":" +
                    commitDate.getMinutes().toString().padStart(2, '0') + "." +
                    commitDate.getSeconds().toString().padStart(2, '0');
                dateElement.textContent = `# ${formattedDate} ${formattedTime}`;

                // Get author name
                const authorElement = document.createElement('p');
                authorElement.className = 'commit-author';
                authorElement.textContent = `Author: ${commit.commit.author.name}`;

                // Get commit message
                const messageElement = document.createElement('p');
                messageElement.className = 'commit-message';
                messageElement.textContent = `Message: ${commit.commit.message}`;

                // Commit URL
                const urlElement = document.createElement('a');
                urlElement.setAttribute('href', commit.html_url);
                urlElement.setAttribute('target', '_blank'); // Open in a new tab
                urlElement.textContent = 'View Commit';
                urlElement.className = 'commit-url';

                commitElement.appendChild(dateElement);
                commitElement.appendChild(authorElement);
                commitElement.appendChild(messageElement);
                commitElement.appendChild(urlElement);

                commitsContainer.appendChild(commitElement);
            });

            const container = document.getElementById('commits-container');
            if (container) {
                container.appendChild(commitsContainer);
            } else {
                return;
            }
        })
        .catch(error => console.error('Error:', error));
});
