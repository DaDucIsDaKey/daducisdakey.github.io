function Parse(inString) {
  const OperatorPrios = Object.freeze({
    '+':5,
    '-':5,
    '*':10,
    '/':10,
    '^':15,
    '**':15,
    'd':25
  });
  const TokenTypes = Object.freeze({
    NUMBER:1,
    OPERATOR:2,
    NONE:0,
  });
  let operands = [];
  let operators = [];
  let paras = 0;
  let currcharnum = 0;
  let currtoken = "";
  let currTT=TokenTypes.NONE;
  for(let i = 0; i<inString.length; i++) {
    currcharnum = inString.charCodeAt(i);
    if ((currcharnum>=48 && currcharnum<=57) || currcharnum==46 || (currcharnum==45 && currTT!=TokenTypes.NUMBER)) {
      if (currTT==TokenTypes.OPERATOR) {
      	let priority = OperatorPrios[currtoken]+1000*paras;
        while (operators.length>0 && priority<=operators.at(-1)[1]) {
          Evaluate(operators.pop(),operands);
        }
        operators.push([currtoken,priority]);
      	currtoken="";
      }
      currtoken+=inString[i];
      currTT=TokenTypes.NUMBER;
    }
    else if (currcharnum==42 || currcharnum==43 || currcharnum==45 || currcharnum==47 || currcharnum==94 || currcharnum==100) {
      if (currTT==TokenTypes.NUMBER) {
      	operands.push(+currtoken);
      	currtoken="";
      }
      currtoken+=inString[i];
      currTT=TokenTypes.OPERATOR;
    }
    else if (currcharnum==40) {
    	paras+=1;
    	//Add multiplication before parenthesis?
    }
    else if (currcharnum==41) {
    	paras-=1;
    }    
  }
  operands.push(+currtoken);
  while (operators.length>0) {
    Evaluate(operators.pop(),operands);
  }
  return operands.pop();
}

function Evaluate(op,operands) {
  if (op[0]==42) {
    operands.push(operands.pop()*operands.pop());
  }
  else if (op[0]==43) {
    operands.push(operands.pop()+operands.pop());
  }
  else if (op[0]==45) {
    operands.push(-operands.pop()+operands.pop());
  }
  else if (op[0]==47) {
    let b = operands.pop();
    let a = operands.pop();
    operands.push(a/b);
  }
  else if (op[0]==94) {
    let b = operands.pop();
    let a = operands.pop();
    operands.push(a**b);
  }
  else if (op[0]==100) {
    let b = operands.pop();
    let a = operands.pop();
    let o=0;
    for (let i = 0; i<a; i++) {
      o+=Math.floor(Math.random()*b)+1;
    }
    operands.push(o);
  }
}
console.log(Parse("100000000d6"));










