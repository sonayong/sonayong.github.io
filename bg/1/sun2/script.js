var tween,
    opacity = false,
    motionPath = MorphSVGPlugin.pathDataToBezier("#motionPath", {align:"#balloon"});

var tl = new TimelineMax({repeat:-1});

//offest the balloon by hafl width and half height to make it appear centered on path
TweenLite.set("#balloon", {xPercent:-50, yPercent:-0})
  tween = tl.to("#balloon", 3, {bezier:{values:motionPath, type:"cubic"}});
  




