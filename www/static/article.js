// http://104.199.176.230/skfcs/default/home


var achPhoto="";
var achPhoto2="";
var imageName = "";
var imageName2 = "";
var imagePathA="";
var imagePath2B="";

var latitude="";
var longitude="";
var upListFlag=0;
// #######################
var lat;
var long;


function getLocationInfoAch() {	
	var options = { enableHighAccuracy: false};	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);				
	$(".errorChk").html("Confirming location. Please wait.");
}
// onSuccess Geolocation
function onSuccess(position) {
	$("#ach_lat").val(position.coords.latitude);
	$("#ach_long").val(position.coords.longitude);
	//$("#ach_lat").val(position.coords.latitude);
	//$("#ach_long").val(position.coords.longitude);
	$(".errorChk").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onError(error) {
   $("#ach_lat").val(0);
   $("#ach_long").val(0);
   $(".errorChk").html("Failed to Confirmed Location.");
}

//---- online 
//var apipath="http://a.businesssolutionapps.com/gpff/syncmobile/";

//--- local
var apipath="http://104.199.176.230/mycbt/syncmobile/";

 url ="";


$(document).ready(function(){
	/*if (localStorage.synced!='YES'){
			 url = "#homePage";						
		}else{*/
			
			/*if (upListFlag==0){
				$("#ffUpDiv").html(localStorage.upazilaList);	
				upListFlag=1;
			}else{
				$('#ffUpDiv').empty();
				$('#ffUpDiv').append(localStorage.upazilaList).trigger('create');
			}*/
	
	$("#name").val(localStorage.name);
	$("#email").val(localStorage.email);
	$("#mobile").val(localStorage.mobile);		
	$("#name1").val(localStorage.name);
	$("#email1").val(localStorage.email);
	$("#mobile1").val(localStorage.mobile);
	$("#remark").val("");
			
var articlecategoryStr="";
		$.ajax({
			  url:apipath+'article_category?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code,
			  success: function(resStr) {	
				  
				  articlecategoryStr=resStr.split(",");
				  
				  var articleListS='<ul data-role="listview"  data-inset="true" >';
				  
				  for (i=0;i<articlecategoryStr.length;i++){
					  articleLi=articlecategoryStr[i].split("<fd>")
					  
					  					  
					  for (j=0;j<articleLi.length;j++){
						  articleListS+='<li style="margin-bottom:1px;" onClick="article_name(\''+articleLi+'\')" ><a>'+articleLi+'</a></li>'
						  // article_name articleListS+='<li style="margin-bottom:1px;" onClick="articleSubcategory(\''+articleLi+'\')" ><a>'+articleLi+'</a></li>' 
						  }
					  
				  	  				  				  
				  }	
				  articleListS+='</ul>';
				  
				$('#articleCatDiv').empty();
				$('#articleCatDiv').append(articleListS).trigger('create');			
			
			  }
			  })
			
						
			
			url = "#homePage";
		//}
	$.mobile.navigate(url);
	
	
});

function syncBasic() {
					
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
		
		if (mobile=="" || password==""){
			 $(".errorMsg").html("Required mobile no and password");	
		 }else{	
			 $('#syncBasic').hide();			 
			 $(".errorMsg").html("Sync in progress. Please wait...");
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
				}
		
		 	//alert(apipath+'passwordCheck?cid=ARTICLE_VIEWER&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code);
			$.ajax({
			  url:apipath+'passwordCheck?cid=ARTICLE_VIEWER&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code,
			  success: function(result) {
				syncResult=result
				//alert(syncResult);
				var syncResultArray = syncResult.split('rdrd');
					localStorage.synced=syncResultArray[0];
					if (localStorage.synced=='YES'){	
						localStorage.sync_code=syncResultArray[1];
						//localStorage.upazilaList=syncResultArray[2];						
						
						localStorage.mobile_no=mobile;
						
						
						$(".errorMsg").html("Sync Successful");
						
						$('#syncBasic').show();
						
						
						url = "#homePage";
						$.mobile.navigate(url);
												
					}else{
						
						$(".errorMsg").html("Sync Failed. Authorization or Network Error.");
						$('#syncBasic').show();
					}
				
			  }//----/success f
			});//------/ajax
			
		 }//-----/field
			
	}
	

