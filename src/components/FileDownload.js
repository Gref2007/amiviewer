

export function getFileName(){
  if(document.getElementById("formFile").files.length == 0){
    alert("file not selected");
    throw new Error("file not selected");    
  }
  return document.getElementById("formFile").files[0]; 
}

export async function getActions(){

  let formData = new FormData();
     
  formData.append("file", getFileName());

  //TODO брать из конфига
  let response = await fetch("/api/v1/draw",{
    method: 'POST',
    body: formData
  });
  return await response.json()
  
}


export default function FileDowonload() {
    return(
        <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Файл с событиями ami</label>
        <input className="form-control form-control-sm" type="file" id="formFile"/>
      </div>      

    )
}

