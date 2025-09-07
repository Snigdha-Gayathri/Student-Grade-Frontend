document.getElementById("gradeForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Get input values and convert to numbers
  const studytime = parseInt(document.getElementById("studytime").value);
  const absences = parseInt(document.getElementById("absences").value);
  const failures = parseInt(document.getElementById("failures").value);

  try {
    const response = await fetch("https://student-grade-backend.onrender.com/predict", { // <-- add /predict
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ studytime, absences, failures })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch prediction");
    }

    const data = await response.json();
    document.getElementById("result").innerText = `Predicted Grade: ${data.grade}`;

  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = "⚠️ Could not fetch prediction. Try again.";
  }
});