function menuClick(){
		$(".errorChk").text("");
		$(".sucChk").text("");
		
		$("#btn_take_pic").show();
		$("#btn_ach_lat_long").show();
		
		$('#up_list_search').val('');
		
		url = "#homePage";
		$.mobile.navigate(url);
	
	}
//----------------back button
function backClick(){
	
	$(".errorChk").text("");
	}

// my requestForm work start here  ########################################################

function myRequestForm(){
			var email=$("#email").val();
			var emailCheck =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
			
			var mobile= $("#mobile").val();
			//alert(mobile.length);
			if(!mobile=="" && mobile.length==13){
				mobile= mobile;
				}else if(!mobile=="" && mobile.length==11){
					mobile= 88+mobile;
					}
			var remark=$("#remark").val();
			var name=$("#name").val();
			
			var lat = $("#ach_lat").val();
			var long = $("#ach_long").val();
			
			if(email == "" & mobile == ""){
				$(".errorReq").text("Email or Mobile required !!");
			}
			
			else if(!email.match(emailCheck)){
				$(".errorReq").text("Invalid email format !!");
				}
				
			
			else{
				//alert(apipath+'insertRequestData?cid=ARTICLE_VIEWER&email='+email+'&mobile='+mobile+'&remark='+remark+'&name='+name+'&lat='+lat+'&long='+long);
				
				$.ajax({
						url: apipath+'insertRequestData?cid=ARTICLE_VIEWER&email='+email+'&mobile='+mobile+'&remark='+remark+'&name='+name+'&lat='+lat+'&long='+long,
						success: function(resStr) {
									
								if(resStr == 'Success'){
									localStorage.name = name;
									localStorage.email = email;
									localStorage.mobile = mobile;
									$(".errorReq").text("Request Submitted");
									url="#leftpanel";					
									$.mobile.navigate(url);
								}else{
									$(".errorReq").text("Failed to save");
									url="#leftpanel";					
									$.mobile.navigate(url);
									}
								
							}
					});
				}
			
		} // My request form ends here
// my requestForm1 work start here  ########################################################

function myRequestForm1(){
			var email1=$("#email1").val();
			var emailCheck1 =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
			
			var mobile1= $("#mobile1").val();
			//alert(mobile1.length);
			if(!mobile1=="" && mobile1.length==13){
				mobile1= mobile1;
				}else if(!mobile1=="" && mobile1.length==11){
					mobile1= 88+mobile1;
					}
			var remark1=$("#remark1").val();
			var name1=$("#name1").val();
			
			var lat = $("#ach_lat").val();
			var long = $("#ach_long").val();
			
			if(email1 == "" & mobile1 == ""){
				$(".errorReq").text("Email or Mobile required !!");
			}
			
			else if(!email1.match(emailCheck1)){
				$(".errorReq").text("Invalid email format !!");
				}
				
			
			else{
				//alert(apipath+'insertRequestData?cid=ARTICLE_VIEWER&email='+email+'&mobile='+mobile+'&remark='+remark+'&name='+name+'&lat='+lat+'&long='+long);
				
				$.ajax({
						url: apipath+'insertRequestData?cid=ARTICLE_VIEWER&email='+email1+'&mobile='+mobile1+'&remark='+remark1+'&name='+name1+'&lat='+lat+'&long='+long,
						success: function(resStr) {
									
								if(resStr == 'Success'){
									localStorage.name = name1;
									localStorage.email = email1;
									localStorage.mobile = mobile1;
									$(".errorReq").text("Request Submitted");
									url="#leftpanel";					
									$.mobile.navigate(url);
								}else{
									$(".errorReq").text("Failed to save");
									url="#leftpanel";					
									$.mobile.navigate(url);
									}
								
							}
					});
				}
			
		} // My requestform1 ends here

