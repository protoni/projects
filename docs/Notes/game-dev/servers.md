
##### AWS GameLift
````powershell
# Setup server
- Create file "install.bat" under: D:\git\feldewar\Build\Server\Dev\WindowsServer
- Add contents to it:
VC_redist.x64.exe /q
Engine\Extras\Redist\en-us\UE4PrereqSetup_x64.exe /q
- Download VC_redist.x64.exe and put it under the same folder as install.bat

# Setup Aws user

# Aws CLI commands
C:\Users\tonik>aws configure
AWS Access Key ID [None]: ACCESS_KEY_ID_HERE
AWS Secret Access Key [None]: SECRET_ACCESS_KEY_HERE
Default region name [None]: eu-west-1
Default output format [None]: json

C:\Users\tonik>aws gamelift create-game-session --endpoint-url http://localhost:9080 --maximum-player-session-count 2 --fleet-id fleet-123
{
    "GameSession": {
        "GameSessionId": "arn:aws:gamelift:local::gamesession/fleet-123/path-id-here",
        "FleetId": "fleet-123",
        "MaximumPlayerSessionCount": 2,
        "Status": "ACTIVE",
        "IpAddress": "127.0.0.1",
        "DnsName": "localhost",
        "Port": 7779
    }
}

C:\Users\tonik>aws gamelift describe-game-sessions --endpoint-url http://localhost:9080 --fleet-id fleet-123
{
    "GameSessions": [
        {
            "GameSessionId": "arn:aws:gamelift:local::gamesession/fleet-123/path-id-here",
            "FleetId": "fleet-123",
            "MaximumPlayerSessionCount": 2,
            "Status": "ACTIVE",
            "IpAddress": "127.0.0.1",
            "DnsName": "localhost",
            "Port": 7779
        }
    ]
}

C:\Users\tonik>aws gamelift upload-build --name feldewar --build-version 1.0.0 --build-root D:\git\feldewar\Build\Server\Dev\WindowsServer --operating-system WINDOWS_2012 --region eu-west-1
Uploading D:\git\feldewar\Build\Server\Dev\WindowsServer:  404.6 MiB / 404.6 MiB  (100.00%)Successfully uploaded D:\git\feldewar\Build\Server\Dev\WindowsServer to AWS GameLift
Build ID: build-id-here

# Start local GameLift service
C:\Users\tonik\Downloads\GameLiftLocal-1.0.5>java -jar GameLiftLocal.jar -p 9080

# Start local server
feldewarServer.exe -log -port=7779
````