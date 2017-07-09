var count=1;
var err=0;
height=84.3;
var counter=1;
var detail=1;
var register=0;
var rname='';
var mail='';
var contact='';
var c;
var regnum=0;
name="";
var commands={	
"help":"<br>help - To get help commands<br>date - To get current date<br>qual - To get my qualification details<br>about - About me!<br>skills - Check out my Skillzz<br>contact - Hey, How you doing?<br>fb - Stalk me in fb!<br>linkedin - Check out me as a professional<br>github - Care to look?<br><br>",
"date":"<br>"+updateTime()+"<br><br>",
"qual":"<br>B.Tech (Chemical Engineering), NIT Trichy, India<br><br>",
"about":"<br>21-year old front-end web developer who is also a great(ahem..ahem) Chemical Engineer. Graduated from one of pioneer institution and got placed in GAIL but coding still loves me &hearts;<br><br>",
"skills":"<br>HTML,CSS,JS - ##########<br>PHP,C++ - #######<br>VB.Net - #####<br>Designing - ####<br>Chemical Engineering - Maximum call stack exceeded<br><br>",
"contact":"<br>cprganesh@gmail.com<br>+91 9790892234<br><br>",
"fb":"<br>Stalk right away!<br><br>",
"linkedin":"<br>Yes, I am a professional<br><br>",
"github":"<br>Meh, huge volume of css and js<br><br>",
"gany":"<br>Simha _/\\_<br><br>",
"sandi":"Zaga Zaga <span style='background:url(assets/img/giphy.gif);width:20px;height:20px;background-size:cover;position:relative;display:inline-block'></span><br>",
"sara":"<br>Chulbuli <span style='color:red;'>&hearts;</span><br><br>"
};
var option='n';
function formvalidate()
{
	var ferr=1;
	var charRegExp = /^[a-zA-Z .]+$/;
	if($("#rname").val()=="" || $("#rname").val().search(charRegExp)!=0 )
		ferr=0;
	if($("#mail").val()=="" || (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($("#mail").val() )) ))
		ferr=0;
	if($("#contact").val()=="" || isNaN($("#contact").val()))
		ferr=0;


	if(ferr==0)
	{
		var entry='<div class="introForm-line" ><div class="input-wrapper" style="color:#fff;"> <div class="input-wrapper">Invalid Input. Try Again!</div> </div></div>';	
		if(regnum==3)
	$("#answer"+String(regnum)).append(entry);
	else
	$("#question"+String(regnum)).append(entry);

	}
	return ferr;
}
function ajaxReq()
{
	var req_name=$("#rname").val();
	var req_mail=$("#mail").val();
	var req_mobile=$("#contact").val();


$.post("pay.php",
    {
       name: req_name, email: req_mail, phone:req_mobile
    },
    function(data){
        var res;
        data=JSON.stringify(data);
        res=JSON.parse(data);
        window.location.href=String(res.pgUrl);
    });

}
function addline(state)
{

 check_string(c,state);

$("span").removeClass('blink');
 
 if(register==1 && detail==5)
 {
 	register=0;
 	
 }
 c++;
 if(register==0)
 {

 var entry='<div class="introForm-entry" id="entry'+c+'"><div class="introForm-question visible" id="question'+c+'"><div class="introForm-line" ><div class="input-wrapper"><table><tr><td>'+name+'@gany.guru:~$</td><td><input type="text" class="visible butt" id="text'+c+'" onkeyup="general(event)" style="color:#322F2F;" ><div id="faketext'+c+'" onclick="$(\'#text'+c+'\').focus();" class="faketext"> <span class="blink">&block;</span></div> </td></tr></table></div></div></div></div>';
 
 if(detail==5)
 {
 	$("#entry"+String(regnum)).addClass("read");

		$(".butt").attr("disabled","disabled");
		detail=1;
 }	
 else
 {
 $("#entry"+String(c-1)).addClass("read");

		$(".butt").attr("disabled","disabled");
	
		if(c<4)
		height+=Number(document.getElementById("entry"+String(c-1)).offsetHeight);
	
		$('#form').css({
  '-webkit-transform' : 'translate(0px,-' + (height) + 'px)',
 
  'transform'         : 'translate(0px,-' + (height) + 'px)'
});
		}

		$("#form").append(entry);

			$('#text'+c).focus();
	}
	else if(register==1)
	{
		if(detail==1)
		{
			entry='<div class="introForm-line" ><div class="input-wrapper" style="color:#fff;"> <div class="input-wrapper"><table><tr><td>Name : </td><td><input type="text" class="visible butt" id="text'+c+'" onkeyup="general(event)" style="color:#322F2F;" ><div id="faketext'+c+'" onclick="$(\'#text'+c+'\').focus();" class="faketext"> <span class="blink">&block;</span></div> </td></tr></table></div> </div></div>';	

		}
		else if(detail==2)
		{
			entry='<div class="introForm-line" ><div class="input-wrapper" style="color:#fff;"> <div class="input-wrapper"><table><tr><td>Mail : </td><td><input type="text" class="visible butt" id="text'+c+'"  onkeyup="general(event)" style="color:#322F2F;" ><div id="faketext'+c+'" onclick="$(\'#text'+c+'\').focus();" class="faketext"> <span class="blink">&block;</span></div> </td></tr></table></div> </div></div>';	
		}
		else if(detail==3)
		{
			entry='<div class="introForm-line" ><div class="input-wrapper" style="color:#fff;"> <div class="input-wrapper"><table><tr><td>Contact : </td><td><input type="text" class="visible butt" id="text'+c+'" maxlength="10" onkeyup="general(event)" style="color:#322F2F;" ><div id="faketext'+c+'" onclick="$(\'#text'+c+'\').focus();" class="faketext"> <span class="blink">&block;</span></div> </td></tr></table></div> </div></div>';	
		}
		else if(detail==4)
		{
			entry='<br><div class="introForm-line" ></div>Name: '+$("#rname").val()+'<div class="introForm-line" >Email: '+$("#mail").val()+'</div><div class="introForm-line" >Contact: '+$("#contact").val()+'</div><div class="introForm-line" ><div class="input-wrapper" style="color:#fff;"> <div class="input-wrapper"><table><tr><td>Do you want to confirm Registration(Y/N): </td><td><input type="text" class="visible butt" id="text'+c+'" onkeyup="general(event)" style="color:#322F2F;" ><div id="faketext'+c+'" onclick="$(\'#text'+c+'\').focus();" class="faketext"> <span class="blink">&block;</span></div> </td></tr></table></div> </div></div>';	
		}
$(".butt").attr("disabled","disabled");
$("span").removeClass('blink');
		if(regnum==3)
$("#answer"+String(regnum)).append(entry);
else
$("#question"+String(regnum)).append(entry);

$('#text'+c).focus();
//lert('hi'+c);

		
	}
}
function check_string(c,state)
{
if(register==0)
{
substr='';
text='';
if(state==0)
text=$("#gitname").val().toLowerCase()
else
text=$("#text"+String(c)).val().toLowerCase();
if(commands.hasOwnProperty(text))
	substr=commands[text];
else
	substr="<br>Command Not Found!!!<br><br>";


if(text!="register")
{
var entry='<div class="introForm-line" ><div class="input-wrapper" style="color:#fff;"> '+substr+' </div></div>';	
$("span").removeClass('blink');
if(state==0)
$("#answer"+String(c)).append(entry);
else
$("#question"+String(c)).append(entry);
}
else
{
	register=1;
	regnum=c;
	
		if(c==3)
			height+=80;
		else
				height+=150;
	$('#form').css({
  '-webkit-transform' : 'translate(0px,-' + (height) + 'px)',
 
  'transform'         : 'translate(0px,-' + (height) + 'px)'
});
}

if(text=="fb")
{
	window.open("https://facebook.com/GaneGuru");
}
else
if(text=="github")
{
	window.open("https://github.com/ganyguru");
}
else
if(text=="linkedin")
{
	window.open("https://www.linkedin.com/in/ganyguru/");
}
if(text=="sponsor")
{
	$("#sponblock").show();
	$("#sponsors").show();
}
}
}
function question(i)
{
	var string='';
	switch(i)
	{
		case 2:
			string='<div class="introForm-line">Hi again, '+name+'.</div><div class="introForm-line" >Do you want to continue pragyan hackathon terminal?</div>';
		break;
		case 3:
			string='<div class="introForm-line">Hi again, '+name+'.</div><div class="introForm-line">Enter "help" for more details</div>';
		break;
		case 4:
			string='<div class="introForm-line">You missed an \'Awesome\' opportunity.</div><div class="introForm-line" >Anyway Thanks!</div>';
		break;
	
	}
	return string;
}
function answer(i)
{
	var string='';
	switch(i)
	{
		case 2:
			string='<div class="introForm-line" ><button type="button" class="butt opt" onclick="increase()"><span >Yes</span></button><button type="button" class="butt opt" onclick="last()"><span >No</span></button></div>';
		break;
		case 3:
			string='<div class="introForm-line" ><div class="input-wrapper"><table><tr><td>'+name+'@gany.guru:~$</td><td><input type="text" class="visible butt" id="gitname" onkeyup="c='+i+';keytype2(event)" style="color:#322F2F;" ><div id="faketext2" onclick="$(\'#gitname\').focus();"> <span class="blink">&block;</span></div> </td></tr></table></div></div>';
		break;
		case 4:
			string='<div class="introForm-line" ><button type="button" class="butt" onclick="back('+i+')"><span >Back</span></button></div>';
		break;
	
	}
	return string;
}
function newentry(i)
{
	var entry='<div class="introForm-entry" id="entry'+i+'"><div class="introForm-question visible" id="question'+i+'">'+question(i)+'</div><div class="introForm-answer visible" id="answer'+i+'">'+answer(i)+'</div></div>';
               return entry;
}
function increase()
{
	   
	name=document.getElementById("name1").value;
	if(count==1 && document.getElementById("name1").value=="")
		err=1;
	if(err==0)
	{

		count++;
		
		

		$(".butt").attr("disabled","disabled");
		if(count==3)
		{
			  

			height+=Number(document.getElementById("entry"+String(count-2)).offsetHeight);
			$("#entry"+String(count-2)).addClass("read");
			  $("span").removeClass('blink');

		}
		else
	{

		$("#entry"+String(count-1)).addClass("read");
		height+=Number(document.getElementById("entry"+String(count-1)).offsetHeight);
		 $("span").removeClass('blink');
	    $('#b1').removeClass('blink');
	    $('.blink').removeClass('blink');
	}
		$('#form').css({
  '-webkit-transform' : 'translate(0px,-' + (height) + 'px)',
 
  'transform'         : 'translate(0px,-' + (height) + 'px)'
});
		$("span").removeClass('blink');
		$("#form").append(newentry(count));
		if(count==3)
			$('#gitname').focus();
	}
	//$(".field").removeAttr("disabled");
}

