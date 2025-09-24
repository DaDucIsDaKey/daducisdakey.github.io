const svgns = "http://www.w3.org/2000/svg";

let nextid = 0;

class RadialMenu {
    constructor(itemnum, container, position, customMenus={}, repd=null, parent=null) {
        this.items=[];
        this.itemnum=itemnum;
        this.parent=parent;
        console.log(parent);
        this.repd=repd;
        console.log(repd);
        this.container=container; 
        this.pos=position; //fixed
        for (let i=0; i<itemnum; i++) {
            try {
                this.items.push(new customMenus[i].menuType(customMenus[i].args));
            }
            catch (error){
                console.warn(error);
                this.items.push(new RandomSummonerMenuItem({name: "New Menu"}));
            }
            console.log(this.items);
        }
        this.hovernum=0;
        this.InitRep();
    }

    InitRep() {
        if (this.repd===null) {
            this.repd=$(document.createElement("div"));
            this.container.append(this.repd);
            this.repd.addClass("svg-container");
            this.repd.attr("style","top:"+this.pos[1].toString()+"px; left:"+this.pos[0].toString()+"px;")
        }
        else {
            this.repd.addClass("svg-top");
            this.repd.attr("style","top:"+this.pos[1].toString()+"px; left:"+this.pos[0].toString()+"px;")
            let pos=this.repd.offset(); // THIS DOESN'T WORK WELL FOR WHATEVER REASON
            this.pos=[pos.left-8,pos.top-8];
            console.log("POSITION:" + this.pos);
        }

        this.repd.attr("data-working","1")
        if (this.parent!==null) {
            this.repd.attr("data-level",+(this.parent.attr("data-level"))+1);
        }
        else {
            this.repd.attr("data-level",0);
        }

        if (this.repd.attr("data-level")==120) {
            this.items[0]=new LinkerMenuItem({name:"SNEK",link:"snek/snek.html"})
        }

        this.rep=$(document.createElementNS(svgns,"svg"));
        this.rep.attr("width","500");
        this.rep.attr("height","500");

        let defs = $(document.createElementNS(svgns,"defs"));
        this.rep.append(defs);
            let holeMask = $(document.createElementNS(svgns,"mask"));
                holeMask.attr("id","inner-hole"+nextid);
                defs.append(holeMask);
                let ununhole=$(document.createElementNS(svgns,"circle"));
                    ununhole.attr("cx","250");
                    ununhole.attr("cy","250");
                    ununhole.attr("r","1000");
                    ununhole.attr("fill","black");
                holeMask.append(ununhole);
                let unhole=$(document.createElementNS(svgns,"circle"));
                    unhole.attr("cx","250");
                    unhole.attr("cy","250");
                    unhole.attr("r","202");
                    unhole.attr("fill","white");
                holeMask.append(unhole);
                let hole=$(document.createElementNS(svgns,"circle"));
                    hole.attr("cx","250");
                    hole.attr("cy","250");
                    hole.attr("r","98");
                    hole.attr("fill","black");
                holeMask.append(hole);
                
        let oc=$(document.createElementNS(svgns,"circle"));
            oc.attr("cx","250");
            oc.attr("cy","250");
            oc.attr("r","200");
            oc.attr("fill","aliceblue");
            oc.attr("stroke-width","0");
            oc.attr("mask","url(#inner-hole"+nextid+")");
            this.rep.append(oc);

        for (let i=0;i<this.itemnum;i++) {
            let polyx=$(document.createElementNS(svgns,"polygon"));
            polyx.attr("points","250,250 "+ (250+400*Math.sin(2*i*Math.PI/this.itemnum))+","+
                                            (250+400*Math.cos(2*i*Math.PI/this.itemnum))+" "+
                                            (250+400*Math.sin((2*i+2/3)*Math.PI/this.itemnum))+","+
                                            (250+400*Math.cos((2*i+2/3)*Math.PI/this.itemnum))+" "+
                                            (250+400*Math.sin((2*i+4/3)*Math.PI/this.itemnum))+","+
                                            (250+400*Math.cos((2*i+4/3)*Math.PI/this.itemnum))+" "+
                                            (250+400*Math.sin(2*(i+1)*Math.PI/this.itemnum))+","+
                                            (250+400*Math.cos(2*(i+1)*Math.PI/this.itemnum)));
            console.log(polyx.attr("points"));
            polyx.attr("mask","url(#inner-hole"+nextid+")")
            let itemtype=this.items[i].color;
            console.log("COLOR:" + itemtype)
            polyx.attr("fill",itemtype);
            polyx.attr("fill-opacity","0");
            polyx.attr("stroke","azure");
            polyx.attr("stroke-width","5");
            this.rep.append(polyx);
            let repd=$(this.repd);
            polyx.hover(function(e){
                let ro=[e.offsetY-250,e.offsetX-250];
                let rd=Math.sqrt(ro[0]**2+ro[1]**2);
                //console.log($(this).closest("div"));
                if($(this).closest("div").attr("data-working")=="1") {
                    $(this).attr("fill-opacity","0.4");
                }

            },function(){
                $(this).attr("fill-opacity","0")
            });
        }

        let border=$(document.createElementNS(svgns,"circle"));
            border.attr("cx","250");
            border.attr("cy","250");
            border.attr("r","200");
            border.attr("fill","transparent");
            border.attr("stroke","lightblue");
            border.attr("stroke-width","5");
            border.attr("stroke-width","5");
            border.attr("pointer-events","none");
            this.rep.append(border);

        let ic=$(document.createElementNS(svgns,"circle"));
            ic.attr("cx","250");
            ic.attr("cy","250");
            ic.attr("r","100");
            ic.attr("fill","transparent");
            ic.attr("stroke","lightblue");
            ic.attr("stroke-width","5");
            this.rep.append(ic);
            
        this.ResetItemPosition();
        for (let i=0;i<this.itemnum;i++) {
            let itemtext=$(document.createElementNS(svgns,"text"));
            itemtext.attr("fill","black");
            itemtext.attr("x",(250+150*Math.sin(((2*i)+1)*Math.PI/this.itemnum)));
            itemtext.attr("y",(250+150*Math.cos(((2*i)+1)*Math.PI/this.itemnum)));
            itemtext.attr("text-anchor","middle");
            itemtext.attr("dominant-baseline","middle");
            itemtext.attr("pointer-events","none");
            console.log(this.items[i].text);
            itemtext.append(this.items[i].text);
            this.rep.append(itemtext);
        }
        this.rep.addClass("radial");
        this.repd.append(this.rep);
        nextid+=1;

        let pos=this.pos;
        let rmn=this;
        this.repd.mousedown(function(e){
            let ro=[e.offsetY-250,e.offsetX-250];
            let rd=Math.sqrt(ro[0]**2+ro[1]**2);
            let ra=Math.atan2(ro[0],ro[1])
            if (rd<95 && $(this).attr("data-working")>0) {
                if(rmn.parent!==null) {
                    rmn.parent.attr("data-working","1")
                    this.remove();
                }

            }
            else if (rd<205 && $(this).attr("data-working")>0) {
                console.log("THE NUMBER:" + (360*-ra)/(2*Math.PI));
                let itn = Math.floor((rmn.itemnum*(((-ra)/(2*Math.PI)+1.25)%1))%rmn.itemnum);
                console.log(itn);
                rmn.items[itn].click(rmn);
                $(this).attr("data-working",rmn.items[itn].ctd);
            }
        });
    }


    ResetItemPosition() {
        for (let i=0;i<this.itemnum;i++) {
            this.items[i].position=[(this.pos[0]+150*Math.sin((2*i+1)*Math.PI/this.itemnum)),(this.pos[1]+150*Math.cos((2*i+1)*Math.PI/this.itemnum))]
        }
    }
}

class MenuItem {
    constructor(text,ctd=0) {
        this.text=text;
        this.ctd=ctd;
        this.position=[0,0];
        this.color="#ff0000";
        console.log(this.text);
    }
    getClassName() {
        console.warn("A base menu item is being used")
        return "Menu Item"
    }
}


