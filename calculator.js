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
    this.input.css("color", "green");
    this.input.removeClass("result_field_shake");
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
      if(/[\/*+\.\^-]$/.test(this.lastChar)) {
        this.input.val(origVal.substr(0, origVal.length - 1) + op);
        this.lastChar = op;
      }
      else if(origVal.length > 0){
        this.input.val(this.val() + op);
        this.lastChar = op;
      }
    }
    this.input.css("color", "green");
    this.input.removeClass("result_field_shake");
  }
  
  evalualte(){
    if(this.parentheces == 0 && !/[\/*\-+\.\^]/.test(this.lastChar)){
      var expression = this.val().replace("^", "**");
      this.input.val(eval(expression));
    }
    else {
      this.input.css("color", "red");
      this.input.removeClass("result_field_shake");
      setTimeout(function(){$("#result_field").addClass("result_field_shake");}, 10);
    }
  }

  clear(){
    this.input.val("");
    this.lastChar = "";
    this.parentheces = 0;
    this.input.css("color", "green");
    this.input.removeClass("result_field_shake");
  }
  
  negate(){
    var origVal = this.val();
    var number, numberIndex, newVal;
    if(/\(\-[0-9]*\.?[0-9]*\)$/.test(origVal)){
      this.removeNegate();
    }
    else if(/[0-9]/.test(this.lastChar)){
      this.addNegate();
    }
    this.input.css("color", "green");
    this.input.removeClass("result_field_shake");
  }
  
  removeNegate(){
    var origVal = this.val();
    var number, numberIndex, newVal;
    for(let i = origVal.length - 1; i >= 0; i--){ 
      if(origVal.charAt(i) == "-"){
        numberIndex = i + 1;
        break;
      }
    }
    number = origVal.substring(numberIndex, origVal.length - 1);
    newVal = origVal.substring(0, numberIndex - 2) + number;
    this.input.val(newVal);  
  }
  
  addNegate(){
    var origVal = this.val();
    var number, numberIndex, newVal;
    for(let i = origVal.length - 1; i >= 0; i--){ 
      if(( !/[0-9]/.test(origVal.charAt(i)) && origVal.charAt(i) != ".") || i == 0){
        numberIndex = i == 0 ? i : i + 1;
        break;
      }
    }
    number = origVal.substring(numberIndex, origVal.length);
    newVal = origVal.substring(0, numberIndex) + "(-" + number + ")";
    this.input.val(newVal);
  }
  
  
  delete(){
    var origVal = this.val()
    if(/\(\-[0-9]+\.*[0-9]*\)$/.test(origVal)){
      this.removeNegate();
    }
    else{
      this.input.val(origVal.substr(0, origVal.length - 1))
      if(this.lastChar == "("){
        this.parentheces -= 1
      }
      else if (this.lastChar == ")"){
        this.parentheces += 1;
      }
    }
    this.lastChar = origVal.charAt(origVal.length - 2)
    this.input.css("color", "green");
    this.input.removeClass("result_field_shake");
  }  
}


function shakeInput(){
  for(let i = 5; i >= 0; i -= 0.5){
    $("#result_field").css("transform", "translate(" + i + "px, " + i +"px)");
    requestAnimationFrame(shakeInput);
    // this.input.css("transform", "translate(2px, 2px)");
    console.log(i);
  }
}


