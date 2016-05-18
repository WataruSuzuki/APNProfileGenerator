function launchApp(){
    var url = "jchankchanapnassistant://";
    var ref = window.open(url, '_blank', 'location=yes');
}

function dispAlert(){
    window.alert('アラートの表示');
}

function loadExternalWebsite(){
    let payloadDescription = "From APN Bookmarks webpage"
    let bundleID = "watarusuzuki.github.io.apn-profile"
    let UUID_forIdentifier = "f9dbd18b-90ff-58c1-8605-5abae9c50691"
    let UUID_forDescription = "4be0643f-1d98-573b-97cd-ca98a65347dd"

    var profileXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"><plist version=\"1.0\"><dict><key>PayloadContent</key><array><dict>"

    //APNs
    profileXml += "<key>APNs</key><array><dict>"
    let apnsAuthType = 'CHAP'
    profileXml += "<key>AuthenticationType</key><string>" + apnsAuthType + "</string>"
    profileXml += "<key>Name</key><string>" + "freetel.link" + "</string>"

    profileXml += "</dict></array>"

    //AttachAPN
    profileXml += "<key>AttachAPN</key><dict>"
    let attachAuthType = 'CHAP'
    profileXml += "<key>AuthenticationType</key><string>" + attachAuthType + "</string>"
    profileXml += "<key>Name</key><string>" + "freetel.link" + "</string>"
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

    var ref = window.open('data:Application/octet-stream,' + encodeURIComponent(profileXml), 'apnbookmarks.mobileconfig', 'location=yes');
}
