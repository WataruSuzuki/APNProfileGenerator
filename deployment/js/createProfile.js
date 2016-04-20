angular.module('app')
.controller('CreateProfileController', function($scope) {

    ons.createPopover('popover.html').then(function(popover) {
		$scope.popover = popover;
	});
	$scope.$on('$destroy',function(){
		$scope.popover.destroy();
	});
    $scope.switchTrigger= function (obj) {
        //alert(obj.IsSelected);
    }

	$scope.downloadProfile = function() {
		if (typeof($scope.item_apnname) != 'undefined' && $scope.item_apnname !== '') {
            var authType = $scope.item_authtype;
            if (authType) {
				authType = 'CHAP';
			} else {
                authType = 'PAP';
			}
            let payloadDescription = "From APN Bookmarks webpage"
            let bundleID = "watarusuzuki.github.io.apn-profile"
            let UUID_forIdentifier = "f9dbd18b-90ff-58c1-8605-5abae9c50691"
            let UUID_forDescription = "4be0643f-1d98-573b-97cd-ca98a65347dd"

            // build the Configuration Profile
            var profileXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"><plist version=\"1.0\"><dict><key>PayloadContent</key><array><dict>"

            //APNs
            profileXml += "<key>APNs</key><array><dict>"
            let apnsAuthType = authType
            profileXml += "<key>AuthenticationType</key><string>" + apnsAuthType + "</string>"
            profileXml += "<key>Name</key><string>" + $scope.item_apnname + "</string>"
            var password = $scope.item_password;
            if (typeof(password) == 'undefined' || password === '') {
                //do nothing
			} else {
                profileXml += "<key>Password</key><string>" + password + "</string>"
			}

            // if !rlmObject.apnProfileObj.apnsProxyServer.isEmpty
            //     && !rlmObject.apnProfileObj.apnsProxyServerPort.isEmpty {
            //     profileXml += "<key>ProxyPort</key><integer>" + rlmObject.apnProfileObj.apnsProxyServerPort + "</integer>"
            //     profileXml += "<key>ProxyServer</key><string>" + rlmObject.apnProfileObj.apnsProxyServer + "</string>"
            // }
            var username = $scope.item_username;
			if (typeof(username) == 'undefined' || username === '') {
				//do nothing
			} else {
                profileXml += "<key>Username</key><string>" + username + "</string>"
			}
            profileXml += "</dict></array>"

            //AttachAPN
            profileXml += "<key>AttachAPN</key><dict>"
            let attachAuthType = authType
            profileXml += "<key>AuthenticationType</key><string>" + attachAuthType + "</string>"
            profileXml += "<key>Name</key><string>" + $scope.item_apnname + "</string>"
            if (typeof(password) == 'undefined' || password === '') {
                //do nothing
            } else {
                profileXml += "<key>Password</key><string>" + password + "</string>"
            }
            if (typeof(username) == 'undefined' || username === '') {
				//do nothing
			} else {
                profileXml += "<key>Username</key><string>" + username + "</string>"
			}
            profileXml += "</dict>"

            //PayloadDescription
            profileXml += "<key>PayloadDescription</key><string>" + payloadDescription + "</string>"
            profileXml += "<key>PayloadDisplayName</key><string>" + "APN Bookmarks webpage" + "</string>"
            profileXml += "<key>PayloadIdentifier</key><string>" + bundleID + "</string>"
            profileXml += "<key>PayloadType</key><string>com.apple.cellular</string>"
            profileXml += "<key>PayloadUUID</key><string>" + UUID_forDescription + "</string>"
            profileXml += "<key>PayloadVersion</key><real>1</real></dict></array>"

            //PayloadDisplayName
            profileXml += "<key>PayloadDisplayName</key><string>" + "APN Bookmarks webpage" + "</string>"
            profileXml += "<key>PayloadIdentifier</key><string>" + bundleID + "</string>"
            profileXml += "<key>PayloadRemovalDisallowed</key><false/>"
            profileXml += "<key>PayloadType</key><string>Configuration</string>"
            profileXml += "<key>PayloadUUID</key><string>" + UUID_forIdentifier + "</string>"
            profileXml += "<key>PayloadVersion</key><integer>1</integer></dict></plist>"

            if (userAgent.indexOf('chrome') != -1
            ||  userAgent.indexOf('firefox') != -1) {
                var uri = 'data:text/xml;charset=utf-8,' + escape(profileXml);
                var link = document.createElement("a");
                link.href = uri;
                link.style = "visibility:hidden";
                link.download = "APNProfileGenerator.mobileconfig";

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                var ref = window.open('https://ios-apnprofile-putter.herokuapp.com/?apnprofile=' + encodeURIComponent(profileXml), 'apnbookmarks.mobileconfig', 'location=yes');
            }

		} else {
			$scope.popover.show('#input-name');
		}
	};

});
