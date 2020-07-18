var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(request, response) {
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(request.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(request.url);
/*	
if(action.url === "/register"){
		if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';
					
			
					return req.on('data', function(data) {
						formData += data;
						console.log("form data="+ formData);
						
					var obj =JSON.parse(formData);
					console.log(obj);
					console.log(obj.user);
					console.log( obj.pass);
					
						return req.on('end', function() {

                            MongoClient.connect(dbUrl, function(err, db) {
								var finalcount;
								if (err) throw err;
								var dbo = db.db("312312");
								//var myobj = {"user" : d[1], "password" : e[1],"repassword":f[1]};
								var myobj = {"user" : obj.user, "password" : obj.pass,"repassword":obj.pass2};
								//dbo.collection("login").count(myobj, function(err, count){
								//	console.log(err, count);
									//finalcount = count;
								
								dbo.collection("login").insertOne(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											
											db.close();
											
											var successs=JSON.stringify(res);
											return response.end(successs);
										});

							});
                            

							
                          
						
						});
					});
				}else{
                    console.log("here");
                }

		
	}
	
				
	*/
		
if (action === "/register") {
			console.log("Register");
			if (request.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return request.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return request.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Email:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						response.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("1111");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").count({"Email" : splitName[1]}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("user exist");
									db.close();
									return response.end("fail");
								}
								else
								{
									dbo.collection("user").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return response.end(msg);
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Register.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}		
		else if (action === "/readfavourlist")
		{
			console.log("readfavourlist");
			var usernameData = '';
			if (request.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("1111");
					dbo.collection("favlist").find({"Email" : splitName[1]}).toArray(function(err, result) 
					{
    				if (err) throw err;
    				console.log("result" + result);
    				db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return response.end(resultReturn);
					});
				});
			});
		});
	}
}
		
		else if (action === "/login"){
			console.log("Login");
			if (request.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return request.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return request.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Email:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("1111");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").count({"Email" : splitName[1] , "password" : splitPassword[1] }, function(err, count){
								console.log(err, count);
								finalcount = count;
								console.log("myconut="+count);
								if(finalcount > 0)
								{
									console.log("Login success");
									db.close();
									return response.end(splitName[1]);
								}
								else
								{
										console.log("Login failed");
										db.close();
										//return res.end(msg);
									return response.end("fail");
								}
							});
						});
					});
				});
			}	
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Login.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if (action === "/deleteall")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = {"Email" : splitName[1]};

								{
								
										dbo.collection("userphoto").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/delfavcar")
		{
		
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = {"Email" : splitName[1], "image":"01-thumbnail.jpg"};

								
								{
								
										dbo.collection("userphoto").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("del!");
											db.close();
										});

						}
							
		
						});
					});
				});
			} 
		
		}
		else if (action === "/delfavcar2")
		{
		
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = {"Email" : splitName[1], "image":"02-thumbnail.jpg"};

								
								{
								
										dbo.collection("userphoto").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("del!");
											db.close();
										});

						}
							
		
						});
					});
				});
			} 
		
		}
				else if (action === "/delfavcar3")
		{
		
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = {"Email" : splitName[1], "image":"03-thumbnail.jpg"};

								
								{
								
										dbo.collection("userphoto").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("del!");
											db.close();
										});

						}
							
		
						});
					});
				});
			} 
		
		}
		else if (action === "/delfavcar4")
		{
		
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = {"Email" : splitName[1], "image":"art4.jpg"};

								
								{
								
										dbo.collection("userphoto").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("del!");
											db.close();
										});

						}
							
		
						});
					});
				});
			} 
		
		}
		else if (action === "/addfavcar")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = [{"Email" : splitName[1], "image":"01-thumbnail.jpg","art_name":"Sofia","introduction":"Miss International Macau 2017 Macau | Portugal 🇲🇴🇵🇹"}];
								dbo.collection("userphoto").countDocuments({"Email" : splitName[1], "image":"01-thumbnail.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("userphoto").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		else if (action === "/addfavcar2")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = [{"Email" : splitName[1], "image":"02-thumbnail.jpg","art_name":"Tina","introduction":"Tina! is a compilation album from American rock singer Tina Turner. The album was released September 30, 2008 by Capitol Records in North America"}];
								dbo.collection("userphoto").countDocuments({"Email" : splitName[1], "image":"02-thumbnail.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("userphoto").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		else if (action === "/addfavcar3")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = [{"Email" : splitName[1], "image":"03-thumbnail.jpg","art_name":"Rosalina","introduction":"Rosalina, known as Rosetta in Japan (ロゼッタ), is a fictional character in the Mario series of video games. She debuts in Super Mario Galaxy, where she acts as a non-player character who resides in the Comet Observatory, the game's hub world."}];
								dbo.collection("userphoto").countDocuments({"Email" : splitName[1], "image":"03-thumbnail.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("userphoto").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
				else if (action === "/addfavcar4")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = [{"Email" : splitName[1], "image":"art4.jpg","art_name":"Sinam","introduction":"Sinam is a village development committee in the Himalayas of Taplejung District in the Mechi Zone of north-eastern Nepal."}];
								dbo.collection("userphoto").countDocuments({"Email" : splitName[1], "image":"art4.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("userphoto").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
				else if (action === "/addfavcar5")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = [{"Email" : splitName[1], "image":"art5.jpg","art_name":"Puinam"}];
								dbo.collection("userphoto").countDocuments({"Email" : splitName[1], "image":"art5.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("userphoto").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
				else if (action === "/addfavcar6")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (request.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("1111");
								var myobj = [{"Email" : splitName[1], "image":"art6.jpg","art_name":"Doris"}];
								dbo.collection("userphoto").countDocuments({"Email" : splitName[1], "image":"art6.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("userphoto").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		else if (action === "/findfavourlist")
		{
			console.log("readfavourlist");
			var usernameData = '';
			if (request.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("1111");
					dbo.collection("userphoto").find({"Email" : splitName[1]}).toArray(function(err, result) 
					{
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						
						console.log("resultReturn" + resultReturn);

            return response.end(resultReturn);
	
					});
				});
					});
				});
			}
		}
		else if (action === "/index"){
			console.log("Index");
			if (request.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return request.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return request.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);	
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						response.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
					});
				});
			}
		else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "index.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						response.writeHead(200, {
							"Content-Type": "text/html"
						});
						return response.end(contents);
					} 
					else 
					{
						response.writeHead(500);
						return response.end;
					}
				});
			}
		} 
		else if (action === "/member"){
			console.log("Member_page");
			if (request.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return request.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return request.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("1111");
							console.log(favlist);
							dbo.collection("user").count({"Email" : splitName[1]}, function(err, count){
								finalcount = count;
								console.log(finalcount);
								if(finalcount < 1)
								{
									console.log("Not have this user");
									db.close();
									return response.end("fail");
								}
								else
								{
									dbo.collection("favlist").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									{
										console.log("Data inserted");
										db.close();
										return response.end("OK");
										});
								}
							});
							dbo.collection("favlist").findOne({"Email" : splitName[1]}, function(err, result) {
							if (err) throw err;
							console.log(result);
							db.close();
							});
						});
					});
				});
			}
		}
		
		else if (action === "/review"){
			console.log("review");
			if (request.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return request.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return request.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);	
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						response.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
					});
				});
			}
		else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "review.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						response.writeHead(200, {
							"Content-Type": "text/html"
						});
						return response.end(contents);
					} 
					else 
					{
						response.writeHead(500);
						return response.end;
					}
				});
			}
		} 
			