function searchData(){
	var searchValue=$("#searchValue").val();
	
	if (searchValue==""){
		$(".error").text("Empty Search Value");
	}else{
		//alert(apipath+'search_keyword?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&searchValue='+searchValue);
		$.ajax({
			  url: apipath+'search_keyword?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&searchValue='+searchValue,
			  success: function(resStr) {		
			
				if (resStr!=""){
					keywordStr=resStr.split("||");
					  
					  var keywordS='';
					  
					  for (i=0;i<keywordStr.length;i++){
						  keywordLi=keywordStr[i].split("-")
						  
						  var article_id=keywordLi[0];
						  var article_name=keywordLi[1]
						  var article_introduction=keywordLi[2];
						  //  data-role="button"  border:1px solid #00e6e6;
						  keywordS+='<a data-role="button" style="margin-bottom:10px; " >'+article_name+'</a>' 
						  keywordS+='<div style="padding:1px 5px 10px 5px; border:2px solid #ffffff; border-radius: 5px">'
						  keywordS+='<p >'+article_introduction+'</p>'
						  keywordS+='<a href="#leftpanel1" style="text-decoration:none; color:#ffffff; padding:5px 5px; border-radius:3px; background-color:#4C9ED9; font-weight:normal" onClick="reqSet(\''+article_name+'\', \''+article_introduction+'\')">'+"Request Info."+'</a>'
						  keywordS+='&nbsp;&nbsp;<a onClick="article_page(\''+article_id+'\')" style="color:#ffffff; font-weight:normal;">Details..<img src="arrow_right.png" style="width:17px; height:11px"/></a>'
						  keywordS+='</div>'
						  
					  }
						  
					  keywordS+='';
					  
					$('#articleNameDiv').empty();
					$('#articleNameDiv').append(keywordS).trigger('create');
					 
					$(".error").text("");
					 
					  url="#second_page";					
					  $.mobile.navigate(url);
				
				
				}else{
					$(".error").text("Invalid keywords");
				}
			
			  }
			
		});	
		
	}

}

function articleSubcategory(category){
	 
	localStorage.category=category;
	$("#showCategory").html(localStorage.category);	

 
	var articleSubcatStr="";
	 	//alert(apipath+'article_subCategory?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&category='+localStorage.category);
		$.ajax({
			  url:apipath+'article_subCategory?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&category='+localStorage.category,
			  success: function(resStr) {	
				  
				  articleSubcatStr=resStr.split(",");
				  
				  var articleSubCatS='<ul data-role="listview" data-filter="true" data-inset="true" data-input="#rich-autocomplete-input">';
				  
				  for (i=0;i<articleSubcatStr.length;i++){
					  articleSubCatLi=articleSubcatStr[i].split("<fd>")
					  
					  					  
					  for (j=0;j<articleSubCatLi.length;j++){
						  articleSubCatS+='<li style="margin-bottom:1px;" onClick="article_name(\''+articleSubCatLi+'\')" ><a>'+articleSubCatLi+'</a></li>' 
						  }
					  
				  	  				  				  
				  }	
				  articleSubCatS+='</ul>';
				  
				$('#articleSubCatDiv').empty();
				$('#articleSubCatDiv').append(articleSubCatS).trigger('create');
				 
				  url="#first_page";					
				  $.mobile.navigate(url);
				  				  
			  }
			});
	
}




