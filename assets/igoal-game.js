// // Process progress bar

// document.getElementsByClassName(".step").click( function() {
// 	$(this).addClass("active").prevAll().addClass("active");
// 	$(this).nextAll().removeClass("active");
// });

// document.getElementsByClassName(".step01").click( function() {
// 	$("#line-progress").css("width", "6%");
// 	$(".discovery").addClass("active").siblings().removeClass("active");
// });

// document.getElementsByClassName(".step02").click( function() {
// 	$("#line-progress").css("width", "28%");
// 	$(".strategy").addClass("active").siblings().removeClass("active");
// });

// document.getElementsByClassName(".step03").click( function() {
// 	$("#line-progress").css("width", "51%");
// 	$(".creative").addClass("active").siblings().removeClass("active");
// });

// document.getElementsByClassName(".step04").click( function() {
// 	$("#line-progress").css("width", "73%");
// 	$(".production").addClass("active").siblings().removeClass("active");
// });

// document.getElementsByClassName(".step05").click( function() {
// 	$("#line-progress").css("width", "100%");
// 	$(".analysis").addClass("active").siblings().removeClass("active");
// });

// document.getElementsByClassName("#color").click( function() {
// 	$("body").toggleClass("blue")
// });

// function to animate card shuffle for random card Selection
// self executing function here
(function() {
	// your page initialization code here
	// the DOM will be available here
	var elems = document.querySelectorAll('.modal-layer1');
	M.Modal.init(elems,{dismissible: false});
 })();


 var jitsiGoal

 initializeVideo = function (){
	 document.getElementById("entirewebpage").style.transform ="scale(0.8)";
 		show_video_call();
	if (document.getElementById("video-call").childNodes.length < 4){
			return video_chat();
	}
 }

 terminateVideo = function (){
 	if (document.getElementById("video-call").childNodes.length > 3){
 		jitsiGoal.executeCommand('hangup');
 		jitsiGoal.dispose();
	//	jitsiGoal.reload();
 	} else {
		alert("no video call to close")
	}
 }

 shuffle_card_deck = function (){
  document.getElementById("dashboard-modal-content").classList.remove("action-show")
  document.getElementById("dashboard-modal-content").classList.remove("slide-out-left")
  document.getElementById("action-three-cards").classList.remove("action-show", "slide-in-right");
  document.getElementById("content-flip").style.transform = "";
  document.getElementById("content-flip").style.transition = "";
  var allCards = document.getElementsByClassName("three-cards");
  var timeout1, timeout2, timeout3
  var cardList = document.getElementsByClassName('card-list')[0]
  var instance = M.Modal.getInstance(document.getElementById("card-action-shuffle"))
  instance.open();
  cardList.classList.add('is-animated');
  timeout1 = setTimeout(function(){
    cardList.classList.remove('is-animated');
    document.getElementById("content-flip").style.transform = "rotateY(180deg) scale(1.5)";
    document.getElementById("content-flip").style.transition = "transform 0.5s";
    timeout2 = setTimeout(function(){
      // document.getElementById("content-flip").style.removeProperty("transform");
      // document.getElementById("content-flip").style.removeProperty("transition");
      document.getElementById("dashboard-modal-content").classList.add("slide-out-left")
      timeout3 = setTimeout(function(){
        document.getElementById("dashboard-modal-content").classList.remove("action-show");
				document.querySelectorAll('.three-cards').forEach(function(node, idx) {
					  document.getElementById("rate-card"+idx).innerHTML = "";
						if (idx == 0){
							node.classList.remove("non-active-cards");
						} else {
							node.classList.add("non-active-cards");
						}
						// Do whatever you want with the node object.
			  });
        document.getElementById("action-three-cards").classList.add("action-show", "slide-in-right");
        // instance.close();
      },350)
      // document.getElementsByClassName("modal-action-cards").
    },800)


    // var card_shuffle = document.getElementsByClassName("card-shuffle")
    // // card_shuffle[0].classList.remove("card-shuffle");
    // card_shuffle[0].classList.add("flip-2-ver-right-fwd");
  }, 3000);
  return instance
 }

set_rating_active_card = function (rating){
	var allCards = document.getElementsByClassName("three-cards");
	const activeCard = document.querySelector(".three-cards:not(.non-active-cards)");
	const idxOfActive = Array.from(activeCard.parentNode.children).indexOf(activeCard);
	document.getElementById("rate-card"+idxOfActive).innerHTML = rating;
	activeCard.classList.add("non-active-cards");
	if (idxOfActive == 2) {
		setTimeout(function(){
			document.getElementById("action-three-cards").classList.remove("slide-in-right");
			document.getElementById("action-three-cards").classList.add("slide-out-left");
			setTimeout(function(){
			  document.getElementById("action-three-cards").classList.remove("action-show");
			  document.getElementById("wait-result").classList.add("action-show", "slide-in-right");

			  // instance.close();
			},350)
			// document.getElementsByClassName("modal-action-cards").
		},500)
		allCards[0].classList.remove("non-active-cards");
	} else {
		activeCard.nextElementSibling.classList.remove("non-active-cards");
	}
}

show_video_call = function (){
	const el = document.getElementById("video-call");
	el.style.display = "block";
	el.classList.remove("slide-out-bottom");
	el.classList.add("slide-in-bottom");
}

hide_video_call = function (){
	const el = document.getElementById("video-call");
	el.classList.remove("slide-in-bottom");
	el.classList.add("slide-out-bottom");
	setTimeout(function(){
		el.style.display = "none";
	},550)
	location.reload();
}

video_chat = function (){
	const domain = 'meet.jit.si';
	const options = {
		roomName: 'JitsiMeetAPIExampleTestAPiGOAL',
		width: '100%',
		height: '100%',
		parentNode: document.querySelector('#video-call'),
		interfaceConfigOverwrite: {
			GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
			DISPLAY_WELCOME_FOOTER: false,
			HIDE_DEEP_LINKING_LOGO: true,
			MOBILE_APP_PROMO: false,
			SHOW_JITSI_WATERMARK: false,
			TOOLBAR_TIMEOUT: 1500,
			IDEO_LAYOUT_FIT: 'height',
			DEFAULT_LOGO_URL: 'https://inurhas.github.io/iGOAL-rubric/assets/images/iGOAL-logo.png',
			DEFAULT_WELCOME_PAGE_LOGO_URL: 'https://inurhas.github.io/iGOAL-rubric/assets/images/iGOAL-logo.png',
		},
		userInfo: {
			displayName: 'John Doe'
		}
	};
	const api = new JitsiMeetExternalAPI(domain, options);
	api.addEventListener(`videoConferenceJoined`, () => {
		const listener = ({ enabled }) => {
		  api.removeEventListener(`tileViewChanged`, listener);

		  if (!enabled) {
			api.executeCommand(`toggleTileView`);
		  }
		};

		api.addEventListener(`tileViewChanged`, listener);
		api.executeCommand(`toggleTileView`);
	});
	const iframe = api.getIFrame();
	return (api)
}

// jitsi.executeCommand('toggleAudio');

// document.getElementById("video-call").innerHTML = "";
