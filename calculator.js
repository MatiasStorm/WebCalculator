class Calculator{
  constructor(inputId){
    this.input = $(inputId);
    this.parentheces = 0;
    this.lastChar = "";
  }
  
  val(){
    return this.input.val()
  }

  typeNum(val){
    if(/[\/*+\(\)\^-]/.test(this.lastChar) || 
       this.lastChar == "" || 
       /\.[0-9]*$/.test(this.val()) || // Allow decimal numbers.
       /[\/*+\(\)\^-]*[1-9][0-9]*$/.test(this.val())) { // Operators followed by one 1-9 and n 0-9.
      this.input.val(this.val() + val);
      this.lastChar = val;
    }
  }
  
  typeOperator(op){
    var origVal = this.val();
    if(op == "("){
      if(/[\/*+-]$/.test(this.lastChar) || this.lastChar == ""){
        this.parentheces += 1;
        this.input.val(origVal + op);
        this.lastChar = op;
      }
    }
    else if(op == ")"){
      if(/[0-9][/*+\.-]$/.test(this.lastChar) && this.parentheces > 0){
        this.parentheces -= 1;
        this.input.val(origVal.substr(0, origVal.length - 1) + op);
        this.lastChar = op;
      }
      else if((/[0-9]/.test(this.lastChar) || this.lastChar == ")") && this.parentheces > 0){
        this.parentheces -= 1;
        this.input.val(this.val() + op);
        this.lastChar = op;
      }
    }
    
    else if(this.lastChar != "("){
      if(/[\/*+\.-]$/.test(this.lastChar)) {
        this.input.val(origVal.substr(0, origVal.length - 1) + op);
        this.lastChar = op;
      }
      else if(origVal.length > 0){
        this.input.val(this.val() + op);
        this.lastChar = op;
      }
    }
  }
  
  evalualte(){
    var expression = this.val().replace("^", "**");
    this.input.val(eval(expression))
  }
  
  clear(){
    this.input.val("");
    this.lastChar = "";
  }
  
  negate(){
    var origVal = this.val();
    if(origVal.charAt(0) == "-") {
      this.input.val(origVal.substr(1, origVal.length - 1));
    }
    else{
      this.input.val("-" + origVal);
    }
  }
  
  delete(){
    var origVal = this.val()
    this.input.val(origVal.substr(0, origVal.length - 1))
    if(this.lastChar == "("){
      this.parentheces -= 1
    }
    else if (this.lastChar == ")"){
      this.parentheces += 1;
    }
    this.lastChar = origVal.charAt(origVal.length - 2)
  }  
}

