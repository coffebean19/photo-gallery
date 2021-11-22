const accountName = "project323storage";
const sasString = "sv=2020-08-04&ss=b&srt=sco&sp=rwdlacitfx&se=2022-01-12T09:30:18Z&st=2021-11-22T01:30:18Z&spr=https,http&sig=jWR0P%2BdDzD8Tfrhm7MCOJIkAC5tvyzzYJuGznVHhez8%3D";
const containerName = "project323-blob"
const containerURL = new azblob.ContainerURL(`https://${accountName}.blob.core.windows.net/${containerName}?${sasString}`,
    azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));

const upload = document.getElementById('upload');
const fileInput = document.getElementById('file-input');

var username = localStorage.getItem("username");

const uploadFiles = async () => {
  try {
      const promises = [];
      let _username = username;
      for (const file of fileInput.files) {
          const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(containerURL, file.name);
          promises.push(azblob.uploadBrowserDataToBlockBlob(
              azblob.Aborter.none, file, blockBlobURL));
      }
      await Promise.all(promises);
      // let res = fetch(`/home/${_username}&${filepath}`)
      // .then(response => response.json())
      // .then(resJson => { 
      //     console.log(resJson.message);
      // })

      alert("Photo uploaded");
  } catch (error) {
      alert("Photo not uploaded");
  }
}
  
  upload.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", uploadFiles);

  const header = document.getElementById('header');
  header.innerHTML = localStorage.getItem("username");