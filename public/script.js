document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    // Upload and get download URL in one step
    const uploadRes = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const { url } = await uploadRes.json();  // url will be the S3 signed URL

    if (!url) throw new Error("Failed to get download URL");

    // Show link
    document.getElementById("linkContainer").classList.remove("hidden");
    document.getElementById("downloadLink").href = url;
    document.getElementById("downloadLink").innerText = "Click here to download your file";

  } catch (err) {
    alert("Something went wrong: " + err.message);
  }
});
