class Parser {
  static OperatorPrios = Object.freeze({
    '+':5,
    '-':5,
    '*':10,
    '/':10,
    '^':15,
    'd':25,
    'D':25,
    'k':20,
    's':19
  });

  static UnaryOperators = Object.freeze({'s':1})

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
    this.brackets=0;
    this.currtoken = "";
    this.currTT=0;  
  }

  Parse(inString,flags=1) {
    this.Reset();
    for(let i = 0; i<inString.length; i++) {
      let currcharnum = inString.charCodeAt(i);
      if (this.brackets>0) {
        if (currcharnum==91) {
          this.brackets+=1;
        }
        else if (currcharnum==93) {
          this.brackets-=1;
          if (this.brackets==0) {
            let ct=this.currtoken;
            this.operands.push((new Parser()).Parse(ct,0));
            //console.log([this.Parse(this.currtoken,0)]);
            this.currtoken="";
            this.currTT=Parser.TokenTypes.NONE;
          }
        }
        else {
          this.currtoken+=inString[i];
        }
      }
      else if ((currcharnum>=48 && currcharnum<=57) || currcharnum==46 || (currcharnum==45 && this.currTT!=Parser.TokenTypes.NUMBER)) {
        this.currtoken+=inString[i];
        this.currTT=Parser.TokenTypes.NUMBER;
      }
      else if (currcharnum==42 || currcharnum==43 || currcharnum==45 || currcharnum==47 || currcharnum==68 || currcharnum==94 || currcharnum==100 || currcharnum==107 || currcharnum==115) {
        if (this.currTT==Parser.TokenTypes.NUMBER) {
          this.operands.push(+this.currtoken);
          this.currtoken="";
        }
        if (inString[i] in Parser.UnaryOperators) {
          console.log("OPERATORUNARY");
          let priority = Parser.OperatorPrios[inString[i]]+1000*this.paras;
          while (this.operators.length>0 && priority<=this.operators.at(-1)[1]) {
            this.Evaluate();
          }
          this.operators.push([currcharnum,-1]);
          this.Evaluate();
        }
        else {
          console.log("OPERATORBINARY");
          let priority = Parser.OperatorPrios[inString[i]]+1000*this.paras;
          while (this.operators.length>0 && priority<=this.operators.at(-1)[1]) {
            this.Evaluate();
          }
          this.operators.push([currcharnum,priority]);
        }
        this.currTT=Parser.TokenTypes.NONE;
      }
      else if (currcharnum==44) {
        if (this.currTT==Parser.TokenTypes.NUMBER) {
          this.operands.push(+this.currtoken);
          this.currtoken="";
          this.currTT=Parser.TokenTypes.NONE;
        }
      }
      else if (currcharnum==40) {
        this.paras+=1;
        //Add multiplication before parenthesis?
      }
      else if (currcharnum==41) {
        this.paras-=1;
      }    
      if (currcharnum==91) {
        this.brackets+=1;
      }
    }
    if (this.currTT!=Parser.TokenTypes.NONE) {
      this.operands.push(+this.currtoken);
    }
    while (this.operators.length>0) {
      this.Evaluate();
    }
    if (flags & 1 == 1) {
      return this.operands.pop();
    }
    else {
      console.log(this.operands);
      return this.operands;
    }
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
    else if (op[0]==68) {
      let b = this.operands.pop();
      let a = this.operands.pop();
      let o=[];
      for (let i = 0; i<a; i++) {
        o.push(Math.floor(Math.random()*b)+1);
      }
      this.operands.push(o);
    }
    else if (op[0]==107) {
      console.log("ATTEMPTING KEEP")
      let b = this.operands.pop();
      let a = this.operands.pop();
      let o=[];
      for (let i=0; i<b;i++) {
        o.push(-1000000000);
      }
      let p=0;
      if (Array.isArray(a)) {
        console.log("ARR:" + a.toString());
        for(let i = 0; i<a.length;i++) {
          if (o[p]<a[i]) {
            o[p]=a[i];
            p=(p+1)%b;
          }
          console.log(o);
        }
        let j = o.splice(0,p);
        console.log("J:"+j.toString());
        let k = o.concat(j);
        console.log("K:"+k.toString());
        this.operands.push(k);
      }
      else {
        this.operands.push(b);
      }
    }
    else if (op[0]==115) {
      console.log("ATTEMPTING SUMMATION")
      let b = this.operands.pop();
      if (Array.isArray(b)) {
        console.log(b);
        let s=0;
        for(let i = 0; i<b.length;i++) {
          s+=b[i];
          console.log("S:"+s.toString());
        }
        this.operands.push(s);
      }
      else {
        this.operands.push(b);
      }
    }
  }
}

var psr = new Parser();

console.log(psr.Parse("5+2-3*5"));










