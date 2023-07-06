
import  "./css/a.css"
import  "./img/sprimt/sprite.css"
import webpack1 from './img/测试.png'

console.log("1234");


const imgElem = new Image(100,100)
imgElem.style.background = `url(${webpack1}),no-repeat` // 以背景方式引入图片
imgElem.style.width ='100%'
imgElem.style.height ='100%'
document.body.appendChild(imgElem)


