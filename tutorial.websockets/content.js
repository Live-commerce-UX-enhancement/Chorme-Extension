const regex = /[^0-9]/g;
const broadcastUrl = window.location.toString();
const broadcastId = broadcastUrl.replace(regex, '');

chrome.runtime.sendMessage(
  {
    type: 'BROADCASTID',
    payload: {
      message: broadcastId,
    },
  },
  (response) => {
    console.log(response);
  }
);

var element = document.getElementsByClassName("CommentList_animation_area_Ca5J9");

// Content Script에서 Service Worker로부터 메시지 수신
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Service Worker에서 보낸 데이터 확인
    console.log(request);
    var receivedData = JSON.parse(request);

    const chatNodeQuestion = document.createElement('div');
    chatNodeQuestion.setAttribute("role", "presentation");
    chatNodeQuestion.className += "Comment_wrap_wRrdF __disable_vertical_swipe";

    const chatQuestion = document.createElement('strong');
    chatQuestion.setAttribute("role", "presentation");
    chatQuestion.className += "NoticeComment_wrap_9z2HJ NoticeComment_orange_mGKA9 __disable_vertical_swipe";
    chatQuestion.innerText = receivedData["question"];
    
    chatNodeQuestion.appendChild(chatQuestion);

    element[0].appendChild(chatNodeQuestion);

    const chatNodeAnswer = document.createElement('div');
    chatNodeAnswer.setAttribute("role", "presentation");
    chatNodeAnswer.className += "Comment_wrap_wRrdF __disable_vertical_swipe";

    const chatAnswer = document.createElement('strong');
    chatAnswer.setAttribute("role", "presentation");
    chatAnswer.className += "NoticeComment_wrap_9z2HJ NoticeComment_green_D2UCQ __disable_vertical_swipe";
    chatAnswer.innerText = receivedData["message"];
    
    chatNodeAnswer.appendChild(chatAnswer);

    element[0].appendChild(chatNodeAnswer);


});