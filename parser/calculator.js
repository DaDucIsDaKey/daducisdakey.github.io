function Tokenize(untokenized) {
  const CharTypes = ({
    GARBAGE: 0,
    DIGIT: 1,
    OPERATOR: 2,
    NEGATIVE: 3,
    PAR_OPEN: 4,
    PAR_CLOSE: 5
  });
  const TokenTypes = ({
    NONE: 0,
    NUMBER: 1,
    PARAS: 2
  });
  let tokenizedsequence = [];
  let thistoken="";
  let thistokentype=TokenTypes.NONE;
  let paras=0;
  for(let i = 0; i<untokenized.length; i++) {
    let chartype=0
    if (untokenized.charCodeAt(i)>=48 && untokenized.charCodeAt(i)<=57) {chartype=CharTypes.DIGIT;}
    else if (untokenized.charCodeAt(i)==42 || untokenized.charCodeAt(i)==43 || untokenized.charCodeAt(i)==47 || (untokenized.charCodeAt(i)>=97 && untokenized.charCodeAt(i)<=122)) {chartype=CharTypes.OPERATOR;}
    else if (untokenized.charCodeAt(i)==45) {chartype=CharTypes.NEGATIVE;}
    else if (untokenized.charCodeAt(i)==40) {chartype=CharTypes.PAR_OPEN;}
    else if (untokenized.charCodeAt(i)==41) {chartype=CharTypes.PAR_CLOSED;}
    else {chartype=CharTypes.GARBAGE;}
    if (thistokentype==TokenTypes.NONE) {
      if (chartype==CharTypes.DIGIT || chartype==CharTypes.NEGATIVE) {
        thistoken+=untokenized[i];
        thistokentype=TokenTypes.NUMBER;
      }
      if (chartype==CharTypes.OPERATOR) {
        tokenizedsequence.push(untokenized[i]);
      }
      if (chartype==CharTypes.PAR_OPEN) {
        paras=1;
        thistokentype=TokenTypes.PARAS;
        thistoken+=untokenized[i];
      }
    }
    else if (thistokentype==TokenTypes.NUMBER) {
      if (chartype==CharTypes.DIGIT) {
        thistoken+=untokenized[i];
      }
      if (chartype==CharTypes.OPERATOR || chartype==CharTypes.NEGATIVE) {
        tokenizedsequence.push(thistoken);
        tokenizedsequence.push(untokenized[i]);
        thistoken="";
        thistokentype=TokenTypes.NONE;
      }
      if (chartype==CharTypes.PAR_OPEN) {
        tokenizedsequence.push(thistoken);
        thistoken="";
        paras=1;
        thistokentype=TokenTypes.PARAS;
      }
    }
    else if (thistokentype==TokenTypes.PARAS) {
      if (chartype==CharTypes.PAR_OPEN) {
        thistoken+=untokenized[i];
        paras+=1
      }
      else if (chartype==CharTypes.PAR_CLOSE) {
        thistoken+=untokenized[i];
        paras-=1
        if (paras==0) {
          tokenizedsequence.push(thistoken);
          thistoken=""
          thistokentype=TokenTypes.NONE;
        }
      }
      else {
        thistoken+=untokenized[i];
      }
    }
  }
  if (thistokentype!=TokenTypes.NONE) {
    tokenizedsequence.push(thistoken)
  }
  return tokenizedsequence;
}

function Calculator(untokenized) {
  let inarr = Tokenize(untokenized);
  for (let _pass=0;_pass<4;_pass++) {
    for(let i=0;i<inarr.length;i++) {
      if (_pass==0 && inarr[i][0] == "(") {
        inarr[i]=Calculator(inarr[i].substring(1,inarr[i].length))
      }
      else if (_pass==1 && inarr[i] == "d" && i>0) {
        let r = 0
        let mods = new Set()
        for (let m=2; inarr[i+m]=="s" || inarr[i+m]=="k";m++) {
          mods.add(inarr[i+m]);
          inarr.splice(i+m,1);
        }
        for (let j=0;j<parseInt(inarr[i-1]);j++) {
          let thisr = ((Math.floor(Math.random()*parseInt(inarr[i+1]))+1))
          if (mods.has("s")) {
            r+=thisr;
          }
          else {
            inarr.splice(i+2,0,thisr.toString());
          }
        }
        if (mods.has("s")) {
          inarr.splice(i-1,3,r.toString());
        }
        else {
          inarr.splice(i-1,3)
        }
        if (i!=0) {i--;}
      }
      else if (_pass==2 && inarr[i] == "*") {
        inarr.splice(i-1,3,(parseInt(inarr[i-1])*parseInt(inarr[i+1])).toString());
        if (i!=0) {i--;}
      }
      else if (_pass==2 && inarr[i] == "/") {
        inarr.splice(i-1,3,(Math.round(parseInt(inarr[i-1])/parseInt(inarr[i+1]))).toString());
        if (i!=0) {i--;}
      }
      else if (_pass==3 && inarr[i] == "+") {
        inarr.splice(i-1,3,(parseInt(inarr[i-1])+parseInt(inarr[i+1])).toString());
        if (i!=0) {i--;}
      }
      else if (_pass==3 && inarr[i] == "-") {
        inarr.splice(i-1,3,(parseInt(inarr[i-1])-parseInt(inarr[i+1])).toString());
        if (i!=0) {i--;}
      }
    }
  }
  return inarr;
}
