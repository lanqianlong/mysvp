
function isMobile() {
    var ua = navigator.userAgent;
	//$("#videoPane span").text(JSON.stringify(ua));
    return ua.match(/Android/) 
        || ua.match(/Dalvik/)
        || ua.match(/GINGERBREAD/)
        || ua.match(/Linux;.*Mobile Safari/)
        || ua.match(/Linux 1\..*AppleWebKit/)
        || ua.match(/iPod/)
        || ua.match(/iPhone/)
};	

var defualtTransport = ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling'];

if (isMobile()){
	defualtTransport = [  'jsonp-polling', 'htmlfile', 'xhr-polling', 'flashsocket'];
	//$("#videoPane span").text('moblie device');
}

var isAppleDevice=false;
// Code section for Video Show
var BaseURL = "http://vr-lab.engineeringtech.tsu.edu/";
var VideoFile = "webcam2/mjpg/video.mjpg?resolution=320x240&compression=60&textstring=SVP%20cam&textposition=bottom&text=1&clock=1&date=1&fps=20&maxframesize=100&videocodec=jpeg&rotation=0";

function setvideo(){
	function isApple() {
		var ua = navigator.userAgent;
		//$("#videoPane span").text(JSON.stringify(ua));
		return ua.match(/iPod/)
			|| ua.match(/iPhone/)
	};
	if (isApple()){
		//alert('it is apple equipment');
		isAppleDevice=true;
		$('#mediaspace').html(
			'<img src="http://vr-lab.engineeringtech.tsu.edu/webcam2/mjpg/video.mjpg?resolution=320x240&compression=60&textstring=SVP%20cam&textposition=bottom&text=1&clock=1&date=1&fps=20&maxframesize=100&videocodec=jpeg&rotation=0" height="100%" width="100%" alt="Camera Image">'
		)
		$('#mediaspace1').html(
			'<img src="http://vr-lab.engineeringtech.tsu.edu/webcam2/mjpg/video.mjpg?resolution=320x240&compression=60&textstring=SVP%20cam&textposition=bottom&text=1&clock=1&date=1&fps=20&maxframesize=100&videocodec=jpeg&rotation=0" height="100%" width="100%" alt="Camera Image">'
		)
	}
	else{
		//alert('it is not apple equipment');
		isAppleDevice=false;

        if ((navigator.appName == "Microsoft Internet Explorer"))    // || (navigator.vendor == "Google Inc.")
        {
            // If Internet Explorer for Windows then use ActiveX
	     // alert("IE ");

            $('#mediaspace').html(
                '<applet code="com.charliemouse.cambozola.Viewer" archive="Cambozola_Mjpeg_Applet_dist/cambozola.jar" height="240" width="320">'
                    +'<param name="url"  value="http://vr-lab.engineeringtech.tsu.edu/webcam2/axis-cgi/mjpg/video.cgi?resolution=320x240&compression=60&textstring=SVP%20cam&textposition=bottom&text=1&clock=1&date=1">'
                     +'<param name="accessories" value="none">'
		   +'</applet>'
            )
			$('#mediaspace1').html(
                '<applet code="com.charliemouse.cambozola.Viewer" archive="Cambozola_Mjpeg_Applet_dist/cambozola.jar" height="240" width="320">'
                    +'<param name="url"  value="http://vr-lab.engineeringtech.tsu.edu/webcam2/axis-cgi/mjpg/video.cgi?resolution=320x240&compression=60&textstring=SVP%20cam&textposition=bottom&text=1&clock=1&date=1">'
                     +'<param name="accessories" value="none">'
		   +'</applet>'
            )


        } else {

// If not IE for Windows use the browser itself to display
            $('#mediaspace').html(
               '<img src="http://vr-lab.engineeringtech.tsu.edu/webcam2/mjpg/video.mjpg?resolution=320x240&compression=60&textstring=SVP%20cam&textposition=bottom&text=1&clock=1&date=1&fps=20&maxframesize=100&videocodec=jpeg&rotation=0" height="100%" width="100%" alt="Camera Image">'
            )
			$('#mediaspace1').html(
               '<img src="http://vr-lab.engineeringtech.tsu.edu/webcam2/mjpg/video.mjpg?resolution=320x240&compression=60&textstring=SVP%20cam&textposition=bottom&text=1&clock=1&date=1&fps=20&maxframesize=100&videocodec=jpeg&rotation=0" height="100%" width="100%" alt="Camera Image">'
            )
        }
    }
}	

setvideo();

