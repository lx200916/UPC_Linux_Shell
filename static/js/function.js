"use strict";
if (!localStorage.getItem("as-bg")) {
    localStorage.setItem("as-bg", "1")
} else {
    let bgColor = localStorage.getItem("as-bg");
    if (bgColor === "1") {
        $('body').addClass("bg-white")
    } else if (bgColor === "2") {
        $('body').addClass("bg-black");
        $("meta[name='theme-color']").attr('content', "#000000")
    } else if (bgColor === "3") {
        $('body').addClass("bg-dgray");
        $("meta[name='theme-color']").attr('content', "#323232")
    } else if (bgColor === "4") {
        $('body').addClass("bg-dblue");
        $("meta[name='theme-color']").attr('content', "#1e3946")
    } else if (bgColor === "5") {
        $('body').addClass("bg-dgreen");
        $("meta[name='theme-color']").attr('content', "#0d3936")
    } else {
        localStorage.setItem("as-bg", "1");
        $('body').addClass("bg-white")
    }
}
if (!localStorage.getItem("as-fc")) {
    localStorage.setItem("as-fc", "1")
} else {
    let fColor = localStorage.getItem("as-fc");
    if (fColor === "1") {
        $('body').addClass("fc-black")
    } else if (fColor === "2") {
        $('body').addClass("fc-gray")
    } else if (fColor === "3") {
        $('body').addClass("fc-white")
    } else {
        localStorage.setItem("as-fc", "1");
        $('body').addClass("fc-black")
    }
}
let autoCompleteTag = true;
if (!localStorage.getItem("ac")) {
    localStorage.setItem("ac", "1")
} else {
    let autoCompleteVal = localStorage.getItem("ac");
    if (autoCompleteVal === "2") {
        autoCompleteTag = false
    } else if (autoCompleteVal !== "1") {
        localStorage.setItem("ac", "1")
    }
}
if (!localStorage.getItem("sk")) {
    if (navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )) {
        $('.soft-keyboard').show()
    }
    localStorage.setItem("sk", "1")
} else {
    let softKeyboardStatus = localStorage.getItem("sk");
    if (softKeyboardStatus === "1") {
        if (navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )) {
            $('.soft-keyboard').show()
        }
    } else if (softKeyboardStatus === "2") {
        $('.soft-keyboard').show()
    } else if (softKeyboardStatus !== "3") {
        if (navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )) {
            $('.soft-keyboard').show()
        }
        localStorage.setItem("sk", "1")
    }
}
let uped = new Date();
if (!localStorage.getItem("up")) {
    localStorage.setItem("up", uped)
} else {
    uped = new Date(Date.parse(localStorage.getItem("up")))
}
let renderedStr = "Someting went wrong :-(<br>";

let stopId;
let inputBack = "";
let isStoped = false;
let rebootTime = 0;
let commandRunning = [];
let cour;
let tabList = ['./', 'upc', 'cd', 'cat', 'clear', 'help', 'hello', 'hey', 'hi', 'ls', 'logout', 'reboot',
    'screenfetch', 'sudo', 'uname','rm'
];
$('.input-lable').click(function() {
    $('.input-text').focus()
});
$('.input-text').focus(function() {
    isStoped = false;
    window.requestAnimationFrame(decodeInput)
});
$('.input-text').blur(function() {
    isStoped = true;
    window.cancelAnimationFrame(stopId)
});

function decodeInput() {
    if (!catMode && !colorMode && !fcMode && !conMode && !con2Mode) {
        let inputText = $('.input-text').text();
        if (inputText !== inputBack) {
            if (inputText === "") {
                $('.input-text').css("padding-right", "45px")
            } else {
                $('.input-text').css("padding-right", "0")
            }
            autoComplete(deleteHtml($('.input-text').text()));
            inputBack = $('.input-text').text()
        }
    }
    if (isStoped) {
        return
    } else {
        stopId = window.requestAnimationFrame(decodeInput)
    }
}
$('.input-text').focus();

