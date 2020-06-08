
export const Status = Object.freeze({
    success: "SUCCESS",
    fail: "FAIL",
    error: "ERROR",
    message: "MESSAGE",
    info: "INFO",
    warning: "WARNING",
    YES: "Y",
    NO: "N",
    CANCEL: "C",
    NA: "N/A"
});

export const Key = Object.freeze({
    MESSAGE_ERROR: "message_error",
    MESSAGE: "message",
    RESPONSE_ERROR: "response_error"
});

export class TransferData {
    status = "N/A";
    inputs = {};
    outputs = {};
    public getStatus(){
        return this.status;
    }
    public addInputs(key, obj) {
        this.inputs[key] = obj;
    };
    public addOutputs(key, obj) {
        this.outputs[key] = obj;
    };
    public getOutput(key) {
        return this.outputs[key];
    };
    public getInput(key) {
        return this.inputs[key];
    };
    public map(obj) {
        this.status = obj.status;
        this.inputs = obj.inputs;
        this.outputs = obj.outputs;
    }
}
/**
 * 
 * @param pattern "YMD", "DMY", "MDY",  default "YMD"
 * @param separater "-", "/",  default "-"
 */
export function getCurrentDate(pattern:String,separater:String):String {
    if(separater==null || separater==undefined || separater=="")
        separater = "-";
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    if(pattern=="YMD")
        return year +""+ separater + month + separater + day;
    if(pattern=="DMY")
        return day +""+ separater + month + separater + year;
    if(pattern=="MDY")
        return month +""+ separater + day + separater + year;
    return year +""+ separater + month + separater + day;
}

export function getDate(date:Date,pattern:String,separater:String):String {
    if(separater==null || separater==undefined || separater=="")
        separater = "-";
    date = new Date(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if(pattern=="YMD")
        return year +""+ separater + month + separater + day;
    if(pattern=="DMY")
        return day +""+ separater + month + separater + year;
    if(pattern=="MDY")
        return month +""+ separater + day + separater + year;
    return year +""+ separater + month + separater + day;
}

export function base64ImageToBlob(str) {
    //console.log(str)
    // extract content type and base64 payload from original string
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);
  
    // decode base64
    var imageContent = atob(b64);
  
    // create an ArrayBuffer and a view (as unsigned 8-bit)
    var buffer = new ArrayBuffer(imageContent.length);
    var view = new Uint8Array(buffer);
  
    // fill the view, using the decoded base64
    for(var n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
  
    // convert ArrayBuffer to Blob
    var blob = new Blob([buffer], { type: type });
  
    return blob;
}