function article_name(category){
	 
	localStorage.category=category;
	
	var articleNameStr="";
		$.ajax({
			  url:apipath+'article_name?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&category='+localStorage.category,
			  success: function(resStr) {
				  var articleNameS='';
				  articleNameStrH=resStr.split("<fg>");
				  var article_image=articleNameStrH[1];
				  articleNameS='<a class="resize_a"><img src="'+article_image+'" style="padding-top:10px; width:100%"/></a>'
				  
				  articleNameStr=articleNameStrH[0].split("||");
				  
				  for (i=0;i<articleNameStr.length;i++){
					  articleNameLi=articleNameStr[i].split("-")
					  
					  var article_id=articleNameLi[0];
					  var article_name=articleNameLi[1];
					  var article_introduction=articleNameLi[2];					  
					  
					  //article_introduction
					  articleNameS+='<div style="padding:5px 10px 15px 10px; border:2px solid #ffffff; border-radius:7px; margin-top:15px" >'
					  articleNameS+='<div style="margin-bottom:10px">'
					  articleNameS+='<h3 style="margin:0; font-style:italic" id="rquestName">'+article_name+'</h3>'
					  articleNameS+='<p style="margin:5px 0; " id="requestIntro" >'+article_introduction+'</p>'
					  articleNameS+='</div>'
					  articleNameS+='<a href="#leftpanel1" style="text-decoration:none; color:#ffffff; padding:5px 5px; border-radius:3px; background-color:#4C9ED9; font-weight:normal" onClick="reqSet(\''+article_name+'\', \''+article_introduction+'\')">'+"Request Info."+'</a>'
					  articleNameS+='&nbsp;&nbsp;<a onClick="article_page(\''+article_id+'\')" style="color:#ffffff; font-weight:normal;">Details..<img src="arrow_right.png" style="width:17px; height:11px"/></a>'
					  articleNameS+='</div>'
					}
				  //articleNameS+='<div data-role="footer"><img src="'+article_image+'" style="height:50px; width:100%"></div>'; CardiovascularFooter.jpg
				  articleNameS+='';
				  //artFooter='<a><img src="'+article_image+'" style="width:100%; height:50px"/></a>'
				  
				  var article_imageFooter=articleNameStrH[2];
				  //alert(article_imageFooter);
				  artFooter='<a><img src="'+article_imageFooter+'" style="width:100%; height:50px"/></a>'
				  
				$('#articleNameDiv').empty();
				$('#articleNameDiv').append(articleNameS).trigger('create');
				
				$('#footerImage').empty();
				$('#footerImage').append(artFooter).trigger('create');
				 
				  url="#second_page";					
				  $.mobile.navigate(url);
				  				  
			  }
			});
	
}

function reqSet(article_name, article_introduction){
				$("#remark1").val(article_name);	
	}
	
	
	
function article_page(article){
	localStorage.article_id=article; 
	localStorage.pageNo=1;
	var articlepageStr="";
		$.ajax({
			  url:apipath+'article_page?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&pageNo='+localStorage.pageNo+'&article_id='+localStorage.article_id,
			  success: function(resStr) {	
				  resultStr=resStr.split("<fd>"); 
					 if (resultStr[0]=="Success"){
						  var pageStr=resultStr[1].split("fdfd");					  
						   var page_Sl=pageStr[0];
						   var page_content=pageStr[1];
						   var page_no=pageStr[2];
						   var page_count=pageStr[3];
						   //alert(page_count);
						   
						  var articlePageS='';
												  
							  articlePageS+='<p style="padding-bottom:5px; ">'+page_content+'</p>'		
						  
						  articlePageS+='';
						  
						$('#articlePageDiv').empty();
						$('#articlePageDiv').append(articlePageS).trigger('create');  
						
						
					
					//===============Pageing_start	
					var pageingRow='<tr><td class="page_border"></td>';
				
					if (page_no==1){
						var nexPageNo=eval(page_no)+1;	
						
						pageingRow+='<td class="page_border"><input type="button" name="" id="" class="btn" onclick=newPageNo("'+nexPageNo+'") value="next >" /></td>'
						
					}else{
						
						var nexPageNo=eval(page_no)+1;
						var previousPageNo=eval(page_no)-1;	
						
						//pageingRow+='<td class="page_border"><input type="button" name="" id="" class="btn" onclick=newPageNo("'+0+'") value="first" /></td>&nbsp;&nbsp;'
												
						pageingRow+='<td class="page_border"><input type="button" name="" id="" class="btn" onclick=newPageNo("'+previousPageNo+'") value="< previous" /></td>&nbsp;&nbsp;'+previousPageNo
						
						pageingRow+='<td class="page_border"><input type="button" name="" id="next" class="btn" onclick=newPageNo("'+nexPageNo+'") value="next >" /></td>'+nexPageNo
						
						}
					
					pageingRow+="</tr>";
					
					$("#paging").append(pageingRow);
						  
					 }
				
				  url="#third_page";					
				  $.mobile.navigate(url);
				  				  
			  }
			});
				
}


  				  
function newPageNo(page){
	
	localStorage.page_no=page;
	
	//alert(localStorage.page_no);
	
	//alert(apipath+'article_page?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&pageNo='+localStorage.page_no+'&article_id='+localStorage.article_id);
	
	$.ajax({
			  url:apipath+'article_page?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&pageNo='+localStorage.page_no+'&article_id='+localStorage.article_id,
			  success: function(resStr) {	
				  
				  resultStr=resStr.split("<fd>");
							  	
					 if (resultStr[0]=="Success"){
						  var pageStr=resultStr[1].split("fdfd");	
						  					  
						   var page_Sl=pageStr[0];
						   var page_content=pageStr[1];
						   var page_no=pageStr[2];
						   var page_count=pageStr[3];
						  // alert(page_no);
						  var articlePageS='';
												  
							  articlePageS+='<p style="padding-bottom:5px; ">'+page_content+'</p>'		
						  
						  articlePageS+='';
						  
						$('#articlePageDiv').empty();
						$('#articlePageDiv').append(articlePageS).trigger('create');  
						
						
					 }
			  }
	})
}