function autoComplete(input) {
    $("#ac-tip").text("");
    tabList = [];
    if (input === "") {
        tabList = ['./', 'upc', 'cd', 'cat', 'clear', 'help', 'hello', 'hey', 'hi', 'ls', 'logout', 'reboot',
            'screenfetch', 'sudo', 'uname','rm'
        ];
        return false
    }
    let acComPrsed = input.split(" ");
    let acCommandList = ['upc', 'cd', 'cat', 'clear', 'help', 'hello', 'hey', 'hi', 'ls', 'logout', 'reboot',
        'screenfetch', 'sudo', 'uname', '../','rm',"su"
    ];
    let comNeeded = acComPrsed[acComPrsed.length - 1];
    let found = false;
    if (acComPrsed.length === 1 || acComPrsed[acComPrsed.length - 2] === "sudo" || acComPrsed[acComPrsed.length - 2] ===
        "||" || acComPrsed[acComPrsed.length - 2] === "&amp;&amp;") {
        for (let i in acCommandList) {
            if (acCommandList[i].substr(0, comNeeded.length) === comNeeded) {
                if ($("#ac-tip").text() === "" && autoCompleteTag && !skMode && !colorMode && !catMode && !fcMode && !lmMode) {
                    $("#ac-tip").text(acCommandList[i].substr(comNeeded.length))
                }
                found = true;
                tabList.push(acComPrsed[acComPrsed.length - 1] + acCommandList[i].substr(comNeeded.length))
            }
        }
    } else if (acComPrsed[acComPrsed.length - 2] === "upc") {
        let asCommandList = ['-a', '-b', '-f', '-s', '--about', '--help'];
        for (let i in asCommandList) {
            if (asCommandList[i].substr(0, comNeeded.length) === comNeeded) {
                if ($("#ac-tip").text() === "" && autoCompleteTag && !skMode && !colorMode && !catMode && !fcMode && !lmMode) {
                    $("#ac-tip").text(asCommandList[i].substr(comNeeded.length))
                }
                found = true;
                tabList.push(acComPrsed[acComPrsed.length - 1] + asCommandList[i].substr(comNeeded.length))
            }
        }
    } else if (acComPrsed[acComPrsed.length - 2] === "uname") {
        let asCommandList = ['-a', '-i', '-m', '-n', '-o ', '-p', '-r', '-s', '-v', '--help'];
        for (let i in asCommandList) {
            if (asCommandList[i].substr(0, comNeeded.length) === comNeeded) {
                if ($("#ac-tip").text() === "" && autoCompleteTag && !skMode && !colorMode && !catMode && !fcMode && !lmMode) {
                    $("#ac-tip").text(asCommandList[i].substr(comNeeded.length))
                }
                found = true;
                tabList.push(acComPrsed[acComPrsed.length - 1] + asCommandList[i].substr(comNeeded.length))
            }
        }
    }
    if (!found) {
        let fetchList = [];
        let fetchListRaw = false;
        if (prsPath(comNeeded, false) !== false) {
            fetchListRaw = positionToObj(positionVi)
        } else if (comNeeded.indexOf("/") === -1) {
            fetchListRaw = positionToObj(positionRe)
        }
        if (fetchListRaw["type"] === "dir" && fetchListRaw !== false) {
            $.extend(true, fetchList, fetchListRaw["content"]);
            if (fetchListRaw["name"] !== "/") {
                fetchList.push({
                    name: "..",
                    comm_name: "..",
                    sudo: false,
                    type: "dir",
                    content: []
                })
            }
            let acPathPrsed = comNeeded.split("/");
            acPathPrsed = acPathPrsed[acPathPrsed.length - 1];
            for (let i in fetchList) {
                if (fetchList[i]["name"].substr(0, acPathPrsed.length) === acPathPrsed) {
                    if (fetchList[i]["type"] === "dir") {
                        if ($("#ac-tip").text() === "" && autoCompleteTag && !skMode && !colorMode && !catMode && !fcMode && !lmMode) {
                            $("#ac-tip").text(fetchList[i]["name"].substr(acPathPrsed.length) + "/")
                        }
                        tabList.push(comNeeded + fetchList[i]["name"].substr(acPathPrsed.length) + "/")
                    } else {
                        if ($("#ac-tip").text() === "" && autoCompleteTag && !skMode && !colorMode && !catMode && !fcMode && !lmMode) {
                            $("#ac-tip").text(fetchList[i]["name"].substr(acPathPrsed.length))
                        }
                        tabList.push(comNeeded + fetchList[i]["name"].substr(acPathPrsed.length))
                    }
                } else if (fetchList[i]["comm_name"].substr(0, acPathPrsed.length) === acPathPrsed) {
                    if (fetchList[i]["type"] === "dir") {
                        if ($("#ac-tip").text() === "" && autoCompleteTag && !skMode && !colorMode && !catMode && !fcMode && !lmMode) {
                            $("#ac-tip").text(fetchList[i]["comm_name"].substr(acPathPrsed.length) + "/")
                        }
                        tabList.push(comNeeded + fetchList[i]["comm_name"].substr(acPathPrsed.length) + "/")
                    } else {
                        if ($("#ac-tip").text() === "" && autoCompleteTag && !skMode && !colorMode && !catMode && !fcMode && !lmMode) {
                            $("#ac-tip").text(fetchList[i]["comm_name"].substr(acPathPrsed.length))
                        }
                        tabList.push(comNeeded + fetchList[i]["comm_name"].substr(acPathPrsed.length))
                    }
                }
            }
        }
    }
}
const logo = "<pre><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span>\n" +
    "<span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#bababa\">n</span><span style=\"color:#bcbcbc\">u</span><span style=\"color:#bebebe\">x</span><span style=\"color:#b9b9b9\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span>\n" +
    "<span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#b4b4b4\">L</span><span style=\"color:#b7b7b7\">i</span><span style=\"color:#bebebe\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#bababa\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span>\n" +
    "<span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b6b6b6\">P</span><span style=\"color:#b7b7b7\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#b3b3b3\">C</span><span style=\"color:#b1b1b1\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#b5b5b5\">L</span><span style=\"color:#b2b2b2\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span>\n" +
    "<span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b9b9b9\">x</span><span style=\"color:#b4b4b4\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#bfbfbf\">P</span><span style=\"color:#b2b2b2\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#b5b5b5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span>\n" +
    "<span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#bdbdbd\">n</span><span style=\"color:#bababa\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#bfbfbf\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b8b8b8\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span>\n" +
    "<span style=\"color:#f5f5f5\">C</span><span style=\"color:#b8b8b8\">L</span><span style=\"color:#bababa\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#bababa\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b2b2b2\">x</span><span style=\"color:#b9b9b9\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b9b9b9\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span>\n" +
    "<span style=\"color:#f5f5f5\">i</span><span style=\"color:#bbbbbb\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#b5b5b5\">u</span><span style=\"color:#b6b6b6\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#b1b1b1\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b7b7b7\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span>\n" +
    "<span style=\"color:#b5b5b5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b2b2b2\">x</span><span style=\"color:#b1b1b1\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#b6b6b6\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#b4b4b4\">L</span><span style=\"color:#b2b2b2\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b1b1b1\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span>\n" +
    "<span style=\"color:#b6b6b6\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#bbbbbb\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#bcbcbc\">P</span><span style=\"color:#b6b6b6\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#b3b3b3\">u</span><span style=\"color:#b8b8b8\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#bababa\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b1b1b1\">i</span><span style=\"color:#b2b2b2\">n</span><span style=\"color:#b5b5b5\">u</span><span style=\"color:#b7b7b7\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#bcbcbc\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span>\n" +
    "<span style=\"color:#b3b3b3\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#b9b9b9\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#b8b8b8\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b1b1b1\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#b1b1b1\">u</span><span style=\"color:#b1b1b1\">x</span><span style=\"color:#b3b3b3\">U</span><span style=\"color:#b1b1b1\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#b2b2b2\">u</span><span style=\"color:#b4b4b4\">x</span><span style=\"color:#b1b1b1\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b9b9b9\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span>\n" +
    "<span style=\"color:#b8b8b8\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#b3b3b3\">n</span><span style=\"color:#b2b2b2\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#b7b7b7\">C</span><span style=\"color:#b3b3b3\">L</span><span style=\"color:#b3b3b3\">i</span><span style=\"color:#b3b3b3\">n</span><span style=\"color:#b2b2b2\">u</span><span style=\"color:#b1b1b1\">x</span><span style=\"color:#b2b2b2\">U</span><span style=\"color:#b3b3b3\">P</span><span style=\"color:#b3b3b3\">C</span><span style=\"color:#b6b6b6\">L</span><span style=\"color:#bcbcbc\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#bfbfbf\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#b6b6b6\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#b1b1b1\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b4b4b4\">i</span><span style=\"color:#f5f5f5\">n</span>\n" +
    "<span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b2b2b2\">x</span><span style=\"color:#b4b4b4\">U</span><span style=\"color:#b6b6b6\">P</span><span style=\"color:#b6b6b6\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#bababa\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#b2b2b2\">u</span><span style=\"color:#b2b2b2\">x</span><span style=\"color:#b0b0b0\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#b3b3b3\">C</span><span style=\"color:#b6b6b6\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#b6b6b6\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#b2b2b2\">C</span><span style=\"color:#b7b7b7\">L</span><span style=\"color:#b3b3b3\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#b8b8b8\">u</span><span style=\"color:#f5f5f5\">x</span>\n" +
    "<span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#bbbbbb\">x</span><span style=\"color:#b8b8b8\">U</span><span style=\"color:#b4b4b4\">P</span><span style=\"color:#b4b4b4\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#b1b1b1\">i</span><span style=\"color:#b2b2b2\">n</span><span style=\"color:#b1b1b1\">u</span><span style=\"color:#b3b3b3\">x</span><span style=\"color:#b2b2b2\">U</span><span style=\"color:#bababa\">P</span><span style=\"color:#bcbcbc\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#b6b6b6\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#b9b9b9\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b3b3b3\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#b1b1b1\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span>\n" +
    "<span style=\"color:#f5f5f5\">C</span><span style=\"color:#b8b8b8\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#b1b1b1\">U</span><span style=\"color:#b1b1b1\">P</span><span style=\"color:#b6b6b6\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#b3b3b3\">i</span><span style=\"color:#b7b7b7\">n</span><span style=\"color:#b4b4b4\">u</span><span style=\"color:#bbbbbb\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#b6b6b6\">n</span><span style=\"color:#b5b5b5\">u</span><span style=\"color:#bababa\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#b6b6b6\">n</span><span style=\"color:#b2b2b2\">u</span><span style=\"color:#b3b3b3\">x</span><span style=\"color:#b7b7b7\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span>\n" +
    "<span style=\"color:#f5f5f5\">i</span><span style=\"color:#bababa\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#b3b3b3\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#b3b3b3\">i</span><span style=\"color:#bababa\">n</span><span style=\"color:#b3b3b3\">u</span><span style=\"color:#b5b5b5\">x</span><span style=\"color:#c1c1c1\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b6b6b6\">x</span><span style=\"color:#b1b1b1\">U</span><span style=\"color:#b6b6b6\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b1b1b1\">x</span><span style=\"color:#b1b1b1\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#bababa\">n</span>\n" +
    "<span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#b2b2b2\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#b1b1b1\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b7b7b7\">P</span><span style=\"color:#b2b2b2\">C</span><span style=\"color:#b6b6b6\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b4b4b4\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b5b5b5\">P</span><span style=\"color:#b5b5b5\">C</span><span style=\"color:#b0b0b0\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b6b6b6\">x</span>\n" +
    "<span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#b6b6b6\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#b4b4b4\">C</span><span style=\"color:#b0b0b0\">L</span><span style=\"color:#b5b5b5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b1b1b1\">i</span><span style=\"color:#b3b3b3\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#bababa\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#b2b2b2\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#bdbdbd\">P</span>\n" +
    "<span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b7b7b7\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b4b4b4\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#b2b2b2\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#b1b1b1\">u</span><span style=\"color:#b2b2b2\">x</span><span style=\"color:#bebebe\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#b7b7b7\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#b2b2b2\">n</span><span style=\"color:#b1b1b1\">u</span><span style=\"color:#bebebe\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span>\n" +
    "<span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#bebebe\">u</span><span style=\"color:#b3b3b3\">x</span><span style=\"color:#b1b1b1\">U</span><span style=\"color:#bebebe\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#b4b4b4\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#b2b2b2\">C</span><span style=\"color:#b3b3b3\">L</span><span style=\"color:#b1b1b1\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#b9b9b9\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#b6b6b6\">u</span><span style=\"color:#b2b2b2\">x</span><span style=\"color:#b3b3b3\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span>\n" +
    "<span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#b1b1b1\">C</span><span style=\"color:#b5b5b5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b7b7b7\">x</span><span style=\"color:#b8b8b8\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#b2b2b2\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#b1b1b1\">i</span><span style=\"color:#b2b2b2\">n</span><span style=\"color:#b7b7b7\">u</span><span style=\"color:#b2b2b2\">x</span><span style=\"color:#b7b7b7\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#b4b4b4\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#b6b6b6\">u</span><span style=\"color:#f5f5f5\">x</span>\n" +
    "<span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#b7b7b7\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#b2b2b2\">L</span><span style=\"color:#b1b1b1\">i</span><span style=\"color:#b4b4b4\">n</span><span style=\"color:#b5b5b5\">u</span><span style=\"color:#b1b1b1\">x</span><span style=\"color:#b4b4b4\">U</span><span style=\"color:#b3b3b3\">P</span><span style=\"color:#b1b1b1\">C</span><span style=\"color:#b1b1b1\">L</span><span style=\"color:#b3b3b3\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#b2b2b2\">u</span><span style=\"color:#b3b3b3\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#bababa\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#b9b9b9\">U</span><span style=\"color:#f5f5f5\">P</span>\n" +
    "<span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#bebebe\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b8b8b8\">i</span><span style=\"color:#b3b3b3\">n</span><span style=\"color:#b2b2b2\">u</span><span style=\"color:#b2b2b2\">x</span><span style=\"color:#b2b2b2\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#b1b1b1\">C</span><span style=\"color:#b1b1b1\">L</span><span style=\"color:#b6b6b6\">i</span><span style=\"color:#b5b5b5\">n</span><span style=\"color:#b8b8b8\">u</span><span style=\"color:#b1b1b1\">x</span><span style=\"color:#b1b1b1\">U</span><span style=\"color:#b9b9b9\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#bdbdbd\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b2b2b2\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span>\n" +
    "<span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b7b7b7\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#b2b2b2\">u</span><span style=\"color:#b2b2b2\">x</span><span style=\"color:#b2b2b2\">U</span><span style=\"color:#b1b1b1\">P</span><span style=\"color:#b1b1b1\">C</span><span style=\"color:#b8b8b8\">L</span><span style=\"color:#b8b8b8\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b6b6b6\">P</span><span style=\"color:#b5b5b5\">C</span><span style=\"color:#b3b3b3\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#b1b1b1\">u</span><span style=\"color:#b8b8b8\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span>\n" +
    "<span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b1b1b1\">x</span><span style=\"color:#b3b3b3\">U</span><span style=\"color:#b6b6b6\">P</span><span style=\"color:#b1b1b1\">C</span><span style=\"color:#b1b1b1\">L</span><span style=\"color:#b2b2b2\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#b6b6b6\">L</span><span style=\"color:#b2b2b2\">i</span><span style=\"color:#b2b2b2\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#b6b6b6\">U</span><span style=\"color:#b3b3b3\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b9b9b9\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span>\n" +
    "<span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#bbbbbb\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#b9b9b9\">i</span><span style=\"color:#b1b1b1\">n</span><span style=\"color:#b6b6b6\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b1b1b1\">P</span><span style=\"color:#b9b9b9\">C</span><span style=\"color:#b1b1b1\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#b6b6b6\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span>\n" +
    "<span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#b6b6b6\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b5b5b5\">x</span><span style=\"color:#b2b2b2\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b5b5b5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#b2b2b2\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span>\n" +
    "<span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#b9b9b9\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b6b6b6\">P</span><span style=\"color:#c1c1c1\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#b6b6b6\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b1b1b1\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span>\n" +
    "<span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#bfbfbf\">U</span><span style=\"color:#bbbbbb\">P</span><span style=\"color:#b2b2b2\">C</span><span style=\"color:#b4b4b4\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#bebebe\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span>\n" +
    "<span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#b6b6b6\">u</span><span style=\"color:#b7b7b7\">x</span><span style=\"color:#b9b9b9\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b9b9b9\">x</span><span style=\"color:#b2b2b2\">U</span><span style=\"color:#b6b6b6\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#bcbcbc\">n</span><span style=\"color:#b1b1b1\">u</span><span style=\"color:#bababa\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span>\n" +
    "<span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#b6b6b6\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#bcbcbc\">i</span><span style=\"color:#b6b6b6\">n</span><span style=\"color:#bfbfbf\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span>\n" +
    "<span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#b6b6b6\">C</span><span style=\"color:#b6b6b6\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span>\n" +
    "<span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#bababa\">i</span><span style=\"color:#bababa\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#b6b6b6\">P</span><span style=\"color:#b9b9b9\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span>\n" +
    "<span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span><span style=\"color:#f5f5f5\">i</span><span style=\"color:#f5f5f5\">n</span><span style=\"color:#f5f5f5\">u</span><span style=\"color:#f5f5f5\">x</span><span style=\"color:#f5f5f5\">U</span><span style=\"color:#f5f5f5\">P</span><span style=\"color:#f5f5f5\">C</span><span style=\"color:#f5f5f5\">L</span>\n" +
    "</pre>";
