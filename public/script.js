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
    // Upload and get download URL
    const uploadRes = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const { url } = await uploadRes.json();

    if (!url) throw new Error("Failed to get download URL");

    // Show link
    const linkContainer = document.getElementById("linkContainer");
    const downloadLink = document.getElementById("downloadLink");

    linkContainer.classList.remove("hidden");
    downloadLink.href = url;
    downloadLink.innerText = "Click here to download your file";

    // Remove the link after 5 minutes
    setTimeout(() => {
      linkContainer.classList.add("hidden");
      downloadLink.href = "#";
      downloadLink.innerText = "";
      alert("⚠️ The download link has expired.");
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

  } catch (err) {
    alert("Something went wrong: " + err.message);
  }
});
