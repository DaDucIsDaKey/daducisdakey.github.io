function Calculator(untokenized) {
  let inarr = Tokenize(untokenized);
  for (let _pass=0;_pass<4) {
    for(let i=0;i<inarr.length;i++) {
      if (pass==0 && inarr[i][0] == "(")) {
        inarr[i]=Calculator(inarr[i].substring(1,inarr[i].length))
      }
      if (pass==1 && inarr[i] == "d")) {
        let r = 0
        for (let j=0;j<parseInt(inarr[i-1]);j++) {
          r+=Math.floor(Math.random()*parseInt(inarr[i+1]))+1
        }
        inarr.splice(i,3,r.toString())
        i--;
      }
    }
  }
}