let rootMode = 0,
    sudoMode = 0,
    historyMode = 0,
    tabMode = 0,
    catMode = 0,
    colorMode = 0,
    fcMode = 0,
    skMode = 0,
    conMode = 0,
    con2Mode = 0,
    running = 0,
    lmMode = 0;
const files = [{
    "name": "/",
    "comm_name": "/",
    "sudo": true,
    "type": "dir",
    "content": [{
        "name": "usr",
        "comm_name": "~",
        "sudo": false,
        "type": "dir",
        "content": [ {
            "name": "contact",
            "comm_name": "contact",
            "sudo": false,
            "type": "dir",
            "content": [{
                "name": "README.md",
                "comm_name": "README.md",
                "sudo": false,
                "type": "file",
                "content": '#Join us!<br><br>- Github Homepage: (<a target="_blank" rel="noopener" href="https://upclinux.github.io/">[@UPC Linux]</a>)<br><br>- QQ: Find Me!<br><br>- Linux in UPC: (<a target="_blank" rel="noopener" href="https://www.yuque.com/docs/share/56a3280f-3f94-4037-90c0-08ca59acc1da">[@Linuxer校内生存指南]</a>)<br><br>- Wiki for Starters:(<a target="_blank" rel="noopener" href="https://upclinux.github.io/intro/">[入门指引]</a>)<br>'
            }]
        }, {
            "name": "introduction.md",
            "comm_name": "introduction.md",
            "sudo": false,
            "type": "file",
            "content": "中国石油大学 (华东) Linux 协会是中国石油大学（华东）的校级社团，各路大佬可以在此<del>吹水</del>相互学习，增长一点人生的经♂验"
        }
        ]
    },{
        "name": "leave_a_message.sh",
        "comm_name": "leave_a_message.sh",
        "sudo": true,
        "type": "file",
        "content": '--MESSAGEMODE--'
    }]
}];
let positionRe = {
    "deepth": 2,
    "d_1": 1,
    "d_2": 0,
    "d_3": 0
};
let positionVi = {
    "deepth": 2,
    "d_1": 1,
    "d_2": 0,
    "d_3": 0
};
let displayPosition = "~";
let username = "usr";
let commandList = ['sudo', 'cd', 'ls', 'cat', 'logout', 'uname', 'hey', 'rm' , 'hi', 'hello', 'help', 'clear',
    'screenfetch', 'upc', '~', '/', './', '../', '#', 'echo', ';', '(', ')', '\'', '"', ':', '^', '!', '{',
    '}', '&', 'reboot','su'
];
let hisCommand = [];
let inputCache = "";
if (!localStorage.getItem("his_list")) {
    localStorage.setItem("his_list", "")
} else {
    if (localStorage.getItem("his_list") !== "") {
        hisCommand = JSON.parse(localStorage.getItem("his_list"))
    }
}

