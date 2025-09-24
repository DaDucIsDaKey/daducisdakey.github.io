class CustomSummonerMenuItem extends MenuItem {
    constructor(args) {
        super(args.name, 0);
        this.color="#aaaa00";
        this.size=args.size;
        this.args=args.children;
    }
    click(parent) {
        new RadialMenu(this.size, $("body"), this.position, this.args, null, $(parent.repd));
    }
    getClassName() {
        return "Random Summoner";
    }
}