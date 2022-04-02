let inputValue;
var tm=0;
var output;
function getValueInput(){
    inputValue = document.getElementById("element").value; 
    //document.getElementById("valueInput").innerHTML = inputValue[1];
    output="";
    alter();
    
}
function alter(){
    output="";
    var dot;
    while(inputValue[tm]!=undefined){
        dot=0;
        
        while(inputValue[tm]!='\n'&&inputValue[tm]!=undefined){
            
            if(inputValue[tm]==':'){
                dot=1;
                tm++;
                continue;
            }
            if(dot==0){
                tm++;
                continue;   
            }else{
                if(inputValue[tm]=='('){
                    while(inputValue[tm]!=')'){
                        tm++;
                    }
                    tm++;
                    continue;
                }else{
                    output+=inputValue[tm];
                    
                    tm++;
                }
                
            }
        }
        output+='\n';
        tm++;
        
    }
    

    
    //var gg=output.length
    //document.getElementById("valueInput").innerHTML = gg;
    //document.getElementById("valueInput").innerHTML = output[0];
    document.getElementById("valueInput").innerHTML = output
}