function last()
{
	count+=2;
		
		$("#entry"+String(count-2)).addClass("read");

		$(".butt").attr("disabled","disabled");
		height+=Number(document.getElementById("entry"+String(count-2)).offsetHeight);
		$('#form').css({
  '-webkit-transform' : 'translate(0px,-' + (height) + 'px)',
 
  'transform'         : 'translate(0px,-' + (height) + 'px)'
  });
		$("#form").append(newentry(count));
}
function back(i)
{

	height-=Number(document.getElementById("entry"+String(i)).offsetHeight);
		$('#form').css({
  '-webkit-transform' : 'translate(0px,-' + (height) + 'px)',
 
  'transform'         : 'translate(0px,-' + (height) + 'px)'
});
		$("#entry"+String(i)).remove();
			$("#entry"+String(i-2)).removeClass("read");
	$(".opt").removeAttr("disabled");

		
	count-=2;
	
}
function updateTime() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        var millis =currentTime.getMilliseconds();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        var v = hours + ":" + minutes + ":" + seconds + ":" + millis;
        var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = dd+'/'+mm+'/'+yyyy;
        
        return today+" "+v;
    }
 //   if(!ntime)
 // updateTime();
 $(document).ready( function() {
 	if(!ntime)
   document.getElementById('ip').innerHTML=userip;
if(!ajaxload)
{
   $("#block").fadeOut();
   $("#root").fadeIn();
}
 
});