function runCommand(command) {
    let commandDet = command["content"];
    if (commandDet['name'] === 'cat') {
        if (!commandDet['args'][0]) {
            catMode = 1;
            $('.prefix,.preblank').hide();
            $('.catmode').show();
            return {
                "content": "--CATMODE--",
                "sta": true
            }
        } else {
            let res = "";
            let fileObj = {};
            let succ = true;
            for (let i = 0; i < commandDet['args'].length; i++) {
                if (prsPath(commandDet['args'][i], true)) {
                    fileObj = positionToObj(positionVi);
                    if (!fileObj["sudo"] || (fileObj["sudo"] && commandDet['sudo']) || (fileObj["sudo"] && positionToObj(
                        positionRe)["sudo"])) {
                        if (fileObj['type'] === 'dir') {
                            res = res + 'cat: ' + commandDet['args'][i] + ': Is a directory<br>';
                            succ = false
                        } else {
                            if (fileObj['content'] === "--POSTLIST--") {
                                res = res + renderedStr
                            } else if (fileObj['content'] === "--MESSAGEMODE--") {
                                return {
                                    "content": "cat: " + commandDet['args'][i] + ": File locked by axtonshell<br>",
                                    "sta": false
                                }
                            } else {
                                res = res + fileObj['content'] + "<br>"
                            }
                        }
                    } else {
                        res = res + "cat: " + commandDet['args'][i] + ": Access denied<br>";
                        succ = false
                    }
                } else {
                    res = res + "cat: " + commandDet['args'][i] + ": No such file or directory<br>";
                    succ = false
                }
            }
            if (succ) {
                return {
                    "content": res,
                    "sta": true
                }
            } else {
                return {
                    "content": res,
                    "sta": false
                }
            }
        }
    } else if (!commandDet['known']) {
        if (commandDet['sudo']) {
            return {
                "content": "sudo: " + commandDet['name'] + ": command not found<br>",
                "sta": false
            }
        } else {
            return {
                "content": "-bash: " + commandDet['name'] + ": command not found<br>",
                "sta": false
            }
        }
    }
    if (commandDet['name'] === 'sudo') {
        return {
            "content": "usage: sudo [command][ args]...<br>",
            "sta": true
        }
    }
    if (commandDet['name'] === 'help') {
        return {
            "content": "[sudo ]command[ Options...]<br>You can use following commands:<div><div class=\"help-item\">cd</div><div class=\"help-item\">ls</div><div class=\"help-item\">cat</div><div class=\"help-item\">uname</div><div class=\"help-item\">clear</div><div class=\"help-item\">screenfetch</div><div class=\"help-item\">logout</div><div class=\"help-item\">reboot</div><div class=\"help-item\">help</div><div class=\"clear\"></div></div><br>For changing the settings of the shell:<br>axtonshell<br><br>Besides, there are some hidden commands, try to find them!<br>",
            "sta": true
        }
    }
    if (commandDet['name'] === 'clear') {
        return {
            "content": "--CLEARMODE--",
            "sta": true
        }
    }
    if (commandDet['name'] === 'hi') {
        return {
            "content": "Hey!<br>Welcome to UPC Linux,Feel Free to Find sth Fun!",
            "sta": true
        }
    }
    if (commandDet['name'] === '^') {
        return {
            "content": "-bash: :s^: no previous substitution<br>",
            "sta": false
        }
    }
    if (commandDet['name'].substr(0, 2) === '^f') {
        return {
            "content": "-bash: :s^" + commandDet['name'].substr(2) + ": substitution failed<br>",
            "sta": false
        }
    }

    if (commandDet['name'] === ':' || commandDet['name'] === '!' || commandDet['name'] === '#') {
        return {
            "content": "--CDBLANKMODE--",
            "sta": true
        }
    }
    if (commandDet['name'] === 'echo') {
        return {
            "content": commandDet['args'][0]+"<br>",
            "sta": true
        }
    }
    if (commandDet['name'] === '(' || commandDet['name'] === ')' || commandDet['name'] === '{' || commandDet['name'] ===
        '}' || commandDet['name'] === '\'' || commandDet['name'] === '"' || commandDet['name'] === '&' || commandDet[
            'name'] === ';') {
        return {
            "content": "-bash: Can not run code<br>",
            "sta": false
        }
    }
    if(commandDet['name']==='rm'){
        return {
            "content": "-rm: I know WHAT YOU Wanna Do!BAD GUY!😡<br>",
            "sta": true
        }
    }
    if(commandDet['name']==='su'){
        return {
            "content": "-su: ROOT is disabled on remote user.<br>",
            "sta": true
        }
    }
    if (commandDet['name'] === 'cd') {
        if (!commandDet['args'][0]) {
            return {
                "content": "--CDBLANKMODE--",
                "sta": true
            }
        } else {
            if (prsPath(commandDet['args'][0], true)) {
                let targetObj = positionToObj(positionVi);
                if (targetObj["type"] === 'file') {
                    if (commandDet['sudo']) {
                        return {
                            "content": "/bin/cd: line 2: cd: " + commandDet['args'][0] + ": Not a directory<br>",
                            "sta": false
                        }
                    } else {
                        return {
                            "content": "-bash: cd: " + commandDet['args'][0] + ": Not a directory<br>",
                            "sta": false
                        }
                    }
                } else {
                    if (targetObj["sudo"] && !commandDet['sudo'] && !positionToObj(positionRe)["sudo"]) {
                        return {
                            "content": "-bash: cd: " + commandDet['args'][0] + ": Access denied<br>",
                            "sta": false
                        }
                    } else {
                        positionRe = Object.assign({}, positionVi);
                        let displayBackup = displayPosition;
                        displayPosition = targetObj["comm_name"];
                        $('#position').text(displayPosition);
                        return {
                            "content": "--CDMODE--" + displayBackup,
                            "sta": true
                        }
                    }
                }
            } else {
                if (commandDet['sudo']) {
                    return {
                        "content": "/bin/cd: line 2: cd: " + commandDet['args'][0] + ": No such file or directory<br>",
                        "sta": false
                    }
                } else {
                    return {
                        "content": "-bash: cd: " + commandDet['args'][0] + ": No such file or directory<br>",
                        "sta": false
                    }
                }
            }
        }
    }
    if (commandDet['name'] === 'hey' || commandDet['name'] === 'hello') {
        return {
            "content": "Hi~<br><span style='color: #b90000'>Just 'hey' or 'hello' is never a effective command....<br>If you`re NEW to here,Why not start from 'ls'(get file list) or 'cat &lt;filename&gt;'(preview the content of &lt;filename&gt;)</span>",
            "sta": true
        }
    }
    if (commandDet['name'] === 'logout') {
        return {
            "content": '--LOGOUTMODE--',
            "sta": true
        }
    }
    if (commandDet['name'] === 'reboot') {
        if (!commandDet['args'][0]) {
            return {
                "content": '--REBOOTMODE--',
                "sta": true
            }
        } else if (commandDet['args'][0] === "-w") {
            return {
                "content": '--FAKEREBOOTMODE--',
                "sta": true
            }
        } else {
            if (commandDet['args'][0] !== "-b" && commandDet['args'][0] !== "-f" && commandDet['args'][0] !== "-i" &&
                commandDet['args'][0] !== "-n") {
                return {
                    "content": "reboot: invalid option -- '" + commandDet['args'][0].substr(1) + "'<br>",
                    "sta": false
                }
            } else {
                return {
                    "content": '--REBOOTMODE--',
                    "sta": true
                }
            }
        }
    }
    if (commandDet['name'] === '~' || commandDet['name'].indexOf("/") >= 0) {

        if (prsPath(commandDet['name'], true)) {
            let fileObj = positionToObj(positionVi);
            if (fileObj["type"] === "dir") {
                return {
                    "content": '-bash: ' + commandDet['name'] + ': Is a directory<br>',
                    "sta": false
                }
            } else {
                if (fileObj["name"].substr(-3) === ".sh") {
                    if (fileObj["sudo"] && !positionToObj(positionRe)["sudo"]) {
                        return {
                            "content": "-bash: " + commandDet['name'] + ": Access denied<br>",
                            "sta": false
                        }
                    } else {
                        return {
                            "content": fileObj["content"],
                            "sta": true
                        }
                    }
                } else {
                    return {
                        "content": '-bash: ' + commandDet['name'] + ': Permission denied<br>',
                        "sta": false
                    }
                }
            }
        } else {
            return {
                "content": '-bash: ' + commandDet['name'] + ': No such file or directory<br>',
                "sta": false
            }
        }
    }

    if (commandDet['name'] === 'screenfetch') {
        let nowDate = new Date();
        let day =11;
        let hour =4;
        let min =51;
        let sec =4;
        return {
            "content": "<br><div><pre class=\"sflogo\">" + logo +
                "</pre><div class=\"about info\">&nbsp;<br><span class=\"sf\">usr@UPC Linuxer</span><br>OS: <span class=\"sf\">AxtonOs</span><br>Kernel: <span class=\"sf\">7.10.0-693.2.2.el7.x86_64</span><br>Shell: <span class=\"sf\">AxtonShell 2.0.0</span><br>Uptime: <span class=\"sf\" style=\"color:palevioletred\">" +
                day + "d " + hour + "h " + min + "m " + sec + "s</span><br>Resolution: <span class=\"sf\">" + parseInt(window.screen
                    .width) + "x" + parseInt(window.screen.height) +
                "</span><br>CPU Rate: <span class=\"sf\">9¾%</span><br>Font: <span class=\"sf\">Cutive Mono</span><br></div><div class=\"clear\"></div></div><br>",
            "sta": true
        }
    }
    if (commandDet['name'] === 'ls') {
        if (!commandDet['args'][0]) {
            let res = "<div class=\"out-ls\">";
            let fileObj = positionToObj(positionRe);
            let lsWidth = 0;
            let lsWidthMax = 0;
            if (fileObj['type'] === 'file') {
                return {
                    "content": fileObj['comm_name'] + "<br>",
                    "sta": true
                }
            } else {
                for (let k = 0; k < fileObj["content"].length; k++) {
                    lsWidth = textWidth(fileObj["content"][k]["name"] + "--");
                    if (lsWidth > lsWidthMax) {
                        lsWidthMax = lsWidth
                    }
                }
                for (let i = 0; i < fileObj["content"].length; i++) {
                    if (fileObj["content"][i]["type"] === "dir") {
                        res = res + "<div class=\"ls ls-dir\" style=\"width:" + lsWidthMax + "px\">" + fileObj["content"][i]["name"] +
                            "</div>"
                    } else if (fileObj["content"][i]["type"] === "file" && fileObj["content"][i]["name"].indexOf(".sh") ===
                        fileObj["content"][i]["name"].length - 3) {
                        res = res + "<div class=\"ls ls-sh\" style=\"width:" + lsWidthMax + "px\">" + fileObj["content"][i]["name"] +
                            "</div>"
                    } else {
                        res = res + "<div class=\"ls\" style=\"width:" + lsWidthMax + "px\">" + fileObj["content"][i]["name"] +
                            "</div>"
                    }
                }
                return {
                    "content": res + "<div class=\"clear\"></div></div>",
                    "sta": true
                }
            }
        } else {
            let dir_out = 0;
            for (let n in commandDet['args']) {
                if (commandDet['args'][n].indexOf("/") > -1 || commandDet['args'][n].indexOf(".") > -1 || commandDet['args'][n]
                    .indexOf("~") > -1) {
                    dir_out++
                } else if (commandDet['args'][n].indexOf("-") == 0) {
                    return {
                        "content": "ls: invalid option -- '" + commandDet['args'][n].substr(1) + "'<br>",
                        "sta": false
                    }
                }
            }
            let res = "<div class=\"out-ls\">";
            let status = true;
            for (let i in commandDet['args']) {
                if (i > 0) {
                    res += "<br>"
                }
                if (dir_out > 1) {
                    res += commandDet['args'][i] + ":<br>"
                }
                if (commandDet['args'][i].indexOf("/") > -1 || commandDet['args'][i].indexOf(".") > -1 || commandDet['args'][i]
                    .indexOf("~") > -1) {
                    res += "<div class=\"out-ls\">";
                    if (prsPath(commandDet['args'][i], true) === false) {
                        res += "ls: cannot access " + positionToObj(positionVi)["name"] + ": No such file or directory<br>";
                        status = false
                    } else if (positionToObj(positionVi)["sudo"] && !commandDet['sudo']) {
                        res += "ls: cannot access " + positionToObj(positionVi)["name"] + ": Access denied.<br>";
                        status = false
                    } else {
                        let fileObj = positionToObj(positionVi);
                        let lsWidth = 0;
                        let lsWidthMax = 0;
                        if (fileObj['type'] === 'file') {
                            res += fileObj['comm_name'] + "<br>"
                        } else {
                            for (let k = 0; k < fileObj["content"].length; k++) {
                                lsWidth = textWidth(fileObj["content"][k]["name"] + "--");
                                if (lsWidth > lsWidthMax) {
                                    lsWidthMax = lsWidth
                                }
                            }
                            for (let i = 0; i < fileObj["content"].length; i++) {
                                if (fileObj["content"][i]["type"] === "dir") {
                                    res = res + "<div class=\"ls ls-dir\" style=\"width:" + lsWidthMax + "px\">" + fileObj["content"][i][
                                        "name"
                                        ] + "</div>"
                                } else if (fileObj["content"][i]["type"] === "file" && fileObj["content"][i]["name"].indexOf(".sh") ===
                                    fileObj["content"][i]["name"].length - 3) {
                                    res = res + "<div class=\"ls ls-sh\" style=\"width:" + lsWidthMax + "px\">" + fileObj["content"][i]["name"] +
                                        "</div>"
                                } else {
                                    res = res + "<div class=\"ls\" style=\"width:" + lsWidthMax + "px\">" + fileObj["content"][i]["name"] +
                                        "</div>"
                                }
                            }
                        }
                    }
                    res += "<div class=\"clear\"></div></div>"
                }
            }
            return {
                "content": res,
                "sta": status
            }
        }
    }
    if (commandDet['name'] === 'uname') {
        if (!commandDet['args'][0]) {
            return {
                "content": "AxtonOs,Costumed By UPCers.<br>",
                "sta": true
            }
        } else {
            for (let i = 0; i < commandDet['args'].length; i++) {
                if (commandDet['args'][i] !== '-s' && commandDet['args'][i] !== '-o' && commandDet['args'][i] !== '-a' &&
                    commandDet['args'][i] !== '-m' && commandDet['args'][i] !== '-n' && commandDet['args'][i] !== '-r' &&
                    commandDet['args'][i] !== '-p' && commandDet['args'][i] !== '-v' && commandDet['args'][i] !== '-i' &&
                    commandDet['args'][i] !== '--help') {
                    return {
                        "content": "uname: invalid option -- '" + commandDet['args'][i].substr(1) +
                            "'<br>Try 'uname --help' for more information.<br>",
                        "sta": false
                    }
                }
            }
            if (commandDet['args'][0] === '-s' || commandDet['args'][0] === '-o') {
                return {
                    "content": "AxtonOs<br>",
                    "sta": true
                }
            }
            if (commandDet['args'][0] === '-a') {
                return {
                    "content": "AxtonOs UPC_Linuxer 7.10.0-693.2.2.el7.x86_64 #1 SMP Tue Sep 12 22:26:13 UTC 2019 x86_64 x86_64 x86_64 AxtonOs<br>",
                    "sta": true
                }
            }
            if (commandDet['args'][0] === '-p' || commandDet['args'][0] === '-m' || commandDet['args'][0] === '-i') {
                return {
                    "content": "x86_64<br>",
                    "sta": true
                }
            }
            if (commandDet['args'][0] === '-n') {
                return {
                    "content": "UPC_Linuxer<br>",
                    "sta": true
                }
            }
            if (commandDet['args'][0] === '-r') {
                return {
                    "content": "7.10.0-693.2.2.el7.x86_64<br>",
                    "sta": true
                }
            }
            if (commandDet['args'][0] === '-v') {
                return {
                    "content": "#1 SMP Tue Sep 12 25:26:13 UTC 2019<br>",
                    "sta": true
                }
            }
            if (commandDet['args'][0] === '--help') {
                return {
                    "content": "Usage: uname [OPTION]...<br>Print certain system information.  With no OPTION, same as -s.<br><br> -a, print all information<br> -s, print the kernel name<br> -n, print the network node hostname<br> -r, print the kernel release<br> -v, print the kernel version<br> -m, print the machine hardware name<br> -p, print the processor type or \"unknown\"<br> -i, print the hardware platform or \"unknown\"<br> -o, print the operating system<br> --help, display this help and exit<br>",
                    "sta": true
                }
            }
        }
    }
    if (commandDet['name'] === 'upc') {
        if (!commandDet['args'][0]) {
            return {
                "content": "Usage: upc [OPTION]...<br>Set your preferences of the shell.<br><br> -b, Set the color of the background<br> -f, Set the color of the font<br> -a, Turn on/off the auto complete<br> -s, Turn on/off the soft keyboard<br> --help, Display this help and exit<br> --about, Display about infomation and exit<br>",
                "sta": true
            }
        } else {
            if (commandDet['args'][0] !== '-s' && commandDet['args'][0] !== '-l' && commandDet['args'][0] !== '-b' &&
                commandDet['args'][0] !== '-a' && commandDet['args'][0] !== '-f' && commandDet['args'][0] !== '--help' &&
                commandDet['args'][0] !== '--about') {
                return {
                    "content": "upc: invalid option -- '" + commandDet['args'][0].substr(1) +
                        "'<br>Try  upc --help' for more information.<br>",
                    "sta": false
                }
            }
            if (commandDet['args'][0] === '-s') {
                if (!commandDet['args'][1]) {
                    return {
                        "content": "--SKCMODE--",
                        "sta": true
                    }
                } else {
                    return skTaggle(commandDet['args'][1], true)
                }
            }
            if (commandDet['args'][0] === '-a') {
                return {
                    "content": "--AC--",
                    "sta": true
                }
            }
            if (commandDet['args'][0] === '-b') {
                if (!commandDet['args'][1]) {
                    return {
                        "content": "--BGCMODE--",
                        "sta": true
                    }
                } else {
                    return bgColor(commandDet['args'][1], true)
                }
            }
            if (commandDet['args'][0] === '-f') {
                if (!commandDet['args'][1]) {
                    return {
                        "content": "--FCMODE--",
                        "sta": true
                    }
                } else {
                    return fColor(commandDet['args'][1], true)
                }
            }
            if (commandDet['args'][0] === '--help') {
                return {
                    "content": "Usage: upc [OPTION]...<br>Set your preferences of the shell.<br><br> -b, Set the color of the background<br> -f, Set the color of the font<br> -a, Turn on/off the auto complete<br> -s, Turn on/off the soft keyboard<br> --help, Display this help and exit<br> --about, Display about infomation and exit<br>",
                    "sta": true
                }
            }
            if (commandDet['args'][0] === '--about') {
                return {
                    "content": "<br><div><pre class=\"aslogo\">" + logo +
                        "</pre><div class=\"about\">&nbsp;<br>Axton Shell 2.0.0.f59ed7a<br><span class=\"info\">Based on BASH<br>Written by <span class=\"js\">Javascript</span><br>Powered by <span class=\"nginx\">Flask</span></span><br><br>Made with love by Axton<br>Edited By UPC Linux</div><div class=\"clear\"></div></div><br>",
                    "sta": true
                }
            }
        }
    }
}

