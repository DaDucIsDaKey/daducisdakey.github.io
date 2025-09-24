class LinkerMenuItem extends MenuItem {
    /*
        Parameters within args:
            Name: string
            Link: string
    */
    constructor(args) { 
        super(args.name, 0);
        this.href=args.link;
        this.color="#0000aa";

    }
    click(parent) {
        window.location.href=this.href;
    }
    getClassName() {
        return "Linker";
    }
}