// Code section for other page content
function set_display() {
	/*	$("#tempPane tbody").height(
			$("#tempPane").innerHeight() - $("#tempPane thead").outerHeight(true)
		);								 - $("#tempPane tfoot").outerHeight(true)
	*/
		$("#accelPane .graphwindow").html("&nbsp;");
		$("#accelPane1 .graphwindow1").html("&nbsp;");

		$("#displayPane").height(
			$(window).height()	-$("#mainPage [data-role='header']").outerHeight(true)
								-$("#mainPage [data-role='footer']").outerHeight(true)
								-5 /*to compensate for window padding by jquerymobile*/
		);

		$("#menu").width( $(window).width()/3 );
		$("#menu_input.ui-btn").width(
			$(window).width()	-$("#mstart").outerWidth()
								-$("#recControl").outerWidth()
								-$("#menu").outerWidth()
	);
  /*
		if( !window.location.hash )
		{

				if(document.height <= window.outerHeight + 10)
				{
					document.body.style.height = (window.outerHeight + 50) +'px';
					setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
				}
				else
				{
					setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
				}


		}
/*
	if (isAppleDevice){
		$("#mediaspace").width($("#videoPane").width()-1);
		$("#mediaspace").height($("#videoPane").height()-1);
	}
	else{
		jwplayer().resize($("#videoPane").width()-1, $("#videoPane").height()-1);
	}
*/
	/**/		  
}

var layout_resizeDelay = setTimeout('set_display()', 400);
$(window).bind('resize orientationchange',function(){
		$("#menu").css( 'width','auto');
		$("#menu_input.ui-btn").css( 'width','20%');
	clearInterval(layout_resizeDelay);
	layout_resizeDelay = setTimeout('set_display()', 200);
});

var SVP_Setting_Data =
{
    SVP_Motor : 0,
    SVP_MRD : 0,
    SVP_SMA : 0
};

function get_SVP_Settingdata()
{
    SVP_Setting_Data.SVP_Motor = $("#svpControls input[name='motor']").val();
    SVP_Setting_Data.SVP_MRD = $("#svpControls input[name='mrd']").val();
    SVP_Setting_Data.SVP_SMA = $("#svpControls input[name='sma']").val();
}

//Code Section for Node.js & Socket.IO
var LtoNurl="http://vr-lab.engineeringtech.tsu.edu:5001";
var exerpimentID="svpdac";
var connection_complete	= false;
var Operation_Start = false;
var socket = io.connect(LtoNurl+'/init',defualtTransport);