function textWidth(text) {
    let sensor = $('<span>' + text + '</span>').css({
        display: 'none'
    });
    $('body').append(sensor);
    let width = sensor.width();
    sensor.remove();
    return width
};

function prsCommand(command, multi) {
    command = command.replace(/&amp;&amp;/g, ' &amp;&amp; ').replace(/\|\|/g, ' || ').replace(/ +/g, ' ');
    if (!multi) {
        commandRunning = []
    }
    let commandSped = command.split(" ");
    let resultList = {};
    let textSudo = 0;
    resultList['args'] = [];
    resultList['known'] = false;
    if (commandSped[0] === 'sudo') {
        if (commandSped.length === 1) {
            resultList['name'] = 'sudo';
            resultList['sudo'] = false
        } else {
            resultList['name'] = commandSped[1];
            resultList['sudo'] = true;
            textSudo = 1
        }
    } else {
        resultList['name'] = commandSped[0];
        resultList['sudo'] = false
    }
    if (sudoMode) {
        resultList['sudo'] = true
    }
    for (let i = 0; i < commandList.length; i++) {
        if (resultList['name'] === commandList[i]) {
            resultList['known'] = true;
            break
        }
    }
    if (resultList['name'].indexOf("/") >= 0) {
        resultList['known'] = true
    }
    if (resultList['name'].indexOf("{") >= 0) {
        resultList['known'] = true;
        resultList['name'] = "{"
    }
    if (resultList['name'].indexOf("}") >= 0) {
        resultList['known'] = true;
        resultList['name'] = "}"
    }
    if (resultList['name'].indexOf("(") >= 0) {
        resultList['known'] = true;
        resultList['name'] = "("
    }
    if (resultList['name'].indexOf(")") === 0) {
        resultList['known'] = true;
        resultList['name'] = ")"
    }
    if (resultList['name'].indexOf("#") == 0) {
        resultList['known'] = true;
        resultList['name'] = "#"
    }
    if (resultList['name'].indexOf("'") === 0) {
        resultList['known'] = true;
        resultList['name'] = "'"
    }
    if (resultList['name'].indexOf("\"") === 0) {
        resultList['known'] = true;
        resultList['name'] = "\""
    }
    if (resultList['name'].indexOf(";") === 0) {
        resultList['known'] = true;
        resultList['name'] = ";"
    }
    if (resultList['name'].indexOf("&") === 0) {
        resultList['known'] = true;
        resultList['name'] = "&"
    }
    if (resultList['name'].indexOf("^") === 0) {
        resultList['known'] = true;
        resultList['name'] = "^f" + resultList['name'].substr(1)
    }
    let sum = 0;
    let multiCommand = "";
    for (let k = 0; k < commandSped.length; k++) {
        if (k === 0) {
            if (textSudo) {
                k++
            }
        } else {
            if (commandSped[k] !== "&amp;&amp;" && commandSped[k] !== "||") {
                resultList["args"][sum] = commandSped[k];
                sum++
            } else {
                multiCommand = commandSped[k];
                break
            }
        }
    }
    if (multiCommand === "&amp;&amp;" || multiCommand === "||") {
        let posi = command.indexOf(multiCommand);
        if (posi !== -1) {
            commandRunning.unshift({
                "content": resultList,
                "type": "command"
            });
            commandRunning.unshift({
                "content": multiCommand,
                "type": "log"
            });
            prsCommand(command.substr(posi + multiCommand.length + 1), true)
        }
    } else {
        commandRunning.unshift({
            "content": resultList,
            "type": "command"
        })
    }
    return resultList
}

