#!/bin/sh -e

cd  android/app/build/outputs/apk
aws s3 cp MoveIt-v*.apk s3://moveit-app/ --grants "read=uri=http://acs.amazonaws.com/groups/global/AllUsers"
