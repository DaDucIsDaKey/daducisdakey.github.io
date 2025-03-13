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
    else if (untokenized.charCodeAt(i)==42 || untokenized.charCodeAt(i)==43 || untokenized.charCodeAt(i)==47 || untokenized.charCodeAt(i)==100) {chartype=CharTypes.OPERATOR;}
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
  tokenizedsequence.push(thistoken)
  return tokenizedsequence;
}

function Calculator(untokenized) {
  let inarr = Tokenize(untokenized);
  for (let _pass=0;_pass<4;_pass++) {
    for(let i=0;i<inarr.length;i++) {
      if (_pass==0 && inarr[i][0] == "(") {
        inarr[i]=Calculator(inarr[i].substring(1,inarr[i].length))
      }
      if (_pass==1 && inarr[i] == "d") {
        let r = 0
        for (let j=0;j<parseInt(inarr[i-1]);j++) {
          r+=Math.floor(Math.random()*parseInt(inarr[i+1]))+1
        }
        inarr.splice(i-1,3,r.toString())
        i--;
      }
    }
  }
  return inarr[0];
}
