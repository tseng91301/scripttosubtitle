/* GitHub: scripttosubtitle (tseng91301/scripttosubtitle)
 * Orig written by: tseng91301
 */

let inputValue;
var output;


function getValueInput(){
    inputValue = document.getElementById("element").value; 
    //document.getElementById("valueInput").innerHTML = inputValue[1];
    output="";
    inputValue = toHalf(inputValue);
    alter();
    output = toFull(output);

    //var gg=output.length
    //document.getElementById("valueInput").innerHTML = gg;
    //document.getElementById("valueInput").innerHTML = output[0];
    document.getElementById("valueInput").innerHTML = output;
}

/*全形轉半形 by 312432, ref:
 * https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/281005/
 */
function toHalf(toChange) {
    let halfComplete = "";
    let charRead = 0;
    while(toChange[charRead] != undefined) {
      let charTmp = toChange.charCodeAt(charRead);
      charTmp = (charTmp>=0xFF01 && charTmp<=0xFF5E) ? (charTmp-65248) : charTmp;
      halfComplete += String.fromCharCode(charTmp);
      charRead++;
    }
    return halfComplete;
}

/*
 * 由於ASCII對標點符號沒有規律性(或太難列舉)，直接偏移會讓平時不全形的字元全形(a -> ａ)，故以列舉法代替
 */
function toFull(toChange) {
    let fullComplete = "";
    let charRead = 0;
    while(toChange[charRead] != undefined) {
      let charTmp = toChange.charCodeAt(charRead);
      charTmp = (charTmp == 44) ? 0xff0c : charTmp; //, -> ，
      charTmp = (charTmp == 58) ? 0xff1a : charTmp; //: -> ：
      charTmp = (charTmp == 59) ? 0xff1b : charTmp; //; -> ；
      charTmp = (charTmp == 63) ? 0xff1f : charTmp; //? -> ？
      if(charTmp == 46  && toChange.charCodeAt(charRead+1) == 46 && toChange.charCodeAt(charRead+2) == 46) {//. -> 。有可能為刪節號
        charRead += 3;
        fullComplete += "...";
        continue;
      }
      charTmp = (charTmp == 46) ? 0xff61 : charTmp; //. -> 。

      fullComplete += String.fromCharCode(charTmp);
      charRead++;
    }
    return fullComplete;
}

  
function alter(){
    let charRead=0; // Orig 'tm'
    output="";

    var dot;
    while(inputValue[charRead]!=undefined){
        dot=0;

        while(inputValue[charRead]!='\n' && inputValue[charRead]!=undefined){
            if(inputValue[charRead]==':'){
                dot=1;
                charRead++;
                continue;
            }
            if(dot==0){
                charRead++;
                continue;   
            }else{
                if(inputValue[charRead]=='('){
                    while(inputValue[charRead]!=')'){
                        charRead++;
                    }
                    charRead++;
                    continue;
                }else{
                    output+=inputValue[charRead];
                    
                    charRead++;
                }
                
            }
        }
        output+='\n';
        charRead++;
    }
}
