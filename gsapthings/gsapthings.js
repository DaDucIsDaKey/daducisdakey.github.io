$(function() {
    $( ".circle" ).on( "click", function() {
        let t = $(".circle");
        gsap.fromTo(".circle", {
            fill:t.attr("fill")
        },{
            x: Math.random()*100,
            y: Math.random()*100,
            fill:"rgb("+Math.random().toString()*255+","+Math.random().toString()*255+","+ Math.random().toString()*255+")",
            duration: 0.5
            })
      } );
});