function prsPath(path, completed) {
    let found = false;
    if (path === '') {
        return false
    }
    positionVi = Object.assign({}, positionRe);
    if (path.substr(0, 2) === './') {
        path = path.substr(2)
    } else if (path.substr(0, 1) === '/') {
        positionVi["deepth"] = 1;
        positionVi["d_1"] = 0;
        path = path.substr(1)
    } else if (path.substr(0, 2) === '~/') {
        positionVi["deepth"] = 2;
        positionVi["d_1"] = 1;
        positionVi["d_2"] = 0;
        path = path.substr(2)
    } else if (path.substr(0, 1) === '~') {
        positionVi["deepth"] = 2;
        positionVi["d_1"] = 1;
        positionVi["d_2"] = 0;
        path = path.substr(1)
    } else if (path.substr(0, 3) === '../') {
        positionVi["deepth"] = positionVi["deepth"] - 1;
        if (positionVi["deepth"] <= 0) {
            return false
        } else {
            positionVi["d_" + positionVi["deepth"].toString()] = 0;
            path = path.substr(3)
        }
    }
    if (path === "") {
        return true
    }
    let pathPrsed = path.split("/");
    if (!completed) {
        pathPrsed.pop()
    }
    for (let i = 0; i < pathPrsed.length; i++) {
        if (pathPrsed[i] === "..") {
            positionVi["deepth"] = positionVi["deepth"] - 1;
            if (positionVi["deepth"] <= 0) {
                return false
            } else {
                positionVi["d_" + positionVi["deepth"].toString()] = 0
            }
        } else if (pathPrsed[i] !== "." && pathPrsed[i] !== "") {
            let pathList = [];
            if (positionVi["deepth"] === 1) {
                pathList = files[0]["content"]
            } else if (positionVi["deepth"] === 2) {
                pathList = files[0]["content"][positionVi["d_1"] - 1]["content"]
            } else if (positionVi["deepth"] === 3) {
                pathList = files[0]["content"][positionVi["d_1"] - 1]["content"][positionVi["d_2"] - 1]["content"]
            }
            found = false;
            for (let k = 0; k < pathList.length; k++) {
                if (pathPrsed[i] === pathList[k]["name"] || pathPrsed[i] === pathList[k]["comm_name"]) {
                    positionVi["d_" + positionVi["deepth"].toString()] = k + 1;
                    found = true;
                    if (pathList[k]["type"] === "dir") {
                        positionVi["deepth"] = positionVi["deepth"] + 1;
                        positionVi["d_" + positionVi["deepth"].toString()] = 0
                    }
                    break
                }
            }
            if (!found) {
                return false
            }
        }
    }
    return true
}

function positionToObj(positionObj) {
    let targetObj = {};
    if (positionObj["deepth"] === 1) {
        if (positionObj["d_1"] === 0) {
            targetObj = files[0]
        } else {
            targetObj = files[0]["content"][positionObj["d_1"] - 1]
        }
    } else if (positionObj["deepth"] === 2) {
        if (positionObj["d_2"] === 0) {
            targetObj = files[0]["content"][positionObj["d_1"] - 1]
        } else {
            targetObj = files[0]["content"][positionObj["d_1"] - 1]["content"][positionObj["d_2"] - 1]
        }
    } else if (positionObj["deepth"] === 3) {
        if (positionObj["d_3"] === 0) {
            targetObj = files[0]["content"][positionObj["d_1"] - 1]["content"][positionObj["d_2"] - 1]
        } else {
            targetObj = files[0]["content"][positionObj["d_1"] - 1]["content"][positionObj["d_2"] - 1]["content"][
            positionObj["d_3"] - 1
                ]
        }
    }
    return targetObj
}

function bgColor(input, source) {
    if (input !== "1" && input !== "2" && input !== "3" && input !== "4" && input !== "5") {
        return {
            "content": '<span class="as-failed">Failed</span>: illegal input.<br>',
            "sta": false
        }
    } else {
        if (input === "1") {
            $('body').addClass("bg-white");
            $("meta[name='theme-color']").attr('content', "#212121")
        } else if (input === "2") {
            $('body').addClass("bg-black");
            $("meta[name='theme-color']").attr('content', "#000000")
        } else if (input === "3") {
            $('body').addClass("bg-dgray");
            $("meta[name='theme-color']").attr('content', "#323232")
        } else if (input === "4") {
            $('body').addClass("bg-dblue");
            $("meta[name='theme-color']").attr('content', "#1e3946")
        } else if (input === "5") {
            $('body').addClass("bg-dgreen");
            $("meta[name='theme-color']").attr('content', "#0d3936")
        }
        let bgColorNow = localStorage.getItem("as-bg");
        if (bgColorNow === "1" && bgColorNow !== input) {
            $('body').removeClass("bg-white")
        } else if (bgColorNow === "2" && bgColorNow !== input) {
            $('body').removeClass("bg-black")
        } else if (bgColorNow === "3" && bgColorNow !== input) {
            $('body').removeClass("bg-dgray")
        } else if (bgColorNow === "4" && bgColorNow !== input) {
            $('body').removeClass("bg-dblue")
        } else if (bgColorNow === "5" && bgColorNow !== input) {
            $('body').removeClass("bg-dgreen")
        } else {
            localStorage.setItem("as-bg", "1")
        }
        let fColorNow = localStorage.getItem("as-fc");
        let fontChanged = false;
        if (input === "1" && fColorNow === "3") {
            $('body').addClass("fc-black").removeClass("fc-white");
            fontChanged = true;
            localStorage.setItem("as-fc", "1")
        } else if ((input === "2" && fColorNow === "1") || (input === "3" && fColorNow === "1") || (input === "4" &&
            fColorNow === "1") || (input === "5" && fColorNow === "1")) {
            $('body').addClass("fc-white").removeClass("fc-black");
            fontChanged = true;
            localStorage.setItem("as-fc", "3")
        }
        localStorage.setItem("as-bg", input);
        let fontColor = "";
        if (fontChanged) {
            fontColor = "<br>Font color has been automatically changed."
        }
        let alsoUse = "";
        if (!source) {
            alsoUse = "<br>You can also use 'upc -b " + input + "'."
        }
        return {
            "content": '<span class="as-successed">Successed.</span>' + fontColor + alsoUse + '<br>',
            "sta": true
        }
    }
}

function fColor(input, source) {
    if (input !== "1" && input !== "2" && input !== "3") {
        return {
            "content": '<span class="as-failed">Failed</span>: illegal input.<br>',
            "sta": false
        }
    } else {
        if (input === "1") {
            $('body').addClass("fc-black")
        } else if (input === "2") {
            $('body').addClass("fc-gray")
        } else if (input === "3") {
            $('body').addClass("fc-white")
        }
        let fColorNow = localStorage.getItem("as-fc");
        if (fColorNow === "1" && fColorNow !== input) {
            $('body').removeClass("fc-black")
        } else if (fColorNow === "2" && fColorNow !== input) {
            $('body').removeClass("fc-gray")
        } else if (fColorNow === "3" && fColorNow !== input) {
            $('body').removeClass("fc-white")
        }
        localStorage.setItem("as-fc", input);
        let alsoUse = "";
        if (!source) {
            alsoUse = "<br>You can also use 'upc -b " + input + "'."
        }
        return {
            "content": '<span class="as-successed">Successed.</span>' + alsoUse + '<br>',
            "sta": true
        }
    }
}

function skTaggle(input, source) {
    if (input !== "1" && input !== "2" && input !== "3") {
        return {
            "content": '<span class="as-failed">Failed</span>: illegal input.<br>',
            "sta": false
        }
    } else {
        let skNow = localStorage.getItem("sk");
        if (skNow === "1" && input === "2") {
            if (!navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            )) {
                $('.soft-keyboard').show()
            }
        } else if (skNow === "1" && input === "3") {
            if (navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            )) {
                $('.soft-keyboard').hide()
            }
        } else if (skNow === "2" && input === "1") {
            if (!navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            )) {
                $('.soft-keyboard').hide()
            }
        } else if (skNow === "2" && input === "3") {
            $('.soft-keyboard').hide()
        } else if (skNow === "3" && input === "1") {
            if (navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            )) {
                $('.soft-keyboard').show()
            }
        } else if (skNow === "3" && input === "2") {
            $('.soft-keyboard').show()
        }
        localStorage.setItem("sk", input);
        let alsoUse = "";
        if (!source) {
            alsoUse = "<br>You can also use 'upc -s " + input + "'."
        }
        return {
            "content": '<span class="as-successed">Successed.</span>' + alsoUse + '<br>',
            "sta": true
        }
    }
}

function keepLastIndex(obj) {
    if (window.getSelection) {
        obj.focus();
        let range = window.getSelection();
        range.selectAllChildren(obj);
        range.collapseToEnd()
    } else if (document.selection) {
        let range = document.selection.createRange();
        range.moveToElementText(obj);
        range.collapse(false);
        range.select()
    }
}