else if (request.url === "/getapi")
			{
			console.log("readfavourlist");
			var usernameData = '';
			if (request.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				        console.log("read favourite");
                        MongoClient.connect(url, function(err, db) {
                         if (err) throw err;
                          var dbo = db.db("1111");
 
                         dbo.collection("index").find({}).toArray(function(err, result){
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
						return response.end(resultReturn);
	                });
                });
            });
        });
    }
	sendFileContent(response, "api.html", "text/html");
}
             else if (action === "/findapi"){
              console.log("readfavourlist");
			    var usernameData = '';
		    	if (request.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return request.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return request.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				        console.log("read favourite");
                        MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("1111");
  
                         dbo.collection("index").find({}).toArray(function(err, result){
						if (err) throw err;
					          console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
						return response.end(resultReturn);
	             });
            });
        });
    });
   }
}


		else 
		{
      //handle redirect
          if (request.url === "/index")
			{
				sendFileContent(response, "index.html", "text/html");
			}
      else if (request.url === "/loginres")
			{
				sendFileContent(response, "loginres.html", "text/html");
			}
      else if (request.url === "/review")
			{
				sendFileContent(response, "review.html", "text/html");
			}
			 else if (request.url === "/categories")
			{
				sendFileContent(response, "categories.html", "text/html");
			}
			else if (request.url === "/contact")
			{
				sendFileContent(response, "contact.html", "text/html");
			}
			else if (request.url === "/api")
			{
				sendFileContent(response, "api.html", "text/html");
			}


			else if(request.url === "/"){
				console.log("Requested URL is url" + request.url);
				response.writeHead(200, {
					'Content-Type': 'text/html'
				});
				response.write('<b>testpage</b><br /><br />This is the default response.');
			}else if(/^\/[a-zA-Z0-9\/_.-]*.js$/.test(request.url.toString())){
				sendFileContent(response, request.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.css$/.test(request.url.toString())){
				sendFileContent(response, request.url.toString().substring(1), "text/css");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.jpg$/.test(request.url.toString())){
				sendFileContent(response, request.url.toString().substring(1), "image/jpg");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.mp4$/.test(request.url.toString())){
				sendFileContent(response, request.url.toString().substring(1), "text/mp4");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ico$/.test(request.url.toString())){
				sendFileContent(response, request.url.toString().substring(1), "image/ico");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ttf$/.test(request.url.toString())){
				sendFileContent(response, request.url.toString().substring(1), "image/ttf");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.woff$/.test(request.url.toString())){
				sendFileContent(response, request.url.toString().substring(1), "image/woff");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.png$/.test(request.url.toString())){
				sendFileContent(response, request.url.toString().substring(1), "image/png");
			}else{
				console.log("Requested URL is: " + request.url);
				response.end();
			}
		}
	});

	server.listen(4242);

	console.log("Server is running，time is" + new Date());


	function sendFileContent(response, fileName, contentType){
		fs.readFile(fileName, function(err, data){
			if(err){
				response.writeHead(404);
				response.write("Not Found!");
			}else{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);