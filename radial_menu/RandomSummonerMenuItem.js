class RandomSummonerMenuItem extends MenuItem {
    constructor(args) {
        super(args.name, 0);
        this.color="#aaaaaa";
    }
    click(parent) {
        new RadialMenu(5 + Math.floor(Math.random() * 4), $("body"), this.position, [{menuType: WheeeeeMenuItem,
            args: {name:"Wheeeee"}}], null, $(parent.repd));
    }
    getClassName() {
        return "Random Summoner";
    }
}
