class Map {
    constructor() {
        this.size=30;
        this.running=false;
        this.speed=250;
        this.currtimeout=0;
        this.states=4;
        this.Reset();
    }

    Reset() {
        this.background=[];
        for (let i=0;i<this.size;i++) {
            this.background[i]=[];
            for(let j=0;j<this.size;j++) {
                this.background[i][j]=0
            }        
        }
        this.rep=document.getElementById("map");
        if (!this.rep.hasChildNodes()) {
            for (let i=0;i<this.size*this.size;i++) {
                this.cell=document.createElement("div");
                this.cell.id=i;
                this.cell.setAttribute("data-row",Math.floor(i/this.size));
                this.cell.setAttribute("data-col",Math.floor(i%this.size));
                setCell(this.cell,0);
                let size=this.size;
                let mp = this;
                this.cell.addEventListener("click",function() {
                    setCell(this,(1+$(this).attr("data-celltype"))%this.states)
                    mp.background[$(this).attr("data-row")][$(this).attr("data-col")]=$(this).attr("data-celltype")
                });
                this.rep.appendChild(this.cell);
            }
        }
        this.background[5][4]=1;
        this.background[6][6]=1;
        this.background[5][6]=1;
        this.background[4][6]=1;
        this.background[6][5]=1;

        this.Render();

    }

    Update() {
        let newbackground=[];
        for (let i=0;i<this.size;i++) {
            newbackground[i]=[];
            for(let j=0;j<this.size;j++) {
                newbackground[i][j]=0
            }
        }        
        for (let i=0;i<this.size;i++) {
            for (let j=0;j<this.size;j++) {
                let neighbors=[0,0];
                for (let k=-1;k<=1;k++) {
                    for (let l=-1;l<=1;l++) {
                        //console.log([(i+k+this.size)%this.size,(j+l+this.size)%this.size])
                        neighbors[this.background[(i+k+this.size)%this.size][(j+l+this.size)%this.size]]+=1;
                    }
                }
                if (this.background[i][j]==0 && (neighbors[1]==2)) {
                    newbackground[i][j]=1;
                }
                else if (this.background[i][j]==1) {
                    newbackground[i][j]=2;
                }
                else if (this.background[i][j]==2) {
                    newbackground[i][j]=2;
                }
                else if (this.background[i][j]==3) {
                    newbackground[i][j]=0;
                }

            }
        }
        console.log(this);
        this.background=newbackground;
        this.Render(); 
    }

    Render() {
        console.log("RENDERING...")
        for (let i=0;i<this.size;i++) {
            for (let j=0;j<this.size;j++) {    
                setCell($(this.rep.children[((i)*this.size)+j]),this.background[i][j]);

            }
        }
    }

    Run() {
        this.running=!this.running;
        console.log("DOING RUN")
        if (this.running) {
            let map=this;
            this.currtimeout=setInterval(callUpdate,this.speed);
        }
        else {
            clearInterval(this.currtimeout);            
        }
    }
}

map=new Map();

function callUpdate() {
    map.Update();
}

function setCell(cell,a) {
    $(cell).attr("data-celltype",a);
    $(cell).attr("style","background-color:hsl("+$(cell).attr("data-celltype")*30+",100%,50%);");
}