/*
function article_page(article){
	
	localStorage.article_id=article; 
	
	//$("#showName").html(localStorage.article_id);	
	localStorage.pageNo="1";
	
 	
	var articlepageStr="";
	 	alert(apipath+'article_page?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&pageNo='+localStorage.pageNo+'&article_id='+localStorage.article_id);
		$.ajax({
			  url:apipath+'article_page?cid=ARTICLE_VIEWER&sync_code='+localStorage.sync_code+'&pageNo='+localStorage.pageNo+'&article_id='+localStorage.article_id,
			  success: function(resStr) {	
				  
				  articlepageStr=resStr.split("|");
				  
				  
				  
				  var articlePageS='';
				  //var pageno=0;
				  //var maxrow= 0;
				  for (i=0;i<articlepageStr.length;i++){
					  //maxrow+=1;
					  //if(i==itemPerPage){break;}
					  articlePageLi=articlepageStr[i].split("-");
					  
					  var page_sl=articlePageLi[0];
					  var content=articlePageLi[1];
					  
					  articlePageS+='<p style="padding-bottom:5px; ">'+content+'</p>'				  				  
				  }
				  
				  articlePageS+='';
				  
				$('#articlePageDiv').empty();
				$('#articlePageDiv').append(articlePageS).trigger('create');
				
				
				var pageno=page_no;
				//===============Pageing_start	
				var pageingRow='<tr><td class="page_border"></td>';
				
				if (pageno==0){
					var nexPageNo=eval(pageno)+1;	
					
					pageingRow+='<td class="page_border"><input type="button" name="" id="" class="btn" onclick=newPageNo("'+nexPageNo+'") value="next >" /></td>'
					
				}else{
					var nexPageNo=eval(pageno)+1;
					var previousPageNo=eval(pageno)-1;	
					
					pageingRow+='<td class="page_border"><input type="button" name="" id="" class="btn" onclick=newPageNo("'+0+'") value="first" /></td>&nbsp;&nbsp;'
					
					pageingRow+='<td class="page_border"><input type="button" name="" id="" class="btn" onclick=newPageNo("'+previousPageNo+'") value="< previous" /></td>&nbsp;&nbsp;'+previousPageNo
					
					pageingRow+='<td class="page_border"><input type="button" name="" id="next" class="btn" onclick=newPageNo("'+nexPageNo+'") value="next >" /></td>'+nexPageNo
					
					}
				
				pageingRow+="</tr>";
				
				$("#paging").append(pageingRow);
				
				
								
				
				  url="#third_page";					
				  $.mobile.navigate(url);
				  				  
			  }
			});
	
}
*/
