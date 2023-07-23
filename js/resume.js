let applicantsData;
let currentApplicantIndex = 0;

// Function to fetch JSON data from the "data.json" file
async function fetchData() {
  try {
    const response = await fetch("../data/data.json");
    const data = await response.json();
    return data.resume;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to render applicant details on the resume page
function renderApplicant(applicant) {
  const applicantDetails = document.createElement("div");
  applicantDetails.className = "applicant-info";
  applicantDetails.innerHTML = `
  <div class="box">
    <h2 class="name">${applicant.basics.name}</h2>
    <p class="name">Applied For: ${applicant.basics.AppliedFor}</p>
  </div>
  <div class="content">
    <div class="left">
      <div class="leftSection">
        <h3>Personal Information</h3>
        <p>
          ${applicant.basics.email}
          <br />
          ${applicant.basics.phone}
          <br />
          ${applicant.basics.location.address}, <br />
          ${applicant.basics.location.city},
          ${applicant.basics.location.state} -
          ${applicant.basics.location.postalCode}
          <br />
          <a href="${applicant.basics.profiles.url}" target="_blank"
          >${applicant.basics.profiles.network}</a>
          <br>
          <h3>Skills</h3>
          ${renderSkills(applicant.skills.keywords)}
          <br>
          <h3>Interests</h3>
          <p>Hobbies: ${applicant.interests.hobbies}</p>
        </div>
    </div>

    <div class="rightSection">
      <h3>Work Experience</h3>
      <p><b>Company Name:</b> ${applicant.work["Company Name"]}</p>
      <p><b>Position:</b> ${applicant.work.Position}</p>
      <p><b>Start Date:</b> ${applicant.work["Start Date"]}</p>
      <p><b>End Date:</b> ${applicant.work["End Date"]}</p>
      <p><b>Summary:</b> <br>${applicant.work.Summary}</p>

      <h3>Internship</h3>
      <ul>
      <li><b>Company Name:</b> ${applicant.internship["Company Name"]}</li>
      <li>Position: ${applicant.internship.Position}</li>
      <li>Start Date: ${applicant.internship["Start Date"]}</li>
      <li>End Date: ${applicant.internship["End Date"]}</li>
      <li>Summary: ${applicant.internship.Summary}</li>
      </ul>

      <h3>Projects</h3>
      <p><b>${applicant.projects.name}</b> <br>
      ${applicant.projects.description}</p>

      <h3>Education</h3>
      <ul>
      <li><b>UG: </b>${applicant.education.UG.institute}, ${
    applicant.education.UG.course
  }, ${applicant.education.UG["Start Date"]} - 
      ${applicant.education.UG["End Date"]}, ${applicant.education.UG.cgpa}</li>
      <br>
      <li><b>Senior Secondary: </b>${
        applicant.education["Senior Secondary"].institute
      }, ${applicant.education["Senior Secondary"].cgpa}</li>
      <br>
      <li><b>High School: </b>${
        applicant.education["High School"].institute
      }, ${applicant.education["High School"].cgpa}</li>
      </ul>
      <h3>Achievements</h3>
      <p><b>Dums:</b> ${applicant.achievements.dums} <br><br>
      <b>Summary:</b> ${applicant.achievements.Summary}</p>
      <hr/>
    </div>
  </div>
  `;

  const container = document.getElementById("applicantDetails");
  container.innerHTML = "";
  container.appendChild(applicantDetails);

  // Hide or show navigation buttons based on the number of applicants and current index
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (applicantsData.length === 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = currentApplicantIndex === 0 ? "none" : "block";
    nextBtn.style.display =
      currentApplicantIndex === applicantsData.length - 1 ? "none" : "block";
  }
}

// Function to render skills dynamically
function renderSkills(skills) {
  if (skills.length === 0) {
    return "<p>No skills found.</p>";
  }

  const skillElements = skills.map((skill) => `<p>${skill}</p>`).join("");
  return skillElements.replace(/>\s+</g, "><"); // Remove spaces between tags
}

// Function to display the next applicant
function showNextApplicant() {
  if (currentApplicantIndex < applicantsData.length - 1) {
    currentApplicantIndex++;
    renderApplicant(applicantsData[currentApplicantIndex]);
  }
}

// Function to display the previous applicant
function showPreviousApplicant() {
  if (currentApplicantIndex > 0) {
    currentApplicantIndex--;
    renderApplicant(applicantsData[currentApplicantIndex]);
  }
}

document
  .getElementById("searchBtn")
  .addEventListener("click", async function () {
    const jobFilter = document.getElementById("jobFilter").value.trim();
    if (jobFilter === "") {
      document.getElementById("errorMessage").innerText =
        "Please enter a job to search.";
    } else {
      document.getElementById("errorMessage").innerText = "";
      const data = await fetchData();
      if (data === null) {
        document.getElementById("errorMessage").innerText =
          "Error fetching data. Please try again later.";
      } else {
        const filteredApplicants = data.filter(
          (applicant) =>
            applicant.basics.AppliedFor.toLowerCase() ===
            jobFilter.toLowerCase()
        );
        if (filteredApplicants.length === 0) {
          window.location.href = "../html/error.html";
        } else {
          applicantsData = filteredApplicants;
          currentApplicantIndex = 0;
          renderApplicant(applicantsData[currentApplicantIndex]);

          // Event listener for next button
          document
            .getElementById("nextBtn")
            .addEventListener("click", showNextApplicant);

          // Event listener for previous button
          document
            .getElementById("prevBtn")
            .addEventListener("click", showPreviousApplicant);
        }
      }
    }
  });

const logOutBtn = document.getElementsByClassName("logoutBtn")[0];
logOutBtn.addEventListener("click", function () {
  window.location.href = "../html/index.html";
});
