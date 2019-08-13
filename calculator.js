class Calculator{
  constructor(inputId){
    this.input = $(inputId);
    this.validOperators = /[\/*+\.\(\)-]$/
  }
  
  val(){
    return this.input.val()
  }

  typeNum(val){
    this.input.val(this.val() + val);
  }
  
  typeOperator(op){
    var origVal = this.val();
    if(this.validOperators.test(this.val().charAt(this.val().length - 1))){
      this.input.val(origVal.substr(0, origVal.length - 1) + op);
    }
    else if(origVal.length > 0){
      this.input.val(this.val() + op);
    }
  }
  
  evalualte(){
    var expression = this.val().replace("^", "**");
    this.input.val(eval(expression))
  }
  
  clear(){
    this.input.val("");
  }
  
  negate(){
    var origVal = this.val();
    console.log(origVal)
    if(origVal.charAt(0) == "-") {
      this.input.val(origVal.substr(1, origVal.length - 1));
    }
    else{
      this.input.val("-" + origVal);
    }
  }  
}

c = new Calculator($("#result_field"));
numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

numbers.forEach(val =>{
  $("#" + val).click(function(){
    c.typeNum(val);
})})

$("#negate").click(function(){c.negate()});
$("#dot").click(function(){c.typeOperator(".")});
$("#plus").click(function(){c.typeOperator("+")});
$("#minus").click(function(){c.typeOperator("-")});
$("#times").click(function(){c.typeOperator("*")});
$("#divide").click(function(){c.typeOperator("/")});
$("#power").click(function(){c.typeOperator("^")});
$("#equal").click(function(){c.evalualte()});
$("#clear").click(function(){c.clear()});













