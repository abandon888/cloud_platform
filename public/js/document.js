if ("onorientationchange" in window) {
    window.onorientationchange = function (event) {
        // 执行旋转
        let ifc = document.querySelector("#root")
        if(screen.orientation.angle == 90||screen.orientation.angle==-90){
            alert("已经旋转")
            ifc.style.width = screen.height+'px';
            ifc.style.height = screen.width+'px';
            let translatevalue = (ifc.offsetHeight-ifc.offsetWidth)/2;//ci
            ifc.style.transform = 'rotate('+screen.orientation.angle+'deg)'
            ifc.style.transform = 'rotate(90deg) translate('+(-1*translatevalue+'px')+','+(-1*translatevalue)+'px)';
        }
        else{
            ifc.style.width = screen.width+'px';
            ifc.style.height = screen.height+'px';
            document.body.style.transform = 'rotate('+screen.orientation.angle+'deg)';
            ifc.style.transform = ''
        }   
    }
} else if ("screen" in window && "orientation" in window.screen) {
    window.screen.orientation.addEventListener("change", function (e) {
        // 执行旋转
        let ifc = document.querySelector("#root")
        if(screen.orientation.angle == 90||screen.orientation.angle==-90){
            alert("屏幕已经旋转")
            ifc.style.width = screen.height+'px';
            ifc.style.height = screen.width+'px';
            let translatevalue = (ifc.offsetHeight-ifc.offsetWidth)/2;//ci
            ifc.style.transform = 'rotate('+screen.orientation.angle+'deg)'
            ifc.style.transform = 'rotate(90deg) translate('+(-1*translatevalue+'px')+','+(-1*translatevalue)+'px)';
        }
        else{ 
            ifc.style.width = screen.width+'px';
            ifc.style.height = screen.height+'px';
            document.body.style.transform = 'rotate('+screen.orientation.angle+'deg)';
            ifc.style.transform = ''
        }   
    }, false);
}