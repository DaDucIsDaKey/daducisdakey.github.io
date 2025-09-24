class WheeeeeMenuItem extends MenuItem {
    /*
        Parameters within args:
            Name: string
\    */
    constructor(args) { 
        super(args.name, 1);
        this.color="#aaaaaa";

    }
    click(parent) {
        let a=(Math.random())
        let b=(Math.random())
        gsap.fromTo($(parent.repd), {
            rotation:"0"
        },{
            top:(a*100).toString()+"%",
            left:(b*100).toString()+"%",
            rotation:"720",
            onComplete:function () {
                let pos=parent.repd.offset(); // THIS DOESN'T WORK WELL FOR WHATEVER REASON
                parent.pos=[pos.left-8,pos.top-8];
                parent.ResetItemPosition();
            }
        });

    }
    getClassName() {
        return "Wheeeee";
    }
}
console.log("WHEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