function Show_Experiment_data()
{
    socket.on('message', function (jdata) {
        //$("#accelPane .graphwindow").text(JSON.stringify(jdata));
        //var jdata= jQuery.parseJSON(jdata);
        //$("#videoPane").text();
        if(jdata != null){
            var options = {
                series: { shadowSize: 0} // drawing is faster without shadows
                , yaxis: { min: 2.1, max: 2.5
                    ,show : true,
                    axisLabel : jdata.obj0.attributes.yLabel,
                    position: 'left'}
                , xaxis: {  show : true, axisLabel : jdata.obj0.attributes.xLabel, tickDecimals:2}
            };
            //options.xaxis.axisLabel=jdata.obj0.attributes.xLabel;
            //options.xyxis.axisLabel=jdata.obj0.attributes.yLabel;
            $.plot($("#accelPane .graphwindow"), [jdata.obj0.data], options);
			 $.plot($("#accelPane1 .graphwindow1"), [jdata.obj0.data], options);
            //$.plot($("#tempPane .graphwindow"), [jdata.obj1], options);
            //$("#tempPane .tempBar").height(jdata.obj1);jdata.obj1*10+
            //$("#tempPane .tempBar").css('height', "100%");
            $("#tempPane .tempBar").height(jdata.obj1/106 * $("#tempPane td").height());
			 
            $("#tempPane .tempText").html(jdata.obj1+"c&deg;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			 $("#tempPane .tempBar1").height(jdata.obj1/37 * $("#tempPane td").height());
			 
            $("#tempPane .tempText1").html(jdata.obj1+"c&deg;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			
        }
        if(jdata.recstat ){
            recstatus=jdata.recstat;
            $("#recCon").text(recstatus.time);
           // $("#recName_inuse").text(recstatus.filename);

            if( recstatus.enabled==1 ){
                $("#recControls input[name='recName']").hide();
            //    $("#recControls #recName_inuse").show();
            }
            else{
                $("#recControls input[name='recName']").show();
             //   $("#recControls #recName_inuse").hide();
            }
        }
    });
}

function Show_Experiment_data_form()
{
    socket.on('message', function (jdata) {
        //$("#accelPane .graphwindow").text(JSON.stringify(jdata));
        //var jdata= jQuery.parseJSON(jdata);
        //$("#videoPane").text();
        if(jdata != null){
            var options = {
                series: { shadowSize: 0} // drawing is faster without shadows
                , yaxis: { min: 2.1, max: 2.5
                    ,show : true,//true,
                    axisLabel : jdata.obj0.attributes.yLabel,
                    position: 'left'}
                , xaxis: {  show : true, axisLabel : jdata.obj0.attributes.xLabel, tickDecimals:2}
            };
            //options.xaxis.axisLabel=jdata.obj0.attributes.xLabel;
            //options.xyxis.axisLabel=jdata.obj0.attributes.yLabel;
            $.plot($("#accelPane .graphwindow"), [0], options);
			 $.plot($("#accelPane1 .graphwindow1"), [0], options);
            //$.plot($("#tempPane .graphwindow"), [jdata.obj1], options);
            //$("#tempPane .tempBar").height(jdata.obj1);jdata.obj1*10+
            //$("#tempPane .tempBar").css('height', "100%");
            $("#tempPane .tempBar").height(0/100 * $("#tempPane td").height());
            $("#tempPane .tempText").html(0+"C&deg;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			 $("#tempPane .tempBar1").height(0/37 * $("#tempPane td").height());
            $("#tempPane .tempText1").html(0+"C&deg;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        }

        if(jdata.recstat ){
            recstatus=jdata.recstat;
            $("#recCon").text(recstatus.time);
        //    $("#recName_inuse").text(recstatus.filename);

            if( recstatus.enabled==1 ){
                $("#recControls input[name='recName']").hide();
        //        $("#recControls #recName_inuse").show();
            }
            else{
                $("#recControls input[name='recName']").show();
         //       $("#recControls #recName_inuse").hide();
            }
        }
    });
}

function changeSocket(node_endpoint){
	socket = io.connect(node_endpoint,defualtTransport);
	
	socket.on('connect', function () {
        //alert("connect succeed!");
		socket.emit('0', { data: "online" });

	});
	
	socket.on('2r', function (data) {
	//alert(JSON.stringify(data[1]));
	var base="http://vr-lab.engineeringtech.tsu.edu/ExpData/SVP/";
		$("#downloadlist").html("");
		for (i in data){		
			$("#downloadlist").append('<li><a rel="external" target="new" href="'+base+data[i]+'">'+data[i]+'</a></li>');
		}
		$("#downloadlist").listview('refresh');
	});

	socket.on('disconnect', function () {
		alert("server has disonnected")
		//$("#svpControls input").val(0);
	});

    Show_Experiment_data_form();
    set_display();
}
function start_Connect_with_Server()
{
    if (!connection_complete){
       // alert("start connect with server!");
        socket.on('connect', function () {
           // alert("send out connect massage!");
            socket.emit('request_client_endpoint', { drID: exerpimentID });
        });
        socket.on('endpoint_true', function (data) {
            connection_complete	= true;
            if(!Operation_Start)
            {
                //alert("operstion start!");
                changeSocket(LtoNurl+data.endpoint);
            }
        });
        socket.on('endpoint_false', function (data) {
            connection_complete	= false;
        });
    }
}

start_Connect_with_Server();

var recstatus={
		enabled:0
		, time:"0:00.00"
		, filename:""
	};

function sendserver(responce){
	switch(responce){
		case 1:
				socket.emit('1', { urlquery: $("#svpControls").serialize() });
		  break;
		case 2:
                get_SVP_Settingdata();
				socket.emit('5', { svpsettingdata: SVP_Setting_Data.SVP_Motor +"&"+SVP_Setting_Data.SVP_MRD+"&"+SVP_Setting_Data.SVP_SMA });
		  break;
		case 3:
				socket.emit('1', { urlquery: $("#svpControls input[name='masterCon'],#recControls input[name='recCom']").val(0).serialize() });
		  break;
        case 4:
            socket.emit('2', { getdatafilelist: "null"});
            //alert("sendserver(4)");
            break;
        case 5:
            socket.emit('3', { recorddata:"null"});
            break;
        case 6:
            socket.emit('4', { stoprecorddata: "null"});
            break;
        case 7:
            socket.emit('6', { createdatafile: "null"});
            break;
		default:
				//socket.emit('1', { urlquery: custom.serialize() });
	}
	
}	  

$("#listFiles").click( function(){		
	//alert("newfiles requested");
	sendserver(4);
	});	  

$("#mstart").toggle(

	 function(){
		//$("#svpControls input").css('visibility','visible');
         setTimeout('start_Connect_with_Server()', 200);
		//$("#svpControls div input,#svpControls .units").show();	
	    $(this).find('.ui-icon').removeClass('ui-icon-power-off').addClass('ui-icon-power-on');
		$(this).find('.ui-btn-text').html('ON&nbsp;&nbsp;');
		$("#svpControls input[name='masterCon']").val(1);
		sendserver(1);	
		$("#slider_input").show();
         {
             Operation_Start = true;
             Show_Experiment_data();
         }
	}
	,function(){
		sendserver(3);
		
		//$("#svpControls input").css('visibility','hidden');	
		//$("#svpControls div input,#svpControls .units").hide();	
		$("#recControls, #slider_input").hide();	
		
		$("#svpControls input").val(0);		
		sendserver(1);
		
		$(this).find('.ui-icon').removeClass('ui-icon-power-on').addClass('ui-icon-power-off');
		$(this).find('.ui-btn-text').text('OFF');

        {
            Operation_Start = false;
            Show_Experiment_data_form();
            set_display();
        }
	}
);


///////////////////////////////////////////////////////////////////////
//Record data
////////////////////////////////////////////////////////////////////////
var RecTimer =
{
    Sec_Hun : 0,
    Sec_Tho : 0,
    Sec_One : 0,
    Sec_Ten : 0,
    Min : 0
};
var RecTimer_ID;
var RecTimer_Set = false;
var RecTimer_Limit = 0;
var RecTimer_Finished = false;

function reset_RecTimer()
{
    RecTimer.Sec_One = 0;
    RecTimer.Sec_Ten = 0;
    RecTimer.Sec_Hun = 0;
    RecTimer.Sec_Tho = 0;
    RecTimer.Min = 0;
}

function FormatDate(str)
{
    if (typeof str == "string")
    {
        var arrDateInfo = str.split(" ");
        if (arrDateInfo.length == 2)
        {
            var arrDate = arrDateInfo[0].split("-");
            if (arrDate.length == 3)
            {
                if (arrDate[1].length == 1) arrDate[1] = "0" + arrDate[1];
                if (arrDate[2].length == 1) arrDate[2] = "0" + arrDate[2];

                var arrTime = arrDateInfo[1].split(":");
                if (arrTime.length == 3)
                {
                    if (arrTime[0].length == 1) arrTime[0] = "0" + arrTime[0];
                    if (arrTime[1].length == 1) arrTime[1] = "0" + arrTime[1];
                    if (arrTime[2].length == 1) arrTime[2] = "0" + arrTime[2];

                    var szNewDateTime = arrDate[0] + "-" + arrDate[1] + "-" + arrDate[2] + " ";
                    szNewDateTime += arrTime[0] + ":" + arrTime[1] + ":" + arrTime[2];

                    return szNewDateTime;
                }

                return arrDate[0] + "-" + arrDate[1] + "-" + arrDate[2] + " " + arrDateInfo[1];
            }
        }
    }

    return str;
}

function Update_RecTimer()
{
    RecTimer.Sec_One = RecTimer.Sec_One + 1;
    if(parseInt(RecTimer.Sec_One/10) >= 1) {RecTimer.Sec_Ten = RecTimer.Sec_Ten + 1; RecTimer.Sec_One = 0; };
    if(RecTimer.Sec_Ten > 9) {RecTimer.Sec_Hun = RecTimer.Sec_Hun + 1;RecTimer.Sec_Ten = 0;};
    if(parseInt(RecTimer.Sec_Hun/10) >= 1) {RecTimer.Sec_Tho = RecTimer.Sec_Tho + 1; RecTimer.Sec_Hun = 0; };
    if(RecTimer.Sec_Tho > 5) {RecTimer.Min = RecTimer.Min + 1;RecTimer.Sec_Tho = 0;};

    $("#recCon").find('.ui-btn-text').html( RecTimer.Min + ":" + RecTimer.Sec_Tho + RecTimer.Sec_Hun + "." + RecTimer.Sec_Ten + RecTimer.Sec_One);
    if((RecTimer.Min*60 + RecTimer.Sec_Tho*10 + RecTimer.Sec_Hun) >= RecTimer_Limit)
    {
        clearInterval(RecTimer_ID);
        RecTimer_Set = false;
        RecTimer_Finished = true;
        sendserver(6);
        alert("Data Record Finished!");

        $("#recControls input[name='recCom']").val(0);
        $("#recControls input[name='recName']").removeAttr('disabled');
        $('#recCon, #recCon .ui-btn-text').removeClass("recording_highlight");
    }
    else
    {
        sendserver(5);
        sendserver(2);
    }
}

$("#recCon").toggle(
    function(){
      //  alert("stop to timer");
        if(RecTimer_Set)
        {
            clearInterval(RecTimer_ID);
            RecTimer_Set = false;
            //RecTimer_Finished = false;


            $("#recControls input[name='recCom']").val(0);
            $("#recControls input[name='recName']").removeAttr('disabled');
            $('#recCon, #recCon .ui-btn-text').removeClass("recording_highlight");
        }
    },
	 function(){
       //  alert("restart to timer");
         if(!RecTimer_Set && !RecTimer_Finished)
         {
             RecTimer_Set = true;
             RecTimer_ID = setInterval(Update_RecTimer,10);
             //RecTimer_Finished = false;

            $("#recControls input[name='recCom']").val(1);
            $("#recControls input[name='recName']").attr('disabled','true');
            $('#recCon, #recCon .ui-btn-text').addClass("recording_highlight");
         }
	}
);

$("#recControls_hide").click(function(){
	if( $("#recControls input[name='recCom']").val()==1 ){
		$("#recControls input[name='recName']").toggle();
	}
	else{
		$("#recBar").hide();
		set_display();
	}	
});

$("#recControls_show").click(function(){
   // alert("start to Record Data");
    reset_RecTimer();
	$("#recBar").show();
	set_display();
});

$("#recOptions").click(function(){	
	$( "#recControls" ).popup( "open" );
	set_display();
});

$("#rec_Apply_Btn").click(function(){
  // alert("test Apply" + $("#recControls input[name='reclimit']").val());

    reset_RecTimer();
    if($("#recControls input[name='reclimit']").val() > 120)
    {
        alert("Please input the timer value between 10 and 120 sec!");
    }
    else
    {
        if(!RecTimer_Set)
        {
            sendserver(7);
            RecTimer_Set = true;
            RecTimer_Finished = false;
            RecTimer_Limit = $("#recControls input[name='reclimit']").val();
            RecTimer_ID = setInterval(Update_RecTimer,10);
            sendserver(2);
            $("#recControls input[name='recCom']").val(1);
            $("#recControls input[name='recName']").attr('disabled','true');
            $('#recCon, #recCon .ui-btn-text').addClass("recording_highlight");
            sendserver(5);
        }
    }
});

$("#rec_Close_Btn").click(function(){
 //   var NowDate= FormatDate(GetDateTime());
  //  alert(NowDate);
});

var target_elem;

function link_input_to_slider(){
	target_elem.parents('a.ui-btn.ui-btn-inline.ui-btn-up-a').addClass('.ui-btn-active');

	$('#input_slider').val(target_elem.val()).attr({
		 'max': target_elem.attr('max')
		,'min': target_elem.attr('min')
		,'step': target_elem.attr('step')
	}).slider('refresh');
		sendserver(1);

	if( $("#slider_input").is(':hidden') && ( $("#svpControls input[name='masterCon']").val()==1 ) ){
		$("#slider_input").show();
		set_display();
	}
    sendserver(2);
}
_$('#countdown').timeTo(3570,function(){
			alert("Windows will be closed in 30 seconds!");
			_$('#countdown').timeTo(30,function(){
				 if (navigator.userAgent.indexOf("MSIE") > 0) {
				  if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
				   window.opener = null;
				   window.close();
				  } else {
				   window.open('', '_top');
				   window.top.close();
				  }
				 }
					 else if (navigator.userAgent.indexOf("Firefox") > 0) {
					  window.location.href = 'about:blank ';
					 } else {
					  window.opener = null;
					  window.open(", '_self', ");
					  window.close();
					 }
			});
        });
$("#svpControls a").mouseover(function(){
$("#svpControls div input,#svpControls .units").show();
	target_elem=$(this).find('input');
	link_input_to_slider();
});
$("#svpControls a").mouseout(function(){
$("#svpControls div input,#svpControls .units").hide();
	target_elem=$(this).find('input');
	link_input_to_slider();
});

$("#svpControls input").bind('change click focus',function(){
	target_elem=$(this);
	link_input_to_slider();
});

$("#slider_input").bind('change click',function(){		
	target_elem.val($('#input_slider').val());	
	sendserver(1);
    sendserver(2);
});

-$("div#mediaspace").draggable();
-$("div#mediaspace").resizable();
-$("#videoPaneDisplay").resizable();
-$("#videoPaneDisplay").draggable();
-$(".graphTable2").draggable();
-$(".graphTable2").resizable();
-$("#accelPaneDisplay").resizable();
-$("#accelPaneDisplay").draggable();
-$("#tempPane").draggable();

-$("div#countdown").draggable();



//////////////////////////////////////////////////////////////////////////////////////////