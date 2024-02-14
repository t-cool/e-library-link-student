document.addEventListener('DOMContentLoaded', function() {

  const root = document.getElementById('root');
  let selectedGrade = '';

  function initializeApp() {
      fetch('./data.json')
          .then(response => response.json())
          .then(loadedData => {
              const gradeSelectionDiv = document.createElement('div');
              gradeSelectionDiv.innerHTML = '<h3>学年選択</h3>';
              root.appendChild(gradeSelectionDiv);

              const gradeButtonsContainer = document.createElement('div');
              gradeButtonsContainer.style.display = 'grid';
              gradeButtonsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
              gradeButtonsContainer.style.gap = '10px';
              gradeSelectionDiv.appendChild(gradeButtonsContainer);

              Object.keys(loadedData).forEach(grade => {
                  const button = document.createElement('button');
                  button.textContent = `${grade}年`;
                  button.className = 'button grade-button';
                  button.onclick = () => handleGradeSelect(grade, button, loadedData);
                  gradeButtonsContainer.appendChild(button);
              });
          });
  }

  function handleGradeSelect(grade, button, data) {
      document.querySelectorAll('.grade-button').forEach(btn => {
          btn.classList.remove('selected');
      });
      button.classList.add('selected');

      selectedGrade = grade;
      updateSubjectUI(grade, data);
  }

  function updateSubjectUI(grade, data) {
      let subjectsDiv = document.querySelector('#subjectsDiv');
      if (!subjectsDiv) {
          subjectsDiv = document.createElement('div');
          subjectsDiv.id = 'subjectsDiv';
          root.appendChild(subjectsDiv);
      } else {
          subjectsDiv.innerHTML = ''; // Clear previous content
      }

      const subjectsHeader = document.createElement('h3');
      subjectsHeader.textContent = '教科選択';
      subjectsDiv.appendChild(subjectsHeader);

      const subjectsButtonsContainer = document.createElement('div');
      subjectsButtonsContainer.style.display = 'grid';
      subjectsButtonsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
      subjectsButtonsContainer.style.gap = '10px';
      subjectsDiv.appendChild(subjectsButtonsContainer);

      Object.entries(data[grade]).forEach(([subject, url]) => {
          const button = document.createElement('button');
          button.textContent = subject;
          button.className = 'button subject-button';
          button.onclick = () => window.open(url, '_blank');
          subjectsButtonsContainer.appendChild(button);
      });
  }
  initializeApp();
});