function getCursortPosition(element) {
    let caretOffset = 0;
    let doc = element.ownerDocument || element.document;
    let win = doc.defaultView || doc.parentWindow;
    let sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            let range = win.getSelection().getRangeAt(0);
            let preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length
        }
    }
    return caretOffset
}

function hisComm(how) {
    $('body,html').animate({
        scrollTop: $(document).height()
    }, 0);
    if (how === 'up' && !historyMode) {
        if (hisCommand.length > 0) {
            inputCache = $('.input-text').text();
            $('.input-text').html(hisCommand[hisCommand.length - 1]);
            cour = hisCommand.length - 1;
            historyMode = 1
        }
    } else if (how === 'up' && historyMode) {
        if (cour - 1 >= 0) {
            cour--;
            $('.input-text').html(hisCommand[cour])
        }
    } else if (how === 'down' && historyMode) {
        if (cour + 1 <= hisCommand.length - 1) {
            cour++;
            $('.input-text').html(hisCommand[cour]);
            keepLastIndex(document.getElementsByClassName("input-text")[0])
        } else if (cour + 1 === hisCommand.length) {
            $('.input-text').html(inputCache);
            historyMode = 0
        }
    }
}

function sendMessage(message) {
    if (message.length > 5 && message.length < 150 && message.indexOf("<") === -1 && message.indexOf(">") === -1 &&
        message.indexOf("\\") === -1 && message.indexOf("`") === -1 && message.indexOf("|") === -1 && message.indexOf("_") ===
        -1 && message.indexOf(" ") !== -1) {
        $.ajax({
            url: "/send/",
            method: "POST",
            timeout: 10000,
            data: {
                "name": message.split(" ")[0],
                "msg": message.substr(message.split(" ")[0].length + 1)
            },
            success: function() {},
            error: function() {}
        });
        return "Messsage sent.<br>"
    } else {
        return "<span class=\"as-failed\">Failed😢: </span>Not a legal message.A Message With 💕Should Between 5 to 150 chars.<br>"
    }
}

function cleanHisCommand() {
    if (hisCommand.length > 200) {
        hisCommand.splice(0, hisCommand.length - 200)
    }
    localStorage.setItem('his_list', JSON.stringify(hisCommand))
}

function deleteHtml(input) {
    return $('<div>').text(input).html()
}

function doCommand() {
    let restColor = {
        "sta": false
    };
    let taggled = 0;
    if (catMode) {
        let input = deleteHtml($('.input-text').text().trim());
        if (input === "") {
            $('.content').html($('.content').html() + '&nbsp;<br>')
        } else {
            $('.content').html($('.content').html() + deleteHtml($('.input-text').text()) + '<br>' + deleteHtml($(
                '.input-text').text()) + '<br>')
        }
    } else if (colorMode) {
        let input = deleteHtml($('.input-text').text().trim());
        restColor = bgColor(input, false);
        $('.content').html($('.content').html() + 'Type the number of the color: ' + input + '<br>' + restColor["content"]);
        colorMode = 0;
        if (commandRunning.length === 0) {
            running = 0;
            taggled = 1
        }
        $('.precolor').hide();
        $('.prefix,.preblank').show();
        $('.input-text').text('');
        $('body,html').animate({
            scrollTop: $(document).height()
        }, 0)
    } else if (fcMode) {
        let input = deleteHtml($('.input-text').text().trim());
        restColor = fColor(input, false);
        $('.content').html($('.content').html() + 'Type the number of the color: ' + input + '<br>' + restColor["content"]);
        fcMode = 0;
        if (commandRunning.length === 0) {
            running = 0;
            taggled = 1
        }
        $('.precolor').hide();
        $('.prefix,.preblank').show();
        $('.input-text').text('');
        $('body,html').animate({
            scrollTop: $(document).height()
        }, 0)
    } else if (skMode) {
        let input = deleteHtml($('.input-text').text().trim());
        let restSk = skTaggle(input, false);
        $('.content').html($('.content').html() + 'Type the number of the option: ' + input + '<br>' + restSk["content"]);
        skMode = 0;
        if (commandRunning.length === 0) {
            running = 0;
            taggled = 1
        }
        $('.preoption').hide();
        $('.prefix,.preblank').show();
        $('.input-text').text('');
        $('body,html').animate({
            scrollTop: $(document).height()
        }, 0)
    } else if (lmMode) {
        let input = deleteHtml($('.input-text').text().trim());
        let restLm = sendMessage(input);
        $('.content').html($('.content').html() + 'Type a message: ' + input + '<br>' + restLm);
        lmMode = 0;
        if (commandRunning.length === 0) {
            running = 0;
            taggled = 1
        }
        $('.preleave').hide();
        $('.prefix,.preblank').show();
        $('.input-text').text('');
        $('body,html').animate({
            scrollTop: $(document).height()
        }, 0)
    } else if (conMode) {
        $('.content').html("<br>");
        conMode = 0;
        taggled = 1;
        $('.prefix,.preblank,.input-text').show();
        $('#position').text("~");
        positionRe = {
            "deepth": 2,
            "d_1": 1,
            "d_2": 0,
            "d_3": 0
        };
        displayPosition = "~";
        $('.con-lost').hide();
        $('.input-text').text('');
        $('.input-text').focus()
    } else if (con2Mode) {
        if (new Date().getTime() > rebootTime.getTime() + 5000) {
            $('.content').html("<br>");
            con2Mode = 0;
            taggled = 1;
            uped = new Date();
            localStorage.setItem("up", uped);
            $('.prefix,.preblank,.input-text').show();
            $('.con-lost').hide();
            $('.input-text').text('');
            $('.input-text').focus();
            $('#position').text("~");
            positionRe = {
                "deepth": 2,
                "d_1": 1,
                "d_2": 0,
                "d_3": 0
            };
            displayPosition = "~"
        } else {
            $('.retry').text("Connecting...");
            setTimeout(function() {
                $('.retry').text("Failed😢. Enter to retry")
            }, 2000)
        }
    }
    if (!running) {
        let command = deleteHtml($('.input-text').text().trim());
        if (command !== '') {
            hisCommand[hisCommand.length] = command;
            cleanHisCommand();
            prsCommand(command, false);
            if (commandRunning.length !== 0) {
                running = 1;
                getReturn(true)
            }
        } else if (!historyMode && !catMode && !colorMode && !fcMode && !skMode && !lmMode && !conMode && !con2Mode) {
            if (!taggled) {
                $('.content').html($('.content').html() + '[' + username + '@UPC Linuxer ' + displayPosition + ']#<br>')
            }
            return
        }
    } else {
        if (!catMode) {
            let tmp = commandRunning.pop();
            if (tmp["type"] !== "log") {
                commandRunning.push(tmp);
                getReturn(false)
            } else {
                if ((restColor["sta"] && tmp["content"] === "&amp;&amp;") || (!restColor["sta"] && tmp["content"] === "||")) {
                    getReturn(false)
                } else {
                    running = 0
                }
            }
        }
    }
}

