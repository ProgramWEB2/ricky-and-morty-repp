document.addEventListener('DOMContentLoaded', () => {
    const jsonUrl = 'resume.json'; // URL del archivo JSON

    function createResume(resumeData) {
        const container = document.getElementById('resumeContainer');

        // Personal Info
        const personalSection = document.createElement('section');
        personalSection.classList.add('personal-info');

        const profilePic = document.createElement('img');
        profilePic.src = resumeData.personalInfo.profilePic;
        profilePic.alt = `${resumeData.personalInfo.name}'s profile picture`;
        profilePic.classList.add('profile-pic');

        const personalDetails = document.createElement('div');
        personalDetails.classList.add('personal-details');

        const name = document.createElement('h1');
        name.textContent = resumeData.personalInfo.name;
        const title = document.createElement('h2');
        title.textContent = resumeData.personalInfo.title;
        const email = document.createElement('p');
        email.textContent = `Email: ${resumeData.personalInfo.email}`;
        const phone = document.createElement('p');
        phone.textContent = `Phone: ${resumeData.personalInfo.phone}`;
        const location = document.createElement('p');
        location.textContent = `Location: ${resumeData.personalInfo.location}`;

        personalDetails.appendChild(name);
        personalDetails.appendChild(title);
        personalDetails.appendChild(email);
        personalDetails.appendChild(phone);
        personalDetails.appendChild(location);

        personalSection.appendChild(profilePic);
        personalSection.appendChild(personalDetails);

        // Skills
        const skillsSection = document.createElement('section');
        skillsSection.classList.add('skills');

        const skillsTitle = document.createElement('h3');
        skillsTitle.textContent = 'Skills';
        const skillsList = document.createElement('ul');
        resumeData.skills.forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.textContent = skill;
            skillsList.appendChild(skillItem);
        });

        skillsSection.appendChild(skillsTitle);
        skillsSection.appendChild(skillsList);

        // Experience
        const experienceSection = document.createElement('section');
        experienceSection.classList.add('experience');

        const experienceTitle = document.createElement('h3');
        experienceTitle.textContent = 'Experience';
        experienceSection.appendChild(experienceTitle);

        resumeData.experience.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('job');

            const jobTitle = document.createElement('h4');
            jobTitle.textContent = `${job.jobTitle} at ${job.company}`;
            const jobDuration = document.createElement('p');
            jobDuration.textContent = `Duration: ${job.duration}`;
            const jobResponsibilities = document.createElement('ul');
            job.responsibilities.forEach(responsibility => {
                const responsibilityItem = document.createElement('li');
                responsibilityItem.textContent = responsibility;
                jobResponsibilities.appendChild(responsibilityItem);
            });

            jobElement.appendChild(jobTitle);
            jobElement.appendChild(jobDuration);
            jobElement.appendChild(jobResponsibilities);

            experienceSection.appendChild(jobElement);
        });

        // Education
        const educationSection = document.createElement('section');
        educationSection.classList.add('education');

        const educationTitle = document.createElement('h3');
        educationTitle.textContent = 'Education';
        educationSection.appendChild(educationTitle);

        resumeData.education.forEach(edu => {
            const eduElement = document.createElement('div');
            eduElement.classList.add('education-item');

            const degree = document.createElement('h4');
            degree.textContent = edu.degree;
            const institution = document.createElement('p');
            institution.textContent = `Institution: ${edu.institution}`;
            const gradYear = document.createElement('p');
            gradYear.textContent = `Graduation Year: ${edu.graduationYear}`;

            eduElement.appendChild(degree);
            eduElement.appendChild(institution);
            eduElement.appendChild(gradYear);

            educationSection.appendChild(eduElement);
        });

        // Append all sections to container
        container.appendChild(personalSection);
        container.appendChild(skillsSection);
        container.appendChild(experienceSection);
        container.appendChild(educationSection);
    }

    // Fetch JSON data and create resume
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => createResume(data))
        .catch(error => console.error('Error fetching resume data:', error));
});
