var qoutes = [  
'May the Force be with you',
'Theres no place like home.',
"I'm the king of the world!",
"Carpe diem. Seize the day , boys . Make your lives extraordinary",
"Elementary , my dear Watson",
"It's alive ! It's alive!",
"My mama always said life was like a box of chocolates . You never know what you're gonna get.",
"I'll be back",
"You're gonna need a bigger boat",
"Here's looking at you , kid",
"My precious .",
"Houston , we have a problem .",
"Life is a banquet , and most poor suckers are starving to death !",
"If you build it , he will come .",
"Magic Mirror on the wall , who is the fairest one of all?",
"Keep your friends close , but your enemies closer",
"Today , I consider myself the luckiest man on the face of the earth .",
"What we've got here is failure to communicate .",
"You don't understand ! I coulda had class . I coulda been a contender . I could've been somebody , instead of a bum , which is what I am .",
"Fasten your seatbelts . It's going to be a bumpy night .",
"They may take our lives , but they'll never take our freedom !"
]
var text = document.getElementById("text")
var type  = document.getElementById("type")
var generate =document.getElementById("generate")
var index = 0
var err = document.getElementById("error")

function generateNew(){
    document.getElementById("extra").innerText = ` `
    document.getElementById('timetaken').innerText=''
    type.value = "";
    err.innerText = ``
    index = Math.floor(Math.random()*qoutes.length);
    text.innerText = qoutes[index]
    generate.innerText = "Restart"
    document.getElementById('errorwords').innerHTML = " "
document.getElementById("head").innerText =""
document.getElementById('typingspeed').innerText = ` `

    
}
var error = 0

function checkit(){
    var errorarray = [] 
    var errorindex = 0
    var typed = type.value
   
    var words = typed.split(" ")
    var main  = qoutes[index].split(" ");
//   for(let i=0;i<main.length;i++){
//       if(main[i]===words[i]){
//           continue
//       }
//       else{
         
//           errorarray[error] = main[i];
//           error = error+1;
//       }
//   }

if(main.length>words.length){
    // console.log(main,words)
    var extras =  main.length-words.length
    document.getElementById("extra").innerText = `You have missed ${extras} words`
   
    words.forEach((item=>{
        console.log(item)
        var matched = false
        for(let i=0;i<main.length;i++){
            if(item == main[i]){
                matched = true
                break;
            }
            else{
                matched = false
                continue
            }
        }
        console.log(matched);
        if(!matched){
            errorarray[errorindex] = item
            errorindex = errorindex+1
            
        }

    }))


}
if(main.length<words.length){
    console.log(main,words)

    var extras =  words.length - main.length
    document.getElementById("extra").innerText = `You have wrote ${extras} extra words`
       
    words.forEach((item=>{
        console.log(item)
        var matched = false
        for(let i=0;i<main.length;i++){
            if(item == main[i]){
                matched = true
                break;
            }
            else{
                matched = false
                continue
            }
        }
        console.log(matched);
        if(!matched){
            errorarray[errorindex] = item
            errorindex = errorindex+1
            
        }

    }))
}
if(main.length==words.length){
    console.log(main,words)

  for(let i=0;i<main.length;i++){
      if(main[i]===words[i]){
          continue
      }
      else{
         
          errorarray[error] = main[i];
          error = error+1;
      }
  }

}
console.log(errorarray)
error = errorarray.length
err.innerText = `${error} error(s) found`
document.getElementById("head").innerText = "Wrong words are:"
document.getElementById('errorwords').innerHTML = errorarray


}
var startingmin
var startingsec
var endingsec
var endingmin
let timer
var stated = true
type.addEventListener('keypress',(e)=>{
    window.clearTimeout(timer);
    if(stated){
        var d = new Date(Date());
        startingmin = d.getMinutes();
        startingsec = d.getSeconds();
        stated = false
    }
})

type.addEventListener('keyup',(e)=>{
    window.clearTimeout(timer)

    timer = window.setTimeout(() => {
        stated = true
        checkit();
        var e = new Date(Date());
        endingmin = e.getMinutes();
        endingsec = e.getSeconds();
        calculatetime();    
    }, 1500);
})
var minutes
var seconds
function calculatetime(){
if(endingmin>startingmin){
    minutes = endingmin - startingmin;
    seconds = ((minutes*60) - startingsec) + endingsec
}
if(endingmin == startingmin){
    seconds = endingsec-startingsec;
}
if(endingmin<startingmin){
   minutes = (endingmin+60)-startingmin
   seconds = ((minutes*60)-startingsec) + endingsec
}
var speed = ((qoutes[index].length)/seconds)*60
var speed = Math.floor(speed)
var newwords = qoutes[index].split(" ")
var wpmspeed = ((newwords.length)/seconds)*60
wpmspeed = Math.floor(wpmspeed)

    document.getElementById('timetaken').innerText = `total time taken ${seconds} seconds`
    document.getElementById('typingspeed').innerText = `Typing Speed is ${wpmspeed} WPM and ${speed} Charecters Per Minute`
}