function getReturn(firstCall) {
    let rest = runCommand(commandRunning.pop());
    if (rest["content"] !== undefined) {
        let prefix = "";
        if (firstCall) {
            prefix = '[' + username + '@UPC Linuxer ' + displayPosition + ']# ' + deleteHtml($('.input-text').text()) + '<br>'
        }
        if (rest["content"] === '--CATMODE--') {
            $('.content').html($('.content').html() + prefix)
        } else if (rest["content"] === '--LOGOUTMODE--') {
            $('.retry').text("Enter to reconnect");
            commandRunning = [];
            running = 0;
            $('.content').html('<br>');
            $('.prefix,.preblank,.input-text').hide();
            $('.con-lost').show();
            conMode = 1
        } else if (rest["content"] === '--FAKEREBOOTMODE--') {
            $('.content').html($('.content').html() + prefix)
        } else if (rest["content"] === '--AC--') {
            if (autoCompleteTag) {
                autoCompleteTag = false;
                localStorage.setItem("ac", "2");
                $('.content').html($('.content').html() + prefix + "Auto complete: <span class=\"as-failed\">Off</span><br>")
            } else {
                autoCompleteTag = true;
                localStorage.setItem("ac", "1");
                $('.content').html($('.content').html() + prefix + "Auto complete: <span class=\"as-successed\">On</span><br>")
            }
        } else if (rest["content"] === '--REBOOTMODE--') {
            $('.retry').text("Enter to reconnect");
            commandRunning = [];
            running = 0;
            $('.content').html('<br>');
            $('.prefix,.preblank,.input-text').hide();
            $('.con-lost').show();
            con2Mode = 1;
            rebootTime = new Date()
        } else if (rest["content"] === '--CLEARMODE--') {
            $('.content').html('<br>')
        } else if (rest["content"] === '--BLANKMODE--') {
            let prefixSub = '';
            if (firstCall) {
                prefixSub = '[' + username + '@UPC Linuxer ' + displayPosition + ']#' + '<br>'
            }
            $('.content').html($('.content').html() + prefixSub)
        } else if (rest["content"] === '--CDBLANKMODE--') {
            $('.content').html($('.content').html() + prefix)
        } else if (rest["content"].substr(0, 10) === '--CDMODE--') {
            let prefixSub = '';
            if (firstCall) {
                prefixSub = '[' + username + '@UPC Linuxer ' + rest["content"].substr(10) + ']# ' + deleteHtml($('.input-text').text()) +
                    '<br>'
            }
            $('.content').html($('.content').html() + prefixSub)
        } else if (rest["content"] === '--BGCMODE--') {
            $('.content').html($('.content').html() + prefix +
                'Set your background color of the shell.<br>You can choose following colors:<br>1. <span class="bg-white bg-demo">White</span><br>2. <span class="bg-black bg-demo">Black</span><br>3. <span class="bg-dgray bg-demo">DeepGray</span><br>4. <span class="bg-dblue bg-demo">DeepBlue</span><br>5. <span class="bg-dgreen bg-demo">DeepGreen</span><br>'
            );
            $('.prefix,.preblank').hide();
            $('.precolor').show();
            colorMode = 1
        } else if (rest["content"] === '--SKCMODE--') {
            $('.content').html($('.content').html() + prefix +
                'Turn on/off the soft keyboard.<br>You have following choices:<br>1. Auto<br>2. Always on<br>3. Always off<br>'
            );
            $('.prefix,.preblank').hide();
            $('.preoption').show();
            skMode = 1
        } else if (rest["content"] === '--FCMODE--') {
            $('.content').html($('.content').html() + prefix +
                'Set your font color of the shell.<br>You can choose following colors:<br>1. <span class="fc-black fc-demo">Black</span><br>2. <span class="fc-gray fc-demo">Gray</span><br>3. <span class="fc-white fc-demo">White</span><br>'
            );
            $('.prefix,.preblank').hide();
            $('.precolor').show();
            fcMode = 1
        } else if (rest["content"] === '--MESSAGEMODE--') {
            $('.content').html($('.content').html() + prefix +
                'Guys:<br>You Come Here ,Finally.<br>This is A Part Of The SecretZone.<br>And You are The No.{{ num }} to here.<br> Just leave a message.So we can tell You.<br>The first word separated by space will be your name.<br>');

            $('.prefix,.preblank').hide();
            $('.preleave').show();
            lmMode = 1
        } else {
            $('.content').html($('.content').html() + prefix + rest["content"])
        }
    } else {
        $('.content').html($('.content').html() + prefix + "Unexpected error :-(<br>")
    }
    if (!tabMode && !historyMode && !catMode && !colorMode && !fcMode && !skMode && !lmMode && !conMode && !con2Mode) {
        if (commandRunning.length === 0) {
            running = 0
        } else {
            let poped = commandRunning.pop()["content"];
            if ((rest["sta"] && poped === "&amp;&amp;") || (!rest["sta"] && poped === "||")) {
                doCommand()
            } else {
                running = 0
            }
        }
    }
}
let tapButton = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) ?
    'touchstart' : 'click';
document.getElementById("enter").addEventListener(tapButton, function() {
    prsKey({
        "keyCode": 13,
        "ctrlKey": false,
        "preventDefault": function() {}
    })
}, false);
document.getElementById("c-c").addEventListener(tapButton, function() {
    prsKey({
        "keyCode": 67,
        "ctrlKey": true,
        "preventDefault": function() {}
    })
}, false);
document.getElementById("tab").addEventListener(tapButton, function() {
    prsKey({
        "keyCode": 9,
        "ctrlKey": false,
        "preventDefault": function() {}
    })
}, false);
document.getElementById("up").addEventListener(tapButton, function() {
    prsKey({
        "keyCode": 38,
        "ctrlKey": false,
        "preventDefault": function() {}
    })
}, false);
document.getElementById("down").addEventListener(tapButton, function() {
    prsKey({
        "keyCode": 40,
        "ctrlKey": false,
        "preventDefault": function() {}
    })
}, false);
document.addEventListener("keydown", prsKey, false);

function prsKey(event) {
    $('.input-text').focus();
    if (event.keyCode === 13) {
        event.preventDefault();
        tabMode = 0;
        historyMode = 0;
        doCommand();
        $('.input-text').html('');
        $('body,html').animate({
            scrollTop: $(document).height()
        }, 0)
    } else if (event.keyCode === 9) {
        event.preventDefault();
        historyMode = 0;
        if (!tabMode) {
            if (tabList.length > 1) {
                tabMode = 1
            } else if (tabList.length === 1) {
                let last = $(".input-text").text().split(" ");
                last = last[last.length - 1];
                if (tabList[0].substr((tabList[0].length - 1)) === "/") {
                    $(".input-text").html($(".input-text").text() + tabList[0].substr(last.length))
                } else {
                    $(".input-text").html($(".input-text").text() + tabList[0].substr(last.length) + "&nbsp;")
                }
                keepLastIndex(document.getElementsByClassName("input-text")[0])
            }
        } else {
            let prefixStr = "<div class=\"out-ls\">";
            let tabWidth = 0,
                tabWidthMax = 0;
            for (let k in tabList) {
                tabWidth = textWidth(tabList[k] + "--");
                if (tabWidth > tabWidthMax) {
                    tabWidthMax = tabWidth
                }
            }
            for (let i in tabList) {
                prefixStr += '<div class="ls" style="width:' + tabWidthMax + 'px">' + tabList[i] + '</div>'
            }
            $('.content').html($('.content').html() + '[' + username + '@UPC Linuxer ' + displayPosition + ']# ' + deleteHtml($(
                ".input-text").text()) + prefixStr + '<div class="clear"></div></div>');
            $('body,html').animate({
                scrollTop: $(document).height()
            }, 0);
            tabMode = 0
        }
    } else if (event.keyCode === 38) {
        event.preventDefault();
        if (!catMode && !colorMode && !fcMode) {
            hisComm('up');
            tabMode = 0
        } else {
            $('.input-text').text($('.input-text').text() + "^[[A");
            keepLastIndex(document.getElementsByClassName("input-text")[0])
        }
    } else if (event.keyCode === 39) {
        tabMode = 0;
        historyMode = 0;
        if (getCursortPosition(document.getElementsByClassName("input-text")[0]) === $(".input-text").text().length) {
            if ($("#ac-tip").text() !== "") {
                if ($("#ac-tip").text().substr(($("#ac-tip").text().length - 1)) === "/") {
                    $(".input-text").html($(".input-text").text() + $("#ac-tip").text())
                } else {
                    $(".input-text").html($(".input-text").text() + $("#ac-tip").text() + "&nbsp;")
                }
            }
            keepLastIndex(document.getElementsByClassName("input-text")[0])
        }
    } else if (event.keyCode === 40) {
        event.preventDefault();
        if (!catMode && !colorMode && !fcMode) {
            hisComm('down');
            tabMode = 0
        } else {
            $('.input-text').text($('.input-text').text() + "^[[B");
            keepLastIndex(document.getElementsByClassName("input-text")[0])
        }
    } else if (event.ctrlKey === true) {
        if (event.keyCode === 67) {
            if (catMode) {
                $('.content').html($('.content').html() + deleteHtml($(".input-text").text()) + '^C<br>');
                $('.prefix,.preblank').show();
                catMode = 0;
                if (commandRunning.length === 0) {
                    running = 0
                }
                $('.catmode').hide();
                $('.input-text').text('');
                $('body,html').animate({
                    scrollTop: $(document).height()
                }, 0)
            } else if (colorMode) {
                $('.content').html($('.content').html() + 'Type the number of the color: ' + deleteHtml($('.input-text').text()) +
                    '^C<br>');
                colorMode = 0;
                if (commandRunning.length === 0) {
                    running = 0
                }
                $('.precolor').hide();
                $('.prefix,.preblank').show();
                $('.input-text').text('');
                $('body,html').animate({
                    scrollTop: $(document).height()
                }, 0)
            } else if (fcMode) {
                $('.content').html($('.content').html() + 'Type the number of the color: ' + deleteHtml($('.input-text').text()) +
                    '^C<br>');
                fcMode = 0;
                if (commandRunning.length === 0) {
                    running = 0
                }
                $('.precolor').hide();
                $('.prefix,.preblank').show();
                $('.input-text').text('');
                $('body,html').animate({
                    scrollTop: $(document).height()
                }, 0)
            } else if (skMode) {
                $('.content').html($('.content').html() + 'Type the number of the option: ' + deleteHtml($('.input-text').text()) +
                    '^C<br>');
                skMode = 0;
                if (commandRunning.length === 0) {
                    running = 0
                }
                $('.preoption').hide();
                $('.prefix,.preblank').show();
                $('.input-text').text('');
                $('body,html').animate({
                    scrollTop: $(document).height()
                }, 0)
            } else if (lmMode) {
                $('.content').html($('.content').html() + 'Type a message: ' + deleteHtml($('.input-text').text()) + '^C<br>');
                lmMode = 0;
                if (commandRunning.length === 0) {
                    running = 0
                }
                $('.preleave').hide();
                $('.prefix,.preblank').show();
                $('.input-text').text('');
                $('body,html').animate({
                    scrollTop: $(document).height()
                }, 0)
            } else {
                $('.content').html($('.content').html() + '[' + username + '@UPC Linuxer ' + displayPosition + ']# ' + deleteHtml(
                    $('.input-text').text()) + '^C<br>');
                $('.input-text').text('');
                $('body,html').animate({
                    scrollTop: $(document).height()
                }, 0)
            }
            if (running) {
                let tmp = commandRunning.pop();
                if (tmp["type"] === "log" && tmp["content"] === "||") {
                    doCommand()
                } else {
                    running = 0
                }
            }
            $('.input-text').focus();
            tabMode = 0
        }
    }
}