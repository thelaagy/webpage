
// Startup
newWindow("Welcome to Web Windows", `
	<h1><img src='resources/taskbar/startLogo.png' style="margin-right:8px">
		Welcome to the Web Windows!</h1>
	<h4>(by Laggy)</h4>
	<p>
		I'll improve this later.
	</p>
	<p>
		This website DOES NOT work on mobile. if you are seeing this on a mobile,
		<br> disable the desktop mode of your browser and use the (very) simple
		<br> version of the site.
	</p>
`, "resources/taskbar/startLogo.png")


// Start menu item functions
document.getElementById("openTestWin").addEventListener('click', function(){
	newWindow("Bassoon Tracker by Steffest", `
	<iframe width=800 height=800 src="https://www.stef.be/bassoontracker/" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" >
		</iframe>
	`,"","","padding: 0px !important;");
});

document.getElementById("openAnotherTestWin").addEventListener('click', function(){
	newWindow("cat.jpg", "<img src='https://cataas.com/cat'></img>","");
});

document.getElementById("version").addEventListener('click', function(){
	newWindow("System version", `
	<h1><img src='resources/taskbar/startLogo.png'>
		Web Windows
	</h1>
	<div class="separator"></div>
	<p>Version: DEV 01 ALPHA</p>
	<p>Copyright © Laggy 2022 All rights reserved.</p>
	<p>Licence key: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</p>
	`, "resources/taskbar/startLogo.png");
});

//document.getElementById("SocialMedia").addEventListener('click', function(){
	newWindow("Social",`
	<ul >
		<li><a href="http://twitter.com/thelaagy">Twitter</a></li>
		<li><a href="http://youtube.com/laaggyy">Youtube</a></li>
		<li><a href="http://soundcloud.com/laagy">Soundcloud</a></li>
		<li><a href="https://thelaagy.bandcamp.com/">Bandcamp</a></li>
		<li><a href="https://thelaggy.itch.io/">Itch.io</a></li>
		
	</ul>
	`,"","","text-align: left;");
//});

// newWindow('The Sans Window', `<img src="https://c.tenor.com/PRdbAP7eu60AAAAC/sans-undertale.gif">`,`https://c.tenor.com/PRdbAP7eu60AAAAC/sans-undertale.gif`)
