class Parser {
  static OperatorPrios = Object.freeze({
    '+':5,
    '-':5,
    '*':10,
    '/':10,
    '^':15,
    'd':25
  });

  static TokenTypes = Object.freeze({
    NUMBER:1,
    OPERATOR:2,
    NONE:0,
  });

  constructor() {
    this.Reset();
    this.inString="";
  }

  Reset() {
    this.operands=[];
    this.operators=[];
    this.paras=0;
    this.currtoken = "";
    this.currTT=0;  
  }

  Parse(inString) {
    this.Reset();
    for(let i = 0; i<inString.length; i++) {
      let currcharnum = inString.charCodeAt(i);
      if ((currcharnum>=48 && currcharnum<=57) || currcharnum==46 || (currcharnum==45 && this.currTT!=Parser.TokenTypes.NUMBER)) {
        this.currtoken+=inString[i];
        this.currTT=Parser.TokenTypes.NUMBER;
      }
      else if (currcharnum==42 || currcharnum==43 || currcharnum==45 || currcharnum==47 || currcharnum==94 || currcharnum==100) {
        if (this.currTT==Parser.TokenTypes.NUMBER) {
          this.operands.push(+this.currtoken);
          this.currtoken="";
        }
        let priority = Parser.OperatorPrios[inString[i]]+1000*this.paras;
        while (this.operators.length>0 && priority<=this.operators.at(-1)[1]) {
          this.Evaluate();
        }
        this.operators.push([currcharnum,priority]);
        this.currTT=Parser.TokenTypes.NONE;
      }
      else if (currcharnum==40) {
        this.paras+=1;
        //Add multiplication before parenthesis?
      }
      else if (currcharnum==41) {
        this.paras-=1;
      }    
    }
    this.operands.push(+this.currtoken);
    while (this.operators.length>0) {
      this.Evaluate();
    }
    return this.operands.pop();
}

  Evaluate() {
    let op=this.operators.pop();
    if (op[0]==42) {
      this.operands.push(this.operands.pop()*this.operands.pop());
    }
    else if (op[0]==43) {
      this.operands.push(this.operands.pop()+this.operands.pop());
    }
    else if (op[0]==45) {
      this.operands.push(-this.operands.pop()+this.operands.pop());
    }
    else if (op[0]==47) {
      let b = this.operands.pop();
      let a = this.operands.pop();
      this.operands.push(a/b);
    }
    else if (op[0]==94) {
      let b = this.operands.pop();
      let a = this.operands.pop();
      this.operands.push(a**b);
    }
    else if (op[0]==100) {
      let b = this.operands.pop();
      let a = this.operands.pop();
      let o=0;
      for (let i = 0; i<a; i++) {
        o+=Math.floor(Math.random()*b)+1;
      }
      this.operands.push(o);
    }
  }
}

var psr = new Parser();

console.log(psr.Parse("5+2-3*5"));










